"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "消息已发送",
        description: "感谢您的留言，我会尽快回复。",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="bg-secondary/20 rounded-lg p-8 border border-secondary">
      <h2 className="text-2xl font-bold mb-6">发送消息</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              name="name"
              placeholder="请输入您的姓名"
              required
              className="bg-secondary/50 border-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">邮箱 *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="请输入您的邮箱"
              required
              className="bg-secondary/50 border-secondary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">主题</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="请输入消息主题"
            className="bg-secondary/50 border-secondary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">内容 *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="请输入您的消息内容"
            required
            rows={6}
            className="bg-secondary/50 border-secondary resize-none"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              发送中...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              发送消息
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
