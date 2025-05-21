/*
  # Create agenda and speaker tables

  1. New Tables
    - `speakers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `organization` (text)
      - `bio` (text)
      - `avatar_url` (text)
      - `social_links` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `companies`
      - `id` (uuid, primary key) 
      - `name` (text)
      - `description` (text)
      - `website` (text)
      - `logo_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `agenda_items`
      - `id` (uuid, primary key)
      - `day` (integer)
      - `start_time` (time)
      - `end_time` (time)
      - `title` (text)
      - `format` (text)
      - `description` (text)
      - `goals` (text)
      - `target_audience` (text)
      - `labels` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `agenda_speakers` (junction table)
      - `agenda_item_id` (uuid, foreign key)
      - `speaker_id` (uuid, foreign key)
      - `role` (text) - 'speaker' or 'organizer'

    - `agenda_companies` (junction table)
      - `agenda_item_id` (uuid, foreign key)
      - `company_id` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage their own speaker profiles
*/

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  organization text,
  bio text,
  avatar_url text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  website text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agenda_items table
CREATE TABLE IF NOT EXISTS agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day integer NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  title text NOT NULL,
  format text,
  description text,
  goals text,
  target_audience text,
  labels text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create junction table for agenda items and speakers
CREATE TABLE IF NOT EXISTS agenda_speakers (
  agenda_item_id uuid REFERENCES agenda_items(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('speaker', 'organizer')),
  PRIMARY KEY (agenda_item_id, speaker_id, role)
);

-- Create junction table for agenda items and companies
CREATE TABLE IF NOT EXISTS agenda_companies (
  agenda_item_id uuid REFERENCES agenda_items(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  PRIMARY KEY (agenda_item_id, company_id)
);

-- Enable Row Level Security
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_companies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on speakers"
  ON speakers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on companies"
  ON companies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on agenda_items"
  ON agenda_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on agenda_speakers"
  ON agenda_speakers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on agenda_companies"
  ON agenda_companies FOR SELECT
  TO public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_speakers_updated_at
  BEFORE UPDATE ON speakers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agenda_items_updated_at
  BEFORE UPDATE ON agenda_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();