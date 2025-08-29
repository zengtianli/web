"use client"

import { useState, useEffect } from "react"
import { GraduationCap, Briefcase } from "lucide-react"
import { TimelineContent, TimelineItem } from "@/lib/content"
import { AnimatedSection, ResponsiveGrid, ExpandableCard, SkillTag, TagGroup } from "@/components/molecules"
import { IconWrapper } from "@/components/atoms"

// 图标映射表
const iconMap = {
  GraduationCap,
  Briefcase,
};

// 组件属性类型
interface TimelineProps {
  content: TimelineContent;
}

export default function Timeline({ content }: TimelineProps) {
  // 处理内容数据，转换为组件所需格式
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  
  // 当content变化时，处理时间线数据
  useEffect(() => {
    if (content?.items) {
      setTimeline(content.items);
    }
  }, [content]);

  if (timeline.length === 0) {
    return null; // 如果没有数据，不渲染组件
  }

  return (
    <AnimatedSection 
      title={content.title}
      titleLevel="h2"
      titleVariant="h2"
      description="我的学习和职业发展旅程，展示了我在水利工程领域的成长与技能沉淀。"
      anchor={content.anchor || "Timeline"}
      spacing="lg"
    >
      <ResponsiveGrid 
        strategy="compact" // 使用 2列布局，对应原来的 md:grid-cols-2
        gap="md" // 对应原来的 gap-6
        animation="fadeInUp"
        baseDelay={150} // 对应原来的 index * 150
        alignItems="stretch" // 🎨 关键：让同行卡片高度一致！
        minItemHeight="320px" // 🎨 设置最小高度，确保美观
      >
        {timeline.map((item, index) => {
          // 获取对应的图标组件
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || GraduationCap;
          
          return (
            <ExpandableCard
              key={index}
              variant="hover" // 对应原来的 card-hover
              expandText="展开"
              collapseText="收起"
              expandedContent={
                <div>
                  {/* 技能标签 */}
                  {item.skills.length > 0 && (
                    <div className="mb-3">
                      <p className="font-medium mb-1">核心技能:</p>
                      <TagGroup gap="sm" className="mt-1">
                        {item.skills.map((skill, skillIndex) => (
                          <SkillTag key={skillIndex} skill={skill} />
                        ))}
                      </TagGroup>
                    </div>
                  )}
                  
                  {/* 荣誉列表 */}
                  {item.honors.length > 0 && (
                    <div>
                      <p className="font-medium mb-1">荣誉:</p>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {item.honors.map((honor, honorIndex) => (
                          <li key={honorIndex}>{honor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              }
            >
              {/* 时期和图标头部 */}
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  <IconWrapper 
                    size="md" 
                    variant="primary"
                  >
                    <IconComponent />
                  </IconWrapper>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{item.period}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
              </div>
              
              {/* 描述文本 */}
              <div className="mb-4">
                <p className="text-muted-foreground">
                  {item.description.length > 100 
                    ? `${item.description.substring(0, 100)}...` 
                    : item.description
                  }
                </p>
              </div>
            </ExpandableCard>
          );
        })}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
