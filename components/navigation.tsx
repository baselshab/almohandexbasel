"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 rounded-full transition-all duration-500",
        "glass-deep",
        isScrolled && "top-4"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="flex items-center gap-1">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-3 py-1.5 group">
          <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-semibold text-xs">A</span>
          </div>
          <span className="font-medium text-foreground/90 text-sm hidden sm:block">Almohandix</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-border/50 mx-2 hidden md:block" />

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm transition-all duration-300",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2.5 rounded-full hover:bg-muted/30 transition-colors ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-4 h-3 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-foreground/80 rounded-full origin-center"
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 5 : 0 }}
            />
            <motion.span
              className="w-full h-0.5 bg-foreground/80 rounded-full"
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-full h-0.5 bg-foreground/80 rounded-full origin-center"
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -5 : 0 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-3 pb-2 flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all duration-200",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
