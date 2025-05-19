"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, BarChart, FileSpreadsheet } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const softwareCopyrights = [
  {
    title: "浙水设计水资源优化调度模型软件",
    description: "基于多目标优化算法的水资源调度系统，支持实时决策与方案评估，提高水资源利用效率。",
    icon: Database,
  },
  {
    title: "浙水设计水资源承载力模型软件",
    description: "集成多维度评价指标的水资源承载力评估系统，支持动态监测与预警，为区域水资源管理提供科学依据。",
    icon: BarChart,
  },
  {
    title: "浙水设计Excel至MIKE智能数据转换软件",
    description: "专业数据格式智能转换工具，支持批量处理，大幅提升水利模型数据准备效率。",
    icon: FileSpreadsheet,
  },
]

export default function SoftwareCopyrights() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">软件著作权</h2>

      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {softwareCopyrights.map((software, index) => (
          <Card
            key={index}
            className={cn(
              "card-hover border-secondary",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${index * 200}`,
            )}
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <software.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">{software.title}</h3>
              <p className="text-sm text-muted-foreground">{software.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
