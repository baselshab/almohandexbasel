import { createClient } from "@/lib/supabase/server"

const defaultSettings = {
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

export async function getSiteSettings() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("site_settings").select("*")
    if (error || !data || data.length === 0) return defaultSettings

    const settings: Record<string, any> = {}
    data.forEach((row: { key: string; value: any }) => {
      settings[row.key] = row.value
    })

    return { ...defaultSettings, ...settings }
  } catch {
    return defaultSettings
  }
}
