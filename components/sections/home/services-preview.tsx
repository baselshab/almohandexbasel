"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { getIcon } from "@/lib/icons"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string | number
  title: string
  description: string
  icon: string | any
}

export function ServicesPreview({ services: initialServices }: { services?: Service[] }) {
  const displayServices = (initialServices || []).slice(0, 3)

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Core Expertise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {displayServices.map((service, i) => {
            const Icon = typeof service.icon === 'string' ? getIcon(service.icon) : service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassPanel className="p-6 h-full" variant="subtle">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-3 font-mono">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                    {service.description}
                  </p>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/services">
            <motion.button
              className="px-8 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium text-sm hover:bg-primary/20 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore all services
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
