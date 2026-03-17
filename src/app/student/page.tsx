"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { getStudentByInviteCode, getProgressForStudent, getDemoSubmissionsForSchool, getCompletedWeeks, addDemoSubmission } from "@/lib/queries"
import { curriculum } from "@/lib/curriculum"
import type { Student, Progress as ProgressType, DemoSubmission } from "@/lib/types"

export default function StudentPortalPage() {
  const [inviteCode, setInviteCode] = useState("")
  const [student, setStudent] = useState<Student | null>(null)
  const [studentProgress, setStudentProgress] = useState<ProgressType[]>([])
  const [demoSubmissions, setDemoSubmissions] = useState<DemoSubmission[]>([])
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [submitForm, setSubmitForm] = useState({
    project_name: "",
    project_description: "",
    demo_video_url: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError(null)

    const found = await getStudentByInviteCode(inviteCode.trim())
    if (found) {
      setStudent(found)
      // Load progress and submissions
      const [progress, submissions] = await Promise.all([
        getProgressForStudent(found.id),
        getDemoSubmissionsForSchool(found.school_id),
      ])
      setStudentProgress(progress)
      setDemoSubmissions(submissions)
    } else {
      setLoginError("Invalid invite code. Please try again.")
    }
    setLoading(false)
  }

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return
    setSubmitting(true)
    const result = await addDemoSubmission({
      student_id: student.id,
      school_id: student.school_id,
      project_name: submitForm.project_name,
      project_description: submitForm.project_description || undefined,
      demo_video_url: submitForm.demo_video_url || undefined,
    })
    setSubmitting(false)
    if (result) {
      setSubmitted(true)
      setShowSubmitForm(false)
      setDemoSubmissions([...demoSubmissions, result])
    }
  }

  // Login Screen
  if (!student) {
    return (
      <div className="min-h-screen bg-[#0f0f23]">
        <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🦞</span>
              <span>Clawnagers</span>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Teacher Login
              </Button>
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-center p-4 py-24">
          <Card className="max-w-md w-full bg-[#1a1a2e] border-white/10">
            <CardHeader className="text-center pb-2">
              <span className="text-5xl block mb-2">🤖</span>
              <CardTitle className="text-2xl font-bold text-white">Student Portal</CardTitle>
              <CardDescription className="text-white/50">
                Enter your invite code to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {loginError}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="inviteCode" className="text-white/70">Invite Code</Label>
                  <Input
                    id="inviteCode"
                    placeholder="CLAW-XXXX"
                    required
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30 text-center text-xl font-mono tracking-wider focus:border-[#FF6B35]"
                    maxLength={9}
                  />
                  <p className="text-white/30 text-xs text-center">
                    Ask your teacher for your invite code
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold"
                >
                  {loading ? "Checking..." : "Enter Portal →"}
                </Button>
              </form>
              <div className="mt-6 p-3 rounded-lg bg-[#0f0f23] border border-white/5">
                <p className="text-xs text-white/30 text-center">
                  🔒 No email or password needed. Your invite code is your key.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Student Dashboard
  const completedWeeks = getCompletedWeeks(studentProgress)
  const progressPercent = Math.round((completedWeeks / 8) * 100)
  const existingSubmission = demoSubmissions.find((d) => d.student_id === student.id)

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦞</span>
            <div>
              <div className="text-sm font-bold text-white">{student.display_name}</div>
              <div className="text-xs text-white/40">{student.agent_name ? `🤖 ${student.agent_name}` : 'Student Portal'}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setStudent(null); setStudentProgress([]); setDemoSubmissions([]) }}
            className="text-white/40 hover:text-white hover:bg-white/10"
          >
            Log Out
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Hey, {student.display_name}! 👋
          </h1>
          <p className="text-white/50 mt-1">Here&apos;s your journey so far</p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-[#1a1a2e] border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white/40 text-sm">Overall Progress</div>
                <div className="text-3xl font-bold text-white">{progressPercent}%</div>
              </div>
              <div className="text-right">
                <div className="text-white/40 text-sm">Weeks Completed</div>
                <div className="text-3xl font-bold text-[#FF6B35]">{completedWeeks}/8</div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3 bg-white/10 [&>div]:bg-[#FF6B35]" />
          </CardContent>
        </Card>

        {/* Agent Card */}
        {student.agent_name && (
          <Card className="bg-gradient-to-r from-[#FF6B35]/10 to-[#1a1a2e] border-[#FF6B35]/20 mb-6">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <div className="text-white/40 text-xs">YOUR AGENT</div>
                <div className="text-xl font-bold text-white">{student.agent_name}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Week Progress */}
        <Card className="bg-[#1a1a2e] border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-white">Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {curriculum.map((week) => {
                const p = studentProgress.find((pr) => pr.week_number === week.week)
                const status = p?.status || "not_started"
                const isLocked = !p && week.week > completedWeeks + 1

                return (
                  <div key={week.week}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isLocked ? 'opacity-40' : 'hover:bg-white/5'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        status === 'in_progress' ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
                        isLocked ? 'bg-white/3 text-white/15' :
                        'bg-white/5 text-white/30'
                      }`}>
                        {status === 'completed' ? '✓' : isLocked ? '🔒' : week.week}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          status === 'completed' ? 'text-white/60' :
                          status === 'in_progress' ? 'text-white' :
                          'text-white/30'
                        }`}>
                          Week {week.week}: {week.title}
                        </div>
                        <p className="text-xs text-white/25 mt-0.5 line-clamp-1">{week.description}</p>
                      </div>
                      <Badge className={`text-xs border-none shrink-0 ${
                        status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        status === 'in_progress' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' :
                        'bg-white/5 text-white/15'
                      }`}>
                        {status === 'completed' ? '✓ Done' :
                         status === 'in_progress' ? '⏳ In Progress' :
                         isLocked ? 'Locked' : 'Upcoming'}
                      </Badge>
                    </div>
                    {week.week < 8 && <Separator className="bg-white/5" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Demo Day Submission */}
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-white">🏆 Demo Day Submission</CardTitle>
          </CardHeader>
          <CardContent>
            {existingSubmission || submitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {existingSubmission?.project_name || submitForm.project_name}
                </h3>
                <p className="text-white/50 text-sm mb-3">
                  {existingSubmission?.project_description || submitForm.project_description}
                </p>
                {existingSubmission?.is_top_three && (
                  <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-none">
                    🏆 Selected for Top 3!
                  </Badge>
                )}
                <div className="text-white/30 text-xs mt-4">
                  Submitted {existingSubmission?.submitted_at
                    ? new Date(existingSubmission.submitted_at).toLocaleDateString()
                    : 'just now'}
                </div>
              </div>
            ) : showSubmitForm ? (
              <form onSubmit={handleSubmitProject} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Project Name *</Label>
                  <Input
                    placeholder="What's your agent called?"
                    required
                    value={submitForm.project_name}
                    onChange={(e) => setSubmitForm({ ...submitForm, project_name: e.target.value })}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Description</Label>
                  <Input
                    placeholder="What does your agent do?"
                    value={submitForm.project_description}
                    onChange={(e) => setSubmitForm({ ...submitForm, project_description: e.target.value })}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Demo Video URL</Label>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={submitForm.demo_video_url}
                    onChange={(e) => setSubmitForm({ ...submitForm, demo_video_url: e.target.value })}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowSubmitForm(false)}
                    className="text-white/40 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#FF6B35] hover:bg-[#E55A25] text-white"
                  >
                    {submitting ? "Submitting..." : "Submit Project 🚀"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-white/50 mb-4">
                  Ready to show the world what you built?
                </p>
                <Button
                  onClick={() => setShowSubmitForm(true)}
                  className="bg-[#FF6B35] hover:bg-[#E55A25] text-white"
                >
                  Submit Your Project →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
