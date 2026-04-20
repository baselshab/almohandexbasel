import { createClient } from "@/lib/supabase/server"

// Fallback data for when Supabase is not configured
const fallbackProjects = [
  { id: "1", title: "Neural Commerce", category: "E-Commerce", description: "AI recommendation system processing 10M+ daily transactions.", icon: "ShoppingCart", metrics: { accuracy: "99.9%", transactions: "10M+" }, display_order: 0, is_visible: true },
  { id: "2", title: "HealthOS", category: "Healthcare", description: "Healthcare platform serving 500+ medical facilities globally.", icon: "Stethoscope", metrics: { facilities: "500+", uptime: "99.99%" }, display_order: 1, is_visible: true },
  { id: "3", title: "FinanceAI", category: "FinTech", description: "Algorithmic trading with real-time market analysis.", icon: "TrendingUp", metrics: { trades: "50K/sec", assets: "$2B+" }, display_order: 2, is_visible: true },
  { id: "4", title: "SmartCity Hub", category: "Infrastructure", description: "IoT platform managing smart city systems across 12 metros.", icon: "Building2", metrics: { cities: "12", sensors: "500K+" }, display_order: 3, is_visible: true },
  { id: "5", title: "CognitiveHR", category: "Enterprise", description: "AI talent management for Fortune 500 companies.", icon: "Users", metrics: { employees: "1M+", retention: "+45%" }, display_order: 4, is_visible: true },
]

export async function getProjects() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
    if (error || !data || data.length === 0) return fallbackProjects
    return data
  } catch {
    return fallbackProjects
  }
}
