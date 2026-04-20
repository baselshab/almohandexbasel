import { createClient } from "@/lib/supabase/server"

const fallbackPosts = [
  { id: "1", title: "The Future of Neural Architecture Search", excerpt: "Exploring automated ML model design and its implications for enterprise AI.", category: "AI Research", published_at: "2024-03-15T00:00:00Z", is_published: true },
  { id: "2", title: "Building Scalable Microservices", excerpt: "Best practices for designing high-performance distributed systems.", category: "Engineering", published_at: "2024-03-10T00:00:00Z", is_published: true },
  { id: "3", title: "Zero-Trust Security in Cloud Native Apps", excerpt: "Implementing comprehensive security frameworks for modern architectures.", category: "Security", published_at: "2024-03-05T00:00:00Z", is_published: true },
  { id: "4", title: "Real-time Data Processing at Scale", excerpt: "Strategies for handling millions of events with sub-millisecond latency.", category: "Data", published_at: "2024-02-28T00:00:00Z", is_published: true },
]

export async function getBlogPosts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
    if (error || !data || data.length === 0) return fallbackPosts
    return data
  } catch {
    return fallbackPosts
  }
}
