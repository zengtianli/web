/**
 * 工具卡片组件 - 简化版
 * 展示工具基本信息和链接，详情页另外处理
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, Star } from "lucide-react"

interface Tool {
  id: string
  name: string
  description: string
  techs: string[]
  github: string
  gitee: string
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="w-full border-secondary bg-secondary/20 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{tool.name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {tool.description}
            </CardDescription>
          </div>
          
          {/* 链接按钮 */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
            >
              <a 
                href={tool.github} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="hover:bg-orange-500 hover:text-white transition-colors duration-150"
            >
              <a 
                href={tool.gitee} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Gitee
              </a>
            </Button>
          </div>
        </div>

        {/* 技术标签 */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tool.techs.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>

      {/* 底部信息 */}
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              开源项目
            </span>
            <span>MIT 许可证</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
