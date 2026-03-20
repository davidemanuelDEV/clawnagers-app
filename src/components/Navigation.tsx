"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center">
            <Bot className="w-5 h-5 text-zinc-900" />
          </div>
          <span className="font-bold text-lg tracking-tight">Clawnagers</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Teacher Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
              Register Your School
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}