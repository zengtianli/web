"use client"

import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Star, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedSection, FeatureCard, ResponsiveGrid } from "@/components/molecules"

export interface SportsAchievement {
  category: string
  icon: string
  isCompact?: boolean
  sports?: string[]
  description?: string
  achievements?: {
    title: string
    year: string
    level: string
    description: string
    highlight?: boolean
  }[]
}

export interface SportsAchievementContent {
  title: string
  subtitle: string
  totalChampionships: number
  officialHonor: {
    title: string
    year: string
    organization: string
    description: string
  }
  categories: SportsAchievement[]
}

const iconMap = {
  Trophy,
  Medal,
  Star,
  Target,
}

interface SportsAchievementProps {
  content: SportsAchievementContent
}

// 内部 CategoryCard 组件 - 使用 FeatureCard 但处理复杂内容
function CategoryCard({ category }: { category: SportsAchievement }) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Trophy
  
  const categoryContent = category.isCompact ? (
    // 新兴运动的紧凑展示
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {category.sports?.map((sport, sportIndex) => (
          <span 
            key={sportIndex}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-300 border-orange-500/30"
          >
            {sport}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {category.description}
      </p>
    </div>
  ) : (
    // 常规成就展示
    <div className="space-y-3">
      {category.achievements?.map((achievement, achievementIndex) => (
        <div key={achievementIndex} className={cn(
          "p-2 rounded-lg border transition-all duration-200 hover:shadow-sm",
          achievement.highlight 
            ? 'border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10' 
            : 'border-border/50 bg-card/50 hover:bg-card/80'
        )}>
          <div className="flex items-start justify-between mb-1.5">
            <h4 className="font-medium text-sm leading-snug flex-1">
              {achievement.title}
            </h4>
            <div className="flex flex-col items-end space-y-1 ml-2">
              <span 
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  achievement.highlight 
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                    : 'bg-muted/50'
                )}
              >
                {achievement.year}
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground">
                {achievement.level}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {achievement.description}
          </p>
        </div>
      ))}
    </div>
  )

  return (
    <FeatureCard
      icon={<IconComponent />}
      title={category.category}
      variant="hover"
      layout="horizontal"
      headerless={true}
    >
      {categoryContent}
    </FeatureCard>
  )
}

export default function SportsAchievement({ content }: SportsAchievementProps) {
  return (
    <AnimatedSection
      title={content.title}
      subtitle={content.subtitle}
      titleAlign="center"
      anchor="sports-achievement"
      spacing="lg"
    >
      {/* 官方荣誉突出显示 */}
      <div className="max-w-2xl mx-auto mb-8">
        <FeatureCard
          icon={<Star />}
          title={content.officialHonor.title}
          subtitle={`${content.officialHonor.organization} · ${content.officialHonor.year}`}
          description={content.officialHonor.description}
          variant="gradient"
          layout="vertical"
          className="border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-red-500/10"
        />
      </div>

      {/* 成就统计 */}
      <div className="flex justify-center mb-8">
        <span className="inline-flex items-center rounded-full border px-4 py-2 text-lg font-semibold bg-orange-500/10 border-orange-500/30 text-orange-300">
          <Trophy className="h-4 w-4 mr-2" />
          总冠军数: {content.totalChampionships}次
        </span>
      </div>

      {/* 成就分类展示 */}
      <ResponsiveGrid strategy="responsive" gap="md" animation="fadeInUp">
        {content.categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </ResponsiveGrid>

      {/* 体育精神总结 */}
      <div className="mt-8 max-w-4xl mx-auto">
        <ResponsiveGrid strategy="optimal" gap="md" animation="fadeInUp">
          <FeatureCard
            icon={<Target />}
            title="竞技精神"
            description="永不放弃，追求卓越，团队协作"
            variant="hover"
            layout="vertical"
            className="text-center"
          />
          <FeatureCard
            icon={<Medal />}
            title="全面发展"
            description="多项运动技能，体现综合素质"
            variant="hover"
            layout="vertical"
            className="text-center"
          />
          <FeatureCard
            icon={<Star />}
            title="工作促进"
            description="体育精神与专业精神完美结合"
            variant="hover"
            layout="vertical"
            className="text-center"
          />
        </ResponsiveGrid>
      </div>
    </AnimatedSection>
  )
}
