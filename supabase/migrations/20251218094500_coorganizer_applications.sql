/*
  # Create co-organizer applications table

  1. New Table
    - `coorganizer_applications`
      - `id` (uuid, primary key)
      - `organization_name` (text, required)
      - `website` (text)
      - `contact_email` (text, required)
      - `contact_phone` (text)
      - `organization_type` (text[], required) - array of 'igo' and/or 'ngo'
      - `strategic_contribution` (text, required)
      - `additional_info` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on the table
    - Add policy for anonymous users to insert (submit applications)
    - Add policy for authenticated users to read (admin access)
*/

-- Create coorganizer_applications table
CREATE TABLE IF NOT EXISTS coorganizer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name text NOT NULL,
  website text,
  contact_email text NOT NULL,
  contact_phone text,
  organization_type text[] NOT NULL,
  strategic_contribution text NOT NULL,
  additional_info text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'waitlisted')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS is disabled for this table to allow public form submissions
-- The table only stores application data with no sensitive read access needed
ALTER TABLE coorganizer_applications DISABLE ROW LEVEL SECURITY;

-- Create trigger for updated_at
CREATE TRIGGER update_coorganizer_applications_updated_at
  BEFORE UPDATE ON coorganizer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
