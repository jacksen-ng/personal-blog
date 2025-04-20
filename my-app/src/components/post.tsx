import { PostData } from "@/app/lib/api";
import PostEngagement from "./PostEngagement";
import PostStats from "./PostStats";

export default function Post({ postData }: { postData: PostData }) {
    return (
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        <article>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 
            bg-gradient-to-r from-violet-500 to-indigo-500 
            dark:from-violet-300 dark:to-indigo-300 
            bg-clip-text text-transparent">
            {postData.title}
            </h1>
            
            <div className="mb-8 flex items-center gap-3">
                <time className="text-sm px-3 py-1 rounded-full 
                    dark:bg-violet-500/10 bg-violet-500/10 
                    dark:text-violet-300 text-violet-600
                    font-medium">
                    {postData.date}
                </time>
                
                {postData.language && (
                    <span className="text-sm px-3 py-1 rounded-full 
                        bg-indigo-100 dark:bg-indigo-900/50 
                        text-indigo-700 dark:text-indigo-300 font-medium">
                        {postData.language}
                    </span>
                )}
                
                <PostStats postId={postData.id} />
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-zinc-800 dark:prose-headings:text-zinc-200
            prose-a:text-violet-600 dark:prose-a:text-violet-300
            prose-code:text-violet-600 dark:prose-code:text-violet-300
            prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800
            transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            
            <PostEngagement postId={postData.id} />
        </article>
        </div>
    );
}
