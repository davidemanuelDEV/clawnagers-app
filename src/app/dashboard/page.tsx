"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDashboard } from "./layout"
import { getCompletedWeeks, getAverageProgress } from "@/lib/queries"
import { curriculum } from "@/lib/curriculum"

export default function DashboardPage() {
  const { data } = useDashboard()
  if (!data) return null

  const { school, students, progress, demoSubmissions } = data

  const avgProgress = getAverageProgress(progress, students.length)
  const studentsOnTrack = students.filter(s => {
    const studentProgress = progress.filter(p => p.student_id === s.id)
    return getCompletedWeeks(studentProgress) >= 3
  }).length

  // Figure out current curriculum week based on progress
  const maxCompletedWeek = progress.reduce((max, p) => {
    if (p.status === 'completed' && p.week_number > max) return p.week_number
    return max
  }, 0)
  const currentWeek = Math.min(maxCompletedWeek + 1, 8)

  const topSubmissions = demoSubmissions.filter(d => d.is_top_three)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Welcome back, {data.teacher.name.split(' ')[0]} 👋
        </h1>
        <p className="text-white/50 mt-1">
          Here&apos;s how {school.name} is doing this week
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5">
            <div className="text-white/40 text-sm">Students</div>
            <div className="text-3xl font-bold text-white mt-1">{students.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5">
            <div className="text-white/40 text-sm">Avg Progress</div>
            <div className="text-3xl font-bold text-white mt-1">{avgProgress}%</div>
            <Progress value={avgProgress} className="mt-2 h-1.5 bg-white/10 [&>div]:bg-[#FF6B35]" />
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5">
            <div className="text-white/40 text-sm">On Track</div>
            <div className="text-3xl font-bold text-white mt-1">{studentsOnTrack}/{students.length}</div>
            <div className="text-xs text-green-400 mt-1">{studentsOnTrack > 0 ? '↑ Good pace' : 'Getting started'}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6B35]" />
          <CardContent className="p-5">
            <div className="text-white/40 text-sm">Submissions</div>
            <div className="text-3xl font-bold text-[#FF6B35] mt-1">{demoSubmissions.length}</div>
            <div className="text-xs text-white/40 mt-1">Demo Day projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Progress */}
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white">Student Progress</CardTitle>
              <Link href="/dashboard/students" className="text-sm text-[#FF6B35] hover:underline">
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <p className="text-white/40 text-sm py-4 text-center">No students enrolled yet. Add students to get started.</p>
            ) : (
              <div className="space-y-4">
                {students.slice(0, 5).map((student) => {
                  const studentProgress = progress.filter(p => p.student_id === student.id)
                  const completed = getCompletedWeeks(studentProgress)
                  const progressPercent = Math.round((completed / 8) * 100)
                  return (
                    <Link key={student.id} href={`/dashboard/students/${student.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#25254a] flex items-center justify-center text-white text-sm font-bold">
                          {student.display_name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white font-medium truncate">{student.display_name}</span>
                            <span className="text-xs text-white/40 ml-2">{completed}/8</span>
                          </div>
                          <Progress value={progressPercent} className="mt-1.5 h-1.5 bg-white/10 [&>div]:bg-[#FF6B35]" />
                        </div>
                        {student.agent_name && (
                          <Badge variant="secondary" className="bg-[#FF6B35]/10 text-[#FF6B35] border-none text-xs shrink-0">
                            {student.agent_name}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Demo Day */}
          <Card className="bg-[#1a1a2e] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">🏆 Demo Day</CardTitle>
                <Link href="/dashboard/demo-day" className="text-sm text-[#FF6B35] hover:underline">
                  Manage →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-[#0f0f23] rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-sm">Submissions</span>
                  <span className="text-white font-bold">{demoSubmissions.length}/{students.length}</span>
                </div>
                <Progress value={students.length > 0 ? (demoSubmissions.length / students.length) * 100 : 0} className="h-2 bg-white/10 [&>div]:bg-[#FF6B35]" />
              </div>
              {topSubmissions.length > 0 ? (
                <div className="space-y-2">
                  {topSubmissions.map((sub) => {
                    const student = students.find(s => s.id === sub.student_id)
                    return (
                      <div key={sub.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#FF6B35]/5">
                        <span className="text-lg">🥇</span>
                        <div className="flex-1">
                          <div className="text-sm text-white font-medium">{sub.project_name}</div>
                          <div className="text-xs text-white/40">{student?.display_name}</div>
                        </div>
                        <Badge className="bg-[#FF6B35]/20 text-[#FF6B35] border-none text-xs">Top 3</Badge>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-white/30 text-sm text-center py-2">No top 3 selected yet</p>
              )}
            </CardContent>
          </Card>

          {/* Curriculum Progress */}
          <Card className="bg-[#1a1a2e] border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">📚 Curriculum</CardTitle>
                <Link href="/dashboard/curriculum" className="text-sm text-[#FF6B35] hover:underline">
                  View All →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {curriculum.map((week) => {
                  const status = week.week < currentWeek ? 'completed' : week.week === currentWeek ? 'current' : 'upcoming'
                  return (
                    <div key={week.week} className={`flex items-center gap-3 p-2 rounded-lg ${
                      status === 'current' ? 'bg-[#FF6B35]/10' : ''
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        status === 'current' ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
                        'bg-white/5 text-white/30'
                      }`}>
                        {status === 'completed' ? '✓' : week.week}
                      </div>
                      <span className={`text-sm ${
                        status === 'completed' ? 'text-white/60' :
                        status === 'current' ? 'text-white font-medium' :
                        'text-white/30'
                      }`}>
                        {week.title}
                      </span>
                      {status === 'current' && (
                        <Badge className="bg-[#FF6B35] text-white border-none text-xs ml-auto">
                          This Week
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
