"use client"

import { Award } from "lucide-react"
import { AwardsContent } from "@/lib/content"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { FeatureCard } from "@/components/molecules"

// 组件接口定义
interface AwardsProps {
  data?: AwardsContent;
}

// 默认奖项数据
const defaultAwardsData: AwardsContent = {
  title: "荣誉奖项",
  items: [
    {
      title: "国家留学基金委公派留学奖学金",
      year: "2016",
      organization: "国家留学基金管理委员会",
    },
    {
      title: "三好研究生",
      year: "2013-2016",
      organization: "浙江大学",
      note: "多次获得",
    },
    {
      title: "优秀研究生",
      year: "2013-2016",
      organization: "浙江大学",
      note: "多次获得",
    },
    {
      title: "优秀团干部",
      year: "2012",
      organization: "浙江大学",
    },
    {
      title: "坤和奖学金二等奖",
      year: "2012",
      organization: "浙江大学",
    },
    {
      title: "优秀学生一等奖学金",
      year: "2010-2012",
      organization: "浙江大学",
      note: "多次获得",
    },
  ]
}

export default function Awards({ data = defaultAwardsData }: AwardsProps) {
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
