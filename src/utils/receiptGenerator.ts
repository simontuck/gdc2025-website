export interface ReceiptData {
  orderNumber: string;
  sessionId: string;
  bookingId?: string;
  productName: string;
  amount: string;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  paymentDate: string;
  paymentMethod?: string;
  conferenceDate?: string;
  roomDetails?: {
    name: string;
    date: string;
    time: string;
    duration: string;
  };
}

export function generateReceiptHTML(data: ReceiptData): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Receipt - ${data.orderNumber}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: #fff;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #18181b;
          padding-bottom: 20px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #18181b;
          margin-bottom: 10px;
        }
        .receipt-title {
          font-size: 28px;
          font-weight: bold;
          color: #18181b;
          margin: 20px 0;
        }
        .receipt-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
          border-bottom: none;
          font-weight: bold;
          font-size: 18px;
          color: #18181b;
        }
        .label {
          font-weight: 600;
          color: #666;
        }
        .value {
          color: #333;
        }
        .total-row {
          background: #18181b;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .conference-details {
          background: #f0faf5;
          border: 1px solid #10b060;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .conference-title {
          font-weight: bold;
          color: #10b060;
          margin-bottom: 10px;
        }
        @media print {
          body { margin: 0; padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Global Digital Collaboration Conference</div>
        <div style="color: #666; font-size: 14px;">GDC25 • July 1-2, 2025 • Geneva, Switzerland</div>
      </div>

      <div class="receipt-title">Payment Receipt</div>

      <div class="receipt-info">
        <div class="info-row">
          <span class="label">Receipt Number:</span>
          <span class="value">${data.orderNumber}</span>
        </div>
        <div class="info-row">
          <span class="label">Payment Date:</span>
          <span class="value">${data.paymentDate}</span>
        </div>
        <div class="info-row">
          <span class="label">Transaction ID:</span>
          <span class="value">${data.sessionId}</span>
        </div>
        ${data.customerName ? `
        <div class="info-row">
          <span class="label">Customer Name:</span>
          <span class="value">${data.customerName}</span>
        </div>
        ` : ''}
        ${data.customerEmail ? `
        <div class="info-row">
          <span class="label">Email:</span>
          <span class="value">${data.customerEmail}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="label">Product/Service:</span>
          <span class="value">${data.productName}</span>
        </div>
        ${data.paymentMethod ? `
        <div class="info-row">
          <span class="label">Payment Method:</span>
          <span class="value">${data.paymentMethod}</span>
        </div>
        ` : ''}
      </div>

      ${data.roomDetails ? `
      <div class="conference-details">
        <div class="conference-title">Meeting Room Booking Details</div>
        <div class="info-row">
          <span class="label">Room:</span>
          <span class="value">${data.roomDetails.name}</span>
        </div>
        <div class="info-row">
          <span class="label">Date:</span>
          <span class="value">${data.roomDetails.date}</span>
        </div>
        <div class="info-row">
          <span class="label">Time:</span>
          <span class="value">${data.roomDetails.time}</span>
        </div>
        <div class="info-row">
          <span class="label">Duration:</span>
          <span class="value">${data.roomDetails.duration}</span>
        </div>
      </div>
      ` : ''}

      <div class="total-row">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 18px;">Total Amount Paid:</span>
          <span style="font-size: 24px; font-weight: bold;">${data.amount}</span>
        </div>
      </div>

      <div class="footer">
        <p><strong>Thank you for your payment!</strong></p>
        <p>Global Digital Collaboration Conference (GDC25)<br>
        July 1-2, 2025 • Geneva, Switzerland</p>
        <p>For questions about this receipt, please contact:<br>
        <a href="mailto:info@globaldigitalcollaboration.org">info@globaldigitalcollaboration.org</a></p>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          Receipt generated on ${currentDate}<br>
          This is an official receipt for your payment.
        </p>
      </div>
    </body>
    </html>
  `;
}

export function downloadReceipt(data: ReceiptData): void {
  const html = generateReceiptHTML(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download the receipt');
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for content to load, then trigger print dialog
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Close the window after printing (user can cancel)
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 250);
  };
}

// Alternative method using blob and download link
export function downloadReceiptAsPDF(data: ReceiptData): void {
  const html = generateReceiptHTML(data);
  
  // Create a blob with the HTML content
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary download link
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${data.orderNumber}.html`;
  link.style.display = 'none';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
}