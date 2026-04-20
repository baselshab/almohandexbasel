"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Plus, Pencil, Trash2, X, Loader2, GripVertical, Eye, EyeOff } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  icon: string
  metrics: Record<string, string>
  display_order: number
  is_visible: boolean
}

const defaultProject: Omit<Project, "id"> = {
  title: "",
  category: "",
  description: "",
  icon: "FolderKanban",
  metrics: {},
  display_order: 0,
  is_visible: true,
}

const iconOptions = [
  "ShoppingCart", "Stethoscope", "TrendingUp", "Building2", "Users",
  "Brain", "Code2", "Cloud", "Shield", "Cpu", "Globe", "Zap",
  "Database", "Lock", "Sparkles", "Workflow", "FolderKanban",
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form, setForm] = useState(defaultProject)
  const [metricsInput, setMetricsInput] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const supabase = createClient()

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
    if (data) setProjects(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const openCreate = () => {
    setEditingProject(null)
    setForm({ ...defaultProject, display_order: projects.length })
    setMetricsInput("")
    setDialogOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditingProject(project)
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      icon: project.icon,
      metrics: project.metrics,
      display_order: project.display_order,
      is_visible: project.is_visible,
    })
    setMetricsInput(
      Object.entries(project.metrics || {})
        .map(([k, v]) => `${k}:${v}`)
        .join(", ")
    )
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const metrics: Record<string, string> = {}
    metricsInput.split(",").forEach((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim())
      if (key && value) metrics[key] = value
    })

    const payload = { ...form, metrics }

    if (editingProject) {
      await supabase.from("projects").update(payload).eq("id", editingProject.id)
    } else {
      await supabase.from("projects").insert(payload)
    }

    setSaving(false)
    setDialogOpen(false)
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id)
    setDeleteConfirm(null)
    fetchProjects()
  }

  const toggleVisibility = async (project: Project) => {
    await supabase.from("projects").update({ is_visible: !project.is_visible }).eq("id", project.id)
    fetchProjects()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Manage Projects</h2>
          <p className="text-sm text-muted-foreground">Add, edit, and manage your portfolio projects.</p>
        </div>
        <motion.button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </div>

      {/* Table */}
      <GlassPanel className="overflow-hidden" variant="default">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <p className="mb-2">No projects yet.</p>
            <button onClick={openCreate} className="text-primary text-sm hover:underline">
              Create your first project
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Title</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Category</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Icon</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground text-sm">{project.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 max-w-[300px] truncate">{project.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">{project.category}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground font-mono">{project.icon}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleVisibility(project)} className="flex items-center gap-1.5">
                        {project.is_visible ? (
                          <span className="text-xs text-emerald-400 flex items-center gap-1"><Eye className="w-3 h-3" /> Visible</span>
                        ) : (
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><EyeOff className="w-3 h-3" /> Hidden</span>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(project.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassPanel>

      {/* Dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDialogOpen(false)}
          >
            <motion.div
              className="w-full max-w-lg glass rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {editingProject ? "Edit Project" : "New Project"}
                </h3>
                <button onClick={() => setDialogOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Project name" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="E-Commerce, Healthcare..." />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Brief description..." />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Icon</label>
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors">
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                    Metrics <span className="normal-case">(key:value, separated by commas)</span>
                  </label>
                  <input value={metricsInput} onChange={(e) => setMetricsInput(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="accuracy:99.9%, users:10M+" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Visible</label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_visible: !form.is_visible })}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.is_visible ? "bg-primary" : "bg-muted"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.is_visible ? "left-5" : "left-1"}`} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
                <button onClick={() => setDialogOpen(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">
                  Cancel
                </button>
                <motion.button
                  onClick={handleSave}
                  disabled={saving || !form.title}
                  className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                  whileTap={{ scale: 0.98 }}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingProject ? "Update" : "Create"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm glass rounded-2xl p-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">Delete Project?</h3>
              <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/30 transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
