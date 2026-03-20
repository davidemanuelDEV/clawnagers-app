"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { 
  Trophy, Calendar, MapPin, Users, Star, Target, Code, 
  Presentation, Award, Plane, Camera, Mic, Clock,
  CheckCircle, ArrowRight, ExternalLink, Zap, Brain,
  Medal, Gift, Building, GraduationCap, Bot
} from "lucide-react"

export default function DemoDayPage() {
  const timeline = [
    {
      date: "Fall 2026",
      title: "8-Week Program",
      description: "Students complete Clawnagers curriculum and build their AI agents",
      icon: <Code className="w-5 h-5" />,
      status: "active"
    },
    {
      date: "November 2026", 
      title: "School Competitions",
      description: "Each school selects their top 3 student agents for Demo Day",
      icon: <Target className="w-5 h-5" />,
      status: "upcoming"
    },
    {
      date: "Fall 2026",
      title: "Demo Day Competition",
      description: "Top teams present to industry experts and compete for prizes",
      icon: <Trophy className="w-5 h-5" />,
      status: "upcoming"
    }
  ]

  const judges = [
    {
      name: "Industry Expert Panel",
      role: "AI & Technology Leaders",
      company: "Leading Tech Companies",
      expertise: "AI Development & Education",
      image: "/images/judge-placeholder.jpg"
    },
    {
      name: "Academic Advisors", 
      role: "Research & Education",
      company: "Top Universities",
      expertise: "AI Research & Pedagogy",
      image: "/images/judge-placeholder.jpg"
    },
    {
      name: "Innovation Leaders",
      role: "Product & Engineering", 
      company: "Technology Industry",
      expertise: "Real-World AI Applications",
      image: "/images/judge-placeholder.jpg"
    }
  ]

  const prizes = [
    {
      place: "1st Place",
      award: "Grand Prize",
      description: "Champion Award + Recognition",
      color: "text-amber-600",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      place: "2nd Place", 
      award: "Excellence Award",
      description: "Innovation Recognition",
      color: "text-gray-500",
      icon: <Medal className="w-6 h-6" />
    },
    {
      place: "3rd Place",
      award: "Achievement Award", 
      description: "Technical Excellence Recognition",
      color: "text-orange-600",
      icon: <Star className="w-6 h-6" />
    },
    {
      place: "Special Recognition",
      award: "Impact Award",
      description: "Social Impact + Innovation",
      color: "text-purple-600", 
      icon: <Users className="w-6 h-6" />
    }
  ]

  const categories = [
    {
      title: "Technical Innovation",
      weight: "40%",
      criteria: [
        "Code quality and architecture",
        "Creative use of AI models", 
        "Technical complexity handled",
        "Problem-solving approach"
      ],
      icon: <Bot className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Real-World Impact",
      weight: "35%",
      criteria: [
        "Addresses genuine problem",
        "Clear value proposition",
        "Scalability potential", 
        "Social benefit consideration"
      ],
      icon: <Target className="w-5 h-5 text-green-500" />
    },
    {
      title: "Presentation & Demo", 
      weight: "25%",
      criteria: [
        "Clear communication",
        "Engaging demonstration",
        "Handles Q&A effectively",
        "Professional delivery"
      ],
      icon: <Presentation className="w-5 h-5 text-purple-500" />
    }
  ]

  const eventDetails = [
    {
      title: "Location",
      value: "California Bay Area",
      details: "Professional venue (details TBD)",
      icon: <MapPin className="w-5 h-5 text-red-500" />
    },
    {
      title: "Date", 
      value: "Fall 2026",
      details: "Exact date to be announced",
      icon: <Calendar className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Format",
      value: "Live Presentations",
      details: "Student demos + expert Q&A",
      icon: <Mic className="w-5 h-5 text-green-500" />
    },
    {
      title: "Attendees",
      value: "Industry Leaders", 
      details: "Students, teachers, families, tech professionals",
      icon: <Users className="w-5 h-5 text-purple-500" />
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 mb-4">
            Demo Day 2026
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Demo Day Competition
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-8">
            The culminating event where California's brightest students showcase their AI agents 
            to industry leaders and compete for substantial prizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
              <Link href="/register">
                Register Your School
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="mr-2 w-4 h-4" />
              Competition Details Coming Soon
            </Button>
          </div>
          
          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {eventDetails.map((detail, index) => (
              <Card key={index} className="border border-zinc-200">
                <CardContent className="pt-6 pb-4 text-center">
                  <div className="flex justify-center mb-3">
                    {detail.icon}
                  </div>
                  <div className="font-semibold text-zinc-900">{detail.value}</div>
                  <div className="text-sm text-zinc-500">{detail.details}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Path to Demo Day</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((phase, index) => (
              <Card key={index} className={`${
                phase.status === 'active' ? 'border-amber-300 bg-amber-50' : 'border-zinc-200'
              }`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      phase.status === 'active' ? 'bg-amber-200 text-amber-700' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {phase.icon}
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">{phase.date}</Badge>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Prizes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Competition Awards</h2>
          <p className="text-center text-zinc-600 mb-12 max-w-2xl mx-auto">
            Recognizing excellence in technical innovation, real-world impact, and presentation skills. 
            Awards and prizes to be announced.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {prizes.map((prize, index) => (
              <Card key={index} className={`text-center border-2 ${
                index === 0 ? 'border-amber-300 bg-amber-50' : 'border-zinc-200'
              }`}>
                <CardHeader>
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    index === 0 ? 'bg-amber-200' : 'bg-zinc-100'
                  }`}>
                    <div className={prize.color}>
                      {prize.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{prize.place}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold mb-2 ${prize.color}`}>
                    {prize.award}
                  </div>
                  <p className="text-sm text-zinc-600">{prize.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Judging Criteria */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Judging Criteria</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border border-zinc-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon}
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="w-fit">{category.weight}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry Judges */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Expert Judging Panel</h2>
          <p className="text-center text-zinc-600 mb-12 max-w-2xl mx-auto">
            Students present to leading professionals from industry and academia who provide 
            feedback and evaluate projects based on technical merit and innovation. Panel details TBD.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {judges.map((judge, index) => (
              <Card key={index} className="border border-zinc-200 text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-zinc-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-zinc-500" />
                  </div>
                  <CardTitle className="text-lg">{judge.name}</CardTitle>
                  <p className="text-sm text-zinc-600">{judge.role}</p>
                  <p className="text-sm font-semibold text-blue-600">{judge.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{judge.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What Students Present */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What Students Present</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live AI Agent Demo</h3>
                    <p className="text-sm text-zinc-600">Students demonstrate their working AI agent solving real problems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Technical Architecture</h3>
                    <p className="text-sm text-zinc-600">Explanation of how they built it and which AI models they used</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Problem & Solution</h3>
                    <p className="text-sm text-zinc-600">The real-world problem they're solving and impact measurement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Future Vision</h3>
                    <p className="text-sm text-zinc-600">How they would scale and improve their agent with more time/resources</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Presentation Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-amber-900">Live Demo</div>
                    <p className="text-sm text-amber-700">Students demonstrate AI agent capabilities</p>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">Expert Q&A</div>
                    <p className="text-sm text-amber-700">Panel questions about technical implementation</p>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">Professional Format</div>
                    <p className="text-sm text-amber-700">Structured presentation schedule (details TBD)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Travel & Logistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Event Support</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  For Participating Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Support for qualifying schools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Teacher + student team participation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Event refreshments and materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Professional documentation and recognition</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  Event Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold">Professional Venue</div>
                    <p className="text-sm text-zinc-600">California Bay Area location (details TBD)</p>
                  </div>
                  <div>
                    <div className="font-semibold">Accessibility</div>
                    <p className="text-sm text-zinc-600">ADA compliant venue with full accessibility</p>
                  </div>
                  <div>
                    <div className="font-semibold">Technical Setup</div>
                    <p className="text-sm text-zinc-600">High-speed WiFi, presentation equipment provided</p>
                  </div>
                  <div>
                    <div className="font-semibold">Schedule</div>
                    <p className="text-sm text-zinc-600">Professional event format (details to be announced)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Media Coverage */}
        <Card className="border-2 border-blue-200 bg-blue-50 mb-16">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Camera className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Event Documentation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Event Coverage</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Professional event documentation</li>
                      <li>• Student presentation recordings</li>
                      <li>• Event photography and highlights</li>
                      <li>• Award ceremony coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Student Recognition</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Portfolio materials and certificates</li>
                      <li>• Project showcase documentation</li>
                      <li>• School recognition materials</li>
                      <li>• Media and sharing resources</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Your Students to Demo Day</h2>
            <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
              Registration for Fall 2026 is open now. Secure your school's spot in California's 
              first AI agent building curriculum and give your students the opportunity to showcase 
              their projects to industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                  Register Your School Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline">
                  Download Program Overview
                </Button>
              </Link>
            </div>
            <p className="text-sm text-zinc-500 mt-6">
              Questions about Demo Day? Email david@clawnagers.com
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}