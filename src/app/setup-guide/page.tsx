"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Cloud, 
  Cpu, 
  DollarSign, 
  GraduationCap, 
  HardDrive, 
  Monitor, 
  Smartphone, 
  Users, 
  Wifi,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react"

// Metadata is handled by Next.js head management for client components

export default function SetupGuidePage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)

  const showClassroomRecommendation = (size: string) => {
    setSelectedRecommendation(size)
  }

  const recommendations = {
    small: {
      title: "🏫 Small Classroom Setup",
      students: "1-15 students",
      recommendation: "Chromebook-friendly cloud setup",
      cost: "$0-50/month",
      infrastructure: [
        "Google Colab (free tier sufficient)",
        "GitHub Education accounts for all students", 
        "Shared API keys managed by teacher",
        "Basic network requirements (20 Mbps)"
      ],
      partnerships: ["GitHub Education", "Google for Education"],
      timeline: "1-2 weeks setup",
      pros: ["Minimal cost", "Easy management", "Works on any device"],
      nextStep: "Start with GitHub Education Pack"
    },
    medium: {
      title: "🎓 Standard Classroom Setup", 
      students: "16-30 students",
      recommendation: "Mixed cloud + local resources",
      cost: "$150-300/month",
      infrastructure: [
        "Apply for NVIDIA Education (free GPU access)",
        "Google Colab Pro for advanced projects",
        "AWS Education credits for production",
        "Dedicated classroom network (50+ Mbps)"
      ],
      partnerships: ["NVIDIA Education", "AWS Educate", "Google"],
      timeline: "3-4 weeks setup (includes approvals)",
      pros: ["Professional tools", "Scalable", "Free GPU access"],
      nextStep: "Apply for NVIDIA Education Program"
    },
    large: {
      title: "🏢 Multi-Class Setup",
      students: "31-100 students", 
      recommendation: "Institutional cloud infrastructure",
      cost: "$500-1000/month",
      infrastructure: [
        "Dedicated cloud instances (AWS/DigitalOcean)",
        "Local AI models for cost efficiency",
        "Student management dashboard",
        "High-bandwidth network (100+ Mbps)"
      ],
      partnerships: ["All education programs", "Institutional discounts"],
      timeline: "6-8 weeks (includes IT approval)",
      pros: ["Full control", "Cost efficient at scale", "Advanced features"],
      nextStep: "Contact education team for consultation"
    },
    district: {
      title: "🌟 District-Wide Deployment",
      students: "100+ students",
      recommendation: "Enterprise infrastructure with local deployment", 
      cost: "Custom pricing",
      infrastructure: [
        "On-premise GPU clusters or cloud hybrid",
        "District-wide student management",
        "Professional development for teachers",
        "Dedicated support and training"
      ],
      partnerships: ["Enterprise partnerships", "Volume discounts"],
      timeline: "3-6 months (full implementation)",
      pros: ["Maximum control", "Best per-student cost", "Full support"],
      nextStep: "Schedule enterprise consultation"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Technical Setup Guide
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Everything you need to run Clawnagers in your classroom. From Chromebooks to professional GPU clusters.
          </p>
        </div>

        {/* Setup Wizard */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-600" />
            Find Your Perfect Classroom Setup
          </h2>
          <p className="text-sm text-zinc-600 mb-6">
            Answer a few questions about your classroom to get a personalized infrastructure recommendation.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">📊 How many students in your class?</h3>
              <div className="grid md:grid-cols-4 gap-2">
                <button 
                  onClick={() => showClassroomRecommendation('small')} 
                  className="p-3 text-left bg-white border border-zinc-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="font-medium">1-15 students</div>
                  <div className="text-sm text-zinc-500">Single classroom</div>
                </button>
                <button 
                  onClick={() => showClassroomRecommendation('medium')} 
                  className="p-3 text-left bg-white border border-zinc-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="font-medium">16-30 students</div>
                  <div className="text-sm text-zinc-500">Standard class size</div>
                </button>
                <button 
                  onClick={() => showClassroomRecommendation('large')} 
                  className="p-3 text-left bg-white border border-zinc-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="font-medium">31-100 students</div>
                  <div className="text-sm text-zinc-500">Multiple classes</div>
                </button>
                <button 
                  onClick={() => showClassroomRecommendation('district')} 
                  className="p-3 text-left bg-white border border-zinc-200 rounded-lg hover:border-amber-300 transition-colors"
                >
                  <div className="font-medium">100+ students</div>
                  <div className="text-sm text-zinc-500">School/district wide</div>
                </button>
              </div>
            </div>
          </div>

          {selectedRecommendation && (
            <div className="mt-6 p-4 bg-white border-2 border-amber-300 rounded-lg">
              {(() => {
                const rec = recommendations[selectedRecommendation as keyof typeof recommendations]
                return (
                  <>
                    <h4 className="font-semibold text-amber-800 mb-4">{rec.title}</h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <h5 className="font-medium mb-2">Recommended Setup</h5>
                        <p className="text-sm text-zinc-600 mb-3">{rec.recommendation}</p>
                        <p className="text-sm"><strong>Cost:</strong> {rec.cost}</p>
                        <p className="text-sm"><strong>Timeline:</strong> {rec.timeline}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Infrastructure Needs</h5>
                        <ul className="text-sm text-zinc-600 space-y-1">
                          {rec.infrastructure.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Key Benefits</h5>
                        <ul className="text-sm text-zinc-600 space-y-1">
                          {rec.pros.map((pro, index) => (
                            <li key={index}>✓ {pro}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        {rec.nextStep}
                      </Button>
                      <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                        View Detailed Guide Below
                      </Button>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>

        {/* Education Partnerships */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Education Partnerships</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">NVIDIA for Education</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">FREE</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Free DGX Cloud access for qualifying K-12 schools. A100/H100 GPUs with 8-40GB VRAM per student.
                </p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Professional-grade hardware
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Full classroom support
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    2-3 week approval process
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Apply at nvidia.com/education
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Google for Education</CardTitle>
                  <Badge variant="secondary">$9.99/month</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Colab Pro+ with T4/V100 GPUs, 25GB RAM, and Google Classroom integration.
                </p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Immediate setup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Classroom management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Education discounts available
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Setup Google Colab
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AWS Education</CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">$200 Credits</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Free cloud credits per student/year through AWS Educate program.
                </p>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Real cloud infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    GPU instances available
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Industry experience
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">
                  Join AWS Educate
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Device Compatibility</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-zinc-200 rounded-lg">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="p-4 text-left font-semibold">Device Type</th>
                  <th className="p-4 text-center font-semibold">OpenClaw Support</th>
                  <th className="p-4 text-center font-semibold">Local AI</th>
                  <th className="p-4 text-center font-semibold">Cloud AI</th>
                  <th className="p-4 text-left font-semibold">Recommended Setup</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-zinc-500" />
                    Chromebook
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓ Web IDE</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge variant="destructive">✗</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </td>
                  <td className="p-4 text-zinc-600">Colab + GitHub</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-zinc-500" />
                    Windows Laptop
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓ Native</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓ Small models</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </td>
                  <td className="p-4 text-zinc-600">Full installation</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-zinc-500" />
                    MacBook
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓ Native</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓ Good performance</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </td>
                  <td className="p-4 text-zinc-600">Local + cloud hybrid</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-zinc-500" />
                    iPad/Tablet
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-amber-100 text-amber-800">⚠ Limited</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge variant="destructive">✗</Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </td>
                  <td className="p-4 text-zinc-600">Colab via browser</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cost Calculator */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Cost Calculator</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  Learning Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">1-30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware:</span>
                    <span className="font-medium">Any device</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI:</span>
                    <span className="font-medium">Cloud APIs</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">$0-50</div>
                  <div className="text-sm text-zinc-500">per month</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-amber-500" />
                    Recommended
                  </CardTitle>
                  <Badge className="bg-amber-200 text-amber-800">POPULAR</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">30-100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware:</span>
                    <span className="font-medium">Cloud GPU</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI:</span>
                    <span className="font-medium">Local + Cloud</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-2xl font-bold text-amber-600">$200-500</div>
                  <div className="text-sm text-zinc-500">per month</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-500" />
                  Production
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">100-300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware:</span>
                    <span className="font-medium">GPU Cluster</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI:</span>
                    <span className="font-medium">Local models</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-2xl font-bold text-purple-600">$1000+</div>
                  <div className="text-sm text-zinc-500">per month</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-zinc-500" />
                  Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware:</span>
                    <span className="font-medium">On-premise</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI:</span>
                    <span className="font-medium">Private cloud</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-2xl font-bold text-zinc-600">Custom</div>
                  <div className="text-sm text-zinc-500">Contact us</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">8-Week Implementation Timeline</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weeks 1-2: Foundation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Choose infrastructure option</li>
                    <li>• Apply for education programs</li>
                    <li>• Set up teacher accounts</li>
                    <li>• Test basic connectivity</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weeks 3-4: Student Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Distribute access credentials</li>
                    <li>• Install software/configure accounts</li>
                    <li>• Complete Module 1 as class</li>
                    <li>• Establish support channels</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weeks 5-6: Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Enable hardware integrations</li>
                    <li>• Set up collaboration workflows</li>
                    <li>• Configure assessment tools</li>
                    <li>• Plan Demo Day logistics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weeks 7-8: Production Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Deploy student projects</li>
                    <li>• Set up monitoring/logging</li>
                    <li>• Prepare for Demo Day</li>
                    <li>• Document lessons learned</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Network Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Network Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Minimum Bandwidth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li><strong>Per Student:</strong> 1 Mbps download, 0.5 Mbps upload</li>
                  <li><strong>Classroom (30 students):</strong> 50 Mbps dedicated</li>
                  <li><strong>Recommended:</strong> 100 Mbps+ with QoS prioritization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Firewall Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li><strong>Ports:</strong> 443 (HTTPS), 8080 (OpenClaw), 22 (SSH)</li>
                  <li><strong>Domains:</strong> *.openai.com, *.anthropic.com, *.colab.research.google.com</li>
                  <li><strong>WebSockets:</strong> Enable for real-time collaboration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Security & Privacy</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-green-800">Student Data Protection</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>No PII Collection:</strong> Clawnagers uses invite codes, not emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>FERPA Compliant:</strong> Educational records protection</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Local Processing:</strong> AI models can run entirely offline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span><strong>Audit Logs:</strong> Track all system access and changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <Card className="border-2 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-xl text-center">Ready to Get Started?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-zinc-600 mb-6">
                Contact our education team to discuss your specific classroom needs and get personalized setup assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Contact Education Team
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/teacher-guide">
                    View Teacher Guide
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-zinc-500 mt-4">
                Questions? Email education@clawnagers.com
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}