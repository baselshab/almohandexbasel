import { AboutSection } from "@/components/sections/about-section"
import { Metadata } from "next"
import { getTeamMembers } from "@/lib/data/team"
import { getSiteSettings } from "@/lib/data/settings"

export const metadata: Metadata = {
  title: "About | Almohandix",
  description: "Learn more about our mission, vision, and the team driving AI innovation at Almohandix.",
}

export default async function AboutPage() {
  const [team, settings] = await Promise.all([
    getTeamMembers(),
    getSiteSettings()
  ])

  return (
    <div className="pt-24 min-h-screen">
      <AboutSection team={team} mission={settings.mission_text} />
    </div>
  )
}
