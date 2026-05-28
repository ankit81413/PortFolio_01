import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      {/* <section className="px-4 py-8 md:px-7 md:py-10"></section> */}
    </main>
  );
}
