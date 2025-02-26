import Background from "@/components/background";
import Navbar from "@/components/navbar";
import BlogContent from "@/components/blogContent";

export default function Blog() {
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <BlogContent />
        </main>
    );
} 