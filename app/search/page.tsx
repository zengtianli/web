"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { searchContent, type SearchResult } from "@/lib/search"
import { cn } from "@/lib/utils"

// 分离出需要使用useSearchParams的组件
function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const performSearch = async () => {
      setIsSearching(true)
      try {
        if (query) {
          const searchResults = await searchContent(query)
          setResults(searchResults)
        } else {
          setResults([])
        }
      } catch (error) {
        console.error("搜索出错:", error)
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())
    
    setIsSearching(true)
    searchContent(searchQuery).then(searchResults => {
      setResults(searchResults)
      setIsSearching(false)
    })
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">搜索结果</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center border border-input rounded-md overflow-hidden">
            <Search className="h-4 w-4 mx-3 text-foreground/50" />
            <Input
              type="search"
              placeholder="搜索网站内容..."
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isSearching}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "搜索"}
          </Button>
        </div>
      </form>

      {isSearching ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : query ? (
        <>
          <p className="text-sm text-foreground/70 mb-6">
            找到 {results.length} 条与 "{query}" 相关的结果
          </p>

          {results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((result) => (
                <SearchResultCard key={`${result.type}-${result.id}`} result={result} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
              <h2 className="text-xl font-semibold mb-2">未找到相关内容</h2>
              <p className="text-foreground/70">
                尝试使用不同的关键词，或者浏览网站的其他部分。
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">请输入搜索关键词</h2>
          <p className="text-foreground/70">您可以搜索项目、研究成果和网站页面。</p>
        </div>
      )}
    </div>
  )
}

// 主搜索页面组件
export default function SearchPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 mt-16">
        <Suspense fallback={
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">搜索结果</h1>
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          </div>
        }>
          <SearchContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}

function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <Link
      href={result.url}
      className="block p-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
    >
      <div className="flex gap-4">
        {result.image && result.type === "project" && (
          <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden relative hidden sm:block">
            <Image
              src={result.image}
              alt={result.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                result.type === "project" && "border-blue-500/20 bg-blue-500/10 text-blue-500",
                result.type === "research" && "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
                result.type === "page" && "border-violet-500/20 bg-violet-500/10 text-violet-500"
              )}
            >
              {result.type === "project" && "项目"}
              {result.type === "research" && "研究"}
              {result.type === "page" && "页面"}
            </Badge>
            <h3 className="font-medium">{result.title}</h3>
          </div>
          <p className="text-sm text-foreground/70 line-clamp-2">{result.description}</p>
          {result.tags && result.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {result.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {result.tags.length > 3 && (
                <span className="text-xs text-foreground/50">+{result.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
} 