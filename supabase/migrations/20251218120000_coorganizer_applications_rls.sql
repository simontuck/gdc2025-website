/*
  # Enable RLS for coorganizer_applications

  1. Changes
    - Enable RLS on coorganizer_applications table
    - Add policy for anonymous users to INSERT (public form submissions)
    - Add policy for authenticated users to SELECT (admin access)

  2. Security
    - Public can submit applications
    - Only authenticated users can view all applications
*/

-- Enable RLS
ALTER TABLE coorganizer_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert applications
CREATE POLICY "Anyone can submit coorganizer applications"
  ON coorganizer_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all applications
CREATE POLICY "Authenticated users can view all applications"
  ON coorganizer_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Also allow authenticated users to update applications (for status changes)
CREATE POLICY "Authenticated users can update applications"
  ON coorganizer_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
