"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { FutureContent } from "@/lib/content"

// 组件属性类型
interface FutureOutlookProps {
  content: FutureContent & {
    anchor?: string; // 页面锚点ID
  };
}

// 默认的未来展望内容，当内容文件加载失败时使用
const defaultFutureContent: FutureContent = {
  title: "未来展望",
  description: "我期待继续深耕水利工程与信息技术的融合创新领域，探索AI、大数据、数字孪生等前沿技术在水资源管理中的应用。未来，我将致力于构建更智能、更精准的水资源决策支持系统，推动水利行业数字化转型，为水资源可持续利用与水环境保护贡献专业力量。同时，我也希望能够与更多志同道合的专业人士合作，共同应对全球水资源挑战，创造更美好的水生态环境。",
  visionPoints: []
};

export default function FutureOutlook({ content = defaultFutureContent }: FutureOutlookProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <section id={content.anchor || "FutureOutlook"} className="mb-16" ref={ref}>
      <h2 className={cn(
        "text-3xl font-bold mb-4",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>{content.title}</h2>

      <div className={cn(
        "bg-secondary/20 border border-secondary rounded-lg p-6",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out delay-200"
      )}>
        <p className="text-lg">
          {content.description}
        </p>
        
        {content.visionPoints && content.visionPoints.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {content.visionPoints.map((point, index) => (
              <div 
                key={index}
                className={cn(
                  "p-4 border border-accent rounded-lg",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  "transition-all duration-700 ease-out",
                  `delay-${300 + index * 100}`
                )}
              >
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
