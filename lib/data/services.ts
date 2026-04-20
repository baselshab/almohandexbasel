import { createClient } from "@/lib/supabase/server"

const fallbackServices = [
  { id: "1", title: "AI & Machine Learning", description: "Custom neural networks, NLP, computer vision, and predictive analytics.", icon: "Brain", features: ["Deep Learning", "NLP", "Computer Vision"], display_order: 0, is_visible: true },
  { id: "2", title: "Full-Stack Development", description: "End-to-end web and mobile development with modern frameworks.", icon: "Code2", features: ["React/Next.js", "Node.js", "Mobile"], display_order: 1, is_visible: true },
  { id: "3", title: "Cloud Architecture", description: "Cloud-native solutions with auto-scaling and high availability.", icon: "Cloud", features: ["AWS/GCP", "Kubernetes", "Serverless"], display_order: 2, is_visible: true },
  { id: "4", title: "Security Systems", description: "Enterprise security with zero-trust architecture.", icon: "Shield", features: ["Zero Trust", "Encryption", "Compliance"], display_order: 3, is_visible: true },
  { id: "5", title: "Process Automation", description: "Intelligent workflow automation using RPA and AI.", icon: "Workflow", features: ["RPA", "Workflows", "Integration"], display_order: 4, is_visible: true },
  { id: "6", title: "Edge Computing", description: "Distributed computing for low-latency real-time processing.", icon: "Cpu", features: ["IoT", "Real-time", "Distributed"], display_order: 5, is_visible: true },
]

export async function getServices() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
    if (error || !data || data.length === 0) return fallbackServices
    return data
  } catch {
    return fallbackServices
  }
}
