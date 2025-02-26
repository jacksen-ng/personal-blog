export default function GlassCard({ 
    title, 
    description, 
    date 
}: { 
    title: string, 
    description: string, 
    date?: string 
}) {
    return (
        <div className="group hover:scale-[1.01] transition-all duration-300 w-full max-w-3xl mx-auto mb-6">
            <div className="relative overflow-hidden rounded-xl backdrop-blur-md 
                dark:bg-black/10 dark:border-white/5 
                bg-white/20 border-black/5 
                border p-6 shadow-lg">
                
                {/* Glass effect highlight */}
                <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-purple-500/5 dark:to-transparent
                    bg-gradient-to-br from-white/40 to-white/10" />
                
                {/* Hover light effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 
                    group-hover:opacity-10 transition duration-300 blur-md" />
                
                {/* Content area */}
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold 
                            dark:text-white/90 text-gray-800
                            group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors duration-300">
                            {title}
                        </h2>
                        
                        {date && (
                            <span className="text-sm px-3 py-1 rounded-full 
                                dark:bg-violet-500/10 bg-violet-500/10 
                                dark:text-violet-300 text-violet-600
                                font-medium">
                                {date}
                            </span>
                        )}
                    </div>
                    
                    <p className="dark:text-gray-300 text-gray-600">
                        {description}
                    </p>
                    
                    <div className="mt-4 flex justify-end">
                        <span className="text-sm font-medium 
                            dark:text-violet-300 text-violet-600
                            group-hover:translate-x-1 transition-transform duration-300 
                            flex items-center gap-1">
                            Read more
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}