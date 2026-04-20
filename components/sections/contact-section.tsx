"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Send, CheckCircle2, Loader2, Mail, MapPin } from "lucide-react"

const contactInfo = [
  { icon: Mail, label: "Email", value: "contact@almohandix.io" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Contact</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Start a conversation about your next project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassPanel className="p-8" variant="default">
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Message Sent</h3>
                  <p className="text-sm text-muted-foreground">We&apos;ll be in touch soon</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </GlassPanel>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <GlassPanel className="p-6" variant="subtle">
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{info.label}</div>
                      <div className="text-sm text-foreground">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel className="p-6 text-center" variant="subtle">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Response within <span className="text-foreground">2 hours</span>
                </span>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
