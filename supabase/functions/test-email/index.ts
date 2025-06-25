import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface TestEmailRequest {
  to: string;
  subject?: string;
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

    const { to, subject = 'Test Email from GDC25' }: TestEmailRequest = await req.json();

    if (!to) {
      return new Response(
        JSON.stringify({ error: 'Email address is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`🧪 Testing email to: ${to}`);

    // Check environment variables
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    
    console.log(`🔑 Environment check:`);
    console.log(`   - RESEND_API_KEY: ${resendApiKey ? 'Set' : 'Missing'}`);
    console.log(`   - SUPABASE_URL: ${supabaseUrl ? 'Set' : 'Missing'}`);

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'RESEND_API_KEY not configured',
          environment: {
            resend_api_key: false,
            supabase_url: !!supabaseUrl
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Simple test email HTML
    const testEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Test Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #18181b; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Test Email</h1>
            <p>GDC25 Email System Test</p>
          </div>
          <div class="content">
            <p>This is a test email from the GDC25 booking confirmation system.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Recipient:</strong> ${to}</p>
            <p>If you received this email, the email system is working correctly!</p>
            <p><strong>Domain:</strong> gc25.trustsquare.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send test email with the correct domain
    console.log('📤 Sending test email via Resend API...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GDC25 Test <noreply@gc25.trustsquare.com>',
        to: [to],
        subject: subject,
        html: testEmailHTML,
        reply_to: 'rooms@gc25.trustsquare.com'
      }),
    });

    const responseText = await response.text();
    console.log(`📧 Resend API Response Status: ${response.status}`);
    console.log(`📧 Resend API Response: ${responseText}`);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Failed to send test email',
          details: errorData,
          status: response.status
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const result = JSON.parse(responseText);
    console.log('✅ Test email sent successfully:', result);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Test email sent successfully',
        to: to,
        subject: subject,
        from_domain: 'gc25.trustsquare.com',
        resend_response: result,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('❌ Error in test-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Internal server error',
        details: error.message,
        stack: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});