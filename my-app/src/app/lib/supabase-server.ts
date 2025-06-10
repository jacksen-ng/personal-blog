import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// For server-side use only
export const getCurrentUserServer = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore 
  });
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Create server-side Supabase client
export const createServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ 
    cookies: () => cookieStore 
  });
}; 