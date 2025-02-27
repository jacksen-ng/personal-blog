import Background from "@/components/background";
import Navbar from "@/components/navbar";
import BlogContent from "@/components/blogContent";
import { getSortedPostsData } from "@/app/lib/api";

export default async function Blog() {
    const posts = await getSortedPostsData();
    
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <BlogContent posts={posts} />
        </main>
    );
} 