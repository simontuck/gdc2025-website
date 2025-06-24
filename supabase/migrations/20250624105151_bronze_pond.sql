/*
  # Update booking constraints for 30-minute minimum

  1. Changes
    - Update duration_hours constraint to allow 0.5 hours (30 minutes)
    - Update check constraint to allow minimum 0.5 hours instead of 1 hour
    - Keep maximum at 4 hours

  2. Security
    - Maintain existing RLS policies
    - Keep all other constraints intact
*/

-- Update the duration constraint to allow 30-minute bookings
ALTER TABLE room_bookings 
DROP CONSTRAINT IF EXISTS room_bookings_duration_hours_check;

ALTER TABLE room_bookings 
ADD CONSTRAINT room_bookings_duration_hours_check 
CHECK (duration_hours >= 0.5 AND duration_hours <= 4);

-- Update the column type to allow decimal values for 30-minute increments
-- Note: We'll use numeric(3,1) to allow values like 0.5, 1.0, 1.5, etc.
ALTER TABLE room_bookings 
ALTER COLUMN duration_hours TYPE numeric(3,1);