"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff, Users } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar_url: string | null
  display_order: number
  is_visible: boolean
}

const defaultMember: Omit<TeamMember, "id"> = {
  name: "",
  role: "",
  avatar_url: null,
  display_order: 0,
  is_visible: true,
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [form, setForm] = useState(defaultMember)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order", { ascending: true })
    if (data) setMembers(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  const openCreate = () => {
    setEditingMember(null)
    setForm({ ...defaultMember, display_order: members.length })
    setDialogOpen(true)
  }

  const openEdit = (member: TeamMember) => {
    setEditingMember(member)
    setForm({ name: member.name, role: member.role, avatar_url: member.avatar_url, display_order: member.display_order, is_visible: member.is_visible })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    if (editingMember) {
      await supabase.from("team_members").update(form).eq("id", editingMember.id)
    } else {
      await supabase.from("team_members").insert(form)
    }
    setSaving(false)
    setDialogOpen(false)
    fetchMembers()
  }

  const handleDelete = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id)
    setDeleteConfirm(null)
    fetchMembers()
  }

  const toggleVisibility = async (member: TeamMember) => {
    await supabase.from("team_members").update({ is_visible: !member.is_visible }).eq("id", member.id)
    fetchMembers()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Manage Team</h2>
          <p className="text-sm text-muted-foreground">Add, edit, and manage your team members.</p>
        </div>
        <motion.button onClick={openCreate} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Plus className="w-4 h-4" /> Add Member
        </motion.button>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="p-12 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : members.length === 0 ? (
        <GlassPanel className="p-12 text-center" variant="default">
          <Users className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-2">No team members yet.</p>
          <button onClick={openCreate} className="text-primary text-sm hover:underline">Add your first team member</button>
        </GlassPanel>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassPanel className="p-5 relative group" variant="subtle">
                {/* Actions overlay */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleVisibility(member)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground transition-colors">
                    {member.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => openEdit(member)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteConfirm(member.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-semibold">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="font-medium text-foreground text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{member.role}</div>
                {!member.is_visible && (
                  <span className="inline-block mt-2 text-xs text-muted-foreground/50 px-2 py-0.5 rounded bg-muted/30">Hidden</span>
                )}
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <AnimatePresence>
        {dialogOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDialogOpen(false)}>
            <motion.div className="w-full max-w-md glass rounded-2xl p-6" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">{editingMember ? "Edit Member" : "New Member"}</h3>
                <button onClick={() => setDialogOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Role</label>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Job title" />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Visible</label>
                  <button type="button" onClick={() => setForm({ ...form, is_visible: !form.is_visible })} className={`w-10 h-6 rounded-full transition-colors relative ${form.is_visible ? "bg-primary" : "bg-muted"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.is_visible ? "left-5" : "left-1"}`} />
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
                <button onClick={() => setDialogOpen(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">Cancel</button>
                <motion.button onClick={handleSave} disabled={saving || !form.name} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50" whileTap={{ scale: 0.98 }}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingMember ? "Update" : "Add"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-sm glass rounded-2xl p-6" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <h3 className="text-lg font-semibold text-foreground mb-2">Remove Member?</h3>
              <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/30 transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-lg text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
