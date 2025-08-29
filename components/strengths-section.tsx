"use client"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { strengthsConfig, StrengthConfig } from "@/lib/profile-config"

// 组件现在使用外部配置，不再包含硬编码数据

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
          {strengthsConfig.map((strength: StrengthConfig, index: number) => (
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
