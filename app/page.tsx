import { HeroSection } from "@/components/sections/hero-section"
import { AboutPreview } from "@/components/sections/home/about-preview"
import { ProjectsPreview } from "@/components/sections/home/projects-preview"
import { ServicesPreview } from "@/components/sections/home/services-preview"
import { BlogPreview } from "@/components/sections/home/blog-preview"
import { ContactPreview } from "@/components/sections/home/contact-preview"
import { getProjects } from "@/lib/data/projects"
import { getServices } from "@/lib/data/services"
import { getBlogPosts } from "@/lib/data/blog"
import { getSiteSettings } from "@/lib/data/settings"

export default async function HomePage() {
  const [projects, services, posts, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getBlogPosts(),
    getSiteSettings()
  ])

  return (
    <div className="space-y-0">
      <HeroSection 
        headline={settings.hero_headline} 
        subtitle={settings.hero_subtitle} 
        metrics={settings.hero_metrics}
      />
      <div className="relative z-10 space-y-12 pb-24">
        <AboutPreview mission={settings.mission_text} />
        <ProjectsPreview projects={projects} />
        <ServicesPreview services={services} />
        <BlogPreview posts={posts} />
        <ContactPreview email={settings.contact_email} location={settings.contact_location} />
      </div>
    </div>
  )
}
