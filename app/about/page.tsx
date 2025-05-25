import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutIntro from "@/components/about-intro"
import Timeline from "@/components/timeline"
import SkillsVisual from "@/components/skills-visual"
import FutureOutlook from "@/components/future-outlook"
import { getContent, getNestedContent, AboutIntroContent, TimelineContent } from "@/lib/content"

export const metadata = {
  title: "关于我 | 曾田力",
  description: "了解曾田力的专业背景、技能和经历。融合水利工程专业智慧与前沿信息技术，致力于解决复杂水资源挑战。",
}

// 默认的关于我的内容，如果内容文件加载失败时使用
const defaultAboutIntroContent: AboutIntroContent = {
  title: "关于我 | My Journey",
  subtitle: "曾田力 (Zeng Tianli)",
  description: "浙江大学水利工程专业博士。专注 **水利信息化**、**数字孪生** 与 **智慧水利** 研究。深耕机器学习在水资源管理、水文预测领域的应用，研发多款专业软件系统，发表核心期刊论文。",
  slogan: "驱动创新，智绘水利。",
  profileImage: "/images/zengtianli.jpg"
};

// 默认的时间线内容
const defaultTimelineContent: TimelineContent = {
  title: "我的历程与技能沉淀",
  items: []
};

export default async function AboutPage() {
  // 从内容文件中加载数据
  const introContentResult = await getContent<AboutIntroContent>('about/intro');
  const timelineContentResult = await getNestedContent<TimelineContent>('about/timeline');
  
  // 确保即使内容文件加载失败也有默认值
  const introContent = introContentResult?.metadata || defaultAboutIntroContent;
  const timelineContent = timelineContentResult || defaultTimelineContent;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <AboutIntro content={introContent} />
        <Timeline content={timelineContent} />
        <SkillsVisual />
        <FutureOutlook />
      </div>
      <Footer />
    </main>
  )
}
