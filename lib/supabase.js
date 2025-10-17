// lib/supabase.js - Fixed for React Native/Expo
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env'
import { createClient } from '@supabase/supabase-js'

// Check if environment variables are loaded
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables!')
  console.log('SUPABASE_URL:', SUPABASE_URL ? 'Set' : 'Missing')
  console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'Set' : 'Missing')
  console.log('Make sure your .env file is in the root directory and contains:')
  console.log('SUPABASE_URL=your_supabase_url')
  console.log('SUPABASE_ANON_KEY=your_supabase_anon_key')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false // Set to false for React Native
  }
})