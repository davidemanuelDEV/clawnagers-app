"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { addStudent, getCompletedWeeks } from "@/lib/queries"

export default function StudentsPage() {
  const { data, reload } = useDashboard()
  const [search, setSearch] = useState("")
  const [newStudentName, setNewStudentName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newInviteCode, setNewInviteCode] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  if (!data) return null

  const { students, progress, school, teacher } = data

  const filteredStudents = students.filter((s) =>
    s.display_name.toLowerCase().includes(search.toLowerCase()) ||
    (s.agent_name && s.agent_name.toLowerCase().includes(search.toLowerCase())) ||
    s.invite_code.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddStudent = async () => {
    if (!newStudentName.trim()) return
    setAdding(true)
    const result = await addStudent(school.id, teacher.id, newStudentName.trim())
    setAdding(false)
    if (result.student) {
      setNewInviteCode(result.inviteCode)
      setNewStudentName("")
      reload()
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setNewInviteCode(null)
    setNewStudentName("")
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Students</h1>
          <p className="text-zinc-500 mt-1">{students.length} enrolled students</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) handleCloseDialog(); }}>
          <DialogTrigger asChild>
            <Button className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold">+ Add Student</Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-zinc-200 text-zinc-900">
            <DialogHeader>
              <DialogTitle className="text-zinc-900">Add New Student</DialogTitle>
              <DialogDescription className="text-zinc-500">
                No email required — students use invite codes to access the portal
              </DialogDescription>
            </DialogHeader>
            {newInviteCode ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-zinc-600 mb-2">Student added! Share this invite code:</p>
                <div className="bg-zinc-50 rounded-lg p-4 mb-4 border border-zinc-200">
                  <span className="text-2xl font-mono font-bold text-amber-600">{newInviteCode}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  The student will use this code to log in at the Student Portal
                </p>
                <Button onClick={handleCloseDialog} className="bg-amber-400 hover:bg-amber-500 text-zinc-900">
                  Done
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-zinc-600">Display Name</Label>
                  <Input
                    placeholder="e.g. Alex M."
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                    onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
                  />
                  <p className="text-zinc-400 text-xs">
                    Use first name + last initial for privacy (COPPA compliant)
                  </p>
                </div>
                <Button
                  onClick={handleAddStudent}
                  disabled={!newStudentName.trim() || adding}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-900"
                >
                  {adding ? "Creating..." : "Generate Invite Code"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search by name, agent, or invite code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 max-w-md"
        />
      </div>

      {/* Desktop Table */}
      <Card className="bg-white border border-zinc-200 hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-200 hover:bg-transparent">
                <TableHead className="text-zinc-400">Student</TableHead>
                <TableHead className="text-zinc-400">Agent</TableHead>
                <TableHead className="text-zinc-400">Invite Code</TableHead>
                <TableHead className="text-zinc-400">Progress</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const studentProgress = progress.filter(p => p.student_id === student.id)
                const completed = getCompletedWeeks(studentProgress)
                const progressPercent = Math.round((completed / 8) * 100)
                const status = completed === 0 ? "Not Started" : completed >= 4 ? "On Track" : "Needs Attention"
                return (
                  <TableRow key={student.id} className="border-zinc-100 hover:bg-zinc-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-zinc-900 text-sm font-bold">
                          {student.display_name[0]}
                        </div>
                        <span className="text-zinc-900 font-medium">{student.display_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.agent_name ? (
                        <span className="text-zinc-600">{student.agent_name}</span>
                      ) : (
                        <span className="text-zinc-300 italic">Not named yet</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        {student.invite_code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={progressPercent} className="h-1.5 bg-zinc-100 flex-1 [&>div]:bg-amber-400" />
                        <span className="text-xs text-zinc-400 w-8">{completed}/8</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        status === "On Track" ? "bg-green-50 text-green-600" :
                        status === "Not Started" ? "bg-zinc-50 text-zinc-400" :
                        "bg-yellow-50 text-yellow-600"
                      }`}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/students/${student.id}`}>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50">
                          View →
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filteredStudents.map((student) => {
          const studentProgress = progress.filter(p => p.student_id === student.id)
          const completed = getCompletedWeeks(studentProgress)
          const progressPercent = Math.round((completed / 8) * 100)
          return (
            <Link key={student.id} href={`/dashboard/students/${student.id}`}>
              <Card className="bg-white border border-zinc-200 hover:border-amber-300 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-zinc-900 font-bold">
                        {student.display_name[0]}
                      </div>
                      <div>
                        <div className="text-zinc-900 font-medium">{student.display_name}</div>
                        <div className="text-xs text-zinc-400">
                          {student.agent_name || "No agent yet"}
                        </div>
                      </div>
                    </div>
                    <code className="text-xs font-mono text-amber-600">{student.invite_code}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={progressPercent} className="h-1.5 bg-zinc-100 flex-1 [&>div]:bg-amber-400" />
                    <span className="text-xs text-zinc-400">{completed}/8</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl block mb-4">🔍</span>
          <p className="text-zinc-400">
            {students.length === 0
              ? "No students yet. Click \"+ Add Student\" to get started."
              : `No students found matching "${search}"`}
          </p>
        </div>
      )}
    </div>
  )
}
