/*
  # Add automatic cleanup for expired pending bookings

  1. Functions
    - Create function to clean up expired pending bookings
    - Create function to be called by cron job or trigger

  2. Security
    - Function is accessible to service role only
*/

-- Function to clean up expired pending bookings
CREATE OR REPLACE FUNCTION cleanup_expired_pending_bookings()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete pending bookings older than 30 minutes
  DELETE FROM room_bookings 
  WHERE status = 'pending' 
    AND created_at < NOW() - INTERVAL '30 minutes';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION cleanup_expired_pending_bookings() TO service_role;

-- Create a function that can be called via HTTP (for scheduled cleanup)
CREATE OR REPLACE FUNCTION public.cleanup_expired_bookings_http()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Only allow service role to execute this
  IF current_setting('request.jwt.claims', true)::json->>'role' != 'service_role' THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  
  SELECT cleanup_expired_pending_bookings() INTO deleted_count;
  
  RETURN json_build_object(
    'success', true,
    'deleted_count', deleted_count,
    'timestamp', NOW()
  );
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.cleanup_expired_bookings_http() TO service_role;