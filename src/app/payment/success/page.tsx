"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircleCheck, ArrowRight, Bot } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased flex flex-col">
      {/* Nav */}
      <nav className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">Clawnagers</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CircleCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Payment successful! 🎉
          </h1>
          <p className="text-lg text-zinc-500 mb-2">
            Your school is now registered for Clawnagers.
          </p>
          <p className="text-zinc-400 mb-8">
            Check your email for next steps, including teacher onboarding access and your curriculum kit.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-8"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <p className="text-sm text-zinc-400 mt-6">
            Questions? Reach out at{" "}
            <a href="mailto:hello@clawnagers.com" className="text-amber-600 hover:underline">
              hello@clawnagers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
