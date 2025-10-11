/**
 * 简历操作按钮组件（客户端组件）
 * 包含打印、分享等交互功能
 */

'use client'

import { ArrowLeft, Printer, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ResumeActionsProps {
  templateName: string
  templateDescription: string
}

export default function ResumeActions({ templateName, templateDescription }: ResumeActionsProps) {
  // 打印功能
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // 分享功能
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${templateName} - 曾田力`,
          text: templateDescription,
          url: window.location.href,
        })
      } catch (err) {
        console.log('分享失败:', err)
      }
    } else if (typeof window !== 'undefined') {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }

  return (
    <div className="no-print max-w-[210mm] mx-auto px-4 mb-6 flex justify-between items-center">
      <Link href="/resume">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回简历中心
        </Button>
      </Link>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          分享
        </Button>
        <Button variant="default" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          打印/导出PDF
        </Button>
      </div>
    </div>
  )
}

