"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { SkillsContent } from "@/lib/content"
import { AnimatedSection, ResponsiveGrid } from "@/components/molecules"

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

  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // 使用内容文件中的数据
  const skillCategories = content.categories;

  // 进度条动画将由 ResponsiveGrid 的 inView 状态触发
  const { ref: gridRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      progressRefs.current.forEach((ref, index) => {
        if (ref) {
          setTimeout(() => {
            const skill = skillCategories.flatMap((cat) => cat.skills)[index]
            if (skill) {
              ref.style.width = `${skill.level}%`
            }
          }, 100 * index + 500) // 延迟500ms，让卡片动画先完成
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
      <div ref={gridRef}>
        <ResponsiveGrid 
          strategy="optimal" 
          gap="lg"
          animation="fadeInUp"
          staggerDelay={200}
          enableInView={false} // 我们手动控制 inView
          alignItems="stretch"     // 🎨 关键：让卡片高度一致！
          minItemHeight="280px"    // 🎨 设置最小高度确保美观
        >
        {skillCategories.map((category, catIndex) => (
          <Card
            key={catIndex}
            className="border-secondary bg-secondary/20 card-hover"
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
        </ResponsiveGrid>
      </div>
    </AnimatedSection>
  )
}
