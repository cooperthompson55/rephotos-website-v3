import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Debug logging for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('SUPABASE URL:', supabaseUrl)
  console.log('SUPABASE KEY EXISTS:', !!supabaseAnonKey)
  console.log('SUPABASE KEY LENGTH:', supabaseAnonKey?.length || 0)
}

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Create the Supabase client with auth settings
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist auth session for anonymous usage
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'rephotos-website-booking'
    }
  }
}); 

// Helper function to check Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Test with a simple select from a public table or RPC call
    const { data, error } = await supabase.from('bookings').select('id').limit(0);
    return { success: !error, error };
  } catch (err) {
    return { success: false, error: err };
  }
}; 