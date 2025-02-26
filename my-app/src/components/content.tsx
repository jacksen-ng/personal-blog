export default function Content() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-center mb-6
                bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 
                dark:from-violet-300 dark:via-purple-300 dark:to-indigo-300 
                bg-clip-text text-transparent
                hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 
                dark:hover:from-indigo-300 dark:hover:via-purple-300 dark:hover:to-violet-300 
                transition-all duration-500">
                Jacksen.blog
            </h1>

            <p className="font-geist-sans text-lg md:text-xl text-center mb-12
                text-zinc-600 dark:text-zinc-300
                max-w-2xl">
                exploring tech, design & creative coding
            </p>

            <a href="/blog" 
                className="group relative inline-flex items-center justify-center
                px-8 py-3 text-lg font-medium
                text-zinc-700 dark:text-zinc-200
                transition-all duration-300
                hover:text-zinc-900 dark:hover:text-white">
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
            </a>

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