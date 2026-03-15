"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDashboard } from "../layout"
import { addDemoSubmission, toggleTopThree as apiToggleTopThree } from "@/lib/queries"

export default function DemoDayPage() {
  const { data, reload } = useDashboard()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)

  if (!data) return null

  const { students, demoSubmissions, school } = data

  const topThree = demoSubmissions.filter((s) => s.is_top_three)
  const otherSubmissions = demoSubmissions.filter((s) => !s.is_top_three)

  const handleToggleTopThree = async (id: string, currentValue: boolean) => {
    setToggling(id)
    await apiToggleTopThree(id, !currentValue)
    await reload()
    setToggling(null)
  }

  const handleAddSubmission = async (form: {
    student_id: string
    project_name: string
    project_description: string
    demo_video_url: string
  }) => {
    await addDemoSubmission({
      student_id: form.student_id,
      school_id: school.id,
      project_name: form.project_name,
      project_description: form.project_description || undefined,
      demo_video_url: form.demo_video_url || undefined,
    })
    await reload()
    setDialogOpen(false)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">🏆 Demo Day</h1>
          <p className="text-white/50 mt-1">
            Manage submissions and select the top 3 projects
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-white">{demoSubmissions.length}</div>
            <div className="text-white/40 text-sm">Submissions</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-[#FF6B35]">{topThree.length}</div>
            <div className="text-white/40 text-sm">Top 3 Selected</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a2e] border-white/10">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-white">
              {students.length - demoSubmissions.length}
            </div>
            <div className="text-white/40 text-sm">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 */}
      {topThree.length > 0 && (
        <Card className="bg-[#1a1a2e] border-[#FF6B35]/20 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <span>🥇</span> Top 3 Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {topThree.map((sub, i) => {
                const student = students.find((s) => s.id === sub.student_id)
                const medals = ['🥇', '🥈', '🥉']
                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl bg-gradient-to-b from-[#FF6B35]/10 to-[#FF6B35]/5 border border-[#FF6B35]/10"
                  >
                    <div className="text-3xl mb-3">{medals[i] || '🏆'}</div>
                    <h3 className="text-lg font-bold text-white">{sub.project_name}</h3>
                    <p className="text-sm text-white/50 mt-1 line-clamp-2">{sub.project_description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-white/40">{student?.display_name}</span>
                      {sub.demo_video_url && (
                        <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-none text-xs">
                          📹 Video
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={toggling === sub.id}
                      onClick={() => handleToggleTopThree(sub.id, true)}
                      className="mt-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 text-xs w-full"
                    >
                      {toggling === sub.id ? "Saving..." : "Remove from Top 3"}
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Submissions */}
      <Card className="bg-[#1a1a2e] border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">All Submissions</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger
                render={<Button size="sm" className="bg-[#FF6B35] hover:bg-[#E55A25] text-white" />}
              >
                + Add Submission
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">New Demo Submission</DialogTitle>
                  <DialogDescription className="text-white/50">
                    Record a student&apos;s Demo Day project submission
                  </DialogDescription>
                </DialogHeader>
                <SubmissionForm
                  students={students}
                  existingSubmissions={demoSubmissions}
                  onSubmit={handleAddSubmission}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {demoSubmissions.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-4xl block mb-4">🏆</span>
              <p className="text-white/40">No submissions yet. Add a submission when students are ready to present.</p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white/40">Project</TableHead>
                      <TableHead className="text-white/40">Student</TableHead>
                      <TableHead className="text-white/40">Description</TableHead>
                      <TableHead className="text-white/40">Video</TableHead>
                      <TableHead className="text-white/40">Status</TableHead>
                      <TableHead className="text-white/40"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoSubmissions.map((sub) => {
                      const student = students.find((s) => s.id === sub.student_id)
                      return (
                        <TableRow key={sub.id} className="border-white/5 hover:bg-white/5">
                          <TableCell className="font-medium text-white">{sub.project_name}</TableCell>
                          <TableCell className="text-white/60">{student?.display_name}</TableCell>
                          <TableCell className="text-white/40 max-w-[200px] truncate text-sm">
                            {sub.project_description}
                          </TableCell>
                          <TableCell>
                            {sub.demo_video_url ? (
                              <Badge className="bg-green-500/10 text-green-400 border-none text-xs">
                                Uploaded
                              </Badge>
                            ) : (
                              <Badge className="bg-white/5 text-white/30 border-none text-xs">
                                Missing
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {sub.is_top_three ? (
                              <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-none">
                                🏆 Top 3
                              </Badge>
                            ) : (
                              <Badge className="bg-white/5 text-white/40 border-none">
                                Submitted
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={toggling === sub.id}
                              onClick={() => handleToggleTopThree(sub.id, sub.is_top_three)}
                              className={`text-xs ${
                                sub.is_top_three
                                  ? 'text-red-400/60 hover:text-red-400 hover:bg-red-400/10'
                                  : 'text-[#FF6B35]/60 hover:text-[#FF6B35] hover:bg-[#FF6B35]/10'
                              }`}
                            >
                              {toggling === sub.id ? '...' : sub.is_top_three ? 'Remove' : 'Mark Top 3'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile */}
              <div className="md:hidden space-y-3 p-4">
                {demoSubmissions.map((sub) => {
                  const student = students.find((s) => s.id === sub.student_id)
                  return (
                    <div key={sub.id} className="p-4 rounded-lg bg-[#0f0f23] border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">{sub.project_name}</h3>
                        {sub.is_top_three && (
                          <Badge className="bg-[#FF6B35]/10 text-[#FF6B35] border-none text-xs">🏆</Badge>
                        )}
                      </div>
                      <p className="text-sm text-white/40 line-clamp-2">{sub.project_description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-white/30">{student?.display_name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={toggling === sub.id}
                          onClick={() => handleToggleTopThree(sub.id, sub.is_top_three)}
                          className="text-xs text-[#FF6B35]/60 hover:text-[#FF6B35]"
                        >
                          {sub.is_top_three ? 'Remove Top 3' : 'Mark Top 3'}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SubmissionForm({ students, existingSubmissions, onSubmit }: {
  students: { id: string; display_name: string; agent_name: string | null }[]
  existingSubmissions: { student_id: string }[]
  onSubmit: (form: { student_id: string; project_name: string; project_description: string; demo_video_url: string }) => Promise<void>
}) {
  const unsubmittedStudents = students.filter(
    (s) => !existingSubmissions.find((d) => d.student_id === s.id)
  )

  const [form, setForm] = useState({
    student_id: unsubmittedStudents[0]?.id || "",
    project_name: "",
    project_description: "",
    demo_video_url: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit(form)
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="text-white/70">Student</Label>
        <select
          value={form.student_id}
          onChange={(e) => setForm({ ...form, student_id: e.target.value })}
          className="w-full bg-[#0f0f23] border border-white/10 text-white rounded-md px-3 py-2 text-sm"
        >
          {unsubmittedStudents.map((s) => (
            <option key={s.id} value={s.id}>
              {s.display_name} {s.agent_name ? `(${s.agent_name})` : ''}
            </option>
          ))}
          {unsubmittedStudents.length === 0 && (
            <option disabled>All students have submitted</option>
          )}
        </select>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70">Project Name *</Label>
        <Input
          placeholder="e.g. StudyBot"
          required
          value={form.project_name}
          onChange={(e) => setForm({ ...form, project_name: e.target.value })}
          className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white/70">Description</Label>
        <Input
          placeholder="What does your agent do?"
          value={form.project_description}
          onChange={(e) => setForm({ ...form, project_description: e.target.value })}
          className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white/70">Demo Video URL</Label>
        <Input
          placeholder="https://youtube.com/watch?v=..."
          value={form.demo_video_url}
          onChange={(e) => setForm({ ...form, demo_video_url: e.target.value })}
          className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting || !form.student_id}
        className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white"
      >
        {submitting ? "Submitting..." : "Submit Project"}
      </Button>
    </form>
  )
}
