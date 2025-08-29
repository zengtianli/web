import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import StrengthsSection from "@/components/strengths-section"
import LatestUpdates from "@/components/latest-updates"
import { getLatestUpdates } from "@/lib/content"

export default async function Home() {
  // 获取最新动态数据
  const latestUpdates = await getLatestUpdates();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <HeroSection />
        <StrengthsSection />
        {latestUpdates && <LatestUpdates data={latestUpdates} />}
      </div>
      <Footer />
    </main>
  )
}
