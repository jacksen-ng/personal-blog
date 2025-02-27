import Background from "@/components/background";
import Navbar from "@/components/navbar";
import AboutContent from "@/components/aboutContent";

export default function About() {
    return (
        <main className="min-h-screen relative">
            <Background />
            <Navbar />
            <AboutContent />
        </main>
    );
}
