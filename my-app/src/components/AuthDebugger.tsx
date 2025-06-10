"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthDebugger() {
  const { user, isLoading } = useAuth();
  const [tablesStatus, setTablesStatus] = useState<{[key: string]: boolean}>({});
  const [profilesCount, setProfilesCount] = useState<number | null>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Create a Supabase client that uses cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkTables = async () => {
      try {
        const tables = ['likes', 'comments', 'profiles', 'posts'];
        const status: {[key: string]: boolean} = {};

        for (const table of tables) {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          status[table] = !error;
          
          if (table === 'profiles') {
            setProfilesCount(count || 0);
          }
        }

        setTablesStatus(status);
        
        if (user) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfileInfo(data);
          }
        }
      } catch (err) {
        setError(`Error checking tables: ${err}`);
        console.error('Error in checkTables:', err);
      }
    };
    
    if (!isLoading) {
      checkTables();
    }
  }, [isLoading, user]);

  const createProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          is_admin: false
        })
        .select();
        
      if (error) throw error;
      
      alert('Profile created successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Error creating profile:', err);
      alert(`Error creating profile: ${err}`);
    }
  };

  const makeAdmin = async () => {
    if (!user || !profileInfo) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_admin: true
        })
        .eq('id', profileInfo.id);
        
      if (error) throw error;
      
      alert('You are now an admin!');
      window.location.reload();
    } catch (err) {
      console.error('Error making admin:', err);
      alert(`Error making admin: ${err}`);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Auth Debugger</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Auth Status:</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : user ? (
          <div>
            <p>User: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Database Tables:</h3>
        <ul>
          {Object.entries(tablesStatus).map(([table, exists]) => (
            <li key={table} className={exists ? "text-green-600" : "text-red-600"}>
              {table}: {exists ? "OK" : "Error"}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Profiles Table:</h3>
        <p>Total profiles: {profilesCount !== null ? profilesCount : "Loading..."}</p>
        
        {user && (
          <div className="mt-2">
            <h4 className="font-medium">Your Profile:</h4>
            {profileInfo ? (
              <div>
                <p>ID: {profileInfo.id}</p>
                <p>Admin: {profileInfo.is_admin ? "Yes" : "No"}</p>
              </div>
            ) : (
              <p className="text-red-600">Profile not found</p>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}
      
      {user && !profileInfo && (
        <button
          onClick={createProfile}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Create Profile
        </button>
      )}
      
      {user && profileInfo && !profileInfo.is_admin && (
        <button
          onClick={makeAdmin}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Make Admin
        </button>
      )}
    </div>
  );
} 