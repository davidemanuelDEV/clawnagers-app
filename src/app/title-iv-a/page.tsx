import Link from "next/link"
import { ArrowLeft, CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Title IV-A Funding Guide | Clawnagers",
  description:
    "How to use Title IV-A funds to bring AI agent building curriculum to your school. Qualification breakdown and justification language.",
}

const complianceItems = [
  "FERPA compliant — no student records accessed",
  "Ages 14+ (grades 9-12) — COPPA not applicable",
  "Student login via invite codes — no email or PII collected",
  "Under $1,000 — clears principal-level approval at most schools",
  "PO and invoice payment accepted for procurement",
]

export default function TitleIVAPage() {
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Using Title IV-A Funds for Clawnagers
        </h1>
        <p className="text-lg text-zinc-500 mb-8">
          Clawnagers qualifies for Title IV-A funding under two spending
          categories. Here&apos;s how to position it for your district.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              How Clawnagers Qualifies
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="font-semibold text-amber-900 mb-1">
                  Category 1: Effective Use of Technology (≈85%)
                </p>
                <p className="text-sm text-amber-800">
                  Teacher professional development in AI literacy, agent-based
                  computing, and STEM pedagogy. Includes 60-minute onboarding, 8
                  weeks of facilitation guides, and assessment training.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                <p className="font-semibold text-zinc-900 mb-1">
                  Category 2: Well-Rounded Educational Opportunities (≈15%)
                </p>
                <p className="text-sm text-zinc-600">
                  STEM curriculum materials including student workbooks, hands-on
                  activities, and project-based learning resources.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cost Breakdown</h2>
            <div className="space-y-2 text-zinc-600">
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span>Teacher PD Component</span>
                <span className="font-semibold text-zinc-900">~$750 (83%)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100">
                <span>Student Materials Component</span>
                <span className="font-semibold text-zinc-900">~$149 (17%)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total School License</span>
                <span className="font-bold text-zinc-900">$899/year</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-4">
              This breakdown fits within the typical 85/15 PD-to-materials
              guideline used by most districts for Title IV-A allocation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Ready-to-Use Justification
            </h2>
            <p className="text-zinc-600 mb-4">
              Copy this language for your Title IV-A plan submission:
            </p>
            <blockquote className="p-4 bg-zinc-50 border-l-4 border-amber-400 text-sm text-zinc-700 italic">
              &ldquo;Clawnagers provides teacher professional development and
              student curriculum materials in artificial intelligence and
              autonomous agent development, aligning with [District]&apos;s STEM
              initiative and state AI education mandates. The program includes
              structured PD (60-min onboarding + 8 weeks of facilitation
              support) and hands-on STEM curriculum enabling students to build,
              test, and present AI agents. Cost: $899/year per school
              (≈$30/student for a class of 30).&rdquo;
            </blockquote>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Compliance Checklist
            </h2>
            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-600">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-zinc-50 border border-zinc-200">
          <p className="font-semibold mb-2">
            Need help with your Title IV-A application?
          </p>
          <p className="text-sm text-zinc-500 mb-4">
            We can provide additional documentation or join a call with your
            curriculum director.
          </p>
          <a href="mailto:hello@clawnagers.com">
            <Button variant="outline">Contact Us</Button>
          </a>
        </div>
      </div>
    </div>
  )
}
