/*
  # Create Stripe integration tables

  1. New Tables
    - `stripe_customers`
      - `id` (uuid, primary key)
      - `customer_id` (text, unique) - Stripe customer ID
      - `email` (text)
      - `name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `stripe_subscriptions`
      - `id` (uuid, primary key)
      - `customer_id` (text, foreign key to stripe_customers)
      - `subscription_id` (text, unique) - Stripe subscription ID
      - `price_id` (text)
      - `status` (text)
      - `current_period_start` (bigint)
      - `current_period_end` (bigint)
      - `cancel_at_period_end` (boolean)
      - `payment_method_brand` (text)
      - `payment_method_last4` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `stripe_orders`
      - `id` (uuid, primary key)
      - `checkout_session_id` (text, unique)
      - `payment_intent_id` (text)
      - `customer_id` (text, foreign key to stripe_customers)
      - `amount_subtotal` (bigint)
      - `amount_total` (bigint)
      - `currency` (text)
      - `payment_status` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their own data
    - Add policies for service role to manage all data

  3. Indexes
    - Add indexes for better query performance
*/

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text UNIQUE NOT NULL,
  email text,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL REFERENCES stripe_customers(customer_id) ON DELETE CASCADE,
  subscription_id text UNIQUE,
  price_id text,
  subscription_status text,
  current_period_start bigint,
  current_period_end bigint,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_brand text,
  payment_method_last4 text,
  status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stripe_orders table
CREATE TABLE IF NOT EXISTS stripe_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_session_id text UNIQUE NOT NULL,
  payment_intent_id text,
  customer_id text NOT NULL REFERENCES stripe_customers(customer_id) ON DELETE CASCADE,
  amount_subtotal bigint,
  amount_total bigint,
  currency text,
  payment_status text,
  status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for stripe_customers
CREATE POLICY "Users can read their own customer data"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Service role can manage all customer data"
  ON stripe_customers FOR ALL
  TO service_role
  USING (true);

-- Create policies for stripe_subscriptions
CREATE POLICY "Users can read their own subscription data"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id FROM stripe_customers 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Service role can manage all subscription data"
  ON stripe_subscriptions FOR ALL
  TO service_role
  USING (true);

-- Create policies for stripe_orders
CREATE POLICY "Users can read their own order data"
  ON stripe_orders FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id FROM stripe_customers 
      WHERE email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Service role can manage all order data"
  ON stripe_orders FOR ALL
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stripe_customers_email ON stripe_customers(email);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer_id ON stripe_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_subscription_id ON stripe_subscriptions(subscription_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_customer_id ON stripe_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_orders_checkout_session_id ON stripe_orders(checkout_session_id);

-- Create triggers for updated_at
CREATE TRIGGER update_stripe_customers_updated_at
  BEFORE UPDATE ON stripe_customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_subscriptions_updated_at
  BEFORE UPDATE ON stripe_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_orders_updated_at
  BEFORE UPDATE ON stripe_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();