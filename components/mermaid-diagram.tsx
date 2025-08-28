"use client"

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

let mermaidInstance: any = null

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const renderDiagram = async () => {
      if (!elementRef.current) return

      try {
        setIsLoading(true)
        setError(null)

        // 动态导入 mermaid 以避免 SSR 问题
        if (!mermaidInstance) {
          const mermaid = await import('mermaid')
          mermaidInstance = mermaid.default
          
          // 初始化 mermaid，根据主题配置
          const isDark = resolvedTheme === 'dark'
          
          mermaidInstance.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            themeVariables: {
              primaryColor: isDark ? '#3b82f6' : '#2563eb',
              primaryTextColor: isDark ? '#f1f5f9' : '#1e293b',
              primaryBorderColor: isDark ? '#475569' : '#cbd5e1',
              lineColor: isDark ? '#64748b' : '#475569',
              secondaryColor: isDark ? '#1e293b' : '#f1f5f9',
              tertiaryColor: isDark ? '#0f172a' : '#ffffff',
              background: isDark ? '#0f172a' : '#ffffff',
              mainBkg: isDark ? '#1e293b' : '#f8fafc',
              secondBkg: isDark ? '#334155' : '#e2e8f0',
              tertiaryBkg: isDark ? '#475569' : '#cbd5e1'
            },
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: 14,
            sequence: {
              diagramMarginX: 50,
              diagramMarginY: 10,
              actorMargin: 50,
              width: 150,
              height: 65,
              boxMargin: 10,
              boxTextMargin: 5,
              noteMargin: 10,
              messageMargin: 35,
              mirrorActors: true,
              bottomMarginAdj: 1,
              useMaxWidth: true,
              rightAngles: false,
              showSequenceNumbers: false
            },
            gantt: {
              useMaxWidth: true
            },
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
              curve: 'basis'
            }
          })
        } else {
          // 如果 mermaid 已经初始化，重新配置主题
          const isDark = resolvedTheme === 'dark'
          mermaidInstance.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default'
          })
        }

        // 生成唯一 ID
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        
        // 验证图表语法
        if (await mermaidInstance.parse(chart)) {
          // 渲染图表
          const { svg } = await mermaidInstance.render(id, chart)
          
          if (elementRef.current) {
            elementRef.current.innerHTML = svg
            
            // 添加响应式样式
            const svgElement = elementRef.current.querySelector('svg')
            if (svgElement) {
              svgElement.style.maxWidth = '100%'
              svgElement.style.height = 'auto'
              svgElement.setAttribute('class', 'mx-auto')
            }
          }
        } else {
          throw new Error('Invalid mermaid syntax')
        }

      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError('图表渲染失败，请检查语法')
      } finally {
        setIsLoading(false)
      }
    }

    renderDiagram()
  }, [chart, resolvedTheme])

  if (error) {
    return (
      <div className={`border border-destructive/50 rounded-lg p-4 bg-destructive/10 my-4 ${className}`}>
        <p className="text-destructive text-sm font-medium">⚠️ {error}</p>
        <details className="mt-2">
          <summary className="text-xs text-muted-foreground cursor-pointer">查看原始代码</summary>
          <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap bg-muted p-2 rounded">
            {chart}
          </pre>
        </details>
      </div>
    )
  }

  return (
    <div className={`mermaid-container border rounded-lg p-4 bg-card my-6 ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-muted-foreground">渲染图表中...</span>
        </div>
      )}
      <div 
        ref={elementRef} 
        className={`mermaid-diagram text-center ${isLoading ? 'hidden' : ''}`}
      />
    </div>
  )
}
