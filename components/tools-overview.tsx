"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Terminal, Zap, Package } from "lucide-react"

interface ToolsOverviewProps {
  totalTools: number
}

export default function ToolsOverview({ totalTools }: ToolsOverviewProps) {
  const features = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "实用性强",
      description: "解决实际开发中的痛点问题"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "高度优化",
      description: "注重性能和用户体验"
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "模块化设计",
      description: "易于扩展和维护"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "开源共享",
      description: "MIT 协议，欢迎贡献"
    }
  ]

  const techStack = [
    "Shell", "Python", "Lua", "TypeScript", "AppleScript", 
    "Yabai", "Raycast", "Neovim", "Zsh", "FZF"
  ]

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          开发工具集合
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          精心打磨的开源工具集，涵盖 macOS 自动化、编辑器配置、命令行环境等各个方面
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {totalTools} 个工具集
          </Badge>
        </div>
      </div>

      {/* 特性卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 技术栈展示 */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="text-center">技术栈</CardTitle>
          <CardDescription className="text-center">
            涵盖多种编程语言和开发工具
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 说明文字 */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-muted-foreground">
          所有工具都在 <strong>GitHub</strong> 和 <strong>Gitee</strong> 上开源，
          采用 <strong>MIT 协议</strong>，欢迎 Star、Fork 和贡献代码！
          每个工具都经过长期使用和优化，具有完整的文档和使用说明。
        </p>
      </div>
    </div>
  )
}
