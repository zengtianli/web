"use client"
import { strengthsConfig, StrengthConfig } from "@/lib/profile-config"
import { AnimatedSection, FeatureCard, ResponsiveGrid } from "@/components/molecules"

// 组件现在使用外部配置，不再包含硬编码数据

export default function StrengthsSection() {
  return (
    <AnimatedSection 
      title="核心能力"
      titleAlign="center"
      spacing="xl"
      className="bg-secondary/30"
    >
      <ResponsiveGrid 
        strategy="optimal" 
        gap="lg"
        animation="fadeInUp"
        staggerDelay={200}
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="240px"    // 🎨 设置最小高度确保美观
      >
        {strengthsConfig.map((strength: StrengthConfig, index: number) => (
          <FeatureCard
            key={index}
            icon={<strength.icon />}
            title={strength.title}
            description={strength.description}
            variant="hover"
            layout="vertical"
            iconSize="xl"
            className="bg-secondary/50"
          />
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
