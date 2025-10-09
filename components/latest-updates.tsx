"use client"
import Image from "next/image"
import { LatestUpdatesContent, LatestUpdate } from "@/lib/content"
import { AnimatedSection, FeatureCard, ResponsiveGrid } from "@/components/molecules"

// 组件接口定义
interface LatestUpdatesProps {
  data: LatestUpdatesContent;
}

export default function LatestUpdates({ data }: LatestUpdatesProps) {
  return (
    <AnimatedSection 
      title={data.title}
      titleAlign="center"
      spacing="xl"
    >
      <ResponsiveGrid 
        strategy="responsive" 
        gap="lg"
        animation="fadeInUp"
        staggerDelay={200}
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="300px"    // 🎨 设置最小高度确保美观
      >
        {data.items.map((update: LatestUpdate, index: number) => (
          <FeatureCard
            key={index}
            title={update.title}
            description={update.description}
            variant="hover"
            layout="vertical"
            className="overflow-hidden"
            primaryAction={{
              label: "阅读更多",
              href: update.link,
              variant: "ghost"
            }}
          >
            {/* 更新图片 */}
            <div className="relative h-48 mb-4 -mx-6 -mt-6">
              <Image 
                src={update.image || "/placeholder.svg"} 
                alt={update.title} 
                fill 
                className="object-cover"
                priority={index === 0} // ⚡ 首张图片优先加载，提升 LCP
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </FeatureCard>
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
