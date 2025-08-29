"use client"

import Link from "next/link"
import { AnimatedSection, FeatureCard, ResponsiveGrid } from "@/components/molecules"
import { contactConfig, ContactItem } from "@/lib/profile-config"

// 渲染联系方式卡片的内部组件
function ContactCard({ item, index }: { item: ContactItem; index: number }) {
  // 渲染联系方式内容
  const renderContent = () => {
    const baseClasses = "text-muted-foreground hover:text-accent transition-colors underline";
    
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
    <FeatureCard
      icon={<item.icon />}
      title={item.title}
      description={renderContent()}
      variant="hover"
      layout="vertical"
      className="text-center"
      iconSize="lg"
    />
  );
}

export default function ContactInfo() {
  return (
    <AnimatedSection
      title={contactConfig.title}
      description={contactConfig.description}
      titleAlign="center"
      spacing="xl"
    >
      {/* 联系方式卡片网格 */}
      <ResponsiveGrid 
        strategy="responsive" 
        gap="lg" 
        animation="fadeInUp"
        staggerDelay={150}
        enableInView={true}
        alignItems="stretch"     // 🎨 关键：让卡片高度一致！
        minItemHeight="160px"    // 🎨 设置最小高度确保美观
      >
        {contactConfig.contacts.map((item: ContactItem, index: number) => (
          <ContactCard key={index} item={item} index={index} />
        ))}
      </ResponsiveGrid>
    </AnimatedSection>
  )
}
