"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, GraduationCap, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"
import { TimelineContent, TimelineItem } from "@/lib/content"

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
    <section id="Timeline" className="mb-16" ref={ref}>
      <h2 className={cn(
        "text-3xl font-bold mb-8",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>{content.title}</h2>

      <div className="relative pl-12 border-l-2 border-secondary space-y-12">
        {timeline.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "relative",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
              "transition-all duration-700 ease-out",
              `delay-[${index * 150}ms]`
            )}
          >
            <div className="absolute top-0 left-0 w-12 flex items-center justify-center">
              <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center absolute transform -translate-x-[3rem]">
                <item.icon className="h-4 w-4 text-background" />
              </div>
            </div>

            <div className="mb-2 text-sm text-muted-foreground">{item.period}</div>

            <h3 className="text-xl font-bold mb-2">{item.title}</h3>

            <p className="text-muted-foreground mb-3">
              {item.description.substring(0, item.expanded ? undefined : 100)}
              {!item.expanded && item.description.length > 100 && "..."}
            </p>

            <div className={cn("overflow-hidden transition-all duration-300", item.expanded ? "max-h-96" : "max-h-0")}>
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

            {item.description.length > 100 || item.skills.length > 0 || item.honors.length > 0 ? (
              <Button variant="ghost" size="sm" className="mt-2 text-accent" onClick={() => toggleExpand(index)}>
                {item.expanded ? (
                  <>
                    收起 <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    展开 <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
