import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'GDC25 Meeting Room Booking',
    version: '1.0.0',
  },
});

interface BookingCheckoutRequest {
  bookingId: string;
  customerEmail?: string;
  customerName?: string;
  successUrl?: string;
  cancelUrl?: string;
}

Deno.serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { bookingId, customerEmail, customerName, successUrl, cancelUrl }: BookingCheckoutRequest = await req.json();

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Booking ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from('room_bookings')
      .select(`
        *,
        room:meeting_rooms(*)
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create or retrieve Stripe customer
    let customer: Stripe.Customer | null = null;
    
    if (customerEmail || booking.customer_email) {
      const email = customerEmail || booking.customer_email;
      
      // Check if customer already exists
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: email,
          name: customerName || booking.customer_name,
        });

        // Store customer in our database
        await supabase.from('stripe_customers').upsert({
          customer_id: customer.id,
          email: customer.email,
          name: customer.name,
        }, {
          onConflict: 'customer_id'
        });
      }
    }

    // Check if we're in test mode
    const isTestMode = stripeSecret.startsWith('sk_test_');
    
    let priceId: string;
    
    if (isTestMode) {
      // For test mode, create a dynamic price each time
      // In production, you might want to use pre-created prices
      const price = await stripe.prices.create({
        unit_amount: booking.total_amount,
        currency: 'chf',
        product_data: {
          name: `[TEST] Meeting Room: ${booking.room.name}`,
          description: `${booking.duration_hours} hour${booking.duration_hours > 1 ? 's' : ''} on ${booking.booking_date} from ${booking.start_time}`,
          metadata: {
            booking_id: booking.id,
            room_id: booking.room_id,
            booking_date: booking.booking_date,
            start_time: booking.start_time,
            duration_hours: booking.duration_hours.toString(),
            test_mode: 'true',
          },
        },
      });
      priceId = price.id;
    } else {
      // For production, create dynamic prices as before
      const price = await stripe.prices.create({
        unit_amount: booking.total_amount,
        currency: 'chf',
        product_data: {
          name: `Meeting Room: ${booking.room.name}`,
          description: `${booking.duration_hours} hour${booking.duration_hours > 1 ? 's' : ''} on ${booking.booking_date} from ${booking.start_time}`,
          metadata: {
            booking_id: booking.id,
            room_id: booking.room_id,
            booking_date: booking.booking_date,
            start_time: booking.start_time,
            duration_hours: booking.duration_hours.toString(),
          },
        },
      });
      priceId = price.id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer?.id,
      customer_email: !customer ? (customerEmail || booking.customer_email) : undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/meeting-rooms?cancelled=${booking.id}`,
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      metadata: {
        booking_id: booking.id,
        room_id: booking.room_id,
        booking_date: booking.booking_date,
        start_time: booking.start_time,
        duration_hours: booking.duration_hours.toString(),
        test_mode: isTestMode ? 'true' : 'false',
      },
    });

    // Update booking with Stripe session ID
    await supabase
      .from('room_bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', booking.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url,
        testMode: isTestMode
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error creating booking checkout session:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});