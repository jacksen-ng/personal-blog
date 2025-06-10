import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

console.log("Attempting to initialize Supabase client...");
console.log("Supabase URL loaded:", supabaseUrl ? "YES" : "NO_OR_EMPTY");
console.log("Supabase Anon Key loaded:", supabaseAnonKey ? "YES" : "NO_OR_EMPTY");

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL: Supabase URL or Anon Key is missing or empty. Data fetching will likely fail.");
}

// Client-side Supabase client that uses cookies for auth storage
export const supabase = createClientComponentClient();

// Legacy client for non-auth operations (if needed)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for this client
    autoRefreshToken: false,
  },
});

export const isAdmin = async (userId: string | undefined) => {
  if (!userId) return false;
  
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('is_admin')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    console.error('Error checking admin status:', error);
    return false;
  }
  
  return data.is_admin === true;
};

// For client-side use
export const getCurrentUser = async () => {
  const supabase = createClientComponentClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}; 

export const ensureProfile = async (userId: string) => {
  if (!userId) return null;
  
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (!error && data) {
    return data;
  }
  
  const { data: newProfile, error: insertError } = await supabaseClient
    .from('profiles')
    .insert({ user_id: userId })
    .select()
    .single();
    
  if (insertError) {
    console.error('Error creating profile:', insertError);
    return null;
  }
  
  return newProfile;
}; 