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
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          Welcome back, {data.teacher.name.split(' ')[0]} 👋
        </h1>
        <p className="text-zinc-500 mt-1">
          Here&apos;s how {school.name} is doing this week
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5">
            <div className="text-zinc-400 text-sm">Students</div>
            <div className="text-3xl font-bold text-zinc-900 mt-1">{students.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5">
            <div className="text-zinc-400 text-sm">Avg Progress</div>
            <div className="text-3xl font-bold text-zinc-900 mt-1">{avgProgress}%</div>
            <Progress value={avgProgress} className="mt-2 h-1.5 bg-zinc-100 [&>div]:bg-amber-400" />
          </CardContent>
        </Card>
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5">
            <div className="text-zinc-400 text-sm">On Track</div>
            <div className="text-3xl font-bold text-zinc-900 mt-1">{studentsOnTrack}/{students.length}</div>
            <div className="text-xs text-green-600 mt-1">{studentsOnTrack > 0 ? '↑ Good pace' : 'Getting started'}</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
          <CardContent className="p-5">
            <div className="text-zinc-400 text-sm">Submissions</div>
            <div className="text-3xl font-bold text-amber-600 mt-1">{demoSubmissions.length}</div>
            <div className="text-xs text-zinc-400 mt-1">Demo Day projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Progress */}
        <Card className="bg-white border border-zinc-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-zinc-900">Student Progress</CardTitle>
              <Link href="/dashboard/students" className="text-sm text-amber-600 hover:underline">
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <p className="text-zinc-400 text-sm py-4 text-center">No students enrolled yet. Add students to get started.</p>
            ) : (
              <div className="space-y-4">
                {students.slice(0, 5).map((student) => {
                  const studentProgress = progress.filter(p => p.student_id === student.id)
                  const completed = getCompletedWeeks(studentProgress)
                  const progressPercent = Math.round((completed / 8) * 100)
                  return (
                    <Link key={student.id} href={`/dashboard/students/${student.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-zinc-900 text-sm font-bold">
                          {student.display_name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-900 font-medium truncate">{student.display_name}</span>
                            <span className="text-xs text-zinc-400 ml-2">{completed}/8</span>
                          </div>
                          <Progress value={progressPercent} className="mt-1.5 h-1.5 bg-zinc-100 [&>div]:bg-amber-400" />
                        </div>
                        {student.agent_name && (
                          <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none text-xs shrink-0">
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
          <Card className="bg-white border border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-zinc-900">🏆 Demo Day</CardTitle>
                <Link href="/dashboard/demo-day" className="text-sm text-amber-600 hover:underline">
                  Manage →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-50 rounded-lg p-4 mb-4 border border-zinc-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Submissions</span>
                  <span className="text-zinc-900 font-bold">{demoSubmissions.length}/{students.length}</span>
                </div>
                <Progress value={students.length > 0 ? (demoSubmissions.length / students.length) * 100 : 0} className="h-2 bg-zinc-100 [&>div]:bg-amber-400" />
              </div>
              {topSubmissions.length > 0 ? (
                <div className="space-y-2">
                  {topSubmissions.map((sub) => {
                    const student = students.find(s => s.id === sub.student_id)
                    return (
                      <div key={sub.id} className="flex items-center gap-3 p-2 rounded-lg bg-amber-50">
                        <span className="text-lg">🥇</span>
                        <div className="flex-1">
                          <div className="text-sm text-zinc-900 font-medium">{sub.project_name}</div>
                          <div className="text-xs text-zinc-400">{student?.display_name}</div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-600 border-none text-xs">Top 3</Badge>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-zinc-300 text-sm text-center py-2">No top 3 selected yet</p>
              )}
            </CardContent>
          </Card>

          {/* Curriculum Progress */}
          <Card className="bg-white border border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-zinc-900">📚 Curriculum</CardTitle>
                <Link href="/dashboard/curriculum" className="text-sm text-amber-600 hover:underline">
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
                      status === 'current' ? 'bg-amber-50' : ''
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        status === 'completed' ? 'bg-green-100 text-green-600' :
                        status === 'current' ? 'bg-amber-100 text-amber-600' :
                        'bg-zinc-100 text-zinc-400'
                      }`}>
                        {status === 'completed' ? '✓' : week.week}
                      </div>
                      <span className={`text-sm ${
                        status === 'completed' ? 'text-zinc-500' :
                        status === 'current' ? 'text-zinc-900 font-medium' :
                        'text-zinc-400'
                      }`}>
                        {week.title}
                      </span>
                      {status === 'current' && (
                        <Badge className="bg-amber-400 text-zinc-900 border-none text-xs ml-auto">
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
