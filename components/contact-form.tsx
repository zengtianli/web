"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { contactFormConfig } from "@/lib/profile-config"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: contactFormConfig.messages.success.title,
        description: contactFormConfig.messages.success.description,
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div 
      className={cn(
        "bg-secondary/20 rounded-lg p-8 border border-secondary",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        "transition-all duration-700 ease-out delay-300"
      )}
      ref={ref}
    >
      <h2 className="text-2xl font-bold mb-6">{contactFormConfig.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactFormConfig.fields.slice(0, 2).map((field, index) => (
            <div key={field.id} className={cn(
              "space-y-2",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              "transition-all duration-700 ease-out",
              `delay-${400 + index * 100}`
            )}>
              <Label htmlFor={field.id}>
                {field.label} {field.required && "*"}
              </Label>
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="bg-secondary/50 border-secondary"
              />
            </div>
          ))}
        </div>

        {contactFormConfig.fields.slice(2).map((field, index) => (
          <div key={field.id} className={cn(
            "space-y-2",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-700 ease-out",
            `delay-${600 + index * 100}`
          )}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && "*"}
            </Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={6}
                className="bg-secondary/50 border-secondary resize-none"
              />
            ) : (
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="bg-secondary/50 border-secondary"
              />
            )}
          </div>
        ))}

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className={cn(
            "w-full",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            "transition-all duration-700 ease-out delay-800"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {contactFormConfig.submitButton.loadingText}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {contactFormConfig.submitButton.text}
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
