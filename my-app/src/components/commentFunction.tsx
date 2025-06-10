"use client";
import { useState, useEffect, useCallback } from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ensureProfile } from "@/app/lib/supabase";

type Comment = {
    id: string;
    content: string;
    created_at: string;
};

type CommentFunctionProps = {
    postId: string;
};

export default function CommentFunction({ postId }: CommentFunctionProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [commentCount, setCommentCount] = useState<number | null>(null);

    // Create a Supabase client that uses cookies
    const supabase = createClientComponentClient();

    const loadComments = useCallback(async () => {
        if (!showComments) return;
        
        setIsLoading(true);
        try {
            const { data, error, count } = await supabase
                .from('comments')
                .select('id, content, created_at', { count: 'exact' })
                .eq('post_id', postId)
                .order('created_at', { ascending: true });
            
            if (error) {
                console.error('Error loading comments:', error);
                setError('Failed to load comments.');
                return;
            }
            
            setComments(data || []);
            setCommentCount(count || 0);
        } catch (err) {
            console.error('Error in loadComments:', err);
            setError('Failed to load comments.');
        } finally {
            setIsLoading(false);
        }
    }, [postId, showComments]);

    // Get comment count separately if comments are not displayed
    const loadCommentCount = useCallback(async () => {
        if (showComments) return; // Already loaded in loadComments
        
        try {
            const { count, error } = await supabase
                .from('comments')
                .select('id', { count: 'exact', head: true })
                .eq('post_id', postId);
                
            if (error) {
                console.error('Error loading comment count:', error);
                return;
            }
            
            setCommentCount(count || 0);
        } catch (err) {
            console.error('Error loading comment count:', err);
        }
    }, [postId, showComments]);

    useEffect(() => {
        loadCommentCount();
        loadComments();
        
        const channel = supabase
            .channel(`comments_${postId}`)
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public',
                table: 'comments',
                filter: `post_id=eq.${postId}`
            }, () => {
                loadCommentCount();
                if (showComments) {
                    loadComments();
                }
            })
            .subscribe();
            
        return () => {
            supabase.removeChannel(channel);
        };
    }, [postId, showComments, loadComments, loadCommentCount]);

    const handleToggleComments = () => {
        setShowComments(prev => !prev);
        setError(null);
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            router.push('/login');
            return;
        }
        
        if (!newComment.trim()) {
            return;
        }
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            await ensureProfile(user.id);
            
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    post_id: postId,
                    user_id: user.id,
                    content: newComment.trim()
                })
                .select('id, content, created_at')
                .single();
            
            if (error) {
                console.error('Error adding comment:', error);
                setError('Failed to add comment.');
                return;
            }
            
            if (data) {
                setComments(prev => [...prev, data]);
                setNewComment("");
                setCommentCount(prev => (prev !== null ? prev + 1 : 1));
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            setError('Failed to add your comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleToggleComments}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
                <FiMessageSquare className="w-5 h-5" />
                <span>{commentCount === null ? '...' : commentCount} Comments</span>
            </button>

            {showComments && (
                <div className="mt-4">
                    {isLoading ? (
                        <div className="text-center py-4 text-gray-500">Loading comments...</div>
                    ) : (
                        <div className="space-y-4 mb-6">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-violet-600 dark:text-violet-400">
                                                Anonymous User
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmitComment} className="space-y-3">
                        {user ? (
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-violet-600 text-white rounded-r-md hover:bg-violet-700 transition-colors disabled:bg-violet-400"
                                    aria-label="Send comment"
                                >
                                    <FiSend />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="w-full py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
                            >
                                Login to comment
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}
