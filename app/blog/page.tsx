import { BlogSection } from "@/components/sections/blog-section"
import { Metadata } from "next"
import { getBlogPosts } from "@/lib/data/blog"

export const metadata: Metadata = {
  title: "Blog | Almohandix",
  description: "Technical perspectives, research updates, and engineering insights from the Almohandix team.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="pt-24 min-h-screen">
      <BlogSection posts={posts} />
    </div>
  )
}
