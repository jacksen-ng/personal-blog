import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'blog-auth-storage',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
});

export const isAdmin = async (userId: string | undefined) => {
  if (!userId) return false;
  
  const { data, error } = await supabase
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

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}; 

export const ensureProfile = async (userId: string) => {
  if (!userId) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (!error && data) {
    return data;
  }
  
  const { data: newProfile, error: insertError } = await supabase
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