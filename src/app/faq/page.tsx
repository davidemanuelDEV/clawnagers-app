"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

function FAQ({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-semibold text-white pr-8">{question}</span>
        <span className="text-[#FF6B35] text-2xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="pb-6 text-white/80 text-base leading-relaxed space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🦞</span>
            <span>Clawnagers</span>
          </Link>
          <Link href="/register">
            <Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold">
              Register Your School
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/80">
            Everything teachers and administrators need to know about Clawnagers.
          </p>
        </div>
      </section>

      {/* General FAQs */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#FF6B35] mb-8">General</h2>
          <div className="space-y-0">
            <FAQ question="What is Clawnagers?">
              <p>Clawnagers is an 8-week, teacher-led curriculum that teaches high school students (grades 9–12) to build real AI agents using the open-source OpenClaw platform. Students don&apos;t just learn about AI — they build functional agents that can search the web, send messages, connect to APIs, and take real actions.</p>
              <p>The program culminates in Demo Day, where the top 3 students from each school present their agents live on stage in San Francisco.</p>
            </FAQ>
            <FAQ question="Do teachers need AI experience to teach this?">
              <p><strong>No.</strong> The entire curriculum is designed for teachers without AI expertise. Every week includes detailed lesson plans with scripted talking points, slide decks, student handouts, troubleshooting guides, and &ldquo;if students finish early&rdquo; extension activities.</p>
              <p>Teachers complete a 60-minute self-paced onboarding before starting. If you can follow a lesson plan and help students troubleshoot, you can teach Clawnagers.</p>
            </FAQ>
            <FAQ question="What grades is this for?">
              <p>Clawnagers is designed for <strong>grades 9–12</strong> (high school). The curriculum assumes no prior coding experience — the first 4 weeks use plain English configuration before introducing any code.</p>
            </FAQ>
            <FAQ question="Do students need coding experience?">
              <p>No. The first 4 modules are completely code-free — students configure AI agents using plain-English files (like writing a personality description). Weeks 5–8 gradually introduce APIs, connectors, and more technical concepts for students who are ready.</p>
            </FAQ>
            <FAQ question="What technology do students need?">
              <p>Each student needs a laptop (Mac, Windows, or Linux) with an internet connection. OpenClaw is free and open source — no per-student software costs. A text editor like VS Code is recommended but not required (Notepad or TextEdit works).</p>
            </FAQ>
            <FAQ question="How does Demo Day work?">
              <p>Demo Day is a two-stage process:</p>
              <p><strong>Stage 1: School Demo Day</strong> — Your school runs its own Demo Day event. We provide the complete format guide, judging rubric, and streaming toolkit. The teacher records the presentations and selects the top 3 projects for submission.</p>
              <p><strong>Stage 2: The Stage in San Francisco</strong> — Top 3 from each school present live on stage in San Francisco in front of industry judges. Prizes are awarded to the top finalists AND their schools. Venue TBD.</p>
            </FAQ>
          </div>
        </div>
      </section>

      {/* Funding FAQs */}
      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#FF6B35] mb-8">💰 Funding & Title IV-A</h2>
          <div className="space-y-0">
            <FAQ question="How does Title IV-A work?">
              <p><strong>Title IV-A (Student Support and Academic Enrichment)</strong> is a federal formula grant under ESSA. The money flows from the U.S. Department of Education to state education agencies, then gets allocated to every school district that receives Title I funding — which is the vast majority of districts.</p>
              <p>In California, the CDE publishes allocation tables annually. Every eligible LEA (local education agency) gets at least $10,000, and larger districts get significantly more based on their Title I proportion. LAUSD, for example, receives millions.</p>
              <p><strong>Districts don&apos;t compete for this money — it&apos;s allocated automatically.</strong> They just need to submit a plan to the state showing how they&apos;ll spend it across three buckets:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Well-rounded educational opportunities</li>
                <li>Safe and healthy students</li>
                <li>Effective use of technology</li>
              </ul>
              <p>Districts with allocations over $30,000 must spend at least 20% on each of the first two buckets and allocate a portion to the third.</p>
            </FAQ>
            <FAQ question="How does Clawnagers qualify for Title IV-A?">
              <p>Here&apos;s the critical nuance: the &ldquo;Effective Use of Technology&rdquo; bucket has an <strong>85/15 rule</strong>. At least 85% of that technology allocation must go toward professional development — training teachers to use technology effectively. Only up to 15% can go toward devices, software, platforms, and digital curriculum.</p>
              <p><strong>Clawnagers is primarily a professional development program</strong> — not just software. Here&apos;s how the $499 license breaks down:</p>
              <Card className="bg-[#0f0f23] border-[#FF6B35]/30 my-4">
                <CardContent className="p-6">
                  <h4 className="text-[#FF6B35] font-bold mb-3">Teacher Professional Development (85% bucket) — Primary Value</h4>
                  <ul className="list-disc ml-6 space-y-1 text-white/80">
                    <li>60-minute self-paced teacher onboarding program</li>
                    <li>8 weeks of detailed lesson plans with facilitation guides</li>
                    <li>Assessment rubrics and grading tools</li>
                    <li>Ongoing access to the teacher dashboard for monitoring and adapting instruction</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-[#0f0f23] border-white/10 my-4">
                <CardContent className="p-6">
                  <h4 className="text-white font-bold mb-3">Student Curriculum Materials (15% bucket) — Secondary</h4>
                  <ul className="list-disc ml-6 space-y-1 text-white/80">
                    <li>Student workbooks and agent design canvas</li>
                    <li>Progress tracking portal</li>
                    <li>Demo Day submission tools</li>
                  </ul>
                </CardContent>
              </Card>
              <p>Clawnagers also qualifies under the <strong>&ldquo;Well-Rounded Education&rdquo;</strong> bucket. Title IV-A explicitly supports activities that provide hands-on STEM learning, exposure to science and technology, and the creation of STEM-focused programs. AI agent building checks all those boxes.</p>
              <p><strong>A school can pull from two of the three buckets to fund this program.</strong></p>
            </FAQ>
            <FAQ question="Do we apply to you for the funding?">
              <p><strong>No — your school applies through your district.</strong> Title IV-A funds flow from the federal government to states, then to districts. Your district&apos;s Title IV-A coordinator manages the funds.</p>
              <p>Your steps:</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li><strong>Identify your Title IV-A coordinator</strong> — typically someone in your district&apos;s curriculum or federal programs office. Ask your principal or business manager.</li>
                <li><strong>Submit a funding request</strong> — use our ready-to-use eligibility language (see our <Link href="/funding" className="text-[#FF6B35] hover:underline">Funding Guide</Link>) and attach it to your district&apos;s Title IV-A plan.</li>
                <li><strong>Get approval</strong> — once approved, the district purchases the Clawnagers license via PO or credit card.</li>
                <li><strong>Launch</strong> — register on clawnagers.com and start teaching.</li>
              </ol>
              <p className="mt-2"><strong>Need help?</strong> Email us at <a href="mailto:hello@clawnagers.com" className="text-[#FF6B35] hover:underline">hello@clawnagers.com</a> and we&apos;ll help you draft the justification language for your district.</p>
            </FAQ>
            <FAQ question="When should we apply for funding?">
              <p><strong>Timing matters.</strong> California districts typically submit their ESSA consolidated applications (which include the Title IV-A plan) between January and March for the following school year.</p>
              <p>If you&apos;re planning for <strong>Fall 2026</strong>, your district is making Title IV-A spending decisions <strong>right now</strong> (spring 2026). Schools planning for Spring 2027 will be making those decisions in fall 2026.</p>
              <p>Some districts have more flexibility for supplemental programs and can approve purchases outside the main planning cycle.</p>
            </FAQ>
            <FAQ question="What about small districts?">
              <p>Districts that receive less than $30,000 in Title IV-A funding (many smaller California districts) are <strong>required to form consortia</strong> — they pool their allocations with neighboring districts.</p>
              <p>This is actually an opportunity. If you pitch to a consortium, <strong>one sale covers multiple districts</strong>. A district license at $3,999 becomes even easier to justify when it&apos;s split across a consortium of 3–5 small districts pooling their Title IV-A allocations.</p>
            </FAQ>
            <FAQ question="Is $499 really covered by Title IV-A?">
              <p><strong>Easily.</strong> Your $499 price point is almost trivially small relative to Title IV-A allocations. Even the minimum allocation of $10,000 covers 20 school licenses.</p>
              <p>At ~$30 per student (class of 30), this is a fraction of what districts typically spend on curriculum materials. For comparison, iD Tech charges $400–$1,500 <em>per student</em>.</p>
            </FAQ>
            <FAQ question="Do you have a one-pager we can give our district?">
              <p>Yes. Visit our <Link href="/funding" className="text-[#FF6B35] hover:underline">Funding Guide</Link> for ready-to-use eligibility language you can copy directly into your Title IV-A plan. We also include language that maps to ESSA Section 4107 (STEM) and Section 4109 (technology).</p>
              <p>Need a customized version for your district? Email <a href="mailto:hello@clawnagers.com" className="text-[#FF6B35] hover:underline">hello@clawnagers.com</a> and we&apos;ll put one together for you.</p>
            </FAQ>
          </div>
        </div>
      </section>

      {/* Logistics FAQs */}
      <section className="py-16 bg-[#0f0f23]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#FF6B35] mb-8">Logistics</h2>
          <div className="space-y-0">
            <FAQ question="How much does it cost?">
              <p><strong>$899 per school per year</strong> — unlimited students. That&apos;s ~$30 per student for a class of 30.</p>
              <p>District licenses are available for schools that want to roll out across multiple campuses. <Link href="/funding" className="text-[#FF6B35] hover:underline">Title IV-A funding</Link> covers this entirely.</p>
            </FAQ>
            <FAQ question="Can we do a purchase order (PO)?">
              <p>Yes. We accept purchase orders, credit cards, and ACH. Whatever works for your district&apos;s procurement process.</p>
            </FAQ>
            <FAQ question="How many students can participate?">
              <p>The school license covers <strong>unlimited students</strong>. Whether you run one section of 25 or five sections of 30, it&apos;s the same price.</p>
            </FAQ>
            <FAQ question="Is student data collected?">
              <p>Student privacy is a priority. Students log in using invite codes (like CLAW-A7X2) — <strong>no email addresses, no personal information collected</strong>. Everything runs locally on school machines through the OpenClaw platform. We don&apos;t store or transmit student data.</p>
            </FAQ>
            <FAQ question="Can this run as an after-school program?">
              <p>Absolutely. The curriculum works as an elective, after-school club, or summer program. The 8-week structure maps to one class period per week (50 minutes), but you can adjust the pacing to fit your schedule.</p>
            </FAQ>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@clawnagers.com">
              <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold text-lg px-8 py-6 w-full sm:w-auto">
                Email Us
              </Button>
            </a>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-6 w-full sm:w-auto font-semibold">
                Register Your School →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#0f0f23]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">
            © 2026 Clawnagers. Powered by OpenClaw 🦞
          </div>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <Link href="/funding" className="hover:text-white/80">Funding</Link>
            <Link href="/faq" className="hover:text-white/80">FAQ</Link>
            <a href="mailto:hello@clawnagers.com" className="hover:text-white/80">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
