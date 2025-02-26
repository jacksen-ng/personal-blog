import Background from "@/components/background";
import Navbar from "@/components/navbar";
import Content from "@/components/content";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Background />
      <Navbar />
      <Content />
    </main>
  );
}
