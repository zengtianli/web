import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import StrengthsSection from "@/components/strengths-section"
import LatestUpdates from "@/components/latest-updates"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <HeroSection />
        <StrengthsSection />
        <LatestUpdates />
      </div>
      <Footer />
    </main>
  )
}
