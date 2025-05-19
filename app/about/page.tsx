import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutIntro from "@/components/about-intro"
import Timeline from "@/components/timeline"
import SkillsVisual from "@/components/skills-visual"
import FutureOutlook from "@/components/future-outlook"

export const metadata = {
  title: "关于我 | 曾田力",
  description: "了解曾田力的专业背景、技能和经历。融合水利工程专业智慧与前沿信息技术，致力于解决复杂水资源挑战。",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <AboutIntro />
        <Timeline />
        <SkillsVisual />
        <FutureOutlook />
      </div>
      <Footer />
    </main>
  )
}
