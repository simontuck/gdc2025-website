/*
  # Fix free booking constraints

  1. Changes
    - Remove the total_amount_check constraint that prevents zero amounts
    - This allows free bookings with total_amount = 0
    - Keep other constraints intact for data integrity

  2. Security
    - No changes to RLS policies
    - Maintains existing access controls
*/

-- Remove the constraint that prevents zero amounts for free bookings
ALTER TABLE room_bookings DROP CONSTRAINT IF EXISTS room_bookings_total_amount_check;

-- Add a new constraint that allows zero or positive amounts
ALTER TABLE room_bookings ADD CONSTRAINT room_bookings_total_amount_check 
  CHECK (total_amount >= 0);