-- Quick Fix for RLS Policy Issue
-- Run this in your Supabase SQL Editor to bypass the RLS restriction

-- Option 1: Get your user ID and insert directly as admin
-- First, find your user ID:
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Copy your user ID from above, then uncomment and run this (replace with your actual user ID):
-- INSERT INTO user_roles (user_id, role, verified) 
-- VALUES ('your-user-id-here', 'admin', TRUE)
-- ON CONFLICT (user_id) 
-- DO UPDATE SET role = 'admin', verified = TRUE;

-- Option 2: Temporarily disable RLS to allow self-promotion
-- (Run this, then use the app, then re-enable RLS)

-- Disable RLS temporarily
-- ALTER TABLE user_roles DISABLE ROW LEVEL SECURITY;

-- After using the app to set your role, re-enable RLS:
-- ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Option 3: Add a more permissive policy for self-role updates
-- This allows users to update their own role (you might want to remove this later)

DROP POLICY IF EXISTS "Users can update own role" ON user_roles;

CREATE POLICY "Users can update own role" ON user_roles
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Option 4: Add upsert policy
DROP POLICY IF EXISTS "Users can upsert own role" ON user_roles;

CREATE POLICY "Users can upsert own role" ON user_roles
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'user_roles';