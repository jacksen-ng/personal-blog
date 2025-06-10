"use client";
import { useEffect, useState, useCallback } from "react";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "@/app/providers/AuthProvider";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type PostStatsProps = {
  postId: string;
};

export default function PostStats({ postId }: PostStatsProps) {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create a Supabase client that uses cookies
  const supabase = createClientComponentClient();

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const likesPromise = supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);
        
      const commentsPromise = supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);
      
      const [likesResponse, commentsResponse] = await Promise.all([
        likesPromise,
        commentsPromise
      ]);
      
      if (likesResponse.error) {
        console.error('Error fetching like count:', likesResponse.error);
      } else {
        setLikeCount(likesResponse.count || 0);
      }
      
      if (commentsResponse.error) {
        console.error('Error fetching comment count:', commentsResponse.error);
      } else {
        setCommentCount(commentsResponse.count || 0);
      }
      
      if (user) {
        const { data, error } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error checking like status:', error);
        } else {
          setLiked(!!data);
        }
      }
    } catch (err) {
      console.error('Error loading post stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId, user]);

  useEffect(() => {
    loadStats();
    
    const likesSubscription = supabase
      .channel('likes_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'likes',
        filter: `post_id=eq.${postId}`
      }, () => {
        loadStats();
      })
      .subscribe();
      
    const commentsSubscription = supabase
      .channel('comments_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'comments',
        filter: `post_id=eq.${postId}`
      }, () => {
        loadStats();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(likesSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, [postId, user, loadStats]);

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-1">
        {liked ? (
          <FaHeart className="w-4 h-4 text-red-500" />
        ) : (
          <FiHeart className="w-4 h-4" />
        )}
        <span>{isLoading ? '...' : likeCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <FiMessageSquare className="w-4 h-4" />
        <span>{isLoading ? '...' : commentCount}</span>
      </div>
    </div>
  );
} 