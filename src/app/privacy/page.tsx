import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Clawnagers",
  description: "Clawnagers privacy policy. How we handle school and student data.",
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-400 mb-8">
          Last updated: March 17, 2026
        </p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Overview</h2>
            <p>
              Clawnagers is committed to protecting the privacy of students,
              teachers, and schools. This policy explains what data we collect,
              how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Data We Collect
            </h2>
            <h3 className="text-lg font-medium text-zinc-800">
              From Teachers/Schools:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address (for account login)</li>
              <li>School name and contact information</li>
              <li>
                Payment information (processed by Stripe — we do not store card
                details)
              </li>
            </ul>
            <h3 className="text-lg font-medium text-zinc-800 mt-4">
              From Students:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Display name (first name + last initial, set by teacher)
              </li>
              <li>Agent name and project submissions</li>
              <li>Progress data (weeks completed)</li>
            </ul>
            <p className="mt-4 font-medium text-zinc-900">
              We do NOT collect: student email addresses, full names, dates of
              birth, or any personally identifiable information. Students access
              the platform using invite codes (CLAW-XXXX) — no account creation
              required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Age Requirements
            </h2>
            <p>
              Clawnagers is designed for students in grades 9-12 (ages 14 and
              above). COPPA (Children&apos;s Online Privacy Protection Act)
              applies to children under 13 and is not applicable to our target
              age group.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              FERPA Compliance
            </h2>
            <p>
              We do not access, store, or process student education records as
              defined by FERPA. Schools maintain full control of their data.
              Teachers manage student entries within their own school&apos;s
              dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Data Storage and Security
            </h2>
            <p>
              Data is stored in Supabase (PostgreSQL) with row-level security.
              Teachers can only access data for their own school. All connections
              are encrypted via TLS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Data Retention and Deletion
            </h2>
            <p>
              Schools may request deletion of all their data at any time by
              contacting hello@clawnagers.com. Upon request, all school, teacher,
              student, and progress data will be permanently deleted within 30
              days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Third-Party Services
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Supabase</strong> — database and authentication
              </li>
              <li>
                <strong>Vercel</strong> — hosting
              </li>
              <li>
                <strong>Stripe</strong> — payment processing
              </li>
            </ul>
            <p className="mt-2">
              We do not sell data to third parties. We do not use student data
              for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">Contact</h2>
            <p>
              For privacy questions or data deletion requests:{" "}
              <a
                href="mailto:hello@clawnagers.com"
                className="text-amber-600 hover:underline"
              >
                hello@clawnagers.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
