"use client";
import LikeFunction from "./likeFunction";
import CommentFunction from "./commentFunction";

type PostEngagementProps = {
    postId: string;
};

export default function PostEngagement({ postId }: PostEngagementProps) {
    return (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center">
            <LikeFunction postId={postId} />
            <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Share this post</span>
            </div>
        </div>
        <CommentFunction postId={postId} />
        </div>
    );
} 