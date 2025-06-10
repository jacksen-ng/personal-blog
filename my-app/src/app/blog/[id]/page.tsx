import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import { getAllPostIds, getPostData } from "@/app/lib/api";

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postData = await getPostData(id);

    if (!postData) {
        return (
            <main className="min-h-screen relative">
                <Background />
                <Navbar />
                <div className="container mx-auto px-4 pt-24 pb-12 text-center">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                    <p>Sorry, we couldn't find the blog post you were looking for.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <Post postData={postData} />
        </main>
    );
}
