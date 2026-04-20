import { ServicesSection } from "@/components/sections/services-section"
import { Metadata } from "next"
import { getServices } from "@/lib/data/services"

export const metadata: Metadata = {
  title: "Services | Almohandix",
  description: "Advanced AI and digital engineering services, from Machine Learning to Edge Computing.",
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="pt-24 min-h-screen">
      <ServicesSection services={services} />
    </div>
  )
}
