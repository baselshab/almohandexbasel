"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { useState } from "react"

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const currentPage = sidebarItems.find((item) => pathname === item.href)?.label || "Dashboard"

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col border-r border-border/50 glass-deep transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border/30">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Almohandix</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Admin</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">A</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout + Visit Site */}
        <div className="p-2 border-t border-border/30 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Visit Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border/30 flex items-center justify-between px-6 glass-deep shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/30 text-muted-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">System Online</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
