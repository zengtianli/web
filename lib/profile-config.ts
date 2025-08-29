/**
 * 个人资料配置文件
 * 统一管理个人信息、联系方式、核心能力等相对稳定的内容
 */

import { Brain, Code, Droplets, Mail, Phone, MapPin, Linkedin, Github, MessageCircle, Code2, Zap, Terminal, Package } from "lucide-react"
import type React from "react"

// 核心能力配置
export interface StrengthConfig {
  icon: any
  title: string
  description: string
}

export const strengthsConfig: StrengthConfig[] = [
  {
    icon: Brain,
    title: "智能水资源建模",
    description: "结合LSTM、数字孪生等先进技术，构建智能水资源模型，提供精准预测与决策支持。",
  },
  {
    icon: Code,
    title: "软件与系统开发", 
    description: "全栈开发能力，专注于水利行业专业软件系统研发，提升工程效率与管理水平。",
  },
  {
    icon: Droplets,
    title: "水利专业解决方案",
    description: "深厚的水利专业背景，提供承载力评价、岸线规划等专业解决方案，解决行业痛点。",
  },
]

// 联系信息配置
export interface ContactItem {
  icon: any
  title: string
  content: string | React.ReactNode
  delay: number
  href?: string
  type?: "email" | "phone" | "link" | "text"
}

export const contactConfig = {
  title: "联系方式",
  description: "我对水利科技的未来充满期待，欢迎随时与我联系，探讨行业发展、技术创新或合作机会。",
  contacts: [
    {
      icon: Mail,
      title: "电子邮箱",
      content: "zengtianli1@126.com",
      delay: 100,
      href: "mailto:zengtianli1@126.com",
      type: "email" as const,
    },
    {
      icon: Phone,
      title: "电话",
      content: "15957183444",
      delay: 200,
      href: "tel:15957183444", 
      type: "phone" as const,
    },
    {
      icon: MapPin,
      title: "地址",
      content: "浙江省杭州市",
      delay: 300,
      type: "text" as const,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "linkedin.com/in/tianlizeng",
      delay: 400,
      href: "https://www.linkedin.com/in/tianli-zeng-4068a7190/",
      type: "link" as const,
    },
    {
      icon: Github,
      title: "GitHub", 
      content: "github.com/zengtianli",
      delay: 500,
      href: "https://github.com/zengtianli",
      type: "link" as const,
    },
    {
      icon: MessageCircle,
      title: "微信",
      content: "zengtracy",
      delay: 600,
      type: "text" as const,
    },
  ]
}

// 工具概览配置
export interface ToolFeature {
  icon: any
  title: string
  description: string
}

export const toolsOverviewConfig = {
  title: "开发工具集合",
  description: "精心打磨的开源工具集，涵盖 macOS 自动化、编辑器配置、命令行环境等各个方面",
  features: [
    {
      icon: Code2,
      title: "实用性强",
      description: "解决实际开发中的痛点问题"
    },
    {
      icon: Zap,
      title: "高度优化", 
      description: "注重性能和用户体验"
    },
    {
      icon: Terminal,
      title: "模块化设计",
      description: "易于扩展和维护"
    },
    {
      icon: Package,
      title: "开源共享",
      description: "MIT 协议，欢迎贡献"
    }
  ] as ToolFeature[],
  techStack: [
    "Shell", "Python", "Lua", "TypeScript", "AppleScript",
    "Yabai", "Raycast", "Neovim", "Zsh", "FZF"
  ],
  footerText: "所有工具都在 GitHub 和 Gitee 上开源，采用 MIT 协议，欢迎 Star、Fork 和贡献代码！每个工具都经过长期使用和优化，具有完整的文档和使用说明。"
}

// 页脚配置
export const footerConfig = {
  copyright: {
    text: "All Rights Reserved.",
    name: "曾田力"
  },
  links: [
    {
      text: "下载完整简历 (PDF)",
      href: "/zengtianli-cv.pdf",
      icon: "FileDown" as const,
      download: "曾田力-简历.pdf"
    },
    {
      text: "LinkedIn", 
      href: "https://www.linkedin.com/in/tianli-zeng-4068a7190/",
      icon: "Linkedin" as const,
      external: true
    },
    {
      text: "GitHub",
      href: "https://github.com/zengtianli", 
      icon: "Github" as const,
      external: true
    }
  ]
}

// Hero区配置
export const heroConfig = {
  name: "曾田力",
  tagline: "数据驱动水利创新 | AI赋能未来水务",
  description: "融合**水利工程**专业智慧与**前沿信息技术**，致力于通过**数据分析**、**智能模型**及**软件系统**研发，解决复杂水资源挑战，驱动行业变革。",
  buttons: [
    { 
      text: "深入了解", 
      href: "/about",
      variant: "default" as const
    },
    { 
      text: "查看项目", 
      href: "/projects", 
      variant: "outline" as const
    }
  ],
  // 高亮关键词配置
  highlights: ["水利工程", "前沿信息技术", "数据分析", "智能模型", "软件系统"]
}

// 导航配置
export const navigationConfig = [
  { name: "首页", path: "/" },
  { name: "关于我", path: "/about" },
  { name: "项目案例", path: "/projects" },
  { name: "学术与成果", path: "/research" },
  { name: "开发工具", path: "/tools" },
  { name: "合作伙伴", path: "/partners" },
  { name: "简历中心", path: "/resume" },
  { name: "联系方式", path: "/contact" },
]

// 品牌配置
export const brandConfig = {
  name: "曾田力",
  logo: "/images/zengtianli.jpg", // 如果有logo的话
  favicon: "/favicon.ico"
}



// 表单配置
export const contactFormConfig = {
  title: "发送消息",
  fields: [
    { 
      id: "name", 
      label: "姓名", 
      placeholder: "请输入您的姓名", 
      required: true, 
      type: "text" 
    },
    { 
      id: "email", 
      label: "邮箱", 
      placeholder: "请输入您的邮箱", 
      required: true, 
      type: "email" 
    },
    { 
      id: "subject", 
      label: "主题", 
      placeholder: "请输入消息主题", 
      required: false, 
      type: "text" 
    },
    { 
      id: "message", 
      label: "内容", 
      placeholder: "请输入您的消息内容", 
      required: true, 
      type: "textarea" 
    }
  ],
  submitButton: { 
    text: "发送消息", 
    loadingText: "发送中...",
    icon: "Send" as const
  },
  messages: {
    success: {
      title: "消息已发送",
      description: "感谢您的留言，我会尽快回复。"
    }
  }
}

// PDF下载配置
export const downloadConfig = {
  text: "下载PDF",
  filename: "zengtianli-cv",
  fullPath: "/zengtianli-cv.pdf"
}
