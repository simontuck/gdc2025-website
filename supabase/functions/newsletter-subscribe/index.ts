import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
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

interface SubscribeRequest {
  email: string;
}

function generateConfirmationEmailHTML(email: string, confirmationToken: string): string {
  const confirmationUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/newsletter-confirm?token=${confirmationToken}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Subscription - GDC Newsletter</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: #18181b;
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 30px 20px;
        }
        .confirmation-button {
          display: inline-block;
          background: #18181b;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
        }
        .confirmation-button:hover {
          background: #27272a;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #e9ecef;
          color: #666;
          font-size: 14px;
        }
        .footer a {
          color: #18181b;
          text-decoration: none;
        }
        .benefits {
          background: #f0faf5;
          border: 1px solid #10b060;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .benefits h3 {
          color: #10b060;
          margin-top: 0;
        }
        .benefits ul {
          margin: 0;
          padding-left: 20px;
        }
        .benefits li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Confirm Your Subscription</h1>
          <p>Global Digital Collaboration Conference Newsletter</p>
        </div>

        <div class="content">
          <p>Hello,</p>
          
          <p>Thank you for subscribing to the Global Digital Collaboration Conference newsletter! To complete your subscription, please confirm your email address by clicking the button below:</p>

          <div style="text-align: center;">
            <a href="${confirmationUrl}" class="confirmation-button">
              Confirm My Subscription
            </a>
          </div>

          <div class="benefits">
            <h3>What you'll receive:</h3>
            <ul>
              <li><strong>Book of Proceedings</strong> - Release notification in September 2025</li>
              <li><strong>GDC 2026 Announcements</strong> - Early bird registration and updates</li>
              <li><strong>Conference News</strong> - Digital collaboration updates and insights</li>
            </ul>
          </div>

          <p>If you didn't request this subscription, you can safely ignore this email.</p>
          
          <p>Best regards,<br>
          <strong>GDC Team</strong></p>
        </div>

        <div class="footer">
          <p><strong>Global Digital Collaboration Conference</strong><br>
          Fostering wallets, credentials and trusted infrastructure</p>
          
          <p>If you have any questions, contact us at <a href="mailto:info@globaldigitalcollaboration.org">info@globaldigitalcollaboration.org</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmailWithResend(to: string, subject: string, htmlContent: string): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not found in environment variables');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GDC Newsletter <newsletter@gc25.trustsquare.com>',
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: 'info@globaldigitalcollaboration.org'
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      console.error('Resend API error:', errorData);
      return { 
        success: false, 
        error: `Email service error: ${errorData.message || 'Unknown error'}`
      };
    }

    const result = JSON.parse(responseText);
    console.log('Confirmation email sent successfully:', result);
    return { success: true };

  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return { 
      success: false, 
      error: `Network error: ${error.message}`
    };
  }
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

    const { email }: SubscribeRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email address is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const { data: existingSubscription, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('email, status')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing subscription:', checkError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (existingSubscription) {
      if (existingSubscription.status === 'confirmed') {
        return new Response(
          JSON.stringify({ error: 'Email is already subscribed' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } else if (existingSubscription.status === 'pending') {
        return new Response(
          JSON.stringify({ error: 'Confirmation email already sent. Please check your inbox.' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } else if (existingSubscription.status === 'unsubscribed') {
        // Reactivate the subscription
        const { data: reactivatedSubscription, error: reactivateError } = await supabase
          .from('newsletter_subscriptions')
          .update({ 
            status: 'pending',
            confirmation_token: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            confirmed_at: null
          })
          .eq('email', normalizedEmail)
          .select()
          .single();

        if (reactivateError) {
          console.error('Error reactivating subscription:', reactivateError);
          return new Response(
            JSON.stringify({ error: 'Failed to reactivate subscription' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        // Send confirmation email for reactivated subscription
        const emailSubject = 'Confirm Your Newsletter Subscription - GDC';
        const emailHTML = generateConfirmationEmailHTML(normalizedEmail, reactivatedSubscription.confirmation_token);
        
        const emailResult = await sendEmailWithResend(normalizedEmail, emailSubject, emailHTML);
        
        if (!emailResult.success) {
          console.error('Failed to send reactivation confirmation email:', emailResult.error);
          return new Response(
            JSON.stringify({ error: 'Failed to send confirmation email' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            message: 'Subscription reactivated. Please check your email to confirm.'
          }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Create new subscription
    const { data: newSubscription, error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: normalizedEmail,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating subscription:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create subscription' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send confirmation email
    const emailSubject = 'Confirm Your Newsletter Subscription - GDC';
    const emailHTML = generateConfirmationEmailHTML(normalizedEmail, newSubscription.confirmation_token);
    
    const emailResult = await sendEmailWithResend(normalizedEmail, emailSubject, emailHTML);
    
    if (!emailResult.success) {
      console.error('Failed to send confirmation email:', emailResult.error);
      
      // Delete the subscription since we couldn't send the confirmation email
      await supabase
        .from('newsletter_subscriptions')
        .delete()
        .eq('id', newSubscription.id);

      return new Response(
        JSON.stringify({ error: 'Failed to send confirmation email' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Subscription created. Please check your email to confirm.'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in newsletter-subscribe function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});