"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed w-full z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <Link href="/" className="flex items-center py-4 px-2">
                        <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent hover:from-indigo-400 hover:via-purple-400 hover:to-violet-400 dark:hover:from-indigo-300 dark:hover:via-purple-300 dark:hover:to-violet-300 transition-all duration-500 relative group">
                            Jacksen-blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 dark:from-violet-300 dark:via-purple-300 dark:to-indigo-300 group-hover:w-full transition-all duration-700"></span>
                        </h1>
                    </Link>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/" className="py-2 px-4 text-gray-700 dark:text-gray-100 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">Home</Link>
                        <Link href="/blog" className="py-2 px-4 text-gray-700 dark:text-gray-100 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">Blog</Link>
                        <Link href="/about" className="py-2 px-4 text-gray-700 dark:text-gray-100 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">About</Link>
                        
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
                            aria-label="Toggle Dark Mode"
                        >
                            {mounted && (theme === 'dark' ? (
                                <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            ))}
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button 
                            type="button" 
                            onClick={handleClick} 
                            className="outline-none p-2 rounded-full hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-indigo-500/10 transition-all duration-300"
                        >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div 
                className={`md:hidden fixed left-0 right-0 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                } bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-700/60`}
            >
                <div className="px-4 py-3 space-y-1">
                    <Link href="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">Home</Link>
                    <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">Blog</Link>
                    <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">About</Link>
                </div>
            </div>
        </nav>
    )
}