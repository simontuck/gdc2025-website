import React from 'react';
import { Check } from 'lucide-react';
import { Product, formatPrice } from '../stripe-config';
import PaymentButton from './PaymentButton';

interface ProductCardProps {
  product: Product;
  customerEmail?: string;
  customerName?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  customerEmail,
  customerName,
  onPaymentSuccess,
  onPaymentError
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-primary-600">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.mode === 'subscription' && (
            <span className="text-gray-500 ml-2">/month</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span>Instant confirmation</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span>24/7 support</span>
        </div>
      </div>

      <PaymentButton
        product={product}
        customerEmail={customerEmail}
        customerName={customerName}
        onSuccess={onPaymentSuccess}
        onError={onPaymentError}
        className="w-full"
      />
    </div>
  );
};

export default ProductCard;