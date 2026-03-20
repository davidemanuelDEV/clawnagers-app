"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { 
  Brain, DollarSign, Zap, Star, CheckCircle, AlertTriangle,
  Code, MessageSquare, Search, Image, FileText, Calculator,
  Clock, Users, ArrowRight, ExternalLink
} from "lucide-react"

export default function AIModelsPage() {
  const freeModels = [
    {
      name: "Llama 3.1 8B",
      provider: "Meta (via Groq)",
      cost: "$0",
      speed: "Very Fast",
      usedFor: ["Code Generation", "Basic Q&A", "Simple Tasks"],
      weekIntroduced: 1,
      description: "Perfect for beginners. Students start here to learn prompt engineering and basic agent concepts.",
      limits: "100 requests/hour per student",
      icon: <Code className="w-5 h-5" />,
      recommended: true
    },
    {
      name: "Gemini Flash",
      provider: "Google", 
      cost: "$0",
      speed: "Fast",
      usedFor: ["Text Analysis", "Research", "Content Creation"],
      weekIntroduced: 2,
      description: "Great for document analysis and research tasks. Students use this for information gathering.",
      limits: "15 requests/minute",
      icon: <Search className="w-5 h-5" />
    },
    {
      name: "OpenAI GPT-4o Mini",
      provider: "OpenAI",
      cost: "$0*",
      speed: "Fast", 
      usedFor: ["Conversation", "Creative Writing", "Problem Solving"],
      weekIntroduced: 3,
      description: "Industry standard model. Students learn professional AI interaction patterns.",
      limits: "3 requests/minute (free tier)",
      icon: <MessageSquare className="w-5 h-5" />
    }
  ]

  const paidModels = [
    {
      name: "Claude 3.5 Sonnet", 
      provider: "Anthropic",
      cost: "$3 per million tokens",
      costPerStudent: "~$2-5/month",
      speed: "Fast",
      usedFor: ["Advanced Coding", "Complex Reasoning", "Agent Architecture"],
      weekIntroduced: 4,
      description: "Premium model for advanced projects. Students build sophisticated agents with multi-step reasoning.",
      icon: <Brain className="w-5 h-5" />,
      advanced: true
    },
    {
      name: "GPT-4",
      provider: "OpenAI", 
      cost: "$30 per million tokens",
      costPerStudent: "~$5-10/month",
      speed: "Medium",
      usedFor: ["Complex Problem Solving", "Advanced Coding", "Research"],
      weekIntroduced: 5,
      description: "Industry leading model. Students experience state-of-the-art AI capabilities for final projects.",
      icon: <Star className="w-5 h-5" />,
      premium: true
    },
    {
      name: "DALL-E 3",
      provider: "OpenAI",
      cost: "$0.04 per image",
      costPerStudent: "~$3-8/month", 
      speed: "Medium",
      usedFor: ["Image Generation", "Visual Design", "Creative Projects"],
      weekIntroduced: 6,
      description: "Students learn multimodal AI by creating visual content for their agents.",
      icon: <Image className="w-5 h-5" />
    },
    {
      name: "GPT-4 Vision",
      provider: "OpenAI",
      cost: "$30 per million tokens", 
      costPerStudent: "~$3-7/month",
      speed: "Medium",
      usedFor: ["Image Analysis", "Visual Q&A", "Document OCR"],
      weekIntroduced: 7,
      description: "Advanced computer vision capabilities. Students build agents that can see and understand images.",
      icon: <FileText className="w-5 h-5" />
    }
  ]

  const totalCostEstimate = {
    freeOnly: "$0/month per student",
    withBasicPaid: "$5-15/month per student", 
    withAdvanced: "$15-35/month per student",
    fullStack: "$25-50/month per student"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 border-purple-300 mb-4">
            AI Model Configuration
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI Model Pricing & Configuration Guide
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Understand exactly which AI models students use, when they're introduced, 
            and how much they cost. Configure your classroom budget with confidence.
          </p>
        </div>

        {/* Cost Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Total Cost Estimates</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Free Only
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">$0</div>
                <p className="text-sm text-green-700 mb-3">per student/month</p>
                <p className="text-xs text-green-600">
                  Weeks 1-3 only. Limited to free models with rate limits.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  Basic Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600 mb-2">$5-15</div>
                <p className="text-sm text-amber-700 mb-3">per student/month</p>
                <p className="text-xs text-amber-600">
                  Recommended. Includes Claude 3.5 for advanced projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Advanced
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">$15-35</div>
                <p className="text-sm text-blue-700 mb-3">per student/month</p>
                <p className="text-xs text-blue-600">
                  Adds GPT-4 and image generation for premium experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Full Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">$25-50</div>
                <p className="text-sm text-purple-700 mb-3">per student/month</p>
                <p className="text-xs text-purple-600">
                  All models including vision and multimodal capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Free Models */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Free Models</h2>
            <Badge className="bg-green-100 text-green-800">$0 Cost</Badge>
          </div>
          <div className="grid gap-6">
            {freeModels.map((model, index) => (
              <Card key={index} className={`${model.recommended ? 'border-amber-200 bg-amber-50' : 'border-zinc-200'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {model.icon}
                      <div>
                        <div className="flex items-center gap-2">
                          {model.name}
                          {model.recommended && <Badge className="bg-amber-200 text-amber-800 text-xs">RECOMMENDED START</Badge>}
                        </div>
                        <div className="text-sm text-zinc-500 font-normal">{model.provider}</div>
                      </div>
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{model.cost}</div>
                      <div className="text-xs text-zinc-500">Speed: {model.speed}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Introduced in Week {model.weekIntroduced}</h4>
                      <p className="text-sm text-zinc-600">{model.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Used For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.usedFor.map((use, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{use}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Rate Limits:</h4>
                      <p className="text-xs text-zinc-600">{model.limits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Paid Models */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Paid Models</h2>
            <Badge className="bg-blue-100 text-blue-800">Enhanced Capabilities</Badge>
          </div>
          <div className="grid gap-6">
            {paidModels.map((model, index) => (
              <Card key={index} className={`border-zinc-200 ${model.premium ? 'bg-blue-50' : model.advanced ? 'bg-purple-50' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {model.icon}
                      <div>
                        <div className="flex items-center gap-2">
                          {model.name}
                          {model.premium && <Badge className="bg-blue-200 text-blue-800 text-xs">PREMIUM</Badge>}
                          {model.advanced && <Badge className="bg-purple-200 text-purple-800 text-xs">ADVANCED</Badge>}
                        </div>
                        <div className="text-sm text-zinc-500 font-normal">{model.provider}</div>
                      </div>
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{model.costPerStudent}</div>
                      <div className="text-xs text-zinc-500">{model.cost}</div>
                      <div className="text-xs text-zinc-500">Speed: {model.speed}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Introduced in Week {model.weekIntroduced}</h4>
                      <p className="text-sm text-zinc-600">{model.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Used For:</h4>
                      <div className="flex flex-wrap gap-1">
                        {model.usedFor.map((use, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{use}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Week {model.weekIntroduced} Focus:</h4>
                      <p className="text-xs text-zinc-600">Students learn advanced capabilities and build more sophisticated agents.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Budget Planning */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Budget Planning by Classroom Size</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Small Class (15 students)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Free Models Only:</span>
                    <span className="font-semibold">$0/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Paid:</span>
                    <span className="font-semibold">$75-225/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Stack:</span>
                    <span className="font-semibold">$375-750/month</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-zinc-600">Recommended: Start free, upgrade to Basic Paid by Week 4</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Medium Class (25 students)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Free Models Only:</span>
                    <span className="font-semibold">$0/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Paid:</span>
                    <span className="font-semibold">$125-375/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Stack:</span>
                    <span className="font-semibold">$625-1,250/month</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-zinc-600">Many schools budget $300-500/month for comprehensive AI education</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Large Class (35 students)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Free Models Only:</span>
                    <span className="font-semibold">$0/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Paid:</span>
                    <span className="font-semibold">$175-525/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Stack:</span>
                    <span className="font-semibold">$875-1,750/month</span>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-zinc-600">Consider volume discounts and shared accounts for larger classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuration Recommendations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Configuration Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Budget-Conscious Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-green-700">Perfect for schools with limited AI budgets</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-200 text-green-800 text-xs">Weeks 1-6</Badge>
                      <span className="text-sm">Free models only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-200 text-amber-800 text-xs">Weeks 7-8</Badge>
                      <span className="text-sm">Add Claude 3.5 for final projects</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-600">Total cost: $0-10/student for the entire program</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Premium Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-blue-700">Full curriculum with all AI capabilities</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-200 text-green-800 text-xs">Weeks 1-3</Badge>
                      <span className="text-sm">Free models</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-200 text-blue-800 text-xs">Weeks 4-8</Badge>
                      <span className="text-sm">All paid models including GPT-4 & DALL-E</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600">Total cost: $100-200/student for complete experience</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cost Management Tips */}
        <Card className="border-amber-200 bg-amber-50 mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Cost Management Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Keep Costs Down:</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li>• Start with free models for first 3 weeks</li>
                  <li>• Use shared API keys for the entire class</li>
                  <li>• Set usage limits per student per day</li>
                  <li>• Focus on one paid model at a time</li>
                  <li>• Consider volume discounts from providers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Budget Gradually:</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li>• Week 1-3: $0 (free models)</li>
                  <li>• Week 4-5: Add Claude 3.5 ($5-15/student)</li>
                  <li>• Week 6-7: Add image generation if desired</li>
                  <li>• Week 8: Premium models for final projects</li>
                  <li>• Monitor usage and adjust limits as needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Configure Your AI Models?</h2>
            <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
              Get detailed setup instructions and API key management guidance in our technical setup guide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/setup-guide">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  View Technical Setup Guide
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Register Your School
                </Button>
              </Link>
            </div>
            <p className="text-sm text-zinc-500 mt-4">
              Questions about AI model costs? Email david@clawnagers.com
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}