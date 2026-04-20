"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Loader2, Save, CheckCircle2 } from "lucide-react"

interface SiteSettings {
  hero_headline: string
  hero_subtitle: string
  hero_metrics: { label: string; value: string }[]
  contact_email: string
  contact_location: string
  mission_text: string
}

const defaultSettings: SiteSettings = {
  hero_headline: "We Build\nIntelligent Systems",
  hero_subtitle: "AI-powered software solutions built with precision engineering and scalable architecture.",
  hero_metrics: [
    { label: "Projects", value: "150+" },
    { label: "AI Models", value: "45+" },
    { label: "Uptime", value: "99.9%" },
  ],
  contact_email: "contact@almohandix.io",
  contact_location: "San Francisco, CA",
  mission_text: "To architect intelligent digital ecosystems that empower organizations with AI-driven solutions, enabling unprecedented efficiency and innovation.",
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [metricsInput, setMetricsInput] = useState("")
  const supabase = createClient()

  const fetchSettings = useCallback(async () => {
    try {
      const { data } = await supabase.from("site_settings").select("*")
      if (data && data.length > 0) {
        const settingsObj: Record<string, any> = {}
        data.forEach((row: { key: string; value: any }) => {
          settingsObj[row.key] = row.value
        })
        const merged = { ...defaultSettings, ...settingsObj }
        setSettings(merged)
        setMetricsInput(
          (merged.hero_metrics || [])
            .map((m: { label: string; value: string }) => `${m.label}:${m.value}`)
            .join(", ")
        )
      } else {
        setMetricsInput(
          defaultSettings.hero_metrics
            .map((m) => `${m.label}:${m.value}`)
            .join(", ")
        )
      }
    } catch {
      setMetricsInput(
        defaultSettings.hero_metrics
          .map((m) => `${m.label}:${m.value}`)
          .join(", ")
      )
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  const handleSave = async () => {
    setSaving(true)
    const heroMetrics = metricsInput.split(",").map((pair) => {
      const [label, value] = pair.split(":").map((s) => s.trim())
      return { label: label || "", value: value || "" }
    }).filter((m) => m.label && m.value)

    const settingsToSave = { ...settings, hero_metrics: heroMetrics }

    // Upsert each setting as key-value
    for (const [key, value] of Object.entries(settingsToSave)) {
      await supabase.from("site_settings").upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      )
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Site Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your website&apos;s hero section, contact info, and mission statement.</p>
      </div>

      {/* Hero Section Settings */}
      <GlassPanel className="p-6 space-y-5" variant="default">
        <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Hero Section</h3>

        <div>
          <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Headline</label>
          <textarea
            value={settings.hero_headline}
            onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
            placeholder="We Build\nIntelligent Systems"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Subtitle</label>
          <textarea
            value={settings.hero_subtitle}
            onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
            Metrics <span className="normal-case">(label:value, separated by commas)</span>
          </label>
          <input
            value={metricsInput}
            onChange={(e) => setMetricsInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="Projects:150+, AI Models:45+, Uptime:99.9%"
          />
        </div>
      </GlassPanel>

      {/* Contact Info */}
      <GlassPanel className="p-6 space-y-5" variant="default">
        <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Contact Info</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Email</label>
            <input
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="contact@almohandix.io"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Location</label>
            <input
              value={settings.contact_location}
              onChange={(e) => setSettings({ ...settings, contact_location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>
      </GlassPanel>

      {/* Mission */}
      <GlassPanel className="p-6 space-y-5" variant="default">
        <h3 className="text-sm font-mono uppercase tracking-widest text-primary">Mission Statement</h3>
        <div>
          <textarea
            value={settings.mission_text}
            onChange={(e) => setSettings({ ...settings, mission_text: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
        </div>
      </GlassPanel>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2.5 hover:bg-primary/90 transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Saved!" : "Save Settings"}
        </motion.button>
      </div>
    </div>
  )
}
