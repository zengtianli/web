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
      >
        {content.visionPoints && content.visionPoints.map((point, index) => {
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
