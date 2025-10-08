"use client"

import { useState } from "react"
import { Share2, Check, Mail, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { trackShare } from "@/lib/analytics"

interface ShareButtonsProps {
  url?: string
  title: string
  description?: string
}

/**
 * 社交分享按钮组件
 */
export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = description || title

  // 复制链接
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success("链接已复制到剪贴板")
      trackShare("copy_link", "page", title)
      
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("复制失败，请手动复制")
    }
  }

  // 分享到微博
  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(shareText)}`
    window.open(weiboUrl, '_blank', 'width=600,height=400')
    trackShare("weibo", "page", title)
  }

  // 分享到 LinkedIn
  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
    trackShare("linkedin", "page", title)
  }

  // 通过邮件分享
  const shareByEmail = () => {
    const emailSubject = encodeURIComponent(title)
    const emailBody = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`
    trackShare("email", "page", title)
  }

  // 使用原生分享 API（如果支持）
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        })
        trackShare("native", "page", title)
      } catch (error) {
        // 用户取消分享，不做处理
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          分享
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* 原生分享（移动端） */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <>
            <DropdownMenuItem onClick={nativeShare}>
              <Share2 className="mr-2 h-4 w-4" />
              分享...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* 复制链接 */}
        <DropdownMenuItem onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-500" />
              已复制
            </>
          ) : (
            <>
              <LinkIcon className="mr-2 h-4 w-4" />
              复制链接
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 社交媒体 */}
        <DropdownMenuItem onClick={shareToWeibo}>
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9.38 21.46c-4.55.43-8.48-1.66-8.78-4.66-.3-3 3.18-5.9 7.74-6.33 4.55-.43 8.48 1.66 8.78 4.66.3 3-3.18 5.9-7.74 6.33zm11.31-9.04c-.39-.13-.66-.2-.45-.72.45-1.14.5-2.12.01-2.82-.93-1.32-3.48-1.25-6.42-.03 0 0-.92.4-.69-.33.45-1.46.38-2.68-.33-3.39-1.6-1.6-5.87.06-9.53 3.72C.58 11.55-.4 14.36.17 16.78c1.05 4.43 6.08 7.12 12.02 7.12 7.8 0 12.98-4.53 12.98-8.13 0-2.18-1.83-3.42-4.48-3.35zM7.65 18.94c-2.33.23-4.34-.82-4.49-2.35-.15-1.53 1.61-2.98 3.94-3.21 2.33-.23 4.34.82 4.49 2.35.15 1.53-1.61 2.98-3.94 3.21z" />
          </svg>
          分享到微博
        </DropdownMenuItem>

        <DropdownMenuItem onClick={shareToLinkedIn}>
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          分享到 LinkedIn
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* 邮件分享 */}
        <DropdownMenuItem onClick={shareByEmail}>
          <Mail className="mr-2 h-4 w-4" />
          通过邮件分享
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

