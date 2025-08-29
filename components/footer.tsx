"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileDown, Github, Linkedin } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { footerConfig } from "@/lib/profile-config"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <footer className="bg-secondary/50 py-8" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={cn(
            "mb-4 md:mb-0",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-700 ease-out"
          )}>
            <p className="text-muted-foreground text-sm">© {currentYear} {footerConfig.copyright.name}. {footerConfig.copyright.text}</p>
          </div>

          <div className={cn(
            "flex items-center space-x-4",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-700 ease-out delay-200"
          )}>
            {footerConfig.links.map((link, index) => {
              // 渲染不同类型的链接
              if (link.download) {
                return (
                  <Button key={index} variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10" asChild>
                    <a href={link.href} download={link.download}>
                      <FileDown className="mr-2 h-4 w-4" />
                      {link.text}
                    </a>
                  </Button>
                );
              }
              
              if (link.external) {
                const IconComponent = link.icon === "Linkedin" ? Linkedin : Github;
                return (
                  <Link key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  </Link>
                );
              }
              
              return null;
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
