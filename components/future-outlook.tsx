"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function FutureOutlook() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <section id="FutureOutlook" className="mb-16" ref={ref}>
      <h2 className={cn(
        "text-3xl font-bold mb-4",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>未来展望</h2>

      <div className={cn(
        "bg-secondary/20 border border-secondary rounded-lg p-6",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out delay-200"
      )}>
        <p className="text-lg">
          我期待继续深耕水利工程与信息技术的融合创新领域，探索AI、大数据、数字孪生等前沿技术在水资源管理中的应用。未来，我将致力于构建更智能、更精准的水资源决策支持系统，推动水利行业数字化转型，为水资源可持续利用与水环境保护贡献专业力量。同时，我也希望能够与更多志同道合的专业人士合作，共同应对全球水资源挑战，创造更美好的水生态环境。
        </p>
      </div>
    </section>
  )
}
