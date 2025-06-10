"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type LikeWithDetails = {
  id: string;
  post_id: string;
  post_title: string;
  user_id: string;
  created_at: string;
};

export default function LikesPage() {
  const [likes, setLikes] = useState<LikeWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create a Supabase client that uses cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setIsLoading(true);
        
        const { data: likesData, error } = await supabase
          .from('likes')
          .select(`
            *,
            profiles:profiles(user_id)
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching likes:', error);
          return;
        }
        
        const likesWithDetails = await Promise.all(likesData.map(async (like) => {
          const { data: postData } = await supabase
            .from('posts')
            .select('title')
            .eq('id', like.post_id)
            .single();
            
          return {
            ...like,
            post_title: postData?.title || 'Unknown Post',
          };
        }));
        
        setLikes(likesWithDetails);
      } catch (error) {
        console.error('Error in fetchLikes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLikes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Likes</h1>
      
      <div className="bg-white dark:bg-zinc-800 shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-zinc-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Post
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
            {likes.map((like) => (
              <tr key={like.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {like.post_title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {like.user_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(like.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            
            {likes.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                  No likes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 