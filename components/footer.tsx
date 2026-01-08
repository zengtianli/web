/**
 * 页脚组件 - 简化版
 */

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileDown, Github, Linkedin } from "lucide-react"
import { footerConfig } from "@/lib/profile-config"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {footerConfig.copyright.name}. {footerConfig.copyright.text}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {footerConfig.links.map((link, index) => {
              if (link.download) {
                return (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="text-accent border-accent hover:bg-accent/10" 
                    asChild
                  >
                    <a href={link.href} download={link.download}>
                      <FileDown className="mr-2 h-4 w-4" />
                      {link.text}
                    </a>
                  </Button>
                )
              }
              
              if (link.external) {
                const IconComponent = link.icon === "Linkedin" ? Linkedin : Github
                const platformName = link.icon === "Linkedin" ? "LinkedIn" : "GitHub"
                return (
                  <Link 
                    key={index} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`访问我的${platformName}主页`}
                  >
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  </Link>
                )
              }
              
              return null
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
