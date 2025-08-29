"use client"

import Link from "next/link"
import { useInView } from "react-intersection-observer" 
import { cn } from "@/lib/utils"
import { contactConfig, ContactItem } from "@/lib/profile-config"

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
        <h1 className="text-4xl font-bold mb-4">{contactConfig.title}</h1>
        <p className="text-lg text-muted-foreground">
          {contactConfig.description}
        </p>
      </div>

      <div className="space-y-6">
        {contactConfig.contacts.map((item: ContactItem, index: number) => {
          // 渲染联系方式内容
          const renderContent = () => {
            const baseClasses = "text-muted-foreground hover:text-accent transition-colors";
            
            switch (item.type) {
              case "email":
                return (
                  <a href={item.href} className={baseClasses}>
                    {item.content}
                  </a>
                );
              case "phone":
                return (
                  <a href={item.href} className={baseClasses}>
                    {item.content}
                  </a>
                );
              case "link":
                return (
                  <Link
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClasses}
                  >
                    {item.content}
                  </Link>
                );
              case "text":
              default:
                return <p className="text-muted-foreground">{item.content}</p>;
            }
          };

          return (
          <div 
            key={index} 
            className={cn(
              "flex items-start",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-[${item.delay}ms]`
            )}
          >
            <item.icon className="h-6 w-6 text-accent mr-4 mt-1" />
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              {renderContent()}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
