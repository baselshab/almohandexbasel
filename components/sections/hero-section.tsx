"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Brain, Code2, Layers, Zap, ArrowDown } from "lucide-react"

const bootSequence = [
  { text: "Initializing system...", delay: 0 },
  { text: "Loading modules...", delay: 600 },
  { text: "System online.", delay: 1200 },
]

const capabilities = [
  { icon: Brain, label: "AI Systems" },
  { icon: Code2, label: "Full Stack" },
  { icon: Layers, label: "Platforms" },
  { icon: Zap, label: "Performance" },
]

interface Metric {
  label: string
  value: string
}

interface HeroSectionProps {
  headline?: string
  subtitle?: string
  metrics?: Metric[]
}

export function HeroSection({ headline, subtitle, metrics: initialMetrics }: HeroSectionProps) {
  const [bootIndex, setBootIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useTransform(scrollY, [0, 400], [0, 80])

  const displayMetrics = initialMetrics || [
    { label: "Projects", value: "150+" },
    { label: "AI Models", value: "45+" },
    { label: "Uptime", value: "99.9%" },
  ]

  const displayHeadline = headline || "We Build\nIntelligent Systems"
  const [head1, head2] = displayHeadline.split('\n')

  useEffect(() => {
    if (bootIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootIndex(bootIndex + 1)
        if (bootIndex === bootSequence.length - 1) {
          setTimeout(() => setShowContent(true), 400)
        }
      }, bootSequence[bootIndex].delay + 500)
      return () => clearTimeout(timer)
    }
  }, [bootIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

      <motion.div className="relative z-10 container mx-auto px-6 py-32" style={{ opacity, y }}>
        {/* Boot Sequence - Minimal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GlassPanel className="inline-block px-6 py-4" variant="subtle">
            <div className="font-mono text-xs space-y-1.5">
              {bootSequence.slice(0, bootIndex + 1).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={
                    i === bootIndex && bootIndex === bootSequence.length - 1
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                >
                  <span className="text-muted-foreground/50">&gt;</span> {item.text}
                  {i === bootIndex && bootIndex < bootSequence.length - 1 && (
                    <span className="typing-cursor" />
                  )}
                </motion.div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center"
        >
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight">
            <span className="text-foreground">{head1 || "We Build"}</span>
            <br />
            <span className="text-primary">{head2 || "Intelligent Systems"}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            {subtitle || "AI-powered software solutions built with precision engineering and scalable architecture."}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Project
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 rounded-lg border border-border text-foreground/80 font-medium text-sm hover:bg-muted/30 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Work
            </motion.a>
          </div>

          {/* Capabilities - Clean row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <cap.icon className="w-4 h-4 text-primary/70" />
                <span className="text-sm">{cap.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Metrics - Minimal */}
          <GlassPanel className="inline-flex items-center gap-8 px-8 py-4" variant="subtle">
            {displayMetrics.map((metric, i) => (
              <div key={metric.label} className="text-center">
                <div className="text-xl font-semibold text-foreground font-mono">{metric.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{metric.label}</div>
              </div>
            ))}
          </GlassPanel>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 0.5 : 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
