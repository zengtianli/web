import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { BlogCard } from "@/components/card-components"
import { getBlogPostsForTrack } from "@/lib/content"
import { getServerTrack } from "@/lib/track-server"

export const metadata = {
  title: "技术博客 | 曾田力",
  description: "分享水利工程、数据分析、机器学习等领域的技术经验和项目心得。",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const track = await getServerTrack(params)
  const posts = await getBlogPostsForTrack(track)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-6xl">
        <PageHeader 
          title="技术博客" 
          description="分享水利工程、数据分析、机器学习等领域的技术经验和项目心得" 
        />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">暂无博客文章</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
