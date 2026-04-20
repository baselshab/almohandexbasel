"use client"

import { cn } from "@/lib/utils"
import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef } from "react"

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "subtle" | "deep"
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "glass",
      subtle: "glass-subtle",
      deep: "glass-deep",
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-500",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

GlassPanel.displayName = "GlassPanel"
