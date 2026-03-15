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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Students</h1>
          <p className="text-white/50 mt-1">{students.length} enrolled students</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) handleCloseDialog(); }}>
          <DialogTrigger
            render={<Button className="bg-[#FF6B35] hover:bg-[#E55A25] text-white font-semibold" />}
          >
            + Add Student
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Student</DialogTitle>
              <DialogDescription className="text-white/50">
                No email required — students use invite codes to access the portal
              </DialogDescription>
            </DialogHeader>
            {newInviteCode ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-white/70 mb-2">Student added! Share this invite code:</p>
                <div className="bg-[#0f0f23] rounded-lg p-4 mb-4">
                  <span className="text-2xl font-mono font-bold text-[#FF6B35]">{newInviteCode}</span>
                </div>
                <p className="text-white/40 text-sm mb-4">
                  The student will use this code to log in at the Student Portal
                </p>
                <Button onClick={handleCloseDialog} className="bg-[#FF6B35] hover:bg-[#E55A25] text-white">
                  Done
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="text-white/70">Display Name</Label>
                  <Input
                    placeholder="e.g. Alex M."
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="bg-[#0f0f23] border-white/10 text-white placeholder:text-white/30"
                    onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
                  />
                  <p className="text-white/30 text-xs">
                    Use first name + last initial for privacy (COPPA compliant)
                  </p>
                </div>
                <Button
                  onClick={handleAddStudent}
                  disabled={!newStudentName.trim() || adding}
                  className="w-full bg-[#FF6B35] hover:bg-[#E55A25] text-white"
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
          className="bg-[#1a1a2e] border-white/10 text-white placeholder:text-white/30 max-w-md"
        />
      </div>

      {/* Desktop Table */}
      <Card className="bg-[#1a1a2e] border-white/10 hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/40">Student</TableHead>
                <TableHead className="text-white/40">Agent</TableHead>
                <TableHead className="text-white/40">Invite Code</TableHead>
                <TableHead className="text-white/40">Progress</TableHead>
                <TableHead className="text-white/40">Status</TableHead>
                <TableHead className="text-white/40"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const studentProgress = progress.filter(p => p.student_id === student.id)
                const completed = getCompletedWeeks(studentProgress)
                const progressPercent = Math.round((completed / 8) * 100)
                const status = completed === 0 ? "Not Started" : completed >= 4 ? "On Track" : "Needs Attention"
                return (
                  <TableRow key={student.id} className="border-white/5 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#25254a] flex items-center justify-center text-white text-sm font-bold">
                          {student.display_name[0]}
                        </div>
                        <span className="text-white font-medium">{student.display_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.agent_name ? (
                        <span className="text-white/70">{student.agent_name}</span>
                      ) : (
                        <span className="text-white/30 italic">Not named yet</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded">
                        {student.invite_code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={progressPercent} className="h-1.5 bg-white/10 flex-1 [&>div]:bg-[#FF6B35]" />
                        <span className="text-xs text-white/40 w-8">{completed}/8</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`border-none text-xs ${
                        status === "On Track" ? "bg-green-500/10 text-green-400" :
                        status === "Not Started" ? "bg-white/5 text-white/30" :
                        "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/students/${student.id}`}>
                        <Button variant="ghost" size="sm" className="text-white/40 hover:text-white hover:bg-white/10">
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
              <Card className="bg-[#1a1a2e] border-white/10 hover:border-[#FF6B35]/20 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#25254a] flex items-center justify-center text-white font-bold">
                        {student.display_name[0]}
                      </div>
                      <div>
                        <div className="text-white font-medium">{student.display_name}</div>
                        <div className="text-xs text-white/40">
                          {student.agent_name || "No agent yet"}
                        </div>
                      </div>
                    </div>
                    <code className="text-xs font-mono text-[#FF6B35]">{student.invite_code}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={progressPercent} className="h-1.5 bg-white/10 flex-1 [&>div]:bg-[#FF6B35]" />
                    <span className="text-xs text-white/40">{completed}/8</span>
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
          <p className="text-white/40">
            {students.length === 0
              ? "No students yet. Click \"+ Add Student\" to get started."
              : `No students found matching "${search}"`}
          </p>
        </div>
      )}
    </div>
  )
}
