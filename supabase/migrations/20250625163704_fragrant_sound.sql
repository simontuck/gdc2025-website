/*
# Fix room booking constraint for free bookings

This migration removes the constraint that prevents zero amounts and replaces it with one that allows zero or positive amounts, enabling free meeting room bookings.

## Changes
1. Drop existing total_amount constraint that requires amount > 0
2. Add new constraint that allows amount >= 0 (zero or positive)
3. Ensure any NULL amounts are set to 0

## Security
- Maintains data integrity while allowing free bookings
- Prevents negative amounts which would be invalid
*/

-- First, let's see what constraints exist
DO $$
BEGIN
    -- Drop the constraint if it exists (using IF EXISTS to avoid errors)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'room_bookings_total_amount_check' 
        AND table_name = 'room_bookings'
    ) THEN
        ALTER TABLE room_bookings DROP CONSTRAINT room_bookings_total_amount_check;
        RAISE NOTICE 'Dropped existing room_bookings_total_amount_check constraint';
    END IF;
END $$;

-- Update any NULL amounts to 0 (shouldn't be any, but just in case)
UPDATE room_bookings 
SET total_amount = 0 
WHERE total_amount IS NULL;

-- Add the new constraint that allows zero or positive amounts
ALTER TABLE room_bookings 
ADD CONSTRAINT room_bookings_total_amount_check 
CHECK (total_amount >= 0);

-- Verify the constraint was added
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'room_bookings_total_amount_check' 
        AND table_name = 'room_bookings'
    ) THEN
        RAISE NOTICE 'Successfully added new room_bookings_total_amount_check constraint (>= 0)';
    ELSE
        RAISE EXCEPTION 'Failed to add room_bookings_total_amount_check constraint';
    END IF;
END $$;