"use client"

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { cn } from '@/lib/utils'

// 动态导入 MermaidDiagram，提升性能
const MermaidDiagram = dynamic(() => import('@/components/mermaid-diagram'), {
  ssr: false,
  loading: () => <div className="p-4 bg-muted rounded">加载图表...</div>,
})

// 导入代码高亮样式（你可以根据主题选择不同的样式）
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 处理 Mermaid 图表（稍后实现）
    if (containerRef.current) {
      // 这里会添加 Mermaid 渲染逻辑
    }
  }, [content])

  return (
    <div 
      ref={containerRef}
      className={cn(
        "markdown-content prose prose-slate dark:prose-invert max-w-none",
        // 自定义样式
        "prose-headings:font-bold prose-headings:text-foreground",
        "prose-p:text-muted-foreground prose-p:leading-relaxed",
        "prose-a:text-primary hover:prose-a:text-primary/80",
        "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-muted prose-pre:border",
        "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
        "prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground",
        "prose-strong:text-foreground prose-strong:font-semibold",
        // 响应式调整
        "prose-sm sm:prose-base",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 自定义代码块组件
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            if (inline) {
              return (
                <code 
                  className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary" 
                  {...props}
                >
                  {children}
                </code>
              )
            }
            
            // 检查是否是 Mermaid 图表
            if (language === 'mermaid') {
              return (
                <MermaidDiagram 
                  chart={String(children).replace(/\n$/, '')}
                  className="my-6"
                />
              )
            }
            
            return (
              <pre className="bg-muted border rounded-lg p-4 overflow-x-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            )
          },
          
          // 自定义表格组件
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-border rounded-lg">
                {children}
              </table>
            </div>
          ),
          
          // 自定义表格头
          th: ({ children }) => (
            <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
              {children}
            </th>
          ),
          
          // 自定义表格单元格
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),
          
          // 自定义引用块
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-l-primary bg-muted/30 pl-4 py-2 my-4 italic">
              {children}
            </blockquote>
          ),
          
          // 自定义链接（在新窗口打开）
          a: ({ href, children }) => (
            <a 
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4"
            >
              {children}
            </a>
          ),

          // 自定义标题，添加锚点功能
          h1: ({ children }) => {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            return <h1 id={id} className="scroll-mt-20">{children}</h1>
          },
          h2: ({ children }) => {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            return <h2 id={id} className="scroll-mt-20">{children}</h2>
          },
          h3: ({ children }) => {
            const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            return <h3 id={id} className="scroll-mt-20">{children}</h3>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
