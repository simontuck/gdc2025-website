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

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecret) {
  console.error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(stripeSecret!, {
  appInfo: {
    name: 'GDC25 Conference',
    version: '1.0.0',
  },
});

interface CheckoutRequest {
  priceId: string;
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

    // Check if Stripe is properly configured
    if (!stripeSecret) {
      console.error('Stripe secret key is missing');
      return new Response(
        JSON.stringify({ 
          error: 'Payment system not configured',
          details: 'Stripe secret key is missing' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { priceId, customerEmail, customerName, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    console.log('Creating checkout session with:', { priceId, customerEmail, customerName });

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Price ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify the price exists in Stripe
    try {
      await stripe.prices.retrieve(priceId);
    } catch (priceError: any) {
      console.error('Price verification failed:', priceError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid price ID',
          details: priceError.message 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create or retrieve Stripe customer
    let customer: Stripe.Customer | null = null;
    
    if (customerEmail) {
      try {
        // Check if customer already exists
        const existingCustomers = await stripe.customers.list({
          email: customerEmail,
          limit: 1,
        });

        if (existingCustomers.data.length > 0) {
          customer = existingCustomers.data[0];
          console.log('Found existing customer:', customer.id);
        } else {
          // Create new customer
          customer = await stripe.customers.create({
            email: customerEmail,
            name: customerName,
          });
          console.log('Created new customer:', customer.id);

          // Store customer in our database
          const { error: dbError } = await supabase.from('stripe_customers').upsert({
            customer_id: customer.id,
            email: customer.email,
            name: customer.name,
          }, {
            onConflict: 'customer_id'
          });

          if (dbError) {
            console.error('Failed to store customer in database:', dbError);
            // Don't fail the request, just log the error
          }
        }
      } catch (customerError: any) {
        console.error('Customer creation/retrieval failed:', customerError);
        // Continue without customer - Stripe will handle email collection
      }
    }

    // Get the origin for URLs
    const origin = req.headers.get('origin') || 'https://globaldigitalcollaboration.org';

    // Create checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/payment-cancelled`,
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      metadata: {
        priceId: priceId,
      },
    };

    // Add customer information
    if (customer) {
      sessionParams.customer = customer.id;
    } else if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    // Only add shipping for physical products (skip for digital services)
    // sessionParams.shipping_address_collection = {
    //   allowed_countries: ['CH', 'DE', 'FR', 'IT', 'AT', 'US', 'GB', 'CA'],
    // };

    console.log('Creating Stripe checkout session with params:', {
      ...sessionParams,
      line_items: sessionParams.line_items?.map(item => ({ price: item.price, quantity: item.quantity }))
    });

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('Checkout session created successfully:', session.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    let errorDetails = error.message;

    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid payment request';
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Payment system authentication failed';
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Payment system connection failed';
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: errorDetails,
        type: error.type || 'unknown'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});