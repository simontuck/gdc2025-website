/*
  # Newsletter Subscription System

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `status` (text) - pending, confirmed, unsubscribed
      - `confirmation_token` (text, unique)
      - `unsubscribe_token` (text, unique)
      - `confirmed_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policies for public insert and service role management
    - Add indexes for performance

  3. Functions
    - Add trigger to update updated_at timestamp
*/

-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  unsubscribe_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public to insert subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Service role can manage all subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirmation_token ON newsletter_subscriptions(confirmation_token);
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token ON newsletter_subscriptions(unsubscribe_token);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_newsletter_subscriptions_updated_at ON newsletter_subscriptions;
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();