"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const timelineData = [
  {
    period: "2009.09 - 2013.06",
    title: "本科 | 浙江大学 - 水资源与海洋工程",
    icon: GraduationCap,
    description:
      "系统学习水利工程基础理论与专业知识，掌握水文学、水力学、水工建筑物等核心课程。初步接触MATLAB编程与水利模型应用。",
    skills: ["水文学", "水力学", "MATLAB入门", "工程制图"],
    honors: ["优秀学生一等奖学金", "坤和奖学金二等奖"],
    expanded: false,
  },
  {
    period: "2013.09 - 2016.06",
    title: "硕士 | 浙江大学 - 水利工程",
    icon: GraduationCap,
    description:
      "深入研究水资源管理与水文模拟，开始探索机器学习在水文预测中的应用。参与多个水利工程实践项目，提升专业技能与研究能力。",
    skills: ["水资源系统分析", "Delft3D", "Python基础", "GIS应用"],
    honors: ["三好研究生", "优秀研究生", "优秀团干部"],
    expanded: false,
  },
  {
    period: "2016.09 - 2020.06",
    title: "博士 | 浙江大学 - 水利工程",
    icon: GraduationCap,
    description:
      "专注于深度学习在水资源预测与管理中的应用研究，开发智能水资源模型与决策支持系统。发表多篇高质量学术论文，获得国家留学基金委公派留学资格。",
    skills: ["Python (PyTorch/TensorFlow)", "深度学习", "时间序列分析", "水资源优化"],
    honors: ["国家留学基金委公派留学奖学金", "三好研究生", "优秀研究生"],
    expanded: false,
  },
  {
    period: "2023.09 - 至今",
    title: "工程师 | 浙江省水利水电规划设计院",
    icon: Briefcase,
    description:
      "负责水利工程规划设计与技术创新工作，主导多个重点项目的技术方案制定与实施。将AI技术与传统水利工程相结合，开发多款专业软件系统，提升工程效率与决策水平。",
    skills: ["AHP/CRITIC/TOPSIS", "React/Vue.js", "Fortran/OpenMP", "高性能计算", "软件系统开发"],
    honors: [],
    expanded: false,
  },
]

export default function Timeline() {
  const [timeline, setTimeline] = useState(timelineData)

  const toggleExpand = (index: number) => {
    setTimeline(timeline.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)))
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">我的历程与技能沉淀</h2>

      <div className="relative pl-8 border-l-2 border-secondary space-y-12">
        {timeline.map((item, index) => (
          <div key={index} className="relative">
            <div className="timeline-dot">
              <item.icon className="h-4 w-4 text-background absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="mb-2 text-sm text-muted-foreground">{item.period}</div>

            <h3 className="text-xl font-bold mb-2">{item.title}</h3>

            <p className="text-muted-foreground mb-3">
              {item.description.substring(0, item.expanded ? undefined : 100)}
              {!item.expanded && item.description.length > 100 && "..."}
            </p>

            <div className={cn("overflow-hidden transition-all duration-300", item.expanded ? "max-h-96" : "max-h-0")}>
              {item.skills.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium mb-1">核心技能:</p>
                  <div className="flex flex-wrap">
                    {item.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.honors.length > 0 && (
                <div>
                  <p className="font-medium mb-1">荣誉:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {item.honors.map((honor, honorIndex) => (
                      <li key={honorIndex}>{honor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {item.description.length > 100 || item.skills.length > 0 || item.honors.length > 0 ? (
              <Button variant="ghost" size="sm" className="mt-2 text-accent" onClick={() => toggleExpand(index)}>
                {item.expanded ? (
                  <>
                    收起 <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    展开 <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
