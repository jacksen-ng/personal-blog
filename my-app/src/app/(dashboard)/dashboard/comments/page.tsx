"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type CommentWithDetails = {
  id: string;
  post_id: string;
  post_title: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        
        const { data: commentsData, error } = await supabase
          .from('comments')
          .select(`
            *,
            profiles:profiles(user_id)
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching comments:', error);
          return;
        }
        
        const commentsWithDetails = await Promise.all(commentsData.map(async (comment) => {
          const { data: postData } = await supabase
            .from('posts')
            .select('title')
            .eq('id', comment.post_id)
            .single();
            
          return {
            ...comment,
            post_title: postData?.title || 'Unknown Post',
          };
        }));
        
        setComments(commentsWithDetails);
      } catch (error) {
        console.error('Error in fetchComments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Comments</h1>
      
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-zinc-800 shadow overflow-hidden rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {comment.post_title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By User ID: {comment.user_id} • {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-zinc-700 p-4 rounded-md">
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-zinc-800 shadow overflow-hidden rounded-lg p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No comments found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 