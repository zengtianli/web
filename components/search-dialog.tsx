"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setIsSearching(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-accent">
          <Search className="h-5 w-5" />
          <span className="sr-only">搜索</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSearch} className="grid gap-4">
          <div className="flex items-center border border-input rounded-md overflow-hidden">
            <Search className="h-4 w-4 mx-2 flex-shrink-0 text-foreground/50" />
            <Input
              type="search"
              placeholder="搜索网站内容..."
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                搜索中...
              </>
            ) : (
              "搜索"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 