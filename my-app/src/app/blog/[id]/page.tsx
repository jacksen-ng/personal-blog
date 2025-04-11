import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Post from "@/components/post";
import { getAllPostIds, getPostData } from "@/app/lib/api";

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    return posts;
}

// Temporarily use 'any' type to bypass type checking
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost(props: any) {
    const { params } = props;
    const postData = await getPostData(params.id);
    
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <Post postData={postData} />
        </main>
    );
}
