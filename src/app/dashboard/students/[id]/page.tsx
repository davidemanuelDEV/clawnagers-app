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
        <h2 className="text-xl font-bold text-white mb-2">Student Not Found</h2>
        <p className="text-white/50 mb-4">This student doesn&apos;t exist or has been removed.</p>
        <Link href="/dashboard/students">
          <Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white">
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
      <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
        <Link href="/dashboard/students" className="hover:text-white/60">Students</Link>
        <span>/</span>
        <span className="text-white/70">{student.display_name}</span>
      </div>

      {/* Student Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#25254a] flex items-center justify-center text-white text-2xl font-bold">
            {student.display_name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{student.display_name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <code className="text-xs font-mono text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded">
                {student.invite_code}
              </code>
              {student.agent_name && (
                <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-none">
                  🤖 {student.agent_name}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right mr-4">
            <div className="text-2xl font-bold text-white">{progressPercent}%</div>
            <div className="text-xs text-white/40">{completedWeeks}/8 weeks</div>
          </div>
          <div className="w-24">
            <Progress value={progressPercent} className="h-2.5 bg-white/10 [&>div]:bg-[#FF6B35]" />
          </div>
        </div>
      </div>

      {/* Week-by-Week Progress */}
      <Card className="bg-[#1a1a2e] border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-white">Week-by-Week Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {curriculum.map((week) => {
              const status = weekStatuses[week.week] || 'not_started'
              const noteValue = notes[week.week] ?? ""

              return (
                <div key={week.week}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors">
                    {/* Week Indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      status === 'in_progress' ? 'bg-[#FF6B35]/20 text-[#FF6B35]' :
                      'bg-white/5 text-white/30'
                    }`}>
                      {status === 'completed' ? '✓' : week.week}
                    </div>

                    {/* Week Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          status === 'completed' ? 'text-white/60' :
                          status === 'in_progress' ? 'text-white' :
                          'text-white/30'
                        }`}>
                          Week {week.week}: {week.title}
                        </span>
                        <Badge className={`text-xs border-none ${
                          status === 'completed' ? 'bg-green-500/10 text-green-400' :
                          status === 'in_progress' ? 'bg-[#FF6B35]/10 text-[#FF6B35]' :
                          'bg-white/5 text-white/20'
                        }`}>
                          {status === 'completed' ? 'Completed' :
                           status === 'in_progress' ? 'In Progress' :
                           'Not Started'}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/30 mt-1 line-clamp-1">{week.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {saving === week.week && (
                        <span className="text-xs text-white/30">Saving...</span>
                      )}
                      {status !== 'completed' && status !== 'in_progress' && saving !== week.week && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkInProgress(week.week)}
                          className="text-white/40 hover:text-white hover:bg-white/10 text-xs"
                        >
                          Start
                        </Button>
                      )}
                      {status !== 'completed' && saving !== week.week && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkComplete(week.week)}
                          className="bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs"
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
                      className="bg-transparent border-white/5 text-white/60 placeholder:text-white/20 text-xs h-8 focus:border-[#FF6B35]/30"
                    />
                  </div>

                  {week.week < 8 && <Separator className="bg-white/5" />}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Student Info */}
      <Card className="bg-[#1a1a2e] border-white/10 mt-6">
        <CardHeader>
          <CardTitle className="text-lg text-white">Student Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/40">Display Name</div>
              <div className="text-white mt-0.5">{student.display_name}</div>
            </div>
            <div>
              <div className="text-white/40">Invite Code</div>
              <code className="text-[#FF6B35] font-mono mt-0.5 block">{student.invite_code}</code>
            </div>
            <div>
              <div className="text-white/40">Agent Name</div>
              <div className="text-white mt-0.5">{student.agent_name || "Not named yet"}</div>
            </div>
            <div>
              <div className="text-white/40">Enrolled</div>
              <div className="text-white mt-0.5">{new Date(student.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
