import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AboutIntro, Timeline, SkillsVisual, FutureOutlook } from "@/components/page-sections"
import SportsAchievement from "@/components/sports-achievement"
import { getContent, getNestedContent, AboutIntroContent, TimelineContent, SkillsContent, FutureContent } from "@/lib/content"
import { SportsAchievementContent } from "@/components/sports-achievement"
import { getServerTrack } from "@/lib/track-server"
import { resolveTrackContent, resolveTrackArray } from "@/lib/track-content"

export const metadata = {
  title: "关于我 | 曾田力",
  description: "了解曾田力的专业背景、技能和经历。融合水利工程专业智慧与前沿信息技术，致力于解决复杂水资源挑战。",
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const track = await getServerTrack(params)

  const introContentResult = await getContent<AboutIntroContent>('about/intro')
  const timelineContentResult = await getNestedContent<TimelineContent>('about/timeline')
  const skillsContentResult = await getNestedContent<SkillsContent>('about/skills')
  const futureContentResult = await getNestedContent<FutureContent>('about/future')
  const sportsContentResult = await getNestedContent<SportsAchievementContent>('about/sports')

  // resolve track overlay for intro
  const introRaw = introContentResult?.metadata
  const introContent = introRaw ? resolveTrackContent(introRaw as any, track) as AboutIntroContent : null

  const timelineContent = timelineContentResult

  // resolve track overlay for skills (reorder categories)
  let skillsContent = skillsContentResult
  if (skillsContent) {
    const resolved = resolveTrackContent(skillsContent as any, track) as any
    if (resolved.categoryOrder) {
      skillsContent = {
        ...skillsContent,
        categories: resolveTrackArray(skillsContent.categories, resolved.categoryOrder),
      }
    }
    // merge extra categories if present
    if (resolved.extraCategories) {
      skillsContent = {
        ...skillsContent,
        categories: [...resolved.extraCategories, ...skillsContent.categories],
      }
    }
  }

  // resolve track overlay for future
  const futureRaw = futureContentResult
  const futureContent = futureRaw ? resolveTrackContent(futureRaw as any, track) as FutureContent : null

  const sportsContent = sportsContentResult

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl space-y-16">
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
