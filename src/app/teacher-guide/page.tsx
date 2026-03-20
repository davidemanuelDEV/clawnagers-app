"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { 
  BookOpen, Users, Trophy, BarChart3, Code, Clock, 
  CheckCircle, Calendar, FileText, Download, Play,
  ArrowRight, Monitor, Smartphone, Bot
} from "lucide-react"

export default function TeacherGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 mb-4">
            Teacher Knowledge Base
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Teaching AI Agents Made Simple
          </h1>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto">
            Everything you need to deliver the 8-week Clawnagers curriculum. No AI experience required.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-12 border-2 border-amber-200 bg-amber-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-amber-600" />
              <CardTitle className="text-xl">60-Minute Teacher Onboarding</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-900 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Platform Setup</h3>
                  <p className="text-sm text-zinc-600">Install OpenClaw, create your teacher account, import your class roster</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-900 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Curriculum Overview</h3>
                  <p className="text-sm text-zinc-600">Week-by-week breakdown, learning objectives, and demo day preparation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-900 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold mb-1">First Week Ready</h3>
                  <p className="text-sm text-zinc-600">Practice the Week 1 lesson, generate student invite codes, you're ready!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Teacher Dashboard</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Dashboard Screenshot Placeholder */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <Monitor className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-zinc-700 mb-2">Real Teacher Dashboard</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">
                    See student progress, manage curriculum delivery, track Demo Day submissions
                  </p>
                </div>
              </div>
            </Card>

            {/* Right: Dashboard Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200">
                <BarChart3 className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Student Progress Tracking</h3>
                  <p className="text-sm text-zinc-500">See which students are on track, who needs help, completion rates by week</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200">
                <Bot className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">AI Agent Management</h3>
                  <p className="text-sm text-zinc-500">Track student agent development, monitor project progress, provide guidance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200">
                <Trophy className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Demo Day Portal</h3>
                  <p className="text-sm text-zinc-500">Review submissions, select top 3, submit to San Francisco competition</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-zinc-200">
                <BookOpen className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Curriculum Delivery</h3>
                  <p className="text-sm text-zinc-500">Week-by-week lesson plans, student workbooks, assessment rubrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Curriculum Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">8-Week Curriculum Structure</h2>
          <p className="text-zinc-500 mb-8">
            Each 50-minute session follows the same structure: 10 min recap, 20 min new concept, 15 min hands-on, 5 min share.
          </p>
          
          <div className="grid gap-4">
            {[
              {
                week: 1,
                title: "Meet Your Agent",
                objective: "Students create their first AI agent with a custom personality",
                activities: ["AI fundamentals introduction", "OpenClaw platform setup", "Create basic conversational agent", "Name their agent"],
                deliverable: "Working agent that responds with personality",
                difficulty: "Beginner"
              },
              {
                week: 2,
                title: "Skills and Tools",
                objective: "Agent learns to use web search, weather APIs, and external tools",
                activities: ["API concept introduction", "Connect web search tool", "Weather integration", "Tool chaining"],
                deliverable: "Agent that can search and report weather",
                difficulty: "Beginner"
              },
              {
                week: 3,
                title: "Security and Trust",
                objective: "Understanding prompt injection, API key safety, and agent security",
                activities: ["Prompt injection demos", "Security best practices", "API key management", "Input validation"],
                deliverable: "Hardened agent with security measures",
                difficulty: "Intermediate"
              },
              {
                week: 4,
                title: "Memory and Context",
                objective: "Agent remembers conversations and learns from interactions",
                activities: ["Memory systems introduction", "Context management", "Persistent storage", "Conversation history"],
                deliverable: "Agent with memory across sessions",
                difficulty: "Intermediate"
              },
              {
                week: 5,
                title: "Real-World Connections",
                objective: "Deploy agent to Discord/Telegram for live interactions",
                activities: ["Platform API setup", "Bot deployment", "Real user testing", "Feedback collection"],
                deliverable: "Live agent on social platform",
                difficulty: "Intermediate"
              },
              {
                week: 6,
                title: "Ideation and Design",
                objective: "Design original agent solving a real-world problem",
                activities: ["Problem identification", "Solution design", "Technical planning", "Project proposal"],
                deliverable: "Complete project proposal document",
                difficulty: "Advanced"
              },
              {
                week: 7,
                title: "Build Sprint",
                objective: "Implement custom agent project from concept to working prototype",
                activities: ["Independent building", "Teacher consultations", "Peer collaboration", "Problem solving"],
                deliverable: "Working prototype of original agent",
                difficulty: "Advanced"
              },
              {
                week: 8,
                title: "Demo Day Prep",
                objective: "Polish project and prepare 3-minute presentation for Demo Day",
                activities: ["Demo scripting", "Presentation practice", "Technical refinement", "School Demo Day event"],
                deliverable: "Polished demo ready for competition",
                difficulty: "Advanced"
              }
            ].map((week) => (
              <Card key={week.week} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                        {week.week}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{week.title}</h3>
                        <p className="text-sm text-zinc-500">{week.objective}</p>
                      </div>
                    </div>
                    <Badge variant={week.difficulty === 'Beginner' ? 'secondary' : week.difficulty === 'Intermediate' ? 'default' : 'destructive'} className="text-xs">
                      {week.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 mb-2">Class Activities</h4>
                      <ul className="text-sm text-zinc-600 space-y-1">
                        {week.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-amber-400 rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 mb-2">Week Deliverable</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-zinc-600">{week.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Management Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Student Management Made Easy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-600" />
                  Invite Code System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <div className="font-mono text-sm">
                      <div className="text-zinc-500">Generated codes for your class:</div>
                      <div className="mt-2 space-y-1">
                        <div>CLAW-A7K9 → Alex Chen</div>
                        <div>CLAW-B2X4 → Maria Garcia</div>
                        <div>CLAW-C9M1 → David Kim</div>
                        <div className="text-zinc-400">+ 22 more students...</div>
                      </div>
                    </div>
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      No email/PII collection required
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      FERPA compliant by design
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Bulk generation for your class size
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg border">
                    <div className="text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span>Class Average Progress</span>
                        <span className="font-semibold">6.2/8 weeks</span>
                      </div>
                      <div className="w-full bg-zinc-200 rounded-full h-2">
                        <div className="bg-amber-400 h-2 rounded-full" style={{width: '77%'}}></div>
                      </div>
                      <div className="mt-2 text-xs text-zinc-500">
                        22 students on track • 3 need help • Demo Day ready: 18
                      </div>
                    </div>
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Individual student progress tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Identify students who need support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Class-wide analytics and reports
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assessment & Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Assessment & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  Grading Rubrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Weekly project rubrics</li>
                  <li>• Demo Day scoring guide</li>
                  <li>• Peer evaluation templates</li>
                  <li>• Portfolio assessment</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Rubrics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Lesson Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• Detailed 50-min session plans</li>
                  <li>• Student activity worksheets</li>
                  <li>• Extension activities</li>
                  <li>• Troubleshooting guides</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  View Lesson Plans
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Demo Day Kit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-zinc-600 space-y-2">
                  <li>• School event planning guide</li>
                  <li>• Judging rubric and forms</li>
                  <li>• Streaming setup instructions</li>
                  <li>• SF competition submission</li>
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Demo Day Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support & Training */}
        <Card className="mb-12 bg-zinc-50">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ongoing Support</h2>
              <p className="text-zinc-500 mb-6 max-w-2xl mx-auto">
                You're not alone. Our team provides comprehensive support throughout the program.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-sm text-zinc-600">Weekly virtual office hours with curriculum experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                    <Users className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Teacher Community</h3>
                    <p className="text-sm text-zinc-600">Private Discord for CA teachers sharing best practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Direct Support</h3>
                    <p className="text-sm text-zinc-600">Email and video call support for any technical issues</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-2 border-amber-300 bg-amber-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Classroom?</h2>
            <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
              Join the first wave of California schools teaching students to build the future. 
              Fall 2026 registration is open now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                  Register Your School
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/setup-guide">
                <Button size="lg" variant="outline">
                  Technical Setup Guide
                </Button>
              </Link>
            </div>
            <p className="text-sm text-zinc-500 mt-4">
              Questions? Email us at david@clawnagers.com
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}