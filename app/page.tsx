import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white p-4 md:p-7">
      <Navbar />
      <HeroSection />
    </main>
  );
}
