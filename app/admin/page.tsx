"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { FolderKanban, Wrench, FileText, Users, Plus, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Stats {
  projects: number
  services: number
  blog_posts: number
  team_members: number
}

const statCards = [
  { key: "projects" as const, label: "Projects", icon: FolderKanban, href: "/admin/projects", color: "text-cyan-400" },
  { key: "services" as const, label: "Services", icon: Wrench, href: "/admin/services", color: "text-violet-400" },
  { key: "blog_posts" as const, label: "Blog Posts", icon: FileText, href: "/admin/blog", color: "text-amber-400" },
  { key: "team_members" as const, label: "Team Members", icon: Users, href: "/admin/team", color: "text-emerald-400" },
]

const quickActions = [
  { label: "Add Project", href: "/admin/projects", icon: FolderKanban },
  { label: "Add Service", href: "/admin/services", icon: Wrench },
  { label: "Write Post", href: "/admin/blog", icon: FileText },
  { label: "Add Member", href: "/admin/team", icon: Users },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    blog_posts: 0,
    team_members: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, servicesRes, blogRes, teamRes] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("team_members").select("id", { count: "exact", head: true }),
        ])
        setStats({
          projects: projectsRes.count ?? 0,
          services: servicesRes.count ?? 0,
          blog_posts: blogRes.count ?? 0,
          team_members: teamRes.count ?? 0,
        })
      } catch {
        // Tables may not exist yet
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Welcome Back 👋</h2>
        <p className="text-muted-foreground">Here&apos;s an overview of your site content.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={stat.href}>
              <GlassPanel className="p-5 group cursor-pointer hover:border-primary/30 transition-all" variant="subtle">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-3xl font-bold text-foreground font-mono mb-1">
                  {loading ? "—" : stats[stat.key]}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassPanel>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <GlassPanel
                className="p-4 cursor-pointer group flex items-center gap-3 hover:border-primary/30 transition-all"
                variant="subtle"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {action.label}
                </span>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Setup Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassPanel className="p-6" variant="default">
          <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">
            Setup Guide
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
              <p>Create the database tables in your Supabase project using the SQL migration provided.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
              <p>Add your content using the management pages (Projects, Services, Blog, Team).</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
              <p>Configure site settings (Hero, Contact info) from the Settings page.</p>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  )
}
