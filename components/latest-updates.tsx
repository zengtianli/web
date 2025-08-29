"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { LatestUpdatesContent, LatestUpdate } from "@/lib/content"

// 组件接口定义
interface LatestUpdatesProps {
  data: LatestUpdatesContent;
}

export default function LatestUpdates({ data }: LatestUpdatesProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{data.title}</h2>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {data.items.map((update: LatestUpdate, index: number) => (
            <Card
              key={index}
              className={cn(
                "card-hover overflow-hidden border-secondary",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "transition-all duration-700 ease-out",
                `delay-${index * 200}`,
              )}
            >
              <div className="relative h-48">
                <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{update.title}</h3>
                <p className="text-muted-foreground mb-4">{update.description}</p>
                <Link href={update.link}>
                  <Button variant="link" className="p-0 h-auto text-accent group">
                    阅读更多
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
