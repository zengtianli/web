"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { SkillsContent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"

// 组件属性类型
interface SkillsVisualProps {
  content: SkillsContent & {
    anchor?: string; // 页面锚点ID
  };
}

// 组件现在完全依赖外部数据源，不再包含默认数据

export default function SkillsVisual({ content }: SkillsVisualProps) {
  // 如果没有技能数据，不渲染组件
  if (!content || !content.categories || content.categories.length === 0) {
    return null;
  }

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // 使用内容文件中的数据
  const skillCategories = content.categories;

  useEffect(() => {
    if (inView) {
      progressRefs.current.forEach((ref, index) => {
        if (ref) {
          setTimeout(() => {
            const skill = skillCategories.flatMap((cat) => cat.skills)[index]
            if (skill) {
              ref.style.width = `${skill.level}%`
            }
          }, 100 * index)
        }
      })
    }
  }, [inView, skillCategories])

  return (
    <AnimatedSection 
      title={content.title || "技能图谱"}
      titleLevel="h2"
      titleVariant="h2"
      description={content.description}
      anchor={content.anchor || "SkillsVisual"}
      spacing="lg"
    >
      <div ref={ref} className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, catIndex) => (
          <Card
            key={catIndex}
            className={cn(
              "border-secondary bg-secondary/20 card-hover",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${catIndex * 200}`,
            )}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">{category.name}</h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const globalIndex = catIndex * category.skills.length + skillIndex

                  return (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          ref={(el) => (progressRefs.current[globalIndex] = el)}
                          className="h-full bg-accent transition-all duration-1000 ease-out"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  )
}
