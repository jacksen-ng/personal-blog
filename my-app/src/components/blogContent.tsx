import GlassCard from "./glassCard";
import Link from "next/link";
import { getSortedPostsData } from "@/app/lib/api";

export default function BlogContent() {
    const posts = getSortedPostsData();
    
    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center 
                bg-gradient-to-r from-violet-500 to-indigo-500 
                dark:from-violet-300 dark:to-indigo-300 
                bg-clip-text text-transparent">
                Blog Posts
            </h1>
            
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <GlassCard 
                            title={post.title} 
                            description={post.description} 
                            date={post.date}
                        />
                    </Link>
                ))}
                
                {posts.length === 0 && (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        No blog posts found. Add some markdown files to the 'posts' directory.
                    </p>
                )}
            </div>
        </div>
    );
}