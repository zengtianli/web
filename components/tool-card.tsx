"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, GitBranch, Star, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tool {
  id: string
  name: string
  description: string
  techs: string[]
  github: string
  gitee: string
  contentFile: string
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState<string | null>(null)

  const loadContent = async () => {
    if (content) {
      setIsExpanded(!isExpanded)
      return
    }

    setIsLoading(true)
    try {
      // 这里应该从 content/tools/ 读取 Markdown 内容
      // 暂时使用占位内容
      const response = await fetch(`${tool.contentFile}`)
      if (response.ok) {
        const text = await response.text()
        setContent(text)
      } else {
        setContent("内容加载失败，请访问 GitHub 查看完整文档。")
      }
    } catch (error) {
      setContent("内容加载失败，请访问 GitHub 查看完整文档。")
    } finally {
      setIsLoading(false)
      setIsExpanded(true)
    }
  }

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{tool.name}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {tool.description}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <a 
                  href={tool.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="hover:bg-orange-500 hover:text-white"
              >
                <a 
                  href={tool.gitee} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GitBranch className="h-4 w-4" />
                  Gitee
                </a>
              </Button>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={loadContent}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                "加载中..."
              ) : (
                <>
                  {isExpanded ? (
                    <>
                      收起详情
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      查看详情
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </>
              )}
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

      {/* 展开的详细内容 */}
      {isExpanded && (
        <>
          <Separator />
          <CardContent className="pt-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {content ? (
                <div className="space-y-4">
                  {/* 这里需要实现 Markdown 渲染 */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      📝 完整文档内容
                    </p>
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {content.substring(0, 1000)}...
                    </pre>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button asChild>
                      <a href={tool.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        在 GitHub 上查看完整文档
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={tool.gitee} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-4 w-4 mr-2" />
                        在 Gitee 上查看
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    详细使用文档请访问：
                  </p>
                  <div className="flex gap-4 justify-center mt-4">
                    <Button asChild>
                      <a href={tool.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={tool.gitee} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-4 w-4 mr-2" />
                        Gitee
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </>
      )}

      {/* 底部操作区域 */}
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              开源项目
            </span>
            <span>MIT 许可证</span>
          </div>
          <div className="flex gap-4">
            <a 
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              GitHub
            </a>
            <a 
              href={tool.gitee}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Gitee
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
