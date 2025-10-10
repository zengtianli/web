"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { AnimatedSection } from "@/components/molecules"

// 表单验证 schema（与后端保持一致）
const contactFormSchema = z.object({
  name: z.string().min(2, "姓名至少需要2个字符").max(50, "姓名不能超过50个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  subject: z.string().min(2, "主题至少需要2个字符").max(100, "主题不能超过100个字符"),
  message: z.string().min(5, "消息至少需要5个字符").max(1000, "消息不能超过1000个字符"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

type SubmitStatus = "idle" | "loading" | "success" | "error"

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "发送失败，请稍后再试")
      }

      setSubmitStatus("success")
      reset()

      // 3秒后重置状态
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "发送失败，请稍后再试")

      // 5秒后重置错误状态
      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  return (
    <AnimatedSection
      title="发送消息"
      description="填写下方表单，我会尽快回复您"
      titleAlign="center"
      spacing="xl"
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 姓名 */}
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              type="text"
              placeholder="请输入您的姓名"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              disabled={submitStatus === "loading"}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* 邮箱 */}
          <div className="space-y-2">
            <Label htmlFor="email">邮箱 *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={submitStatus === "loading"}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 主题 */}
          <div className="space-y-2">
            <Label htmlFor="subject">主题 *</Label>
            <Input
              id="subject"
              type="text"
              placeholder="关于..."
              {...register("subject")}
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              disabled={submitStatus === "loading"}
            />
            {errors.subject && (
              <p id="subject-error" className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* 消息 */}
          <div className="space-y-2">
            <Label htmlFor="message">消息 *</Label>
            <Textarea
              id="message"
              placeholder="请输入您的消息..."
              rows={6}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              disabled={submitStatus === "loading"}
            />
            {errors.message && (
              <p id="message-error" className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* 提交按钮 */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              type="submit"
              size="lg"
              disabled={submitStatus === "loading" || submitStatus === "success"}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {submitStatus === "loading" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {submitStatus === "success" && (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              {submitStatus === "loading" ? "发送中..." : submitStatus === "success" ? "发送成功" : "发送消息"}
            </Button>

            {/* 成功消息 */}
            {submitStatus === "success" && (
              <div className="flex items-center text-green-500 text-sm animate-fade-in">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                感谢您的消息！我会尽快回复。
              </div>
            )}

            {/* 错误消息 */}
            {submitStatus === "error" && (
              <div className="flex items-center text-destructive text-sm animate-fade-in">
                <XCircle className="mr-2 h-4 w-4" />
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </AnimatedSection>
  )
}

