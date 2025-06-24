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

    const { priceId, customerEmail, customerName, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Price ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create or retrieve Stripe customer
    let customer: Stripe.Customer | null = null;
    
    if (customerEmail) {
      // Check if customer already exists
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
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

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer?.id,
      customer_email: !customer ? customerEmail : undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/payment-cancelled`,
      automatic_tax: { enabled: false },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CH', 'DE', 'FR', 'IT', 'AT', 'US', 'GB', 'CA'],
      },
      metadata: {
        priceId: priceId,
      },
    });

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