"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { 
  Download, FileText, Calculator, Calendar, Users, Shield,
  BookOpen, DollarSign, Settings, Mail, ArrowRight
} from "lucide-react"

export default function ResourcesPage() {
  const freeResources = [
    {
      title: "Curriculum Overview", 
      description: "High-level program overview, student outcomes, and teacher support details",
      icon: <BookOpen className="w-5 h-5" />,
      type: "PDF",
      pages: "2 pages",
      downloadUrl: "/downloads/Clawnagers-Curriculum-Overview.pdf",
      popular: true
    },
    {
      title: "Sample Lesson Plan", 
      description: "Week 1: Meet Your Agent - Complete 50-minute lesson with activities and worksheets",
      icon: <FileText className="w-5 h-5" />,
      type: "PDF", 
      pages: "4 pages",
      downloadUrl: "/downloads/Clawnagers-Sample-Lesson-Week1.pdf"
    },
    {
      title: "Technical Requirements",
      description: "Hardware specs, network requirements, and IT setup checklist",
      icon: <Settings className="w-5 h-5" />,
      type: "PDF",
      pages: "1 page", 
      downloadUrl: "/downloads/Clawnagers-Technical-Requirements.pdf"
    }
  ]

  const gatedResources = [
    {
      title: "Detailed Curriculum Guide",
      description: "Complete lesson plans, activities, and implementation details (available after registration)", 
      icon: <Users className="w-5 h-5" />,
      type: "PDF",
      pages: "25+ pages",
      leadMagnet: true
    },
    {
      title: "Title IV-A Eligibility Guide",
      description: "Funding breakdown, justification language, and budget allocation examples",
      icon: <DollarSign className="w-5 h-5" />,
      type: "PDF", 
      pages: "2 pages",
      leadMagnet: true
    },
    {
      title: "ROI Calculator & Pricing Guide", 
      description: "Compare costs vs outcomes, calculate per-student value, analyze competitive pricing",
      icon: <Calculator className="w-5 h-5" />,
      type: "Excel",
      pages: "Interactive",
      leadMagnet: true
    },
    {
      title: "Implementation Timeline",
      description: "30-60-90 day rollout plan with milestones, training schedule, and success metrics",
      icon: <Calendar className="w-5 h-5" />,
      type: "PDF",
      pages: "2 pages", 
      leadMagnet: true
    },
    {
      title: "Privacy & Security Overview",
      description: "FERPA compliance, student data protection, and technical security measures",
      icon: <Shield className="w-5 h-5" />,
      type: "PDF",
      pages: "2 pages",
      leadMagnet: true
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 mb-4">
            Resources for Educators
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Get Started
          </h1>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto">
            Detailed curriculum guides, implementation resources, and compliance documentation 
            to help you bring AI agent building to your classroom.
          </p>
        </div>

        {/* Free Resources */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">Free Resources</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              No email required
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {freeResources.map((resource, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow flex flex-col h-full ${
                resource.popular ? 'border-2 border-amber-300' : 'border border-zinc-200'
              }`}>
                {resource.popular && (
                  <div className="bg-amber-400 text-zinc-900 text-center py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      {resource.icon}
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {resource.type} • {resource.pages}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-sm text-zinc-600 mb-4 flex-grow">{resource.description}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-auto flex items-center justify-center" asChild>
                    <Link href={resource.downloadUrl} className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gated Resources */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold">Premium Resources</h2>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Email required
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gatedResources.map((resource, index) => (
              <Card key={index} className="border border-zinc-200 hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                      {resource.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type} • {resource.pages}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-sm text-zinc-600 mb-4 flex-grow">{resource.description}</p>
                  <Button className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold mt-auto flex items-center justify-center" asChild>
                    <Link href={`/download/${resource.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Get Free Access
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Why do we ask for your email?</h3>
                  <p className="text-sm text-amber-800 mb-3">
                    We'll send you the download link plus helpful implementation tips, 
                    curriculum updates, and early access to new resources. No spam, unsubscribe anytime.
                  </p>
                  <p className="text-xs text-amber-700">
                    Used by 200+ CA educators preparing for Fall 2026 launch.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Custom Resources */}
        <Card className="bg-gradient-to-r from-zinc-50 to-zinc-100 border-zinc-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Something Specific?</h2>
            <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
              Looking for custom district analysis, executive presentations, or specific compliance documentation? 
              We're happy to create tailored resources for serious prospects.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-zinc-800 hover:bg-zinc-900 text-white" asChild>
                <Link href="mailto:david@clawnagers.com?subject=Custom Resource Request">
                  Contact for Custom Resources
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">
                  Register Your School
                </Link>
              </Button>
            </div>
            <p className="text-sm text-zinc-500 mt-4">
              Response time: Usually within 24 hours
            </p>
          </CardContent>
        </Card>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Curriculum?</h2>
          <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
            Join the first wave of California schools teaching students to build AI agents. 
            Fall 2026 registration is open now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                Register Your School
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/platform">
              <Button size="lg" variant="outline">
                See Platform Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}