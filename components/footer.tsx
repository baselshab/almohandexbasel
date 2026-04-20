"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
  ],
}

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-semibold text-xs">A</span>
              </div>
              <span className="font-medium text-foreground">Almohandix</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building intelligent digital systems with AI-powered solutions and scalable architecture.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Almohandix. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
