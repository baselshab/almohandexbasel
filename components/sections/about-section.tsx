"use client"

import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Database, Cloud, Lock, Cpu, Globe, Sparkles } from "lucide-react"

const timeline = [
  { year: "2019", event: "Founded", description: "AI-first company vision" },
  { year: "2020", event: "First Platform", description: "Major AI deployment" },
  { year: "2021", event: "Scale", description: "50+ enterprise clients" },
  { year: "2022", event: "Global", description: "International expansion" },
  { year: "2023", event: "Next Gen", description: "Advanced AI systems" },
  { year: "2024", event: "Evolution", description: "Continuous innovation" },
]

const technologies = [
  { icon: Cpu, name: "Neural Networks" },
  { icon: Cloud, name: "Cloud Native" },
  { icon: Database, name: "Big Data" },
  { icon: Lock, name: "Security" },
  { icon: Globe, name: "Distributed" },
  { icon: Sparkles, name: "Gen AI" },
]

interface TeamMember {
  id: string | number
  name: string
  role: string
}

interface AboutSectionProps {
  mission?: string
  team?: TeamMember[]
}

export function AboutSection({ mission, team: initialTeam }: AboutSectionProps) {
  const displayTeam = initialTeam || []
  const displayMission = mission || "To architect intelligent digital ecosystems that empower organizations with AI-driven solutions, enabling unprecedented efficiency and innovation."

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">About</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-3 mb-4">
            System Identity
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Building intelligent digital ecosystems since 2019
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <GlassPanel className="p-8 h-full" variant="default">
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
                Mission
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6">
                {displayMission}
              </p>
              <div className="space-y-3">
                {["Innovation-First", "Scalable Architecture", "Security by Default"].map((value) => (
                  <div key={value} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {value}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassPanel className="p-8 h-full" variant="default">
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-6">
                Timeline
              </div>
              <div className="grid grid-cols-2 gap-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="group"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="text-xs font-mono text-primary mb-1">{item.year}</div>
                    <div className="text-sm font-medium text-foreground/90">{item.event}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        {/* Team */}
        {displayTeam.length > 0 && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
              Team
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayTeam.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassPanel className="p-5" variant="subtle">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-primary font-medium text-sm">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="font-medium text-foreground/90 text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{member.role}</div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
            Technologies
          </div>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <GlassPanel className="px-4 py-3 flex items-center gap-2" variant="subtle">
                  <tech.icon className="w-4 h-4 text-primary/70" />
                  <span className="text-sm text-foreground/80">{tech.name}</span>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
