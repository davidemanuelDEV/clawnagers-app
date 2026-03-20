"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { 
  BarChart3, Users, Trophy, BookOpen, Code, Calendar,
  CheckCircle, ArrowRight, Monitor, Smartphone, Bot, Star
} from "lucide-react"

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-amber-100 text-amber-700 border-amber-300 mb-4">
            Platform Overview
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            See the Clawnagers Platform in Action
          </h1>
          <p className="text-xl text-zinc-500 max-w-3xl mx-auto">
            A complete learning management system built specifically for AI agent education. 
            Here's what teachers and students experience inside the platform.
          </p>
        </div>

        {/* Teacher Dashboard Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Teacher Dashboard</h2>
          <p className="text-center text-zinc-500 mb-8">
            Everything teachers need to manage their AI agent curriculum in one place
          </p>
          
          {/* Mock Dashboard */}
          <Card className="overflow-hidden mb-8 border-2 border-amber-200">
            <div className="bg-gradient-to-r from-amber-50 to-white p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">Welcome back, Ms. Chen 👋</h3>
                  <p className="text-zinc-500">Here's how Lincoln High School is doing this week</p>
                </div>
                <Badge className="bg-amber-400 text-zinc-900">Week 5: Real-World Connections</Badge>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border border-zinc-200">
                  <CardContent className="p-4">
                    <div className="text-zinc-400 text-sm">Students</div>
                    <div className="text-2xl font-bold text-zinc-900 mt-1">28</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-zinc-200">
                  <CardContent className="p-4">
                    <div className="text-zinc-400 text-sm">Avg Progress</div>
                    <div className="text-2xl font-bold text-zinc-900 mt-1">73%</div>
                    <Progress value={73} className="mt-2 h-1.5 bg-zinc-100 [&>div]:bg-amber-400" />
                  </CardContent>
                </Card>
                <Card className="bg-white border border-zinc-200">
                  <CardContent className="p-4">
                    <div className="text-zinc-400 text-sm">On Track</div>
                    <div className="text-2xl font-bold text-zinc-900 mt-1">24/28</div>
                    <div className="text-xs text-green-600 mt-1">↑ Great pace</div>
                  </CardContent>
                </Card>
                <Card className="bg-white border border-zinc-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
                  <CardContent className="p-4">
                    <div className="text-zinc-400 text-sm">Submissions</div>
                    <div className="text-2xl font-bold text-amber-600 mt-1">12</div>
                    <div className="text-xs text-zinc-400 mt-1">Demo Day projects</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="grid lg:grid-cols-2 gap-6 p-6">
              {/* Student Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Student Progress</CardTitle>
                    <span className="text-sm text-amber-600">View All →</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Alex Chen", agent: "NewsBot", progress: 88 },
                      { name: "Maria Garcia", agent: "StudyPal", progress: 75 },
                      { name: "David Kim", agent: "GameHelper", progress: 63 },
                      { name: "Sarah Wilson", agent: "TechTutor", progress: 90 }
                    ].map((student, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-zinc-900 text-sm font-bold">
                          {student.name[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{student.name}</span>
                            <span className="text-xs text-zinc-400">{Math.floor(student.progress * 8 / 100)}/8</span>
                          </div>
                          <Progress value={student.progress} className="mt-1 h-1.5 bg-zinc-100 [&>div]:bg-amber-400" />
                        </div>
                        <Badge variant="secondary" className="bg-amber-50 text-amber-600 text-xs">
                          {student.agent}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demo Day */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    Demo Day Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-zinc-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-zinc-500 text-sm">Submissions</span>
                      <span className="text-zinc-900 font-bold">12/28</span>
                    </div>
                    <Progress value={43} className="h-2 bg-zinc-200 [&>div]:bg-amber-400" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { project: "AI News Summarizer", student: "Alex Chen", status: "Top 3" },
                      { project: "Personal Study Assistant", student: "Maria Garcia", status: "Top 3" },
                      { project: "Gaming Strategy Bot", student: "David Kim", status: "Top 3" }
                    ].map((submission, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-amber-50">
                        <Star className="w-4 h-4 text-amber-500" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{submission.project}</div>
                          <div className="text-xs text-zinc-500">{submission.student}</div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-600 text-xs">{submission.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Card>
        </div>

        {/* Student Experience */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Student Experience</h2>
          <p className="text-center text-zinc-500 mb-8">
            Simple, engaging interface that guides students through building their AI agents
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Student Dashboard Mock */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Hey Alex! 👨‍💻</h3>
                    <p className="text-sm text-zinc-600">Ready to work on NewsBot today?</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-500">Week 5 Progress</div>
                    <div className="text-lg font-bold text-indigo-600">7/8 Complete</div>
                  </div>
                </div>
                
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Bot className="w-6 h-6 text-indigo-500" />
                      <span className="font-semibold">NewsBot v2.3</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">Live</Badge>
                    </div>
                    <p className="text-sm text-zinc-600 mb-3">
                      Your AI agent that summarizes news articles and answers questions about current events.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white">
                        Test Agent
                      </Button>
                      <Button size="sm" variant="outline">
                        View Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Connect to Discord server</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Add web search capability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-indigo-600">Test with real users</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-300"></div>
                    <span className="text-sm text-zinc-400">Prepare Demo Day presentation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Features */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">What Students Get</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personal AI Agent</h4>
                      <p className="text-sm text-zinc-600">Each student builds their own unique agent with custom personality and capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Live Testing Environment</h4>
                      <p className="text-sm text-zinc-600">Deploy agents to real platforms like Discord for immediate feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Guided Tutorials</h4>
                      <p className="text-sm text-zinc-600">Step-by-step instructions with video guides and interactive examples</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Peer Collaboration</h4>
                      <p className="text-sm text-zinc-600">Share agents with classmates, get feedback, and learn from each other</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Student Privacy Protection</h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• No email addresses or personal info required</li>
                    <li>• Login with invite codes only (CLAW-XXXX)</li>
                    <li>• All data stays within school systems</li>
                    <li>• FERPA compliant by design</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Curriculum Management */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Curriculum Management System</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Week Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Week-by-Week Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { week: 1, title: "Meet Your Agent", status: "completed" },
                    { week: 2, title: "Skills and Tools", status: "completed" },
                    { week: 3, title: "Security and Trust", status: "completed" },
                    { week: 4, title: "Memory and Context", status: "completed" },
                    { week: 5, title: "Real-World Connections", status: "current" },
                    { week: 6, title: "Ideation and Design", status: "upcoming" },
                    { week: 7, title: "Build Sprint", status: "upcoming" },
                    { week: 8, title: "Demo Day Prep", status: "upcoming" }
                  ].map((week) => (
                    <div key={week.week} className={`flex items-center gap-3 p-2 rounded-lg ${
                      week.status === 'current' ? 'bg-amber-50' : ''
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        week.status === 'completed' ? 'bg-green-100 text-green-600' :
                        week.status === 'current' ? 'bg-amber-100 text-amber-600' :
                        'bg-zinc-100 text-zinc-400'
                      }`}>
                        {week.status === 'completed' ? '✓' : week.week}
                      </div>
                      <span className={`text-sm ${
                        week.status === 'completed' ? 'text-zinc-500' :
                        week.status === 'current' ? 'text-zinc-900 font-medium' :
                        'text-zinc-400'
                      }`}>
                        {week.title}
                      </span>
                      {week.status === 'current' && (
                        <Badge className="bg-amber-400 text-zinc-900 text-xs ml-auto">
                          Now
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  Assessment & Grading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-zinc-50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">Week 5 Submissions</div>
                    <div className="text-xs text-zinc-500">Real-World Connections</div>
                    <Progress value={85} className="mt-2 h-1.5 bg-zinc-200 [&>div]:bg-green-400" />
                    <div className="text-xs text-zinc-500 mt-1">24/28 students completed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Automated grading</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Peer evaluations</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Project rubrics</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Portfolio tracking</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                  Parent & Admin Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-900">Weekly Progress Report</div>
                    <div className="text-xs text-blue-700">Auto-generated for parents</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="text-sm font-medium text-green-900">Demo Day Invitations</div>
                    <div className="text-xs text-green-700">Sent to families & administrators</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-900">Student Showcases</div>
                    <div className="text-xs text-purple-700">Share student work & achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the Platform Yourself</h2>
            <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
              Ready to see how Clawnagers transforms AI education in your classroom? 
              Register your school and get access to the complete platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">
                  Start Your School Registration
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/teacher-guide">
                <Button size="lg" variant="outline">
                  Teacher Knowledge Base
                </Button>
              </Link>
            </div>
            <p className="text-sm text-zinc-500 mt-6">
              Questions about the platform? Email david@clawnagers.com
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}