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

// 默认软件著作权数据，当没有提供数据时使用
const defaultSoftwareCopyrights = {
  title: "软件著作权",
  items: [
    {
      title: "浙水设计水资源优化调度模型软件",
      description: "基于多目标优化算法的水资源调度系统，支持实时决策与方案评估，提高水资源利用效率。",
      icon: "Database",
      pdfLink: "/soft_copyright/浙水设计-水资源优化调度模型软件.pdf",
    },
    {
      title: "浙水设计水资源承载力模型软件",
      description: "集成多维度评价指标的水资源承载力评估系统，支持动态监测与预警，为区域水资源管理提供科学依据。",
      icon: "BarChart",
      pdfLink: "/soft_copyright/浙水设计-水资源承载力模型软件.pdf",
    },
    {
      title: "浙水设计Excel至MIKE智能数据转换软件",
      description: "专业数据格式智能转换工具，支持批量处理，大幅提升水利模型数据准备效率。",
      icon: "FileSpreadsheet",
      pdfLink: "/soft_copyright/浙水设计-Excel至MIKE智能数据转换软件.pdf",
    },
  ]
};

interface SoftwareCopyrightsProps {
  data?: SoftwareCopyrightsContent;
}

export default function SoftwareCopyrights({ data = defaultSoftwareCopyrights }: SoftwareCopyrightsProps) {
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
