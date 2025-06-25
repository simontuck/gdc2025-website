import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'GDC25 Conference',
    version: '1.0.0',
  },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Get the signature from the header
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // Get the raw body
    const body = await req.text();

    // Verify the webhook signature
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    // Process the event asynchronously
    EdgeRuntime.waitUntil(handleEvent(event));

    return Response.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function handleEvent(event: Stripe.Event) {
  console.log(`Processing event: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling event ${event.type}:`, error);
    throw error;
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`Processing checkout session: ${session.id}`);

  const customerId = session.customer as string;
  
  if (!customerId) {
    console.error('No customer ID found in checkout session');
    return;
  }

  // Ensure customer exists in our database
  const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
  
  await supabase.from('stripe_customers').upsert({
    customer_id: customer.id,
    email: customer.email,
    name: customer.name,
  }, {
    onConflict: 'customer_id'
  });

  // Check if this is a room booking payment
  const bookingId = session.metadata?.booking_id;
  
  if (bookingId) {
    // Handle room booking payment
    await handleRoomBookingPayment(session, bookingId);
  } else {
    // Handle regular one-time payments
    if (session.mode === 'payment' && session.payment_status === 'paid') {
      const { error: orderError } = await supabase.from('stripe_orders').upsert({
        checkout_session_id: session.id,
        payment_intent_id: session.payment_intent as string,
        customer_id: customerId,
        amount_subtotal: session.amount_subtotal,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        status: 'completed',
      }, {
        onConflict: 'checkout_session_id'
      });

      if (orderError) {
        console.error('Error inserting order:', orderError);
        throw orderError;
      }

      console.log(`Successfully processed one-time payment for session: ${session.id}`);
    }
  }

  // Handle subscriptions
  if (session.mode === 'subscription' && session.subscription) {
    await syncSubscriptionFromStripe(customerId);
  }
}

async function handleRoomBookingPayment(session: Stripe.Checkout.Session, bookingId: string) {
  console.log(`Processing room booking payment for booking: ${bookingId}`);

  try {
    // Update the booking status to confirmed
    const { error: bookingError } = await supabase
      .from('room_bookings')
      .update({
        stripe_payment_intent_id: session.payment_intent as string,
        status: 'confirmed'
      })
      .eq('id', bookingId);

    if (bookingError) {
      console.error('Error updating booking status:', bookingError);
      throw bookingError;
    }

    // Also create an order record for the room booking
    const { error: orderError } = await supabase.from('stripe_orders').upsert({
      checkout_session_id: session.id,
      payment_intent_id: session.payment_intent as string,
      customer_id: session.customer as string,
      amount_subtotal: session.amount_subtotal,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      status: 'completed',
    }, {
      onConflict: 'checkout_session_id'
    });

    if (orderError) {
      console.error('Error inserting room booking order:', orderError);
      throw orderError;
    }

    // Send confirmation email
    await sendBookingConfirmationEmail(bookingId, session);

    console.log(`Successfully confirmed room booking: ${bookingId}`);
  } catch (error) {
    console.error(`Failed to process room booking payment for ${bookingId}:`, error);
    throw error;
  }
}

async function sendBookingConfirmationEmail(bookingId: string, session: Stripe.Checkout.Session) {
  try {
    // Get booking details to extract customer information
    const { data: booking, error: bookingError } = await supabase
      .from('room_bookings')
      .select('customer_email, customer_name')
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error('Could not fetch booking details for email:', bookingError);
      return;
    }

    // Call the email confirmation function
    const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-booking-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      },
      body: JSON.stringify({
        bookingId: bookingId,
        customerEmail: booking.customer_email,
        customerName: booking.customer_name,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Failed to send confirmation email:', errorData);
    } else {
      console.log(`✅ Confirmation email sent for booking ${bookingId}`);
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw here - we don't want email failures to break the payment processing
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment intent succeeded: ${paymentIntent.id}`);
  
  // Update order status if it exists
  const { error } = await supabase
    .from('stripe_orders')
    .update({ 
      payment_status: 'paid',
      status: 'completed' 
    })
    .eq('payment_intent_id', paymentIntent.id);

  if (error) {
    console.error('Error updating order status:', error);
  }

  // Also update room booking if it exists
  const { error: bookingError } = await supabase
    .from('room_bookings')
    .update({ 
      status: 'confirmed' 
    })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  if (bookingError) {
    console.error('Error updating room booking status:', bookingError);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  await syncSubscriptionFromStripe(customerId);
}

async function syncSubscriptionFromStripe(customerId: string) {
  try {
    console.log(`Syncing subscription for customer: ${customerId}`);

    // Fetch latest subscription data from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.log(`No subscriptions found for customer: ${customerId}`);
      
      const { error } = await supabase.from('stripe_subscriptions').upsert({
        customer_id: customerId,
        subscription_status: 'not_started',
      }, {
        onConflict: 'customer_id',
      });

      if (error) {
        console.error('Error updating subscription status:', error);
        throw error;
      }
      return;
    }

    // Assumes that a customer can only have a single subscription
    const subscription = subscriptions.data[0];

    // Store subscription state
    const { error } = await supabase.from('stripe_subscriptions').upsert({
      customer_id: customerId,
      subscription_id: subscription.id,
      price_id: subscription.items.data[0].price.id,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
        ? {
            payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
            payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
          }
        : {}),
      subscription_status: subscription.status,
      status: subscription.status,
    }, {
      onConflict: 'customer_id',
    });

    if (error) {
      console.error('Error syncing subscription:', error);
      throw error;
    }

    console.log(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}