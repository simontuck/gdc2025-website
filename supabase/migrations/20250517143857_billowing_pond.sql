/*
  # Create agenda tables and policies

  1. New Tables
    - agenda_items: Stores conference agenda items
    - speakers: Stores speaker information
    - agenda_speakers: Junction table for agenda items and speakers

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access

  3. Indexes
    - Day and status indexes for agenda items
    - Email index for speakers
    - Junction table indexes for better join performance
*/

-- Create agenda_items table
CREATE TABLE IF NOT EXISTS agenda_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day integer NOT NULL CHECK (day > 0),
  start_time time NOT NULL,
  end_time time NOT NULL,
  title text NOT NULL,
  format text NOT NULL,
  description text,
  goals text[],
  target_audience text[],
  labels text[],
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (end_time > start_time)
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agenda_speakers junction table
CREATE TABLE IF NOT EXISTS agenda_speakers (
  agenda_item_id uuid REFERENCES agenda_items(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  role text NOT NULL,
  PRIMARY KEY (agenda_item_id, speaker_id)
);

-- Enable RLS
ALTER TABLE agenda_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_speakers ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_items' 
    AND policyname = 'Allow public read access on agenda_items'
  ) THEN
    CREATE POLICY "Allow public read access on agenda_items"
      ON agenda_items FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'speakers' 
    AND policyname = 'Allow public read access on speakers'
  ) THEN
    CREATE POLICY "Allow public read access on speakers"
      ON speakers FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'agenda_speakers' 
    AND policyname = 'Allow public read access on agenda_speakers'
  ) THEN
    CREATE POLICY "Allow public read access on agenda_speakers"
      ON agenda_speakers FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agenda_items_day ON agenda_items(day);
CREATE INDEX IF NOT EXISTS idx_agenda_items_status ON agenda_items(status);
CREATE INDEX IF NOT EXISTS idx_speakers_email ON speakers(email);
CREATE INDEX IF NOT EXISTS idx_agenda_speakers_speaker ON agenda_speakers(speaker_id);
CREATE INDEX IF NOT EXISTS idx_agenda_speakers_agenda_item ON agenda_speakers(agenda_item_id);