'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

export default function Content() {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="font-creative text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center mb-4 sm:mb-6
                bg-gradient-to-r from-fuchsia-500 to-cyan-500
                dark:from-fuchsia-300 dark:to-cyan-300
                bg-clip-text text-transparent
                hover:from-cyan-500 hover:to-fuchsia-500
                dark:hover:from-cyan-300 dark:hover:to-fuchsia-300
                transition-all duration-700">
                <TypeAnimation
                    sequence={[
                        'Jacksen.blog',
                        100,
                        () => setShowContent(true)
                    ]}
                    speed={50}
                    cursor={true}
                    repeat={0}
                />
            </h1>

            {showContent && (
                <>
                    <p className="font-geist-sans text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12
                        text-zinc-600 dark:text-zinc-300
                        max-w-2xl
                        opacity-0 animate-fade-in">
                        share my thoughts, ideas, and experiences
                    </p>

                    <Link href="/blog" 
                        className="group relative inline-flex items-center justify-center
                        px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium
                        text-zinc-700 dark:text-zinc-200
                        transition-all duration-300
                        hover:text-zinc-900 dark:hover:text-white
                        opacity-0 animate-fade-in [animation-delay:200ms]">
                        view blog
                        <svg 
                            className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] 
                            bg-gradient-to-r from-transparent via-purple-500 to-transparent 
                            dark:via-purple-300
                            scale-x-0 group-hover:scale-x-100 
                            transition-transform duration-500"/>
                    </Link>
                </>
            )}

            <div className="fixed bottom-8 flex gap-6 text-zinc-400 dark:text-zinc-500">
                <a href="https://github.com/jacksen-ng" 
                    className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-300">
                    github
                </a>
                <a href="https://jacksen-ng.com/" 
                    className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-300">
                    portfolio
                </a>
            </div>
        </div>
    );
}