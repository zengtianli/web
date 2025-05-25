"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { FutureContent } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Brain, Workflow } from "lucide-react"

// 组件属性类型
interface FutureOutlookProps {
  content: FutureContent & {
    anchor?: string; // 页面锚点ID
  };
}

// 图标映射表
const iconMap = {
  Sparkles,
  Brain,
  Workflow,
};

// 默认的未来展望内容，当内容文件加载失败时使用
const defaultFutureContent: FutureContent = {
  title: "未来展望",
  description: "我对未来水利行业发展的思考与个人职业规划",
  visionPoints: [
    {
      title: "数字孪生水利",
      description: "深入推进数字孪生技术在水利工程全生命周期的应用，构建虚实融合的智能决策系统。",
      icon: "Sparkles"
    },
    {
      title: "水利人工智能",
      description: "探索深度学习、强化学习等前沿AI技术在水文预测、工程管理中的创新应用。",
      icon: "Brain"
    },
    {
      title: "跨学科融合",
      description: "促进水利工程与信息技术、环境科学、生态学等学科的深度融合，培养复合型创新人才。",
      icon: "Workflow"
    }
  ]
};

export default function FutureOutlook({ content = defaultFutureContent }: FutureOutlookProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <section id={content.anchor || "FutureOutlook"} className="mb-16" ref={ref}>
      <h2 className={cn(
        "text-3xl font-bold mb-4",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>{content.title}</h2>

      {content.description && (
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
          {content.description}
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {content.visionPoints && content.visionPoints.map((point, index) => {
          // 获取对应的图标组件
          const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Sparkles;
          
          return (
            <Card
              key={index}
              className={cn(
                "border-secondary bg-secondary/20 card-hover",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "transition-all duration-700 ease-out",
                `delay-${index * 200}`,
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-accent/20 rounded-full p-2 mr-3">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{point.title}</h3>
                </div>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  )
}
