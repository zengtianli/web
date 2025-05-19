"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    name: "领域专长",
    skills: [
      { name: "水资源管理与规划", level: 95 },
      { name: "水文预测与模拟", level: 90 },
      { name: "水利工程设计", level: 85 },
      { name: "水资源承载力评价", level: 95 },
    ],
  },
  {
    name: "技术核心",
    skills: [
      { name: "机器学习/深度学习", level: 85 },
      { name: "数据分析与可视化", level: 90 },
      { name: "水文模型开发", level: 95 },
      { name: "GIS空间分析", level: 80 },
    ],
  },
  {
    name: "编程语言",
    skills: [
      { name: "Python", level: 90 },
      { name: "MATLAB", level: 85 },
      { name: "Fortran", level: 75 },
      { name: "JavaScript/TypeScript", level: 70 },
    ],
  },
]

export default function SkillsVisual() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

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
  }, [inView])

  return (
    <section className="mb-16" ref={ref}>
      <h2 className="text-3xl font-bold mb-8">技能图谱</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, catIndex) => (
          <Card
            key={catIndex}
            className={cn(
              "border-secondary bg-secondary/20",
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
    </section>
  )
}
