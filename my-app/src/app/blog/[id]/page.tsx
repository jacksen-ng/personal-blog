import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import { getAllPostIds, getPostData } from "@/app/lib/api";

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths;
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    // Await the params object before accessing its properties
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
