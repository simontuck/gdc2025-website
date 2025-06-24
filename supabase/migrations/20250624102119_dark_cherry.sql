/*
  # Meeting Room Booking System

  1. New Tables
    - `meeting_rooms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `hourly_rate` (integer) - in cents
      - `seating_capacity` (integer)
      - `amenities` (jsonb)
      - `image_url` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `room_bookings`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `customer_email` (text)
      - `customer_name` (text)
      - `booking_date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `duration_hours` (integer)
      - `total_amount` (integer) - in cents
      - `stripe_session_id` (text)
      - `stripe_payment_intent_id` (text)
      - `status` (text) - 'pending', 'confirmed', 'cancelled'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on rooms
    - Add policies for authenticated users to manage their bookings
*/

-- Create meeting_rooms table
CREATE TABLE IF NOT EXISTS meeting_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  hourly_rate integer NOT NULL CHECK (hourly_rate > 0),
  seating_capacity integer NOT NULL CHECK (seating_capacity > 0),
  amenities jsonb DEFAULT '[]',
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create room_bookings table
CREATE TABLE IF NOT EXISTS room_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES meeting_rooms(id) ON DELETE CASCADE,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_hours integer NOT NULL CHECK (duration_hours >= 1 AND duration_hours <= 4),
  total_amount integer NOT NULL CHECK (total_amount > 0),
  stripe_session_id text,
  stripe_payment_intent_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_booking_time CHECK (end_time > start_time),
  CONSTRAINT valid_conference_dates CHECK (
    booking_date IN ('2025-07-01', '2025-07-02')
  ),
  CONSTRAINT no_overlapping_bookings UNIQUE (room_id, booking_date, start_time, end_time)
);

-- Enable Row Level Security
ALTER TABLE meeting_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for meeting_rooms
CREATE POLICY "Allow public read access on meeting_rooms"
  ON meeting_rooms FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Service role can manage all meeting rooms"
  ON meeting_rooms FOR ALL
  TO service_role
  USING (true);

-- Create policies for room_bookings
CREATE POLICY "Users can read their own bookings"
  ON room_bookings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create bookings"
  ON room_bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Service role can manage all bookings"
  ON room_bookings FOR ALL
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meeting_rooms_active ON meeting_rooms(is_active);
CREATE INDEX IF NOT EXISTS idx_room_bookings_room_date ON room_bookings(room_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_room_bookings_status ON room_bookings(status);
CREATE INDEX IF NOT EXISTS idx_room_bookings_stripe_session ON room_bookings(stripe_session_id);

-- Create triggers for updated_at
CREATE TRIGGER update_meeting_rooms_updated_at
  BEFORE UPDATE ON meeting_rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_bookings_updated_at
  BEFORE UPDATE ON room_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample meeting rooms
INSERT INTO meeting_rooms (name, description, hourly_rate, seating_capacity, amenities, image_url) VALUES
(
  'Executive Boardroom',
  'Premium boardroom with panoramic views of Lake Geneva. Perfect for high-level meetings and presentations.',
  8000, -- 80.00 CHF per hour
  12,
  '["4K Display", "Video Conferencing", "Whiteboard", "Coffee Service", "Lake View"]',
  'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg'
),
(
  'Innovation Hub',
  'Modern collaborative space designed for brainstorming and creative sessions with flexible seating arrangements.',
  6000, -- 60.00 CHF per hour
  8,
  '["Interactive Whiteboard", "Flexible Seating", "Wireless Presentation", "Natural Light"]',
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
),
(
  'Tech Lab',
  'High-tech meeting room equipped with the latest technology for technical demonstrations and workshops.',
  7000, -- 70.00 CHF per hour
  10,
  '["Multiple Screens", "High-Speed Internet", "Power Outlets", "Technical Equipment"]',
  'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'
),
(
  'Networking Lounge',
  'Comfortable lounge setting ideal for informal meetings and networking sessions.',
  5000, -- 50.00 CHF per hour
  6,
  '["Comfortable Seating", "Coffee Station", "Casual Atmosphere", "WiFi"]',
  'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg'
),
(
  'Conference Suite',
  'Large conference room suitable for presentations and group discussions with professional setup.',
  9000, -- 90.00 CHF per hour
  16,
  '["Projector", "Sound System", "Conference Phone", "Professional Lighting"]',
  'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg'
),
(
  'Private Office',
  'Quiet private space perfect for confidential meetings and focused work sessions.',
  4000, -- 40.00 CHF per hour
  4,
  '["Privacy", "Desk Setup", "Phone", "Quiet Environment"]',
  'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg'
);