/*
  # Fix booking constraint for free meeting rooms

  1. Changes
    - Remove the existing constraint that requires total_amount > 0
    - Add new constraint that allows total_amount >= 0 (including free bookings)
    - This allows free meeting room bookings with total_amount = 0

  2. Security
    - Maintains data integrity while allowing free bookings
    - Prevents negative amounts
*/

-- Remove the old constraint that required amount > 0
ALTER TABLE room_bookings DROP CONSTRAINT IF EXISTS room_bookings_total_amount_check;

-- Add new constraint that allows zero or positive amounts (for free bookings)
ALTER TABLE room_bookings ADD CONSTRAINT room_bookings_total_amount_check 
  CHECK (total_amount >= 0);

-- Update any existing bookings that might have issues (if any)
UPDATE room_bookings 
SET total_amount = 0 
WHERE total_amount IS NULL;