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

interface BookingConfirmationRequest {
  bookingId: string;
  customerEmail: string;
  customerName: string;
}

interface BookingDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_amount: number;
  status: string;
  created_at: string;
  room: {
    name: string;
    description: string;
    seating_capacity: number;
    amenities: string[];
  };
}

function generateConfirmationEmailHTML(booking: BookingDetails): string {
  const bookingDate = new Date(booking.booking_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-CH', {
      style: 'currency',
      currency: 'CHF',
    }).format(amount / 100);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Meeting Room Booking Confirmation</title>
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
        .confirmation-badge {
          background: #10b060;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          display: inline-block;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .booking-details {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin: 12px 0;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
          border-bottom: none;
          font-weight: bold;
          font-size: 18px;
          color: #18181b;
          background: #18181b;
          color: white;
          margin: 20px -20px -20px -20px;
          padding: 15px 20px;
          border-radius: 0 0 8px 8px;
        }
        .label {
          font-weight: 600;
          color: #666;
        }
        .value {
          color: #333;
          text-align: right;
        }
        .room-info {
          background: #f0faf5;
          border: 1px solid #10b060;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .room-title {
          font-weight: bold;
          color: #10b060;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .amenity {
          background: #e8f5e8;
          color: #10b060;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        .important-info {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .important-info h3 {
          margin: 0 0 10px 0;
          color: #856404;
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
          color: #10b060;
          text-decoration: none;
        }
        @media (max-width: 600px) {
          .detail-row {
            flex-direction: column;
            gap: 4px;
          }
          .value {
            text-align: left;
            font-weight: bold;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p>Global Digital Collaboration Conference (GDC25)</p>
        </div>

        <div class="content">
          <div class="confirmation-badge">
            ✓ Payment Successful
          </div>

          <p>Dear ${booking.customer_name},</p>
          
          <p>Thank you for your payment! Your meeting room booking has been confirmed for the Global Digital Collaboration Conference.</p>

          <div class="room-info">
            <div class="room-title">${booking.room.name}</div>
            <p>${booking.room.description || 'Premium meeting room with modern amenities'}</p>
            <div class="detail-row">
              <span class="label">Capacity:</span>
              <span class="value">${booking.room.seating_capacity} people</span>
            </div>
            ${booking.room.amenities && booking.room.amenities.length > 0 ? `
            <div class="amenities">
              ${booking.room.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
            </div>
            ` : ''}
          </div>

          <div class="booking-details">
            <h3 style="margin-top: 0; color: #18181b;">Booking Details</h3>
            <div class="detail-row">
              <span class="label">Booking ID:</span>
              <span class="value">${booking.id}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${bookingDate}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${formatTime(booking.start_time)} - ${formatTime(booking.end_time)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Duration:</span>
              <span class="value">${booking.duration_hours} hour${booking.duration_hours > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Paid:</span>
              <span class="value">${formatPrice(booking.total_amount)}</span>
            </div>
          </div>

          <div class="important-info">
            <h3>Important Information</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Please arrive 5 minutes before your scheduled time</li>
              <li>The room will be available exactly during your booked time slot</li>
              <li>For any changes or questions, contact our support team</li>
              <li>Conference venue: Centre International de Conférences Genève (CICG)</li>
            </ul>
          </div>

          <p>We look forward to seeing you at the Global Digital Collaboration Conference!</p>
          
          <p>Best regards,<br>
          <strong>GDC25 Team</strong></p>
        </div>

        <div class="footer">
          <p><strong>Global Digital Collaboration Conference (GDC25)</strong><br>
          July 1-2, 2025 • Geneva, Switzerland</p>
          
          <p>Need help? Contact us at <a href="mailto:info@globaldigitalcollaboration.org">info@globaldigitalcollaboration.org</a></p>
          
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendEmailWithResend(to: string, subject: string, htmlContent: string): Promise<{ success: boolean; error?: string; method?: string }> {
  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Subject: ${subject}`);

  // Check if we have the Resend API key
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  console.log(`🔑 Resend API Key available: ${resendApiKey ? 'Yes' : 'No'}`);

  if (!resendApiKey) {
    console.error('❌ RESEND_API_KEY not found in environment variables');
    return { success: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    // Use direct Resend API call with the correct domain and reply-to address
    console.log('📤 Sending email via direct Resend API...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GDC25 Conference <noreply@gc25.trustsquare.com>',
        to: [to],
        subject: subject,
        html: htmlContent,
        reply_to: 'info@globaldigitalcollaboration.org'
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
      console.error('❌ Resend API error:', errorData);
      return { 
        success: false, 
        error: `Resend API error: ${errorData.message || 'Unknown error'}`,
        method: 'direct_api'
      };
    }

    const result = JSON.parse(responseText);
    console.log('✅ Email sent successfully via Resend API:', result);
    return { success: true, method: 'direct_api' };

  } catch (error) {
    console.error('❌ Error sending email via Resend:', error);
    return { 
      success: false, 
      error: `Network error: ${error.message}`,
      method: 'direct_api'
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

    const { bookingId, customerEmail, customerName }: BookingConfirmationRequest = await req.json();

    if (!bookingId || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Booking ID and customer email are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`📧 Processing confirmation email for booking ${bookingId} to ${customerEmail}`);

    // Get booking details with room information
    const { data: booking, error: bookingError } = await supabase
      .from('room_bookings')
      .select(`
        *,
        room:meeting_rooms(*)
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error('❌ Booking not found:', bookingError);
      return new Response(
        JSON.stringify({ error: 'Booking not found', details: bookingError }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`📋 Booking found: ${booking.id}, Status: ${booking.status}, Room: ${booking.room?.name}`);

    // Only send emails for confirmed bookings
    if (booking.status !== 'confirmed') {
      console.warn(`⚠️ Booking ${bookingId} has status: ${booking.status} - skipping email`);
      return new Response(
        JSON.stringify({ 
          error: 'Booking is not confirmed yet',
          status: booking.status,
          message: 'Email will be sent when booking is confirmed after payment'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate email content
    const emailSubject = `Meeting Room Booking Confirmation - ${booking.room.name} | GDC25`;
    const emailHTML = generateConfirmationEmailHTML(booking as BookingDetails);

    // Send confirmation email using Resend
    const emailResult = await sendEmailWithResend(customerEmail, emailSubject, emailHTML);

    if (!emailResult.success) {
      console.error(`❌ Failed to send confirmation email for booking ${bookingId}: ${emailResult.error}`);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send confirmation email',
          details: emailResult.error,
          method: emailResult.method,
          booking: {
            id: booking.id,
            status: booking.status,
            customer_email: booking.customer_email
          }
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`✅ Confirmation email sent successfully for booking ${bookingId} to ${customerEmail}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Confirmation email sent successfully',
        bookingId: bookingId,
        emailSent: true,
        method: emailResult.method,
        customerEmail: customerEmail,
        replyTo: 'info@globaldigitalcollaboration.org'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('❌ Error in send-booking-confirmation function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error while sending confirmation email',
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