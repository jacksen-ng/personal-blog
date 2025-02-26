export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full">
            <div className="absolute inset-0 bg-white dark:bg-zinc-950 transition-colors duration-500">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-200/50 dark:bg-purple-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-75 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-200/50 dark:bg-blue-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-75 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-200/50 dark:bg-pink-800/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-2xl opacity-75 animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="absolute inset-0 bg-grid-slate-200/[0.1] dark:bg-grid-slate-700/[0.1] bg-[size:40px_40px] transition-opacity duration-500"></div>
            
            <div className="absolute inset-0 backdrop-filter backdrop-opacity-50 bg-noise opacity-[0.15] dark:opacity-[0.25] transition-opacity duration-500"></div>
        </div>
    );
}
