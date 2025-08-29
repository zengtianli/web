"use client"

import { Award } from "lucide-react"
import { AwardsContent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { FeatureCard } from "@/components/molecules"

// 组件接口定义
interface AwardsProps {
  data: AwardsContent;
}

// 组件现在完全依赖外部数据源，不再包含默认数据

export default function Awards({ data }: AwardsProps) {
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
        baseDelay={100} // 对应原来的 index * 100
      >
        {data.items.map((award: { title: string; year: string; organization: string; note?: string }, index: number) => (
          <FeatureCard
            key={index}
            icon={<Award />}
            title={award.title}
            subtitle={`${award.year} · ${award.organization}${award.note ? ` (${award.note})` : ''}`}
            variant="hover" // 对应原来的 card-hover
            layout="horizontal"
            padding="sm" // 对应原来的 p-4
          />
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
