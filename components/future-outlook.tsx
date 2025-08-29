"use client"

import { FutureContent } from "@/lib/content"
import { Sparkles, Brain, Workflow } from "lucide-react"
import { AnimatedSection } from "@/components/molecules"
import { ResponsiveGrid } from "@/components/molecules"
import { FeatureCard } from "@/components/molecules"

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

// 组件现在完全依赖外部数据源，不再包含默认数据

export default function FutureOutlook({ content }: FutureOutlookProps) {
  if (!content || !content.visionPoints || content.visionPoints.length === 0) {
    return null;
  }

  return (
    <AnimatedSection 
      title={content.title}
      titleLevel="h2"
      titleVariant="h2"
      description={content.description}
      anchor={content.anchor || "FutureOutlook"}
      spacing="lg"
    >
      <ResponsiveGrid 
        strategy="responsive" // 使用 3列布局，对应原来的 md:grid-cols-3
        gap="lg" // 对应原来的 gap-8
        animation="fadeInUp"
        baseDelay={200} // 对应原来的 index * 200
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="200px"    // 🎨 设置最小高度确保美观
      >
        {content.visionPoints.map((point, index) => {
          // 获取对应的图标组件
          const IconComponent = iconMap[point.icon as keyof typeof iconMap] || Sparkles;
          
          return (
            <FeatureCard
              key={index}
              icon={<IconComponent />}
              title={point.title}
              description={point.description}
              variant="hover" // 对应原来的 card-hover
              layout="horizontal" // 图标在左侧
              iconSize="md" // 对应原来的 h-5 w-5
              iconVariant="accent" // 对应原来的 text-accent
            />
          );
        })}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
