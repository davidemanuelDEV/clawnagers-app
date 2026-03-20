"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  BookOpen,
  Bot,
  Download,
  Brain,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Code,
  DollarSign,
  GraduationCap,
  Menu,
  Rocket,
  Shield,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_1TC1mlGb2BujzFpfu0IuEWxl",
          schoolName: "",
          email: "",
        }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error("Checkout error:", err)
    } finally {
      setCheckoutLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">Clawnagers</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-600">
            <a href="#curriculum" className="hover:text-zinc-900 transition-colors">Curriculum</a>
            <Link href="/platform" className="hover:text-zinc-900 transition-colors">Platform</Link>
            <Link href="/demo-day" className="hover:text-zinc-900 transition-colors">Demo Day</Link>
            <Link href="/resources" className="hover:text-zinc-900 transition-colors">Resources</Link>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Teacher Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                Register Your School
              </Button>
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white px-6 py-4 space-y-3">
            <a href="#curriculum" className="block text-sm text-zinc-600 hover:text-zinc-900">Curriculum</a>
            <Link href="/platform" className="block text-sm text-zinc-600 hover:text-zinc-900">Platform</Link>
            <Link href="/demo-day" className="block text-sm text-zinc-600 hover:text-zinc-900">Demo Day</Link>
            <Link href="/resources" className="block text-sm text-zinc-600 hover:text-zinc-900">Resources</Link>
            <a href="#pricing" className="block text-sm text-zinc-600 hover:text-zinc-900">Pricing</a>
            <a href="#faq" className="block text-sm text-zinc-600 hover:text-zinc-900">FAQ</a>
            <div className="pt-2 space-y-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full">Teacher Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                  Secure Your Fall 2026 Spot
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 text-amber-700 border-amber-300 bg-amber-50 font-medium flex items-center gap-2 w-fit">
              <Bot className="w-4 h-4" />
              Powered by OpenClaw
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 flex items-center gap-4 flex-wrap">
              <Bot className="w-12 h-12 text-amber-600" />
              <span>
                Your students don&apos;t just <em className="not-italic text-amber-600">use</em> AI.
                <br />
                They <em className="not-italic text-amber-600">build</em> it.
              </span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-8 max-w-2xl">
              8-week curriculum. Real AI agents. A stage in San Francisco. Clawnagers is the K-12
              program that teaches students to build autonomous AI agents — no prior coding
              experience required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold text-base px-8">
                  Secure Your Fall 2026 Spot
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8">
                <Link href="/setup-guide">
                  Technical Setup Guide
                </Link>
              </Button>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="text-base px-8">
                  <Download className="mr-2 w-4 h-4" />
                  Download Program Overview
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-emerald-500" />
                No AI expertise needed to teach
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="w-4 h-4 text-emerald-500" />
                Title IV-A eligible
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-200 bg-zinc-50 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
              Launching Fall 2026 in California
            </p>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              Join 47+ California schools already registered
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> 27M students in the U.S.
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> 0 programs teaching AI agent building
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> State AI mandates accelerating
            </span>
          </div>
        </div>
      </section>

      {/* The Problem — Competitive Comparison */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
              The problem
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Every school needs AI curriculum. Nobody teaches students to build.
            </h2>
            <p className="text-lg text-zinc-500">
              Existing programs stop at prompts and theory. Your students deserve to build AI
              agents that actually do things — and show their work on a real stage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Code.org", desc: "Block coding, web dev basics", gap: "No AI agents" },
              { name: "iD Tech", desc: "Python, ML basics, ChatGPT prompts", gap: "$400-1,500 per student" },
              { name: "Inspirit AI", desc: "ML theory, academic focus", gap: "No building, no competition" },
            ].map((item) => (
              <Card key={item.name} className="border-zinc-200 bg-zinc-50">
                <CardContent className="pt-6">
                  <p className="font-semibold text-zinc-900 mb-1">{item.name}</p>
                  <p className="text-sm text-zinc-500 mb-3">{item.desc}</p>
                  <Badge variant="secondary" className="bg-red-50 text-red-700 border-0 text-xs">
                    {item.gap}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="font-semibold text-amber-900 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Clawnagers
            </p>
            <p className="text-sm text-amber-800 mt-1">
              Build real AI agents on an open-source platform. Compete on stage in San Francisco.
              ~$30/student/year.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              From sign-up to the stage in one semester
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <BookOpen className="w-5 h-5" />,
                title: "Register & license",
                desc: "Sign up online. Get instant access to the full curriculum, teacher guides, and student workbooks.",
              },
              {
                step: "02",
                icon: <Bot className="w-5 h-5" />,
                title: "Teach & build",
                desc: "8 weeks of structured lessons. Students learn AI fundamentals and build their own agents. No teacher AI expertise needed.",
              },
              {
                step: "03",
                icon: <Trophy className="w-5 h-5" />,
                title: "School Demo Day",
                desc: "Run your own Demo Day with our format guide and judging rubric. Select your top 3 student projects.",
              },
              {
                step: "04",
                icon: <Rocket className="w-5 h-5" />,
                title: "The Stage — SF",
                desc: "Your top 3 present live on stage in San Francisco. Industry judges. Prizes for finalists and their schools.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-xs font-mono text-zinc-400 mb-3">{item.step}</div>
                <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-4 text-amber-600">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-Week Curriculum */}
      <section id="curriculum" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
              8-week curriculum
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Built for teachers who don&apos;t know AI
            </h2>
            <p className="text-lg text-zinc-500">
              Each session is 50 minutes: 10 min recap, 20 min new concept, 15 min hands-on, 5
              min share. Teachers follow the lesson plan. OpenClaw does the heavy lifting.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { week: 1, topic: "Meet Your Agent", build: "Agent with custom personality", icon: <Bot className="w-4 h-4" /> },
              { week: 2, topic: "Skills and Tools", build: "Agent using web search, weather, APIs", icon: <Zap className="w-4 h-4" /> },
              { week: 3, topic: "Security and Trust", build: "Prompt injection defense, API key safety", icon: <Shield className="w-4 h-4" /> },
              { week: 4, topic: "Memory and Context", build: "Agent that remembers across sessions", icon: <Brain className="w-4 h-4" /> },
              { week: 5, topic: "Real-World Connections", build: "Agent on Discord/Telegram", icon: <Users className="w-4 h-4" /> },
              { week: 6, topic: "Ideation and Design", build: "Project proposal: problem to solution", icon: <Star className="w-4 h-4" /> },
              { week: 7, topic: "Build Sprint", build: "Working prototype of custom agent", icon: <Code className="w-4 h-4" /> },
              { week: 8, topic: "Demo Day Prep", build: "3-minute pitch, polished demo", icon: <Trophy className="w-4 h-4" /> },
            ].map((item) => (
              <div
                key={item.week}
                className="flex items-start gap-4 p-4 rounded-lg border border-zinc-200 hover:border-amber-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-zinc-400">Week {item.week}</span>
                    <span className="font-semibold text-sm">{item.topic}</span>
                  </div>
                  <p className="text-sm text-zinc-500">{item.build}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              50-minute sessions
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              No coding experience required (weeks 1-4)
            </div>
          </div>
        </div>
      </section>

      {/* Demo Day */}
      <section id="demo-day" className="py-20 px-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
              Demo Day
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              &ldquo;14-year-old builds AI agent that{" "}
              <span className="text-amber-400">[your student here]</span>&rdquo;
            </h2>
            <p className="text-lg text-zinc-400">
              Demo Day is what makes Clawnagers unforgettable. Students pitch their AI agents live
              on stage in San Francisco. Industry judges. Real prizes. Real stakes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-amber-400 text-zinc-900 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                School Demo Day
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Each school runs their own event using our format guide, judging rubric, and
                streaming toolkit. Teachers record the demos and select their top 3 for
                submission.
              </p>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-amber-400 text-zinc-900 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                The Stage — San Francisco
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Top students from across California present live on stage. 3-minute demo, 2-minute
                Q&amp;A. Judged on creativity, usefulness, technical skill, and presentation — 25%
                each.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-lg bg-zinc-800 border border-zinc-700">
                <p className="font-semibold text-sm mb-3 text-amber-400">Student prizes</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Hardware kits and mentorship from industry leaders
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> National showcase feature
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Certificate + portfolio piece for every presenter
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-lg bg-zinc-800 border border-zinc-700">
                <p className="font-semibold text-sm mb-3 text-amber-400">School prizes</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Technology grants for finalist schools
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Hardware kits for the classroom
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Recognition as a leading AI education school
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Support */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
              For teachers
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              You don&apos;t need to know AI. We built this so you don&apos;t have to.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: "Complete lesson plans",
                desc: "8 weeks of detailed, session-by-session breakdowns. 50-minute classes with built-in structure: recap, concept, hands-on, share.",
              },
              {
                icon: <Bot className="w-5 h-5" />,
                title: "60-min self-paced onboarding",
                desc: "From zero to ready. Covers the OpenClaw platform, each week's material, and how to run Demo Day at your school.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Dashboard + progress tracking",
                desc: "See which students are on track, who needs help, and where each class stands in the curriculum. One view, no spreadsheets.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-zinc-200">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Less than $30 per student, per year
            </h2>
            <p className="text-lg text-zinc-500">
              Title IV-A eligible. No per-student fees. One price, full program.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* School License */}
            <Card className="border-2 border-amber-300 bg-white relative !overflow-visible">
              <div className="absolute -top-3 left-6 z-10">
                <Badge className="bg-amber-400 text-zinc-900 hover:bg-amber-400 font-semibold shadow-sm">
                  Most popular
                </Badge>
              </div>
              <CardContent className="pt-8 pb-6">
                <h3 className="font-bold text-lg mb-1">School License</h3>
                <p className="text-sm text-zinc-500 mb-4">Everything one school needs</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$899</span>
                  <span className="text-zinc-500 text-sm">/year</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold mb-2"
                >
                  {checkoutLoading ? "Redirecting..." : "Get Started — $899/year"}
                </Button>
                <p className="text-xs text-zinc-400 text-center mb-6">
                  Need a PO?{" "}
                  <Link href="/payment/invoice" className="text-amber-600 hover:underline">
                    Request an invoice instead
                  </Link>
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    "Full 8-week curriculum kit",
                    "Teacher onboarding + guides",
                    "Student workbooks + progress dashboard",
                    "Assessment rubrics + grading tools",
                    "Demo Day format guide + judging rubric",
                    "Top 3 entry to Demo Day SF",
                    "Certificates for all students",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-zinc-600">
                      <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* District License */}
            <Card className="border-zinc-200 bg-white">
              <CardContent className="pt-8 pb-6">
                <h3 className="font-bold text-lg mb-1">District License</h3>
                <p className="text-sm text-zinc-500 mb-4">Unlimited schools in your district</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$3,999</span>
                  <span className="text-zinc-500 text-sm">/year</span>
                </div>
                <Link href="/payment/invoice">
                  <Button variant="outline" className="w-full font-semibold mb-6">
                    Request Purchase Order
                  </Button>
                </Link>
                <ul className="space-y-3 text-sm">
                  {[
                    "Everything in School License",
                    "Unlimited schools in district",
                    "Admin dashboard across schools",
                    "Priority Demo Day allocation",
                    "Co-branded certificates",
                    "Dedicated support contact",
                    "PO / invoice payment accepted",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-zinc-600">
                      <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-zinc-400" />
              Title IV-A eligible (PD + STEM)
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-zinc-400" />
              FERPA compliant · Ages 14+
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              Under $1,000 — no RFP required at most schools
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
                Compliance
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Built for how schools actually buy
              </h2>
              <p className="text-lg text-zinc-500">
                We know procurement. Clawnagers is designed to clear every hurdle before you hit
                it.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "No COPPA burden — ages 14+",
                  desc: "Grades 9–12 only. COPPA applies to children under 13, so it's not a compliance concern for your school.",
                },
                {
                  label: "FERPA compliant",
                  desc: "We don't touch student records. Students log in with invite codes — no email, no PII. Schools manage their own data.",
                },
                {
                  label: "Title IV-A eligible",
                  desc: "Positioned as professional development (85%) + curriculum materials (15%). We provide the justification language.",
                },
                {
                  label: "Procurement-friendly",
                  desc: "Under $1,000 school license clears principal-level approval. PO and invoice accepted for districts.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 rounded-lg bg-zinc-50 border border-zinc-200"
                >
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Common questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "Do teachers need AI or coding experience?",
                a: "No. The curriculum is designed so any teacher can deliver it. The 60-minute self-paced onboarding covers everything from installing OpenClaw to running Demo Day. Teachers follow the lesson plan — OpenClaw handles the technical heavy lifting.",
              },
              {
                q: "Do students need coding experience?",
                a: "Not for the first 4 weeks. Weeks 1-4 cover AI fundamentals, prompt engineering, and using APIs through guided exercises. By week 5, students are comfortable enough to start building independently. Week 7 is a full build sprint for their own custom agent.",
              },
              {
                q: "What is OpenClaw?",
                a: "OpenClaw is an open-source platform for building AI agents. It's free, actively maintained, and used by a community of 114,000+ developers. Because it's open-source, there's no vendor lock-in or platform dependency risk.",
              },
              {
                q: "How does Demo Day work?",
                a: "Two stages. First, your school runs its own Demo Day using our event guide and judging rubric — you select your top 3 projects. Then, those students present live on stage at our San Francisco event with industry judges, prizes, and media coverage. California schools first wave.",
              },
              {
                q: "Can we use Title IV-A funds?",
                a: "Yes. Clawnagers qualifies under two Title IV-A spending categories: Effective Use of Technology (as professional development for teachers) and Well-Rounded Educational Opportunities (as STEM curriculum). We provide a one-pager with justification language you can attach to your Title IV-A plan.",
              },
              {
                q: "What data do you collect from students?",
                a: "Minimal. Students log in with invite codes (CLAW-XXXX) — no email addresses, no personal information. Progress data stays within the school's dashboard. Since we target grades 9–12 (ages 14+), COPPA doesn't apply. We're FERPA compliant by design.",
              },
              {
                q: "What's the difference between the School and District license?",
                a: "The School license ($899/year) covers one school — full curriculum, teacher guides, dashboard, and Demo Day entry. The District license ($3,999/year) covers unlimited schools in your district with an admin dashboard, priority Demo Day allocation, and dedicated support. Districts that pool Title IV-A funds through consortia often split the district license across 3-5 schools.",
              },
            ].map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-zinc-200 rounded-lg px-4"
              >
                <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-zinc-500 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Your students are ready to build the future.
          </h2>
          <p className="text-lg text-zinc-500 mb-4">
            Join the first wave of California schools teaching AI agent building. Fall 2026 cohort
            registration is open now.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-amber-800 font-semibold text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Limited to 50 schools • 47 spots claimed
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold text-base px-8">
                Secure Your Fall 2026 Spot
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              Talk to Us
            </Button>
          </div>
          <p className="text-sm text-zinc-400 mt-6">
            Questions? Reach out at hello@clawnagers.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center">
                <Bot className="w-4 h-4 text-zinc-900" />
              </div>
              <span className="font-bold text-sm">Clawnagers</span>
            </div>
            <p className="text-sm text-zinc-500">An OpenClaw Education Program</p>
            <p className="text-xs text-zinc-400 mt-2">© 2026 Clawnagers. All rights reserved.</p>
          </div>
          <div className="flex gap-12 text-sm text-zinc-500">
            <div className="space-y-2">
              <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Program</p>
              <a href="#curriculum" className="block hover:text-zinc-900 transition-colors">Curriculum</a>
              <a href="#demo-day" className="block hover:text-zinc-900 transition-colors">Demo Day</a>
              <a href="#pricing" className="block hover:text-zinc-900 transition-colors">Pricing</a>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Resources</p>
              <Link href="/resources" className="block hover:text-zinc-900 transition-colors">Download Center</Link>
              <Link href="/platform" className="block hover:text-zinc-900 transition-colors">Platform Overview</Link>
              <Link href="/teacher-guide" className="block hover:text-zinc-900 transition-colors">Teacher Knowledge Base</Link>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">Legal</p>
              <a href="/privacy" className="block hover:text-zinc-900 transition-colors">Privacy Policy</a>
              <a href="/terms" className="block hover:text-zinc-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do teachers need AI or coding experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The curriculum is designed so any teacher can deliver it. The 60-minute self-paced onboarding covers everything.",
                },
              },
              {
                "@type": "Question",
                name: "Do students need coding experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Not for the first 4 weeks. Weeks 1-4 cover AI fundamentals through guided exercises. By week 5, students build independently.",
                },
              },
              {
                "@type": "Question",
                name: "What is OpenClaw?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "OpenClaw is an open-source platform for building AI agents, used by a community of 114,000+ developers.",
                },
              },
              {
                "@type": "Question",
                name: "Can we use Title IV-A funds?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Clawnagers qualifies under Title IV-A as professional development and STEM curriculum.",
                },
              },
              {
                "@type": "Question",
                name: "What data do you collect from students?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Minimal. Students log in with invite codes — no email, no PII. Since we target grades 9-12 (ages 14+), COPPA doesn't apply.",
                },
              },
            ],
          }),
        }}
      />

      {/* Organization JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Clawnagers",
            url: "https://clawnagers.com",
            description:
              "K-12 AI agent building curriculum powered by OpenClaw",
            email: "hello@clawnagers.com",
            sameAs: [],
            offers: [
              {
                "@type": "Offer",
                name: "School License",
                price: "899",
                priceCurrency: "USD",
                description:
                  "Full 8-week AI agent curriculum for one school",
              },
              {
                "@type": "Offer",
                name: "District License",
                price: "3999",
                priceCurrency: "USD",
                description:
                  "Unlimited schools in your district",
              },
            ],
          }),
        }}
      />
    </div>
  )
}
