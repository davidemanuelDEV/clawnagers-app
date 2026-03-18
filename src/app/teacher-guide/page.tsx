import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Teacher Guide | Clawnagers",
  description:
    "Everything you need to teach AI agent building. No AI expertise required.",
}

export default function TeacherGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Teacher Guide
        </h1>
        <p className="text-lg text-zinc-500 mb-8">
          The complete teacher guide will be available when you register your
          school. It includes a 60-minute self-paced onboarding, 8 weeks of
          lesson plans, facilitation guides, and assessment tools.
        </p>
        <div className="space-y-4 text-zinc-600">
          <h2 className="text-xl font-semibold text-zinc-900">
            What&apos;s included:
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>60-minute self-paced onboarding video</li>
            <li>8 weekly lesson plans with 50-minute session breakdowns</li>
            <li>Student workbook and activity sheets</li>
            <li>Assessment rubrics for each week</li>
            <li>Demo Day format guide and judging criteria</li>
            <li>Progress tracking dashboard access</li>
          </ul>
        </div>
        <div className="mt-12">
          <Link href="/register">
            <Button className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
              Register to Get Access
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
