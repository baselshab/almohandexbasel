import { ContactSection } from "@/components/sections/contact-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Almohandix",
  description: "Get in touch with us to discuss your next intelligent systems project.",
}

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      <ContactSection />
    </div>
  )
}
