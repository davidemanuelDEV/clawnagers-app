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
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">🏆 Demo Day</h1>
          <p className="text-zinc-500 mt-1">
            Manage submissions and select the top 3 projects
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-zinc-900">{demoSubmissions.length}</div>
            <div className="text-zinc-400 text-sm">Submissions</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-amber-600">{topThree.length}</div>
            <div className="text-zinc-400 text-sm">Top 3 Selected</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-zinc-200">
          <CardContent className="p-5 text-center">
            <div className="text-3xl font-bold text-zinc-900">
              {students.length - demoSubmissions.length}
            </div>
            <div className="text-zinc-400 text-sm">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 */}
      {topThree.length > 0 && (
        <Card className="bg-white border border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-900 flex items-center gap-2">
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
                    className="p-4 rounded-xl bg-gradient-to-b from-amber-50 to-white border border-amber-200"
                  >
                    <div className="text-3xl mb-3">{medals[i] || '🏆'}</div>
                    <h3 className="text-lg font-bold text-zinc-900">{sub.project_name}</h3>
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{sub.project_description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-zinc-400">{student?.display_name}</span>
                      {sub.demo_video_url && (
                        <Badge className="bg-amber-50 text-amber-600 border-none text-xs">
                          📹 Video
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={toggling === sub.id}
                      onClick={() => handleToggleTopThree(sub.id, true)}
                      className="mt-2 text-red-400 hover:text-red-600 hover:bg-red-50 text-xs w-full"
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
      <Card className="bg-white border border-zinc-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-zinc-900">All Submissions</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger
                render={<Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-zinc-900">+ Add Submission</Button>}
              />
              <DialogContent className="bg-white border-zinc-200 text-zinc-900">
                <DialogHeader>
                  <DialogTitle className="text-zinc-900">New Demo Submission</DialogTitle>
                  <DialogDescription className="text-zinc-500">
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
              <p className="text-zinc-400">No submissions yet. Add a submission when students are ready to present.</p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-200 hover:bg-transparent">
                      <TableHead className="text-zinc-400">Project</TableHead>
                      <TableHead className="text-zinc-400">Student</TableHead>
                      <TableHead className="text-zinc-400">Description</TableHead>
                      <TableHead className="text-zinc-400">Video</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoSubmissions.map((sub) => {
                      const student = students.find((s) => s.id === sub.student_id)
                      return (
                        <TableRow key={sub.id} className="border-zinc-100 hover:bg-zinc-50">
                          <TableCell className="font-medium text-zinc-900">{sub.project_name}</TableCell>
                          <TableCell className="text-zinc-500">{student?.display_name}</TableCell>
                          <TableCell className="text-zinc-400 max-w-[200px] truncate text-sm">
                            {sub.project_description}
                          </TableCell>
                          <TableCell>
                            {sub.demo_video_url ? (
                              <Badge className="bg-green-50 text-green-600 border-none text-xs">
                                Uploaded
                              </Badge>
                            ) : (
                              <Badge className="bg-zinc-50 text-zinc-400 border-none text-xs">
                                Missing
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {sub.is_top_three ? (
                              <Badge className="bg-amber-50 text-amber-600 border-none">
                                🏆 Top 3
                              </Badge>
                            ) : (
                              <Badge className="bg-zinc-50 text-zinc-400 border-none">
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
                                  ? 'text-red-400 hover:text-red-600 hover:bg-red-50'
                                  : 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
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
                    <div key={sub.id} className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-zinc-900">{sub.project_name}</h3>
                        {sub.is_top_three && (
                          <Badge className="bg-amber-50 text-amber-600 border-none text-xs">🏆</Badge>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 line-clamp-2">{sub.project_description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-zinc-300">{student?.display_name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={toggling === sub.id}
                          onClick={() => handleToggleTopThree(sub.id, sub.is_top_three)}
                          className="text-xs text-amber-500 hover:text-amber-600"
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
        <Label className="text-zinc-600">Student</Label>
        <select
          value={form.student_id}
          onChange={(e) => setForm({ ...form, student_id: e.target.value })}
          className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md px-3 py-2 text-sm"
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
        <Label className="text-zinc-600">Project Name *</Label>
        <Input
          placeholder="e.g. StudyBot"
          required
          value={form.project_name}
          onChange={(e) => setForm({ ...form, project_name: e.target.value })}
          className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-600">Description</Label>
        <Input
          placeholder="What does your agent do?"
          value={form.project_description}
          onChange={(e) => setForm({ ...form, project_description: e.target.value })}
          className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-600">Demo Video URL</Label>
        <Input
          placeholder="https://youtube.com/watch?v=..."
          value={form.demo_video_url}
          onChange={(e) => setForm({ ...form, demo_video_url: e.target.value })}
          className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting || !form.student_id}
        className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900"
      >
        {submitting ? "Submitting..." : "Submit Project"}
      </Button>
    </form>
  )
}
