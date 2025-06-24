import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { Product, formatPrice } from '../stripe-config';

interface PaymentButtonProps {
  product: Product;
  customerEmail?: string;
  customerName?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  product,
  customerEmail,
  customerName,
  className = '',
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      console.log('Initiating payment for product:', product);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          priceId: product.priceId,
          customerEmail,
          customerName,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        }),
      });

      console.log('Checkout response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Checkout error response:', errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to create checkout session`);
      }

      const { url, sessionId } = await response.json();
      console.log('Checkout session created:', { sessionId, url });
      
      if (url) {
        onSuccess?.();
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Payment failed. Please try again.';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5 mr-2" />
          Pay {formatPrice(product.price, product.currency)}
        </>
      )}
    </button>
  );
};

export default PaymentButton;