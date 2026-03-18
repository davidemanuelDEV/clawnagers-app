import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Clawnagers",
  description: "Clawnagers terms of service for schools and educators.",
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-400 mb-8">
          Last updated: March 17, 2026
        </p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              1. Service Description
            </h2>
            <p>
              Clawnagers provides an AI agent building curriculum for K-12
              schools, including lesson plans, a web-based dashboard, student
              portal, and Demo Day event coordination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              2. Licensing
            </h2>
            <p>
              School License ($899/year): Grants one school access to the full
              curriculum, teacher tools, student portal, and Demo Day entry for
              top 3 students.
            </p>
            <p>
              District License ($3,999/year): Grants unlimited schools within a
              single district access to all School License features plus
              district-wide admin tools.
            </p>
            <p>Licenses are annual and auto-renew unless cancelled.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              3. Acceptable Use
            </h2>
            <p>
              The curriculum and platform are for educational use only. Schools
              agree not to redistribute curriculum materials outside their
              licensed institution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              4. Student Content
            </h2>
            <p>
              Students retain ownership of AI agents and projects they build.
              Clawnagers may feature Demo Day presentations with school and
              parent consent for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              5. Payment and Refunds
            </h2>
            <p>
              Payments are processed by Stripe. Schools may request a full
              refund within 30 days of purchase. PO and invoice payments are
              available for district procurement — net-30 terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              6. Cancellation
            </h2>
            <p>
              Schools may cancel at any time. Access continues until the end of
              the paid period. Data deletion is available upon request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              7. Limitation of Liability
            </h2>
            <p>
              Clawnagers is provided &ldquo;as is.&rdquo; We are not responsible
              for student projects, AI agent behavior, or third-party service
              outages (Supabase, Stripe, OpenClaw).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              8. Contact
            </h2>
            <p>
              Questions about these terms:{" "}
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
