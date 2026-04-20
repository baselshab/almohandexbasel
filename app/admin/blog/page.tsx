"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff, FileText } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  published_at: string | null
  is_published: boolean
  created_at: string
}

const defaultPost: Omit<BlogPost, "id" | "created_at"> = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  published_at: null,
  is_published: false,
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(defaultPost)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const supabase = createClient()

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const openCreate = () => {
    setEditingPost(null)
    setForm(defaultPost)
    setDialogOpen(true)
  }

  const openEdit = (post: BlogPost) => {
    setEditingPost(post)
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, category: post.category, published_at: post.published_at, is_published: post.is_published })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      ...form,
      published_at: form.is_published ? (form.published_at || new Date().toISOString()) : null,
    }

    if (editingPost) {
      await supabase.from("blog_posts").update(payload).eq("id", editingPost.id)
    } else {
      await supabase.from("blog_posts").insert(payload)
    }
    setSaving(false)
    setDialogOpen(false)
    fetchPosts()
  }

  const handleDelete = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id)
    setDeleteConfirm(null)
    fetchPosts()
  }

  const togglePublish = async (post: BlogPost) => {
    const newPublished = !post.is_published
    await supabase.from("blog_posts").update({
      is_published: newPublished,
      published_at: newPublished ? new Date().toISOString() : null,
    }).eq("id", post.id)
    fetchPosts()
  }

  const formatDate = (date: string | null) => {
    if (!date) return "—"
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
          <p className="text-sm text-muted-foreground">Write, edit, and publish your articles.</p>
        </div>
        <motion.button onClick={openCreate} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Plus className="w-4 h-4" /> New Post
        </motion.button>
      </div>

      <GlassPanel className="overflow-hidden" variant="default">
        {loading ? (
          <div className="p-12 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <FileText className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="mb-2">No blog posts yet.</p>
            <button onClick={openCreate} className="text-primary text-sm hover:underline">Write your first post</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Title</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Category</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-right text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground text-sm">{post.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 max-w-[300px] truncate">{post.excerpt}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">{post.category}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground font-mono">{formatDate(post.published_at || post.created_at)}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => togglePublish(post)}>
                        {post.is_published ? (
                          <span className="text-xs text-emerald-400 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-400/10">Published</span>
                        ) : (
                          <span className="text-xs text-amber-400 flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/10">Draft</span>
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(post.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
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
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDialogOpen(false)}>
            <motion.div className="w-full max-w-2xl glass rounded-2xl p-6 max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">{editingPost ? "Edit Post" : "New Blog Post"}</h3>
                <button onClick={() => setDialogOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Title</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="Post title" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors" placeholder="AI Research, Engineering..." />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Excerpt</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Brief summary..." />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Content <span className="normal-case">(Markdown supported)</span></label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm font-mono focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Write your article content here..." />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Publish immediately</label>
                  <button type="button" onClick={() => setForm({ ...form, is_published: !form.is_published })} className={`w-10 h-6 rounded-full transition-colors relative ${form.is_published ? "bg-primary" : "bg-muted"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${form.is_published ? "left-5" : "left-1"}`} />
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
                <button onClick={() => setDialogOpen(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors">Cancel</button>
                <motion.button onClick={handleSave} disabled={saving || !form.title} className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50" whileTap={{ scale: 0.98 }}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editingPost ? "Update" : "Create"}
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
              <h3 className="text-lg font-semibold text-foreground mb-2">Delete Post?</h3>
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
