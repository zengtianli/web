import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import { StrengthsSection } from "@/components/page-sections"
import { LatestUpdates } from "@/components/card-components"
import { getLatestUpdates } from "@/lib/content"

export const metadata = {
  title: "曾田力 - 水利工程博士 | 数据驱动水利创新",
  description: "曾田力，浙江大学水利工程博士，融合水利工程专业智慧与前沿信息技术，致力于通过数据分析、智能模型及软件系统研发，解决复杂水资源挑战。",
}

export default async function Home() {
  const latestUpdates = await getLatestUpdates()

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
