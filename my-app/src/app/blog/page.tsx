import Background from "@/components/background";
import Navbar from "@/components/navbar";

export default function Blog() {
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 pt-24">
                <a 
                    href="/" 
                    className="inline-block px-4 py-2 text-gray-700 dark:text-gray-100 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
                >
                    Back to Home
                </a>
            </div>
        </main>
    );
} 