export interface Product {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const products: Product[] = [
  {
    priceId: 'price_1RdUgqDv9Z2EzZbMgzJKegrA', // Replace with your actual Stripe price ID
    name: 'GC25 Meeting Room',
    description: 'Access to premium meeting room facilities during the Global Digital Collaboration Conference',
    mode: 'payment',
    price: 5000, // 50.00 CHF in cents
    currency: 'chf'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-CH', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};