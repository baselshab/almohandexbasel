"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ArrowUpRight } from "lucide-react"
import { getIcon } from "@/lib/icons"

interface Project {
  id: string | number
  title: string
  category: string
  description: string
  icon: string | any
  metrics: Record<string, string>
}

export function ProjectsSection({ projects: initialProjects }: { projects?: Project[] }) {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null)
  
  // Use provided projects or empty array (fallback handled at page level usually)
  const displayProjects = initialProjects || []

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Work</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Select case studies from our portfolio
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayProjects.map((project, i) => {
            const Icon = typeof project.icon === 'string' ? getIcon(project.icon) : project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <GlassPanel
                  className="p-6 h-full cursor-pointer group"
                  variant={hoveredId === project.id ? "default" : "subtle"}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>

                  {/* Category */}
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-4 pt-4 border-t border-border/50">
                    {Object.entries(project.metrics || {}).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-sm font-semibold text-foreground font-mono">{value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
