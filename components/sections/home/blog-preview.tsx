"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string | number
  title: string
  excerpt: string
  category: string
}

export function BlogPreview({ posts: initialPosts }: { posts?: BlogPost[] }) {
  const displayPosts = (initialPosts || []).slice(0, 2)

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Insights</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Technical Pulse
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/blog">
              <motion.button
                className="px-6 py-3 rounded-lg border border-border text-foreground/80 font-medium text-sm hover:bg-muted/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Read our blog
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {displayPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassPanel className="p-6 cursor-pointer group h-full" variant="subtle">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                    {post.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
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
