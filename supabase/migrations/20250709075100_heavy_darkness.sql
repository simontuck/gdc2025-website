/*
  # Add day 2 availability control to meeting rooms

  1. Changes
    - Add `available_day2` column to meeting_rooms table (if not exists)
    - Add comment explaining the field purpose
    - Add performance index for day 2 availability filtering
    - Update timestamps for existing rooms

  2. Safety
    - Uses conditional logic to avoid duplicate column creation
    - Handles existing indexes gracefully
    - Updates existing room records appropriately
*/

-- Add the new field to control day 2 availability (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'meeting_rooms' AND column_name = 'available_day2'
  ) THEN
    ALTER TABLE meeting_rooms 
    ADD COLUMN available_day2 boolean DEFAULT true;
  END IF;
END $$;

-- Add a comment to explain the field (safe to run multiple times)
COMMENT ON COLUMN meeting_rooms.available_day2 IS 'Whether the room is available on day 2 of the conference (2025-07-02)';

-- Add an index for performance when filtering by day 2 availability (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_meeting_rooms_day2_availability'
  ) THEN
    CREATE INDEX idx_meeting_rooms_day2_availability ON meeting_rooms(available_day2, is_active);
  END IF;
END $$;

-- Update the updated_at timestamp for existing rooms
UPDATE meeting_rooms SET updated_at = now() WHERE updated_at IS NOT NULL;