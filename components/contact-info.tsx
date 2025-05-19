"use client"

import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function ContactInfo() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  return (
    <div className="space-y-8" ref={ref}>
      <div className={cn(
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out"
      )}>
        <h1 className="text-4xl font-bold mb-4">联系方式</h1>
        <p className="text-lg text-muted-foreground">
          我对水利科技的未来充满期待，欢迎随时与我联系，探讨行业发展、技术创新或合作机会。
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: Mail,
            title: "电子邮箱",
            content: (
              <a href="mailto:zengtianli1@126.com" className="text-muted-foreground hover:text-accent transition-colors">
                zengtianli1@126.com
              </a>
            ),
            delay: 100,
          },
          {
            icon: Phone,
            title: "电话",
            content: (
              <a href="tel:15957183444" className="text-muted-foreground hover:text-accent transition-colors">
                15957183444
              </a>
            ),
            delay: 200,
          },
          {
            icon: MapPin,
            title: "地址",
            content: <p className="text-muted-foreground">浙江省杭州市</p>,
            delay: 300,
          },
          {
            icon: Linkedin,
            title: "LinkedIn",
            content: (
              <Link
                href="https://www.linkedin.com/in/tianli-zeng-4068a7190/"
                target="_blank"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                linkedin.com/in/tianlizeng
              </Link>
            ),
            delay: 400,
          },
          {
            icon: Github,
            title: "GitHub",
            content: (
              <Link
                href="https://github.com/zengtianli"
                target="_blank"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                github.com/zengtianli
              </Link>
            ),
            delay: 500,
          },
          {
            icon: MessageCircle,
            title: "微信",
            content: <p className="text-muted-foreground">zengtracy</p>,
            delay: 600,
          },
        ].map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-start",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-[${item.delay}ms]`
            )}
          >
            {item.icon === Linkedin || item.icon === Github || item.icon === MessageCircle ? (
              <div className="h-6 w-6 flex justify-center text-accent mr-4 mt-1">
                <item.icon className="h-5 w-5" />
              </div>
            ) : (
              <item.icon className="h-6 w-6 text-accent mr-4 mt-1" />
            )}
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
