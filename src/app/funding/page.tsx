"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FundingPage() {
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
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-sm font-medium mb-8">
            <span>💰</span> Funding Guide for Schools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Use Title IV-A funds to bring
            <br />
            <span className="text-[#FF6B35]">AI education to your school.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Clawnagers is eligible for Title IV-A (SSAE) funding. We make it easy — here&apos;s 
            everything you need to include in your funding request.
          </p>
        </div>
      </section>

      {/* What is Title IV-A */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8">What is Title IV-A?</h2>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p>
              <strong className="text-white">Title IV-A (Student Support and Academic Enrichment)</strong> is 
              a federal grant under the Every Student Succeeds Act (ESSA) that provides funding to school 
              districts for three key areas:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#0f0f23] border-white/10">
                <CardContent className="p-6">
                  <span className="text-2xl block mb-3">🎓</span>
                  <h3 className="text-white font-bold mb-2">Well-Rounded Education</h3>
                  <p className="text-white/70 text-base">STEM, computer science, career & technical education programs</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f0f23] border-[#FF6B35]/30">
                <CardContent className="p-6">
                  <span className="text-2xl block mb-3">🖥️</span>
                  <h3 className="text-[#FF6B35] font-bold mb-2">Effective Use of Technology</h3>
                  <p className="text-white/70 text-base">Technology-based learning, digital literacy, AI and computing curriculum</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f0f23] border-white/10">
                <CardContent className="p-6">
                  <span className="text-2xl block mb-3">🛡️</span>
                  <h3 className="text-white font-bold mb-2">Safe & Healthy Students</h3>
                  <p className="text-white/70 text-base">Programs supporting student well-being and school climate</p>
                </CardContent>
              </Card>
            </div>
            <p>
              <strong className="text-[#FF6B35]">Clawnagers qualifies under both &ldquo;Well-Rounded Education&rdquo; (STEM/CS) 
              and &ldquo;Effective Use of Technology&rdquo; (AI curriculum).</strong>
            </p>
          </div>
        </div>
      </section>

      {/* How to Use It */}
      <section className="py-20 bg-[#0f0f23]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8">How Schools Use Title IV-A for Clawnagers</h2>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p>
              <strong className="text-white">You don&apos;t apply to us — your school applies through your district.</strong> Title IV-A 
              funds flow from the federal government to states, then to districts. Your district&apos;s Title IV-A 
              coordinator manages the funds.
            </p>
            <div className="bg-[#1a1a2e] rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">4 Steps to Fund Clawnagers with Title IV-A</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-bold shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Identify Your Title IV-A Coordinator</h4>
                    <p className="text-white/70">This is typically someone in your district&apos;s curriculum or federal programs office. Ask your principal or business manager.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-bold shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Submit a Funding Request</h4>
                    <p className="text-white/70">Use our one-pager (below) to describe the program. Attach it to your district&apos;s Title IV-A application or amendment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-bold shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Get Approval</h4>
                    <p className="text-white/70">Once approved, the district purchases the Clawnagers license ($899/year) using Title IV-A funds — via PO or credit card.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35] font-bold shrink-0">4</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Launch the Program</h4>
                    <p className="text-white/70">Register your school on clawnagers.com, get instant access to the curriculum, and start teaching. Students build AI agents within the first week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Language */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8">Ready-to-Use Eligibility Language</h2>
          <p className="text-white/80 text-lg mb-8">
            Copy this language into your Title IV-A funding request or grant application:
          </p>
          <Card className="bg-[#0f0f23] border-[#FF6B35]/30">
            <CardContent className="p-8">
              <div className="space-y-4 text-white/90 text-base leading-relaxed">
                <p>
                  <strong className="text-white">Program:</strong> Clawnagers — AI Agent Building Curriculum (Powered by OpenClaw)
                </p>
                <p>
                  <strong className="text-white">Cost:</strong> $899 per school per year (unlimited students)
                </p>
                <p>
                  <strong className="text-white">Title IV-A Alignment:</strong> Clawnagers is an 8-week, teacher-led STEM curriculum 
                  that teaches high school students (grades 9–12) to build functional AI agents using the open-source 
                  OpenClaw platform. The program aligns with Title IV-A, Part A objectives under both 
                  &ldquo;Well-Rounded Educational Opportunities&rdquo; (Sec. 4107 — STEM and computer science education) and 
                  &ldquo;Effective Use of Technology&rdquo; (Sec. 4109 — technology-based learning, digital literacy, and 
                  computational thinking).
                </p>
                <p>
                  <strong className="text-white">Student Outcomes:</strong> Students learn AI fundamentals, API integration, prompt 
                  engineering, security principles, and responsible AI design. Each student builds and ships a 
                  working AI agent. Top students present at Demo Day, a live competition event in San Francisco.
                </p>
                <p>
                  <strong className="text-white">Includes:</strong> Complete teacher curriculum kit (lesson plans, slides, assessments), 
                  student workbooks, progress tracking dashboard, Demo Day toolkit, and certificates of completion. 
                  No AI expertise required to teach — all materials are turnkey.
                </p>
                <p>
                  <strong className="text-white">Vendor:</strong> Clawnagers (clawnagers.com) · Powered by OpenClaw
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Funding Sources */}
      <section className="py-20 bg-[#0f0f23]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8">Other Funding Sources</h2>
          <p className="text-white/80 text-lg mb-8">
            Title IV-A is the most accessible, but Clawnagers also qualifies for:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[#1a1a2e] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">Perkins V (CTE)</h3>
                <p className="text-white/70 text-base">Career & Technical Education funds for programs that prepare students for high-skill, high-demand careers in technology and AI.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1a2e] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">State STEM Grants</h3>
                <p className="text-white/70 text-base">Many states (including California) have dedicated STEM/CS education grants. Check your state&apos;s Department of Education website.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1a2e] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">ESSER (if available)</h3>
                <p className="text-white/70 text-base">Some districts still have remaining ESSER funds that can be used for academic enrichment and technology programs.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1a2e] border-white/10">
              <CardContent className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">PTA / Booster Clubs</h3>
                <p className="text-white/70 text-base">At $899/year (~$30/student for a class of 30), this is well within typical PTA-funded program budgets.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl mb-6 block">💰</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Need help with your funding request?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            We&apos;ll help you put together the paperwork. Email us and we&apos;ll send a 
            customized one-pager for your district.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold text-lg px-8 py-6 w-full sm:w-auto">
                Register Your School →
              </Button>
            </Link>
            <a href="mailto:hello@clawnagers.com">
              <Button size="lg" variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-6 w-full sm:w-auto font-semibold">
                Email Us for Help
              </Button>
            </a>
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
            <a href="#" className="hover:text-white/80">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
