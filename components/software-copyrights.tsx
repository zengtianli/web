"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Database, BarChart, FileSpreadsheet, FileText } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const softwareCopyrights = [
  {
    title: "浙水设计水资源优化调度模型软件",
    description: "基于多目标优化算法的水资源调度系统，支持实时决策与方案评估，提高水资源利用效率。",
    icon: Database,
    pdfLink: "/soft_copyright/浙水设计-水资源优化调度模型软件.pdf",
  },
  {
    title: "浙水设计水资源承载力模型软件",
    description: "集成多维度评价指标的水资源承载力评估系统，支持动态监测与预警，为区域水资源管理提供科学依据。",
    icon: BarChart,
    pdfLink: "/soft_copyright/浙水设计-水资源承载力模型软件.pdf",
  },
  {
    title: "浙水设计Excel至MIKE智能数据转换软件",
    description: "专业数据格式智能转换工具，支持批量处理，大幅提升水利模型数据准备效率。",
    icon: FileSpreadsheet,
    pdfLink: "/soft_copyright/浙水设计-Excel至MIKE智能数据转换软件.pdf",
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
              <p className="text-sm text-muted-foreground mb-4">{software.description}</p>
              <Link href={software.pdfLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full group">
                  <FileText className="h-4 w-4 mr-2 text-accent" />
                  查看说明书
                  <span className="sr-only">{software.title}</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
