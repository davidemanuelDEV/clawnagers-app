"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🦞</span>
            <span>Clawnagers</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold">
                Register Your School
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35] rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#25254a] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-[#FF6B35] text-sm font-medium mb-8">
            <span>🚀</span> Season 1 — Now Enrolling Schools
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Train students to build AI agents.
            <br />
            <span className="text-[#FF6B35]">Compete at Demo Day.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            An 8-week curriculum that takes students from zero to shipping a real AI agent.
            Top 3 from each school present to judges at Demo Day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold text-lg px-8 py-6 w-full sm:w-auto">
                Register Your School →
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6 w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#0f0f23]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            How It Works
          </h2>
          <p className="text-white/50 text-center mb-16 text-lg">
            Three steps to launching an AI agent program at your school
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#1a1a2e] border-white/10 hover:border-[#FF6B35]/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📋</span>
                </div>
                <div className="text-[#FF6B35] font-mono text-sm mb-2">STEP 1</div>
                <h3 className="text-xl font-bold text-white mb-3">Register & License</h3>
                <p className="text-white/50">
                  Sign up your school or district. Get instant access to the full curriculum, 
                  teacher guides, and student workbooks.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1a2e] border-white/10 hover:border-[#FF6B35]/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="text-[#FF6B35] font-mono text-sm mb-2">STEP 2</div>
                <h3 className="text-xl font-bold text-white mb-3">Teach & Build</h3>
                <p className="text-white/50">
                  Follow the 8-week curriculum. Students learn AI fundamentals, prompt engineering, 
                  APIs, and build their own agents.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#1a1a2e] border-white/10 hover:border-[#FF6B35]/30 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <div className="text-[#FF6B35] font-mono text-sm mb-2">STEP 3</div>
                <h3 className="text-xl font-bold text-white mb-3">Demo Day</h3>
                <p className="text-white/50">
                  Students present their agents. Top 3 win prizes and recognition. 
                  The best agents get featured in our showcase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">8</div>
              <div className="text-white/50 mt-1">Weeks</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">40+</div>
              <div className="text-white/50 mt-1">Lesson Plans</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">100%</div>
              <div className="text-white/50 mt-1">COPPA Compliant</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">$0</div>
              <div className="text-white/50 mt-1">Student Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Students Build */}
      <section className="py-24 bg-[#0f0f23]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            What Students Build
          </h2>
          <p className="text-white/50 text-center mb-16 text-lg">
            Real AI agents that solve real problems
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "StudyBot", desc: "Personalized study plans based on learning style", emoji: "📚" },
              { name: "EcoWatch", desc: "Local air quality monitor with action suggestions", emoji: "🌍" },
              { name: "NewsAgent", desc: "Fact-checking news summarizer for teens", emoji: "📰" },
              { name: "HealthBot", desc: "Wellness tracker with gentle reminders", emoji: "💚" },
              { name: "CodeBuddy", desc: "Beginner-friendly Python debugging assistant", emoji: "💻" },
              { name: "MathHelper", desc: "Step-by-step math problem solver and tutor", emoji: "🧮" },
            ].map((agent) => (
              <Card key={agent.name} className="bg-[#1a1a2e] border-white/10">
                <CardContent className="p-6">
                  <span className="text-2xl">{agent.emoji}</span>
                  <h3 className="text-lg font-bold text-white mt-3">{agent.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{agent.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#1a1a2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-white/50 text-center mb-16 text-lg">
            One license, unlimited students
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#0f0f23] border-[#FF6B35]/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6B35]" />
              <CardContent className="p-8">
                <div className="text-[#FF6B35] font-mono text-sm mb-2">SCHOOL LICENSE</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">$499</span>
                  <span className="text-white/50">/semester</span>
                </div>
                <ul className="space-y-3 text-white/70 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Full 8-week curriculum
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Teacher dashboard & guides
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Student portal (COPPA compliant)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Up to 100 students
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Demo Day toolkit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Email support
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-[#0f0f23] border-white/10">
              <CardContent className="p-8">
                <div className="text-white/50 font-mono text-sm mb-2">DISTRICT LICENSE</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-3 text-white/70 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Everything in School License
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Unlimited schools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> District-wide analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Custom curriculum options
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Dedicated onboarding
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FF6B35]">✓</span> Priority support
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0f0f23]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-6xl mb-6 block">🦞</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to bring AI education to your school?
          </h2>
          <p className="text-white/50 text-lg mb-8">
            Join the schools preparing students for the AI-powered future.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold text-lg px-8 py-6">
              Register Your School →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#0f0f23]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-sm">
            © 2026 Clawnagers. Built with 🦞 by the OpenClaw community.
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white/60">Privacy</a>
            <a href="#" className="hover:text-white/60">Terms</a>
            <a href="#" className="hover:text-white/60">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
