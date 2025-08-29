"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, GitBranch, Star, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import MarkdownRenderer from "@/components/markdown-renderer"
import { uiTexts } from "@/lib/ui-texts"

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
  const [error, setError] = useState<string | null>(null)

  const loadContent = async () => {
    if (content) {
      setIsExpanded(!isExpanded)
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      // 调用新的 API 端点
      const response = await fetch(`/api/tools/${tool.id}`)
      
      if (response.ok) {
        const data = await response.json()
        setContent(data.content)
        setIsExpanded(true)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || uiTexts.error.contentLoadFailed)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : uiTexts.error.toolLoadError
      setError(errorMessage)
      console.error('加载工具内容失败:', err)
    } finally {
      setIsLoading(false)
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
                uiTexts.loading.content
              ) : (
                <>
                  {isExpanded ? (
                    <>
                      {uiTexts.button.collapseDetails}
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {uiTexts.button.expandDetails}
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
      {(isExpanded || error) && (
        <>
          <Separator />
          <CardContent className="pt-6">
            {error ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-destructive font-medium">{uiTexts.error.contentLoadFailed}</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    请访问 GitHub 或 Gitee 查看完整文档：
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <a href={tool.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        {uiTexts.button.github} 完整文档
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={tool.gitee} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-4 w-4 mr-2" />
                        Gitee 完整文档
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : content ? (
              <div className="space-y-6">
                {/* 使用 MarkdownRenderer 渲染内容 */}
                <MarkdownRenderer 
                  content={content}
                  className="max-w-none"
                />
                
                {/* 底部操作按钮 */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                      <a href={tool.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        查看 {uiTexts.button.github} 仓库
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href={tool.gitee} target="_blank" rel="noopener noreferrer">
                        <GitBranch className="h-4 w-4 mr-2" />
                        查看 Gitee 仓库
                      </a>
                    </Button>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    ⭐ 如果对你有帮助，欢迎给个 Star 支持！
                  </p>
                </div>
              </div>
            ) : null}
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
