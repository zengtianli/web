"use client"

import Image from "next/image"
import { useMemo } from "react"
import { AboutIntroContent } from "@/lib/content"
import { AnimatedSection, FeatureCard } from "@/components/molecules"
import { AnimatedElement } from "@/components/atoms"

interface AboutIntroProps {
  content: AboutIntroContent & {
    anchor?: string; // 锚点ID
  };
}

export default function AboutIntro({ content }: AboutIntroProps) {
  const { title, subtitle, description, slogan, profileImage } = content;

  // 处理描述中的强调文本
  const formattedDescription = useMemo(() => {
    return description.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="text-accent font-medium">$1</span>'
    );
  }, [description]);

  return (
    <AnimatedSection 
      title={title}
      titleAlign="center"
      anchor={content.anchor || "AboutIntro"}
      spacing="lg"
    >
      <FeatureCard
        title="" // 空标题，因为标题在内容中处理
        variant="hover"
        layout="horizontal"
        className="overflow-hidden"
        headerless={true}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center py-4">
          <AnimatedElement
            animation="slideInLeft"
            duration="lg"
            delay="md"
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_25px_rgba(100,255,218,0.3)]">
              <Image src={profileImage} alt={subtitle} fill className="object-cover" />
            </div>
          </AnimatedElement>

          <AnimatedElement
            animation="slideInRight"
            duration="lg"
            delay="lg"
          >
            <h2 className="text-2xl font-bold mb-2">{subtitle}</h2>
            <p className="text-lg mb-6" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
            <p className="text-xl font-medium text-accent">{slogan}</p>
          </AnimatedElement>
        </div>
      </FeatureCard>
    </AnimatedSection>
  )
}
