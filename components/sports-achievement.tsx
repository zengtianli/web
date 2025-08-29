"use client"

import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedSection, ResponsiveGrid, ExpandableCard, FeatureCard } from "@/components/molecules"

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
}

interface SportsAchievementProps {
  content: SportsAchievementContent
}

// 🎯 重构：展开式体育项目卡片组件
function SportsCategoryCard({ category }: { category: SportsAchievement }) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Trophy
  
  // 🎨 基础概要内容：项目名 + 最高成就 + 统计
  const summaryContent = category.isCompact ? (
    // 新兴运动的概要
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold">{category.category}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {category.sports?.slice(0, 3).map((sport, sportIndex) => (
          <span 
            key={sportIndex}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-accent/10 text-accent border-accent/30"
          >
            {sport}
          </span>
        ))}
        {category.sports && category.sports.length > 3 && (
          <span className="text-xs text-muted-foreground">+{category.sports.length - 3}项</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {category.description}
      </p>
    </div>
  ) : (
    // 常规运动的概要：显示最高成就
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold">{category.category}</h3>
      </div>
      
      {/* 显示最高亮的成就 */}
      {category.achievements && (
        <div>
          {(() => {
            const topAchievement = category.achievements.find(a => a.highlight) || category.achievements[0]
            return (
              <div className="p-3 rounded-lg border border-accent/20 bg-accent/5">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-sm text-accent">🏆 {topAchievement.title}</h4>
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                    {topAchievement.year}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{topAchievement.level}</p>
              </div>
            )
          })()}
          
          {/* 成就统计 */}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Medal className="h-4 w-4" />
            <span>共 {category.achievements.length} 项成就</span>
          </div>
        </div>
      )}
    </div>
  )
  
  // 🎨 详细展开内容：所有成就列表
  const expandedContent = category.isCompact ? (
    // 新兴运动的详细信息
    <div className="space-y-3">
      <div>
        <p className="font-medium mb-2">涉及运动项目:</p>
        <div className="flex flex-wrap gap-1.5">
          {category.sports?.map((sport, sportIndex) => (
            <span 
              key={sportIndex}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-accent/10 text-accent border-accent/30"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium mb-1">详细描述:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  ) : (
    // 常规运动的所有成就
    <div className="space-y-3">
      <p className="font-medium mb-2">所有成就详情:</p>
      {category.achievements?.map((achievement, achievementIndex) => (
        <div key={achievementIndex} className={cn(
          "p-3 rounded-lg border transition-all duration-200",
          achievement.highlight 
            ? 'border-accent/30 bg-accent/5' 
            : 'border-border/50 bg-card/30'
        )}>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm leading-snug flex-1">
              {achievement.highlight && '🏆 '}
              {achievement.title}
            </h4>
            <div className="flex items-center gap-2 ml-2">
              <span className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                achievement.highlight 
                  ? 'bg-accent/20 text-accent border-accent/30' 
                  : 'bg-muted/50 text-muted-foreground border-border'
              )}>
                {achievement.year}
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-border/50 bg-secondary/50 text-secondary-foreground">
                {achievement.level}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {achievement.description}
          </p>
        </div>
      ))}
    </div>
  )

  return (
    <ExpandableCard
      variant="hover"
      expandText="查看详细成就"
      collapseText="收起详情"
      expandedContent={expandedContent}
      className="h-full" // 🎯 确保高度拉伸
    >
      {summaryContent}
    </ExpandableCard>
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

      {/* 🎯 展开式成就分类展示 */}
      <ResponsiveGrid 
        strategy="responsive" 
        gap="md" 
        animation="fadeInUp"
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="280px"    // 🎨 基础展示高度（展开前）
        staggerDelay={150}
      >
        {content.categories.map((category, index) => (
          <SportsCategoryCard key={index} category={category} />
        ))}
      </ResponsiveGrid>


    </AnimatedSection>
  )
}
