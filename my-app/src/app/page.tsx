import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
    </main>
  );
}
