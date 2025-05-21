/*
  # Enhanced Conference Schema

  1. Changes
    - Drop existing tables and types
    - Create new organization_type enum
    - Create enhanced tables with additional fields and constraints
    - Add RLS policies and triggers
    - Create performance indexes

  2. New Tables
    - organizations (replaces companies)
    - speakers (enhanced)
    - speaker_organizations (new junction table)
    - agenda_items (enhanced)
    - agenda_speakers (enhanced)
    - agenda_organizations (replaces agenda_companies)

  3. Security
    - Enable RLS on all tables
    - Add public read access policies
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS agenda_companies CASCADE;
DROP TABLE IF EXISTS agenda_speakers CASCADE;
DROP TABLE IF EXISTS agenda_items CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS speakers CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS organization_type CASCADE;

-- Create enum types for organization categories
DO $$ BEGIN
  CREATE TYPE organization_type AS ENUM (
    'intergovernmental',
    'government',
    'standards_body',
    'open_source',
    'ngo',
    'industry',
    'academic',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text,
  type organization_type NOT NULL,
  description text,
  website_url text,
  logo_url text,
  linkedin_url text,
  twitter_url text,
  contact_email text,
  contact_phone text,
  address text,
  country text,
  is_co_organizer boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text,
  email text UNIQUE,
  bio text,
  avatar_url text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  primary_organization_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create speaker_organizations junction table
CREATE TABLE IF NOT EXISTS speaker_organizations (
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  role text NOT NULL,
  start_date date,
  end_date date,
  is_current boolean DEFAULT true,
  PRIMARY KEY (speaker_id, organization_id)
);

-- Create agenda_items table with enhanced fields
CREATE TABLE IF NOT EXISTS agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day integer NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  format text NOT NULL,
  room text,
  capacity integer,
  goals text[],
  target_audience text[],
  prerequisites text,
  materials_url text,
  recording_url text,
  slides_url text,
  status text DEFAULT 'draft',
  labels text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_times CHECK (end_time > start_time),
  CONSTRAINT valid_day CHECK (day > 0),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'confirmed', 'cancelled'))
);

-- Create agenda_speakers junction table with enhanced roles
CREATE TABLE IF NOT EXISTS agenda_speakers (
  agenda_item_id uuid REFERENCES agenda_items(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  role text NOT NULL,
  speaking_order integer,
  notes text,
  confirmed boolean DEFAULT false,
  PRIMARY KEY (agenda_item_id, speaker_id),
  CONSTRAINT valid_role CHECK (role IN ('speaker', 'moderator', 'panelist', 'organizer'))
);

-- Create agenda_organizations junction table
CREATE TABLE IF NOT EXISTS agenda_organizations (
  agenda_item_id uuid REFERENCES agenda_items(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  role text NOT NULL,
  PRIMARY KEY (agenda_item_id, organization_id),
  CONSTRAINT valid_role CHECK (role IN ('organizer', 'sponsor', 'supporter'))
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaker_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_organizations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DO $$ BEGIN
  CREATE POLICY "Allow public read access on organizations"
    ON organizations FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read access on speakers"
    ON speakers FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read access on speaker_organizations"
    ON speaker_organizations FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read access on agenda_items"
    ON agenda_items FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read access on agenda_speakers"
    ON agenda_speakers FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read access on agenda_organizations"
    ON agenda_organizations FOR SELECT
    TO public
    USING (true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$ BEGIN
  CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_speakers_updated_at
    BEFORE UPDATE ON speakers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_agenda_items_updated_at
    BEFORE UPDATE ON agenda_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_speakers_email ON speakers(email);
CREATE INDEX IF NOT EXISTS idx_agenda_items_day ON agenda_items(day);
CREATE INDEX IF NOT EXISTS idx_agenda_items_status ON agenda_items(status);
CREATE INDEX IF NOT EXISTS idx_speaker_organizations_current ON speaker_organizations(is_current);