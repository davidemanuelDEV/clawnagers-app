"use client"

import Link from "next/link"
import { Bot } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center">
              <Bot className="w-4 h-4 text-zinc-900" />
            </div>
            <span className="font-bold text-sm">Clawnagers</span>
          </div>
          <p className="text-sm text-zinc-500">An OpenClaw Education Program</p>
          <p className="text-xs text-zinc-400 mt-2">© 2026 Clawnagers. All rights reserved.</p>
        </div>
        <div className="flex gap-12 text-sm text-zinc-500">
          <div className="space-y-2">
            <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Program</p>
            <Link href="/#curriculum" className="block hover:text-zinc-900 transition-colors">Curriculum</Link>
            <Link href="/demo-day" className="block hover:text-zinc-900 transition-colors">Demo Day</Link>
            <Link href="/#pricing" className="block hover:text-zinc-900 transition-colors">Pricing</Link>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Resources</p>
            <Link href="/resources" className="block hover:text-zinc-900 transition-colors">Download Center</Link>
            <Link href="/platform" className="block hover:text-zinc-900 transition-colors">Platform Overview</Link>
            <Link href="/teacher-guide" className="block hover:text-zinc-900 transition-colors">Teacher Guide</Link>
            <Link href="/setup-guide" className="block hover:text-zinc-900 transition-colors">Setup Guide</Link>
            <Link href="/ai-models" className="block hover:text-zinc-900 transition-colors">AI Models & Pricing</Link>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Legal</p>
            <Link href="/privacy" className="block hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="block hover:text-zinc-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}