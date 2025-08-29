"use client"

import { Lightbulb } from "lucide-react"
import { PatentsContent, Patent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { ExpandableCard } from "@/components/molecules"

// 组件现在完全依赖外部数据源，不再包含默认数据

// 组件接口定义
interface PatentsProps {
  data: PatentsContent;
}

export default function Patents({ data }: PatentsProps) {
  return (
    <AnimatedSection 
      title={data.title}
      titleLevel="h2"
      titleVariant="h2"
      spacing="lg"
    >
      <ResponsiveGrid 
        strategy="optimal" // 使用智能网格策略，对应原来的 getGridCols 逻辑
        animation="fadeInUp"
        baseDelay={200} // 对应原来的 index * 200
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="280px"    // 🎨 设置最小高度确保美观
      >
        {data.items.map((patent: Patent, index: number) => (
          <ExpandableCard
            key={index}
            variant="hover" // 对应原来的 card-hover
            expandText="展开详情"
            collapseText="收起详情"
            expandedContent={
              <div>
                <p className="font-medium mb-1">专利描述:</p>
                <p className="text-sm text-muted-foreground">{patent.description}</p>
              </div>
            }
          >
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{patent.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">发明年份: {patent.year}</p>
                <p className="text-sm mb-3">
                  发明人:{" "}
                  {patent.inventors.split("，").map((inventor: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {inventor.includes("曾田力") ? <strong>{inventor}</strong> : inventor}
                      {i < arr.length - 1 ? "，" : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </ExpandableCard>
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
} 