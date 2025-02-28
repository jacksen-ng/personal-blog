import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import { getAllPostIds, getPostData } from "@/app/lib/api";

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const postData = await getPostData(resolvedParams.id);
    
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <Post postData={postData} />
        </main>
    );
}
