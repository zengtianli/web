"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Droplets } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const strengths = [
  {
    icon: Brain,
    title: "智能水资源建模",
    description: "结合LSTM、数字孪生等先进技术，构建智能水资源模型，提供精准预测与决策支持。",
  },
  {
    icon: Code,
    title: "软件与系统开发",
    description: "全栈开发能力，专注于水利行业专业软件系统研发，提升工程效率与管理水平。",
  },
  {
    icon: Droplets,
    title: "水利专业解决方案",
    description: "深厚的水利专业背景，提供承载力评价、岸线规划等专业解决方案，解决行业痛点。",
  },
]

export default function StrengthsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">核心能力</h2>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <Card
              key={index}
              className={cn(
                "card-hover bg-secondary/50 border-secondary",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "transition-all duration-700 ease-out",
                `delay-${index * 200}`,
              )}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <strength.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{strength.title}</h3>
                <p className="text-muted-foreground">{strength.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
