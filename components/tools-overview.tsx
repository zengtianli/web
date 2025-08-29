"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toolsOverviewConfig, ToolFeature } from "@/lib/profile-config"

interface ToolsOverviewProps {
  totalTools: number
}

export default function ToolsOverview({ totalTools }: ToolsOverviewProps) {

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          {toolsOverviewConfig.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {toolsOverviewConfig.description}
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {totalTools} 个工具集
          </Badge>
        </div>
      </div>

      {/* 特性卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolsOverviewConfig.features.map((feature: ToolFeature, index: number) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <feature.icon className="h-8 w-8" />
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
            {toolsOverviewConfig.techStack.map((tech: string) => (
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
          {toolsOverviewConfig.footerText}
        </p>
      </div>
    </div>
  )
}
