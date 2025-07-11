import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

function generateUnsubscribeHTML(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Unsubscribed - GDC Newsletter</title>
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
          margin: 50px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: #6c757d;
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 30px 20px;
          text-align: center;
        }
        .icon {
          width: 64px;
          height: 64px;
          background: #6c757d;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon svg {
          width: 32px;
          height: 32px;
          color: white;
        }
        .button {
          display: inline-block;
          background: #18181b;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin: 20px 0;
        }
        .button:hover {
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Successfully Unsubscribed</h1>
        </div>

        <div class="content">
          <div class="icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2>You've been unsubscribed</h2>
          
          <p>You have been successfully removed from the GDC newsletter mailing list.</p>
          
          <p>We're sorry to see you go! If you change your mind, you can always subscribe again on our website.</p>

          <a href="https://globaldigitalcollaboration.org" class="button">
            Return to Conference Website
          </a>
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

function generateErrorHTML(message: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Unsubscribe Error - GDC Newsletter</title>
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
          margin: 50px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: #dc3545;
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 30px 20px;
          text-align: center;
        }
        .error-icon {
          width: 64px;
          height: 64px;
          background: #dc3545;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-icon svg {
          width: 32px;
          height: 32px;
          color: white;
        }
        .button {
          display: inline-block;
          background: #18181b;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin: 20px 0;
        }
        .button:hover {
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Unsubscribe Error</h1>
        </div>

        <div class="content">
          <div class="error-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          
          <h2>Something went wrong</h2>
          
          <p>${message}</p>

          <a href="https://globaldigitalcollaboration.org" class="button">
            Return to Conference Website
          </a>
        </div>

        <div class="footer">
          <p>If you continue to have issues, please contact us at <a href="mailto:info@globaldigitalcollaboration.org">info@globaldigitalcollaboration.org</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'GET') {
      return new Response(
        generateErrorHTML('Invalid request method'),
        { 
          status: 405, 
          headers: { 'Content-Type': 'text/html' } 
        }
      );
    }

    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        generateErrorHTML('Unsubscribe token is missing'),
        { 
          status: 400, 
          headers: { 'Content-Type': 'text/html' } 
        }
      );
    }

    // Find subscription by unsubscribe token
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('unsubscribe_token', token)
      .neq('status', 'unsubscribed')
      .single();

    if (findError || !subscription) {
      console.error('Subscription not found or already unsubscribed:', findError);
      return new Response(
        generateErrorHTML('Invalid unsubscribe link or already unsubscribed'),
        { 
          status: 404, 
          headers: { 'Content-Type': 'text/html' } 
        }
      );
    }

    // Unsubscribe the user
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'unsubscribed'
      })
      .eq('id', subscription.id);

    if (updateError) {
      console.error('Error unsubscribing user:', updateError);
      return new Response(
        generateErrorHTML('Failed to unsubscribe. Please try again.'),
        { 
          status: 500, 
          headers: { 'Content-Type': 'text/html' } 
        }
      );
    }

    console.log(`Newsletter unsubscribe successful for: ${subscription.email}`);

    return new Response(
      generateUnsubscribeHTML(),
      { 
        status: 200, 
        headers: { 'Content-Type': 'text/html' } 
      }
    );

  } catch (error: any) {
    console.error('Error in newsletter-unsubscribe function:', error);
    return new Response(
      generateErrorHTML('An unexpected error occurred. Please try again later.'),
      { 
        status: 500, 
        headers: { 'Content-Type': 'text/html' } 
      }
    );
  }
});