"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Star, Target } from "lucide-react"

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

export default function SportsAchievementComponent({ content }: SportsAchievementProps) {
  return (
    <section className="py-16" id="sports-achievement">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Trophy className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            {content.title}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
          {content.subtitle}
        </p>
        
        {/* 官方荣誉突出显示 */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <CardHeader className="text-center pb-3">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-xl text-orange-400">
                  {content.officialHonor.title}
                </CardTitle>
                <Star className="h-5 w-5 text-orange-500" />
              </div>
              <CardDescription className="text-muted-foreground">
                {content.officialHonor.organization} · {content.officialHonor.year}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-sm leading-relaxed">
                {content.officialHonor.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 成就统计 */}
        <div className="flex justify-center mb-8">
          <Badge variant="outline" className="text-lg px-4 py-2 bg-orange-500/10 border-orange-500/30 text-orange-300">
            <Trophy className="h-4 w-4 mr-2" />
            总冠军数: {content.totalChampionships}次
          </Badge>
        </div>
      </div>

      {/* 成就分类展示 */}
      <div className="grid md:grid-cols-2 gap-4">
        {content.categories.map((category, index) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Trophy
          
          return (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10">
                    <IconComponent className="h-4 w-4 text-orange-500" />
                  </div>
                  <CardTitle className="text-base">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {category.isCompact ? (
                  // 新兴运动的紧凑展示
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {category.sports?.map((sport, sportIndex) => (
                        <Badge 
                          key={sportIndex}
                          variant="outline" 
                          className="text-xs bg-orange-500/10 text-orange-300 border-orange-500/30"
                        >
                          {sport}
                        </Badge>
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
                      <div key={achievementIndex} className={`p-2 rounded-lg border transition-all duration-200 ${
                        achievement.highlight 
                          ? 'border-orange-500/30 bg-orange-500/5' 
                          : 'border-border/50 bg-card/50'
                      }`}>
                        <div className="flex items-start justify-between mb-1.5">
                          <h4 className="font-medium text-sm leading-snug flex-1">
                            {achievement.title}
                          </h4>
                          <div className="flex flex-col items-end space-y-1 ml-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                achievement.highlight 
                                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                                  : 'bg-muted/50'
                              }`}
                            >
                              {achievement.year}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {achievement.level}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 体育精神总结 */}
      <div className="mt-8 text-center">
        <Card className="max-w-4xl mx-auto border-border/50 bg-card/50">
          <CardContent className="pt-4 pb-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="p-2 rounded-full bg-orange-500/10 w-fit mx-auto mb-2">
                  <Target className="h-5 w-5 text-orange-500" />
                </div>
                <h4 className="font-semibold mb-1 text-sm">竞技精神</h4>
                <p className="text-xs text-muted-foreground">
                  永不放弃，追求卓越，团队协作
                </p>
              </div>
              <div>
                <div className="p-2 rounded-full bg-orange-500/10 w-fit mx-auto mb-2">
                  <Medal className="h-5 w-5 text-orange-500" />
                </div>
                <h4 className="font-semibold mb-1 text-sm">全面发展</h4>
                <p className="text-xs text-muted-foreground">
                  多项运动技能，体现综合素质
                </p>
              </div>
              <div>
                <div className="p-2 rounded-full bg-orange-500/10 w-fit mx-auto mb-2">
                  <Star className="h-5 w-5 text-orange-500" />
                </div>
                <h4 className="font-semibold mb-1 text-sm">工作促进</h4>
                <p className="text-xs text-muted-foreground">
                  体育精神与专业精神完美结合
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
