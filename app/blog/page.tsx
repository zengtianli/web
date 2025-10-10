import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { getAllBlogPosts } from "@/lib/content"
import { AnimatedSection, ResponsiveGrid } from "@/components/molecules"

export const metadata = {
  title: "技术博客 | 曾田力",
  description: "分享水利工程、数据分析、机器学习等领域的技术经验和项目心得。",
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-16 max-w-7xl">
        <AnimatedSection
          title="技术博客"
          description="分享水利工程、数据分析、机器学习等领域的技术经验和项目心得"
          titleAlign="center"
          spacing="xl"
        >
          {posts.length > 0 ? (
            <ResponsiveGrid 
              strategy="optimal" 
              gap="lg"
              animation="fadeInUp"
              staggerDelay={100}
              alignItems="stretch"
              minItemHeight="350px"
            >
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </ResponsiveGrid>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">暂无博客文章</p>
              <p className="text-muted-foreground text-sm mt-2">敬请期待更多精彩内容！</p>
            </div>
          )}
        </AnimatedSection>
      </div>
      <Footer />
    </main>
  )
}

