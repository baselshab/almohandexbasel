import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

export const IconMap: Record<string, LucideIcon> = {
  ShoppingCart: Icons.ShoppingCart,
  Stethoscope: Icons.Stethoscope,
  TrendingUp: Icons.TrendingUp,
  Building2: Icons.Building2,
  Users: Icons.Users,
  Brain: Icons.Brain,
  Code2: Icons.Code2,
  Cloud: Icons.Cloud,
  Shield: Icons.Shield,
  Cpu: Icons.Cpu,
  Globe: Icons.Globe,
  Zap: Icons.Zap,
  Database: Icons.Database,
  Lock: Icons.Lock,
  Sparkles: Icons.Sparkles,
  Workflow: Icons.Workflow,
  FolderKanban: Icons.FolderKanban,
  Wrench: Icons.Wrench,
  Mail: Icons.Mail,
  MapPin: Icons.MapPin,
  ChevronLeft: Icons.ChevronLeft,
  Menu: Icons.Menu,
  Plus: Icons.Plus,
  Pencil: Icons.Pencil,
  Trash2: Icons.Trash2,
  Eye: Icons.Eye,
  EyeOff: Icons.EyeOff,
  LayoutDashboard: Icons.LayoutDashboard,
  FileText: Icons.FileText,
  LogOut: Icons.LogOut,
  ArrowUpRight: Icons.ArrowUpRight,
}

export function getIcon(name: string): LucideIcon {
  return IconMap[name] || Icons.HelpCircle
}
