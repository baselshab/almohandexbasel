import { ProjectsSection } from "@/components/sections/projects-section"
import { Metadata } from "next"
import { getProjects } from "@/lib/data/projects"

export const metadata: Metadata = {
  title: "Projects | Almohandix",
  description: "Explore our portfolio of AI-powered solutions, from Neural Commerce to HealthOS.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="pt-24 min-h-screen">
      <ProjectsSection projects={projects} />
    </div>
  )
}
