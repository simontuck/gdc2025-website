/*
  # Add day 2 availability field to meeting rooms

  1. Schema Changes
    - Add `available_day2` boolean field to `meeting_rooms` table
    - Default to true (available on both days)
    - Add index for performance

  2. Security
    - No changes to RLS policies needed
    - Service role can manage availability settings
*/

-- Add the new field to control day 2 availability
ALTER TABLE meeting_rooms 
ADD COLUMN available_day2 boolean DEFAULT true;

-- Add a comment to explain the field
COMMENT ON COLUMN meeting_rooms.available_day2 IS 'Whether the room is available on day 2 of the conference (2025-07-02)';

-- Add an index for performance when filtering by day 2 availability
CREATE INDEX idx_meeting_rooms_day2_availability ON meeting_rooms(available_day2, is_active);

-- Update the updated_at timestamp for existing rooms
UPDATE meeting_rooms SET updated_at = now();