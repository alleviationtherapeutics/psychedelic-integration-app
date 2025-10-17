-- Quick Admin Setup Script
-- Run this in your Supabase SQL Editor

-- First, let's see your user ID
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Copy your user ID from the result above, then uncomment and run this line:
-- Replace 'your-user-id-here' with your actual UUID from the query above

-- INSERT INTO user_roles (user_id, role, verified) 
-- VALUES ('your-user-id-here', 'admin', TRUE);

-- Alternative: Set yourself as verified therapist
-- INSERT INTO user_roles (user_id, role, verified, license_type, license_number, license_state) 
-- VALUES ('your-user-id-here', 'therapist', TRUE, 'TESTING', 'TEST123', 'CA');

-- Check if it worked:
-- SELECT ur.*, au.email 
-- FROM user_roles ur 
-- JOIN auth.users au ON ur.user_id = au.id;