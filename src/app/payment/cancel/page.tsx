"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, ArrowLeft, FileText } from "lucide-react"

export default function PaymentCancelPage() {
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
          <div className="text-5xl mb-6">🤝</div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Payment cancelled
          </h1>
          <p className="text-lg text-zinc-500 mb-2">
            No worries! Nothing was charged.
          </p>
          <p className="text-zinc-400 mb-8">
            Ready when you are. Your students&apos; future in AI is worth it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#pricing">
              <Button
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-8"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Try Again
              </Button>
            </Link>
            <Link href="/payment/invoice">
              <Button
                size="lg"
                variant="outline"
                className="px-8"
              >
                <FileText className="mr-2 w-4 h-4" />
                Request PO Instead
              </Button>
            </Link>
          </div>
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
