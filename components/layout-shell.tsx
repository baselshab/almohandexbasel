"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isLogin = pathname === "/login"
  const hideChrome = isAdmin || isLogin

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <main className="relative min-h-screen bg-background">
      {/* Subtle ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <Navigation />
      
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </main>
  )
}
