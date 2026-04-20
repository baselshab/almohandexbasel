import { createClient } from "@/lib/supabase/server"

const fallbackTeam = [
  { id: "1", name: "Alex Chen", role: "AI Architect", avatar_url: null, display_order: 0, is_visible: true },
  { id: "2", name: "Sarah Miller", role: "Lead Engineer", avatar_url: null, display_order: 1, is_visible: true },
  { id: "3", name: "David Park", role: "Systems Director", avatar_url: null, display_order: 2, is_visible: true },
  { id: "4", name: "Maya Johnson", role: "ML Research", avatar_url: null, display_order: 3, is_visible: true },
]

export async function getTeamMembers() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
    if (error || !data || data.length === 0) return fallbackTeam
    return data
  } catch {
    return fallbackTeam
  }
}
