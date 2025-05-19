"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function AboutIntro() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="mb-16" ref={ref}>
      <h1 className={cn(
        "text-4xl font-bold mb-8 text-center",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>关于我 | My Journey</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={cn(
          "flex justify-center",
          inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
          "transition-all duration-700 ease-out delay-200"
        )}>
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_25px_rgba(100,255,218,0.3)]">
            <Image src="/images/zengtianli.jpg" alt="曾田力" fill className="object-cover" />
          </div>
        </div>

        <div className={cn(
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
          "transition-all duration-700 ease-out delay-300"
        )}>
          <h2 className="text-2xl font-bold mb-2">曾田力 (Zeng Tianli)</h2>
          <p className="text-lg mb-6">
            浙江大学水利工程专业博士。专注 <span className="text-accent font-medium">水利信息化</span>、<span className="text-accent font-medium">数字孪生</span> 与 <span className="text-accent font-medium">智慧水利</span> 研究。深耕机器学习在水资源管理、水文预测领域的应用，研发多款专业软件系统，发表核心期刊论文。
          </p>
          <p className="text-xl font-medium text-accent">驱动创新，智绘水利。</p>
        </div>
      </div>
    </section>
  )
}
