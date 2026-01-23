import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Rohan Majeed | Full Stack & AI Developer',
  description: 'Portfolio of Rohan Majeed - Full Stack Developer and AI Engineer. Building modern web experiences with React, Next.js, Node.js, and AI technologies.',
  keywords: 'Full Stack Developer, AI Engineer, React, Next.js, Node.js, TypeScript, Web Developer',
  authors: [{ name: 'Rohan Majeed' }],
  openGraph: {
    title: 'Rohan Majeed | Full Stack & AI Developer',
    description: 'Building modern web experiences with React, Next.js, Node.js, and AI technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
