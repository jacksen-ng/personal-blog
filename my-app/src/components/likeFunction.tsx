"use client";
import { useState, useEffect, useCallback } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { supabase, ensureProfile } from "@/app/lib/supabase";

type LikeFunctionProps = {
    postId: string;
}

export default function LikeFunction({ postId }: LikeFunctionProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadLikeStatus = useCallback(async () => {
        try {
            const { count, error: countError } = await supabase
                .from('likes')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', postId);
            
            if (countError) {
                console.error('Error fetching like count:', countError);
                return;
            }
            
            setLikeCount(count || 0);
            
            if (user) {
                const { data, error } = await supabase
                    .from('likes')
                    .select('*')
                    .eq('post_id', postId)
                    .eq('user_id', user.id)
                    .maybeSingle();
                
                if (error) {
                    console.error('Error checking like status:', error);
                    return;
                }
                
                setLiked(!!data);
            }
        } catch (err) {
            console.error('Error in loadLikeStatus:', err);
        }
    }, [postId, user]);

    useEffect(() => {
        loadLikeStatus();
        
        const channel = supabase
            .channel(`likes_${postId}`)
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public',
                table: 'likes',
                filter: `post_id=eq.${postId}`
            }, () => {
                loadLikeStatus();
            })
            .subscribe();
            
        return () => {
            supabase.removeChannel(channel);
        };
    }, [postId, user, loadLikeStatus]);

    const handleLike = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            await ensureProfile(user.id);
            
            if (liked) {
                await supabase
                    .from('likes')
                    .delete()
                    .eq('post_id', postId)
                    .eq('user_id', user.id);
                
                setLiked(false);
                setLikeCount(prev => (prev !== null ? prev - 1 : 0));
            } else {
                await supabase
                    .from('likes')
                    .insert({
                        post_id: postId,
                        user_id: user.id
                    });
                
                setLiked(true);
                setLikeCount(prev => (prev !== null ? prev + 1 : 1));
            }
        } catch (err) {
            console.error('Error toggling like:', err);
            setError('Failed to process your like. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleLike}
                    disabled={isLoading}
                    className={`p-2 rounded-full transition-all ${
                        liked 
                            ? "text-red-500 bg-red-50 dark:bg-red-900/20" 
                            : "text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    }`}
                    aria-label={liked ? "Unlike" : "Like"}
                >
                    {liked ? (
                        <FaHeart className="w-5 h-5" />
                    ) : (
                        <FiHeart className="w-5 h-5" />
                    )}
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    {likeCount === null ? '...' : likeCount}
                </span>
            </div>
            
            {error && (
                <div className="text-xs text-red-600 mt-1">
                    {error}
                </div>
            )}
        </div>
    );
}
