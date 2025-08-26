import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutIntro from "@/components/about-intro"
import Timeline from "@/components/timeline"
import SkillsVisual from "@/components/skills-visual"
import FutureOutlook from "@/components/future-outlook"
import SportsAchievementComponent, { SportsAchievementContent } from "@/components/sports-achievement"
import { getContent, getNestedContent, AboutIntroContent, TimelineContent, SkillsContent, FutureContent } from "@/lib/content"

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

// 默认的技能内容
const defaultSkillsContent: SkillsContent = {
  title: "技能图谱",
  description: "我的核心技能与专业领域，涵盖水利工程专业技能和信息技术能力",
  categories: []
};

// 默认的未来展望内容
const defaultFutureContent: FutureContent = {
  title: "未来展望",
  description: "我对未来水利行业发展的思考与个人职业规划",
  visionPoints: []
};

// 默认的体育成就内容
const defaultSportsContent: SportsAchievementContent = {
  title: "体育成就",
  subtitle: "2024年12月荣获\"规划数字事业部年度运动之星\"称号",
  totalChampionships: 5,
  officialHonor: {
    title: "规划数字事业部2024年度运动之星",
    year: "2024年12月",
    organization: "规划数字事业部团总支",
    description: "全面发展的体育运动爱好者，在各项赛事中表现突出"
  },
  categories: []
};

export default async function AboutPage() {
  // 从内容文件中加载所有数据
  const introContentResult = await getContent<AboutIntroContent>('about/intro');
  const timelineContentResult = await getNestedContent<TimelineContent>('about/timeline');
  const skillsContentResult = await getNestedContent<SkillsContent>('about/skills');
  const futureContentResult = await getNestedContent<FutureContent>('about/future');
  const sportsContentResult = await getNestedContent<SportsAchievementContent>('about/sports');
  
  // 确保即使内容文件加载失败也有默认值
  const introContent = introContentResult?.metadata || defaultAboutIntroContent;
  const timelineContent = timelineContentResult || defaultTimelineContent;
  const skillsContent = skillsContentResult || defaultSkillsContent;
  const futureContent = futureContentResult || defaultFutureContent;
  const sportsContent = sportsContentResult || defaultSportsContent;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <AboutIntro content={introContent} />
        <Timeline content={timelineContent} />
        <SkillsVisual content={skillsContent} />
        <SportsAchievementComponent content={sportsContent} />
        <FutureOutlook content={futureContent} />
      </div>
      <Footer />
    </main>
  )
}
