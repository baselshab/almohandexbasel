import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LayoutShell } from "@/components/layout-shell"
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Almohandix | Intelligent Digital Systems',
  description: 'AI-powered software company specializing in artificial intelligence, full-stack development, and scalable digital platforms.',
  keywords: ['AI', 'artificial intelligence', 'software development', 'full stack', 'digital platforms'],
  generator: 'Next.js',
}

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LayoutShell>
          {children}
        </LayoutShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
