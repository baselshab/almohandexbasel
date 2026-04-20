"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getIcon } from "@/lib/icons"

interface Project {
  id: string | number
  title: string
  category: string
  description: string
  icon: string | any
}

export function ProjectsPreview({ projects: initialProjects }: { projects?: Project[] }) {
  const displayProjects = (initialProjects || []).slice(0, 3)

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Selected Work</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3">
              Impactful Solutions
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <motion.button
                className="px-6 py-3 rounded-lg border border-border text-foreground/80 font-medium text-sm hover:bg-muted/30 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View all projects
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayProjects.map((project, i) => {
            const Icon = typeof project.icon === 'string' ? getIcon(project.icon) : project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassPanel className="p-6 h-full flex flex-col" variant="subtle">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-medium text-foreground mt-2 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
