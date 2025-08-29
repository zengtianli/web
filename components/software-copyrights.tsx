"use client"

import { Database, BarChart, FileSpreadsheet, FileText } from "lucide-react"
import { SoftwareCopyrightsContent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { FeatureCard } from "@/components/molecules"

const iconMap = {
  "Database": Database,
  "BarChart": BarChart,
  "FileSpreadsheet": FileSpreadsheet,
  "FileText": FileText
};

// 组件现在完全依赖外部数据源，不再包含默认数据

interface SoftwareCopyrightsProps {
  data: SoftwareCopyrightsContent;
}

export default function SoftwareCopyrights({ data }: SoftwareCopyrightsProps) {
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
        gap="lg" // 对应原来的 gap-6
      >
        {data.items.map((software, index) => {
          // 获取图标组件
          const Icon = iconMap[software.icon as keyof typeof iconMap] || FileText;
          
          return (
            <FeatureCard
              key={index}
              icon={<Icon />}
              title={software.title}
              description={software.description}
              variant="hover" // 对应原来的 card-hover
              layout="vertical" // 图标在上方，垂直布局
              iconSize="xl" // 对应原来的 w-12 h-12
              primaryAction={{
                label: "查看说明书",
                href: software.pdfLink,
                variant: "outline"
              }}
            />
          );
        })}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
