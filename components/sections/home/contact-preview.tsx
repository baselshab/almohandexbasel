"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Mail, MapPin, Send } from "lucide-react"
import Link from "next/link"

interface ContactPreviewProps {
  email?: string
  location?: string
}

export function ContactPreview({ email, location }: ContactPreviewProps) {
  const contactInfo = [
    { icon: Mail, label: "Email", value: email || "contact@almohandix.io" },
    { icon: MapPin, label: "Location", value: location || "San Francisco, CA" },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <GlassPanel className="p-12 text-center overflow-hidden relative" variant="default">
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Connect</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Ready to build something <br className="hidden md:block" /> intelligent?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Start a conversation with our team to explore how AI-powered solutions can transform your organization.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{info.label}</div>
                    <div className="text-sm font-medium text-foreground">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <motion.button
                className="px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send us a message
                <Send className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  )
}
