"use client"

import Link from "next/link"
import { use, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useDashboard } from "../../layout"
import { updateProgress, getCompletedWeeks } from "@/lib/queries"
import { curriculum } from "@/lib/curriculum"

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, reload } = useDashboard()

  const student = data?.students.find((s) => s.id === id)
  const studentProgress = data?.progress.filter((p) => p.student_id === id) || []
  const completedWeeks = student ? getCompletedWeeks(studentProgress) : 0
  const progressPercent = Math.round((completedWeeks / 8) * 100)

  const [notes, setNotes] = useState<Record<number, string>>({})
  const [weekStatuses, setWeekStatuses] = useState<Record<number, string>>({})
  const [saving, setSaving] = useState<number | null>(null)

  // Initialize week statuses from progress data
  useEffect(() => {
    const initial: Record<number, string> = {}
    const initialNotes: Record<number, string> = {}
    for (let i = 1; i <= 8; i++) {
      const p = studentProgress.find((pr) => pr.week_number === i)
      initial[i] = p?.status || 'not_started'
      if (p?.teacher_notes) initialNotes[i] = p.teacher_notes
    }
    setWeekStatuses(initial)
    setNotes(initialNotes)
  }, [data, id])

  if (!student) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl block mb-4">🦞</span>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Student Not Found</h2>
        <p className="text-zinc-500 mb-4">This student doesn&apos;t exist or has been removed.</p>
        <Link href="/dashboard/students">
          <Button className="bg-amber-400 hover:bg-amber-500 text-zinc-900">
            ← Back to Students
          </Button>
        </Link>
      </div>
    )
  }

  const handleMarkComplete = async (weekNum: number) => {
    setSaving(weekNum)
    await updateProgress(student.id, weekNum, 'completed', notes[weekNum])
    setWeekStatuses({ ...weekStatuses, [weekNum]: 'completed' })
    setSaving(null)
    reload()
  }

  const handleMarkInProgress = async (weekNum: number) => {
    setSaving(weekNum)
    await updateProgress(student.id, weekNum, 'in_progress', notes[weekNum])
    setWeekStatuses({ ...weekStatuses, [weekNum]: 'in_progress' })
    setSaving(null)
    reload()
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
        <Link href="/dashboard/students" className="hover:text-zinc-600">Students</Link>
        <span>/</span>
        <span className="text-zinc-600">{student.display_name}</span>
      </div>

      {/* Student Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-zinc-900 text-2xl font-bold">
            {student.display_name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{student.display_name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <code className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded">
                {student.invite_code}
              </code>
              {student.agent_name && (
                <Badge className="bg-amber-50 text-amber-600 border-none">
                  🤖 {student.agent_name}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right mr-4">
            <div className="text-2xl font-bold text-zinc-900">{progressPercent}%</div>
            <div className="text-xs text-zinc-400">{completedWeeks}/8 weeks</div>
          </div>
          <div className="w-24">
            <Progress value={progressPercent} className="h-2.5 bg-zinc-100 [&>div]:bg-amber-400" />
          </div>
        </div>
      </div>

      {/* Week-by-Week Progress */}
      <Card className="bg-white border border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-900">Week-by-Week Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {curriculum.map((week) => {
              const status = weekStatuses[week.week] || 'not_started'
              const noteValue = notes[week.week] ?? ""

              return (
                <div key={week.week}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg hover:bg-zinc-50 transition-colors">
                    {/* Week Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      status === 'completed' ? 'bg-green-100 text-green-600' :
                      status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                      'bg-zinc-100 text-zinc-400'
                    }`}>
                      {status === 'completed' ? '✓' : week.week}
                    </div>

                    {/* Week Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          status === 'completed' ? 'text-zinc-500' :
                          status === 'in_progress' ? 'text-zinc-900' :
                          'text-zinc-400'
                        }`}>
                          Week {week.week}: {week.title}
                        </span>
                        <Badge className={`text-xs border-none ${
                          status === 'completed' ? 'bg-green-50 text-green-600' :
                          status === 'in_progress' ? 'bg-amber-50 text-amber-600' :
                          'bg-zinc-50 text-zinc-300'
                        }`}>
                          {status === 'completed' ? 'Completed' :
                           status === 'in_progress' ? 'In Progress' :
                           'Not Started'}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{week.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {saving === week.week && (
                        <span className="text-xs text-zinc-300">Saving...</span>
                      )}
                      {status !== 'completed' && status !== 'in_progress' && saving !== week.week && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkInProgress(week.week)}
                          className="text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 text-xs"
                        >
                          Start
                        </Button>
                      )}
                      {status !== 'completed' && saving !== week.week && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkComplete(week.week)}
                          className="bg-green-50 text-green-600 hover:bg-green-100 text-xs"
                        >
                          ✓ Complete
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Teacher Notes */}
                  <div className="pl-16 pr-4 pb-3">
                    <Input
                      placeholder="Add teacher notes..."
                      value={noteValue}
                      onChange={(e) => setNotes({ ...notes, [week.week]: e.target.value })}
                      className="bg-transparent border-zinc-100 text-zinc-600 placeholder:text-zinc-300 text-xs h-8 focus:border-amber-300"
                    />
                  </div>

                  {week.week < 8 && <Separator className="bg-zinc-100" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Student Info */}
      <Card className="bg-white border border-zinc-200 mt-6">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-900">Student Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-zinc-400">Display Name</div>
              <div className="text-zinc-900 mt-0.5">{student.display_name}</div>
            </div>
            <div>
              <div className="text-zinc-400">Invite Code</div>
              <code className="text-amber-600 font-mono mt-0.5 block">{student.invite_code}</code>
            </div>
            <div>
              <div className="text-zinc-400">Agent Name</div>
              <div className="text-zinc-900 mt-0.5">{student.agent_name || "Not named yet"}</div>
            </div>
            <div>
              <div className="text-zinc-400">Enrolled</div>
              <div className="text-zinc-900 mt-0.5">{new Date(student.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
