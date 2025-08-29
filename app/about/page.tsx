import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutIntro from "@/components/about-intro"
import Timeline from "@/components/timeline"
import SkillsVisual from "@/components/skills-visual"
import FutureOutlook from "@/components/future-outlook"
import SportsAchievement from "@/components/sports-achievement"
import { getContent, getNestedContent, AboutIntroContent, TimelineContent, SkillsContent, FutureContent } from "@/lib/content"
import { SportsAchievementContent } from "@/components/sports-achievement"

export const metadata = {
  title: "关于我 | 曾田力",
  description: "了解曾田力的专业背景、技能和经历。融合水利工程专业智慧与前沿信息技术，致力于解决复杂水资源挑战。",
}

// 组件现在完全依赖外部内容文件，不再包含默认数据

export default async function AboutPage() {
  // 从内容文件中加载所有数据
  const introContentResult = await getContent<AboutIntroContent>('about/intro');
  const timelineContentResult = await getNestedContent<TimelineContent>('about/timeline');
  const skillsContentResult = await getNestedContent<SkillsContent>('about/skills');
  const futureContentResult = await getNestedContent<FutureContent>('about/future');
  const sportsContentResult = await getNestedContent<SportsAchievementContent>('about/sports');
  
  // 从内容文件获取数据
  const introContent = introContentResult?.metadata;
  const timelineContent = timelineContentResult;
  const skillsContent = skillsContentResult;
  const futureContent = futureContentResult;
  const sportsContent = sportsContentResult;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        {introContent && <AboutIntro content={introContent} />}
        {timelineContent && <Timeline content={timelineContent} />}
        {skillsContent && <SkillsVisual content={skillsContent} />}
        {sportsContent && <SportsAchievement content={sportsContent} />}
        {futureContent && <FutureOutlook content={futureContent} />}
      </div>
      <Footer />
    </main>
  )
}
