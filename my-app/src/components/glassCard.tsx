export default function GlassCard({ 
    title, 
    description, 
    date,
    badge
}: { 
    title: string; 
    description: string; 
    date: string;
    badge?: string;
}) {
    return (
        <div className="group backdrop-blur-md bg-white/30 dark:bg-zinc-900/40 
            border border-zinc-200 dark:border-zinc-700/60
            p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-white/50 dark:hover:bg-zinc-800/50
            transition duration-300 ease-in-out">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-violet-600 
                    dark:group-hover:text-violet-400 transition-colors duration-200">
                    {title}
                </h2>
                
                {badge && (
                    <span className="text-xs px-2 py-1 rounded-full 
                        bg-indigo-100 dark:bg-indigo-900/50 
                        text-indigo-700 dark:text-indigo-300 font-medium">
                        {badge}
                    </span>
                )}
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">{description}</p>
            
            <div className="flex justify-between items-center">
                <time className="text-xs px-2 py-1 rounded-full 
                    bg-violet-100/70 dark:bg-violet-900/30 
                    text-violet-700 dark:text-violet-300 font-medium">
                    {date}
                </time>
                
                <span className="text-violet-500 dark:text-violet-400 text-sm font-medium opacity-0 
                    group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1
                    transition-all duration-200">
                    Read more →
                </span>
            </div>
        </div>
    );
}