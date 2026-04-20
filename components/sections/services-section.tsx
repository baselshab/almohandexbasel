"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { getIcon } from "@/lib/icons"

interface Service {
  id: string | number
  title: string
  description: string
  icon: string | any
  features: string[]
}

export function ServicesSection({ services: initialServices }: { services?: Service[] }) {
  const displayServices = initialServices || []

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Services</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Capabilities
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Core service modules powering digital solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayServices.map((service, i) => {
            const Icon = typeof service.icon === 'string' ? getIcon(service.icon) : service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassPanel
                  className="p-6 h-full group"
                  variant="subtle"
                  whileHover={{ y: -4 }}
                >
                  {/* Icon */}
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
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
