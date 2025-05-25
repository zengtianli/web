"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { AboutIntroContent } from "@/lib/content"
import { Card, CardContent } from "@/components/ui/card"

interface AboutIntroProps {
  content: AboutIntroContent & {
    anchor?: string; // 锚点ID
  };
}

export default function AboutIntro({ content }: AboutIntroProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { title, subtitle, description, slogan, profileImage } = content;

  // 处理描述中的强调文本
  const formattedDescription = useMemo(() => {
    return description.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="text-accent font-medium">$1</span>'
    );
  }, [description]);

  return (
    <section id={content.anchor || "AboutIntro"} className="mb-16" ref={ref}>
      <h1 className={cn(
        "text-4xl font-bold mb-8 text-center",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>{title}</h1>

      <Card className={cn(
        "border-secondary bg-secondary/20 card-hover overflow-hidden",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out delay-100"
      )}>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-12 items-center py-4">
            <div className={cn(
              "flex justify-center",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
              "transition-all duration-700 ease-out delay-200"
            )}>
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_25px_rgba(100,255,218,0.3)]">
                <Image src={profileImage} alt={subtitle} fill className="object-cover" />
              </div>
            </div>

            <div className={cn(
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
              "transition-all duration-700 ease-out delay-300"
            )}>
              <h2 className="text-2xl font-bold mb-2">{subtitle}</h2>
              <p className="text-lg mb-6" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
              <p className="text-xl font-medium text-accent">{slogan}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
