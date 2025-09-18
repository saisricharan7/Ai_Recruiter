import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string
const supabaseAnnoKey =import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnnoKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnnoKey)