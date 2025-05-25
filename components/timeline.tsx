"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { TimelineContent, TimelineItem } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"

// 图标映射表
const iconMap = {
  GraduationCap,
  Briefcase,
};

// 组件属性类型
interface TimelineProps {
  content: TimelineContent;
}

// 扩展的时间线项目类型
interface TimelineItemWithState extends Omit<TimelineItem, 'icon'> {
  expanded: boolean;
  icon: React.ComponentType<any>;
  iconName: string; // 保留原始图标名称
}

export default function Timeline({ content }: TimelineProps) {
  // 处理内容数据，转换为组件所需格式
  const [timeline, setTimeline] = useState<TimelineItemWithState[]>([]);
  
  // 当content变化时，处理时间线数据
  useEffect(() => {
    if (content?.items) {
      const processedItems = content.items.map(item => ({
        ...item,
        expanded: false,
        iconName: item.icon, // 保存原始图标名称
        icon: iconMap[item.icon as keyof typeof iconMap] || GraduationCap,
      }));
      setTimeline(processedItems);
    }
  }, [content]);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleExpand = (index: number) => {
    setTimeline(timeline.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)))
  }

  if (timeline.length === 0) {
    return null; // 如果没有数据，不渲染组件
  }

  return (
    <section id={content.anchor || "Timeline"} className="mb-16" ref={ref}>
      <h2 className={cn(
        "text-3xl font-bold mb-8",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>{content.title}</h2>
      
      {/* 时间线说明 */}
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
        我的学习和职业发展旅程，展示了我在水利工程领域的成长与技能沉淀。
      </p>

      {/* 时间线网格卡片 */}
      <div className="grid md:grid-cols-2 gap-6">
        {timeline.map((item, index) => {
          // 获取对应的图标组件
          const IconComponent = item.icon;
          
          return (
            <Card
              key={index}
              className={cn(
                "border-secondary bg-secondary/20 card-hover overflow-hidden",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "transition-all duration-700 ease-out",
                `delay-${index * 150}ms`
              )}
            >
              <CardContent className="p-6">
                {/* 时期和图标头部 */}
                <div className="flex items-center mb-4">
                  <div className="bg-accent rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <IconComponent className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.period}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
                
                {/* 描述文本 */}
                <div className="mb-4">
                  <p className="text-muted-foreground">
                    {item.expanded ? item.description : `${item.description.substring(0, 100)}${item.description.length > 100 ? '...' : ''}`}
                  </p>
                </div>
                
                {/* 展开部分的技能和荣誉 */}
                <div className={cn("overflow-hidden transition-all duration-300", item.expanded ? "max-h-96" : "max-h-0")}>
                  {/* 技能标签 */}
                  {item.skills.length > 0 && (
                    <div className="mb-3">
                      <p className="font-medium mb-1">核心技能:</p>
                      <div className="flex flex-wrap">
                        {item.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
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
                
                {/* 展开/收起按钮 */}
                {(item.description.length > 100 || item.skills.length > 0 || item.honors.length > 0) && (
                  <Button variant="ghost" size="sm" className="mt-3 text-accent" onClick={() => toggleExpand(index)}>
                    {item.expanded ? (
                      <>收起 <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>展开 <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  )
}
