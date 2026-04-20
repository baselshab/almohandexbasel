"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AboutPreview({ mission }: { mission?: string }) {
  const displayMission = mission || "To architect intelligent digital ecosystems that empower organizations with AI-driven solutions, enabling unprecedented efficiency and innovation."

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-6">
              AI-First Engineering
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              {displayMission}
            </p>
            <Link href="/about">
              <motion.button
                className="px-6 py-3 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Learn about Almohandix
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Founded", value: "2019" },
              { label: "Systems", value: "Cloud-Native" },
              { label: "Security", value: "Military-Grade" },
              { label: "Delivery", value: "AI-Optimized" },
            ].map((item) => (
              <GlassPanel key={item.label} className="p-6" variant="subtle">
                <div className="text-xs font-mono text-muted-foreground mb-1">{item.label}</div>
                <div className="text-lg font-medium text-foreground">{item.value}</div>
              </GlassPanel>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
