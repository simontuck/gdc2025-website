export interface Product {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

// Production price IDs - create these in your Stripe live dashboard
export const products: Product[] = [
  {
    priceId: 'price_live_your_production_price_id', // Replace with actual live price ID
    name: 'GC25 Meeting Room',
    description: 'Access to premium meeting room facilities during the Global Digital Collaboration Conference',
    mode: 'payment',
    price: 5000, // 50.00 CHF in cents
    currency: 'chf'
  }
];

// Test mode price IDs (keep for development)
export const testProducts: Product[] = [
  {
    priceId: 'price_test_meeting_room', // Your existing test price ID
    name: 'GC25 Meeting Room (Test)',
    description: 'Test payment for meeting room access during the Global Digital Collaboration Conference',
    mode: 'payment',
    price: 5000, // 50.00 CHF in cents
    currency: 'chf'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  const allProducts = [...products, ...testProducts];
  return allProducts.find(product => product.priceId === priceId);
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-CH', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

// Function to get the appropriate products based on environment
export const getProducts = (): Product[] => {
  const isTestMode = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_test_');
  return isTestMode ? testProducts : products;
};