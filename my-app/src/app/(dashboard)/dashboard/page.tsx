"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

type PostStats = {
  postId: string;
  title: string;
  likeCount: number;
  commentCount: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<PostStats[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        const { data: posts } = await supabase
          .from('posts')
          .select('id, title')
          .order('created_at', { ascending: false });
          
        if (!posts) return;
        
        const postsWithStats = await Promise.all(posts.map(async (post) => {
          const { count: likeCount } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);
            
          const { count: commentCount } = await supabase
            .from('comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);
            
          return {
            postId: post.id,
            title: post.title,
            likeCount: likeCount || 0,
            commentCount: commentCount || 0
          };
        }));
        
        setStats(postsWithStats);
        
        const likes = postsWithStats.reduce((sum, post) => sum + post.likeCount, 0);
        const comments = postsWithStats.reduce((sum, post) => sum + post.commentCount, 0);
        
        setTotalLikes(likes);
        setTotalComments(comments);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Likes
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {totalLikes}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-700 px-4 py-3">
            <Link href="/dashboard/likes" className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:text-violet-500 dark:hover:text-violet-300">
              View all likes →
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Comments
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {totalComments}
            </dd>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-700 px-4 py-3">
            <Link href="/dashboard/comments" className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:text-violet-500 dark:hover:text-violet-300">
              View all comments →
            </Link>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Post Statistics</h2>
      
      <div className="bg-white dark:bg-zinc-800 shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-zinc-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Post Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Likes
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Comments
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
            {stats.map((post) => (
              <tr key={post.postId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {post.likeCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {post.commentCount}
                </td>
              </tr>
            ))}
            
            {stats.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 