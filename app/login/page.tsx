"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Lock className="w-7 h-7 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your content</p>
        </div>

        {/* Form Card */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="admin@almohandix.io"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Almohandix Admin Panel — Authorized access only
        </p>
      </motion.div>
    </div>
  )
}
