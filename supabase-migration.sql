-- =============================================
-- Almohandix CMS Database Schema
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'FolderKanban',
  metrics JSONB NOT NULL DEFAULT '{}',
  display_order INT4 NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Wrench',
  features TEXT[] NOT NULL DEFAULT '{}',
  display_order INT4 NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  display_order INT4 NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Site Settings Table (Key-Value)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access (for the website frontend)
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Authenticated WRITE access (for admin dashboard)
CREATE POLICY "Admin insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update projects" ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete projects" ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update services" ON public.services FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete services" ON public.services FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert blog_posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blog_posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete blog_posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert team_members" ON public.team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update team_members" ON public.team_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete team_members" ON public.team_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete site_settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

-- =============================================
-- Seed Data (Optional - matches current hardcoded data)
-- =============================================

INSERT INTO public.projects (title, category, description, icon, metrics, display_order) VALUES
  ('Neural Commerce', 'E-Commerce', 'AI recommendation system processing 10M+ daily transactions.', 'ShoppingCart', '{"accuracy": "99.9%", "transactions": "10M+"}', 0),
  ('HealthOS', 'Healthcare', 'Healthcare platform serving 500+ medical facilities globally.', 'Stethoscope', '{"facilities": "500+", "uptime": "99.99%"}', 1),
  ('FinanceAI', 'FinTech', 'Algorithmic trading with real-time market analysis.', 'TrendingUp', '{"trades": "50K/sec", "assets": "$2B+"}', 2),
  ('SmartCity Hub', 'Infrastructure', 'IoT platform managing smart city systems across 12 metros.', 'Building2', '{"cities": "12", "sensors": "500K+"}', 3),
  ('CognitiveHR', 'Enterprise', 'AI talent management for Fortune 500 companies.', 'Users', '{"employees": "1M+", "retention": "+45%"}', 4);

INSERT INTO public.services (title, description, icon, features, display_order) VALUES
  ('AI & Machine Learning', 'Custom neural networks, NLP, computer vision, and predictive analytics.', 'Brain', ARRAY['Deep Learning', 'NLP', 'Computer Vision'], 0),
  ('Full-Stack Development', 'End-to-end web and mobile development with modern frameworks.', 'Code2', ARRAY['React/Next.js', 'Node.js', 'Mobile'], 1),
  ('Cloud Architecture', 'Cloud-native solutions with auto-scaling and high availability.', 'Cloud', ARRAY['AWS/GCP', 'Kubernetes', 'Serverless'], 2),
  ('Security Systems', 'Enterprise security with zero-trust architecture.', 'Shield', ARRAY['Zero Trust', 'Encryption', 'Compliance'], 3),
  ('Process Automation', 'Intelligent workflow automation using RPA and AI.', 'Workflow', ARRAY['RPA', 'Workflows', 'Integration'], 4),
  ('Edge Computing', 'Distributed computing for low-latency real-time processing.', 'Cpu', ARRAY['IoT', 'Real-time', 'Distributed'], 5);

INSERT INTO public.blog_posts (title, excerpt, content, category, is_published, published_at) VALUES
  ('The Future of Neural Architecture Search', 'Exploring automated ML model design and its implications for enterprise AI.', 'Full article content here...', 'AI Research', true, now() - interval '5 days'),
  ('Building Scalable Microservices', 'Best practices for designing high-performance distributed systems.', 'Full article content here...', 'Engineering', true, now() - interval '10 days'),
  ('Zero-Trust Security in Cloud Native Apps', 'Implementing comprehensive security frameworks for modern architectures.', 'Full article content here...', 'Security', true, now() - interval '15 days'),
  ('Real-time Data Processing at Scale', 'Strategies for handling millions of events with sub-millisecond latency.', 'Full article content here...', 'Data', true, now() - interval '20 days');

INSERT INTO public.team_members (name, role, display_order) VALUES
  ('Alex Chen', 'AI Architect', 0),
  ('Sarah Miller', 'Lead Engineer', 1),
  ('David Park', 'Systems Director', 2),
  ('Maya Johnson', 'ML Research', 3);

INSERT INTO public.site_settings (key, value) VALUES
  ('hero_headline', '"We Build\nIntelligent Systems"'),
  ('hero_subtitle', '"AI-powered software solutions built with precision engineering and scalable architecture."'),
  ('hero_metrics', '[{"label": "Projects", "value": "150+"}, {"label": "AI Models", "value": "45+"}, {"label": "Uptime", "value": "99.9%"}]'),
  ('contact_email', '"contact@almohandix.io"'),
  ('contact_location', '"San Francisco, CA"'),
  ('mission_text', '"To architect intelligent digital ecosystems that empower organizations with AI-driven solutions, enabling unprecedented efficiency and innovation."');
