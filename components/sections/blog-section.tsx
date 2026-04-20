"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ArrowUpRight } from "lucide-react"

interface BlogPost {
  id: string | number
  title: string
  excerpt: string
  published_at?: string | null
  category: string
}

export function BlogSection({ posts: initialPosts }: { posts?: BlogPost[] }) {
  const displayPosts = initialPosts || []

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Mar 15" // fallback
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <section id="blog" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Blog</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Insights
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Technical perspectives from our team
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {displayPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassPanel
                className="p-6 cursor-pointer group"
                variant="subtle"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{formatDate(post.published_at)}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-xs text-muted-foreground">{post.category}</span>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </div>

                <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </GlassPanel>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
