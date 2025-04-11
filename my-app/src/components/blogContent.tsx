"use client";
import { useState } from "react";
import GlassCard from "./glassCard";
import Link from "next/link";
import { PostListItem } from "@/app/lib/api";
// Define the language options
const LANGUAGE_OPTIONS = ["All", "English", "Chinese", "Japanese"];

export default function BlogContent({ posts }: { posts: PostListItem[] }) {
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    
    const filteredPosts = selectedLanguage === "All" 
        ? posts 
        : posts.filter(post => post.language === selectedLanguage);
    
    return (
        <div className="container mx-auto px-4 pt-28 md:pt-24 pb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-center 
                bg-gradient-to-r from-violet-500 to-indigo-500 
                dark:from-violet-300 dark:to-indigo-300 
                bg-clip-text text-transparent">
                Blog Posts
            </h1>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                {LANGUAGE_OPTIONS.map((language) => (
                    <button
                        key={language}
                        onClick={() => setSelectedLanguage(language)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition-all ${
                            selectedLanguage === language
                                ? "bg-violet-500 text-white"
                                : "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-violet-800/50"
                        }`}
                    >
                        {language}
                    </button>
                ))}
            </div>
            
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                {filteredPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <GlassCard 
                            title={post.title} 
                            description={post.description} 
                            date={post.date}
                            badge={post.language}
                        />
                    </Link>
                ))}
                
                {filteredPosts.length === 0 && (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        No blog posts found in {selectedLanguage} language.
                    </p>
                )}
            </div>
        </div>
    );
}