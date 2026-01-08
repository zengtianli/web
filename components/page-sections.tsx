/**
 * 页面区块组件集合
 * 包含：关于页介绍、未来展望、技能展示、时间线、核心能力
 */

import Image from "next/image"
import { GraduationCap, Briefcase, Sparkles, Brain, Workflow } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AboutIntroContent, 
  FutureContent, 
  SkillsContent, 
  TimelineContent, 
  TimelineItem 
} from "@/lib/content"
import { strengthsConfig, StrengthConfig } from "@/lib/profile-config"

// ============== 关于页介绍 ==============
interface AboutIntroProps {
  content: AboutIntroContent
}

export function AboutIntro({ content }: AboutIntroProps) {
  const { title, subtitle, description, slogan, profileImage } = content
  const formattedDescription = description.replace(
    /\*\*(.*?)\*\*/g,
    '<span class="text-accent font-medium">$1</span>'
  )

  return (
    <section>
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <Card className="border-secondary">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-accent/30">
                <Image src={profileImage} alt={subtitle} fill className="object-cover" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{subtitle}</h3>
              <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
              <p className="text-lg font-medium text-accent">{slogan}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// ============== 未来展望 ==============
const futureIconMap = { Sparkles, Brain, Workflow }

interface FutureOutlookProps {
  content: FutureContent
}

export function FutureOutlook({ content }: FutureOutlookProps) {
  if (!content?.visionPoints?.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      {content.description && <p className="text-muted-foreground mb-6">{content.description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.visionPoints.map((point, index) => {
          const IconComponent = futureIconMap[point.icon as keyof typeof futureIconMap] || Sparkles
          return (
            <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 shrink-0">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

// ============== 技能展示 ==============
interface SkillsVisualProps {
  content: SkillsContent
}

export function SkillsVisual({ content }: SkillsVisualProps) {
  if (!content?.categories?.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">{content.title || "技能图谱"}</h2>
      {content.description && <p className="text-muted-foreground mb-6">{content.description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.categories.map((category, index) => (
          <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">{category.name}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ============== 时间线 ==============
const timelineIconMap = { GraduationCap, Briefcase }

interface TimelineProps {
  content: TimelineContent
}

export function Timeline({ content }: TimelineProps) {
  if (!content?.items?.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
      <p className="text-muted-foreground mb-6">我的学习和职业发展旅程</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.items.map((item: TimelineItem, index: number) => {
          const IconComponent = timelineIconMap[item.icon as keyof typeof timelineIconMap] || GraduationCap
          return (
            <Card key={index} className="border-secondary bg-secondary/10 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                {item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                )}
                {item.honors.length > 0 && (
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {item.honors.map((honor, i) => <li key={i}>{honor}</li>)}
                  </ul>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

// ============== 核心能力 ==============
export function StrengthsSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">核心能力</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strengthsConfig.map((strength: StrengthConfig, index: number) => (
            <Card key={index} className="text-center bg-secondary/50 border-secondary hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                  <strength.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">{strength.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{strength.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

