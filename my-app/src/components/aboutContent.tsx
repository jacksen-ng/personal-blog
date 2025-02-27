export default function AboutContent() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center 
                bg-gradient-to-r from-violet-500 to-indigo-500 
                dark:from-violet-300 dark:to-indigo-300 
                bg-clip-text text-transparent">
                About</h1>
                
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-center mb-12
                    text-zinc-600 dark:text-zinc-300
                    max-w-2xl
                    opacity-0 animate-fade-in">
                    I'm a Malaysian which is currently studying in Tokyo, Japan. This blog
                    is a place where I share my thoughts, ideas, and experiences. In this blog,
                    I will share my learning journey, my thoughts on technology, and my life in Japan.
                </p>
            </div>
        </div>
    )
}