"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Create a Supabase client that uses cookies
  const supabase = createClientComponentClient();

  const signInWithProvider = async (provider: 'google' | 'github' | 'apple') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setError(error.message);
      }
    } catch (e) {
      setError('An error occurred during sign in');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-zinc-800 dark:text-zinc-100">
          Sign in to your account
        </h1>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={() => signInWithProvider('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors"
          >
            <FaGoogle className="text-red-500" />
            <span>Continue with Google</span>
          </button>
          
          <button
            onClick={() => signInWithProvider('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-zinc-800 dark:bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-800 transition-colors"
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </button>
          
          <button
            onClick={() => signInWithProvider('apple')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <FaApple />
            <span>Continue with Apple</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
