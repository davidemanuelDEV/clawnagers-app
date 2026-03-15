import { createClient } from './supabase'
import type { School, Teacher, Student, Progress, DemoSubmission } from './types'

const supabase = createClient()

// Generate CLAW-XXXX invite code
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'CLAW-'
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// School & Teacher
export async function getSchoolForTeacher(userId: string): Promise<{ school: School; teacher: Teacher } | null> {
  const { data: teacher, error: tErr } = await supabase
    .from('teachers')
    .select('*')
    .eq('id', userId)
    .single()

  if (tErr || !teacher) return null

  const { data: school, error: sErr } = await supabase
    .from('schools')
    .select('*')
    .eq('id', teacher.school_id)
    .single()

  if (sErr || !school) return null

  return { school, teacher }
}

// Students
export async function getStudentsForSchool(schoolId: string): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: true })

  if (error) { console.error('getStudentsForSchool:', error); return [] }
  return data || []
}

export async function getStudentById(studentId: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single()

  if (error) return null
  return data
}

export async function getStudentByInviteCode(code: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('invite_code', code.toUpperCase())
    .single()

  if (error) return null
  return data
}

export async function addStudent(schoolId: string, teacherId: string, displayName: string): Promise<{ student: Student | null; inviteCode: string }> {
  const inviteCode = generateInviteCode()
  const { data, error } = await supabase
    .from('students')
    .insert({
      school_id: schoolId,
      teacher_id: teacherId,
      display_name: displayName,
      invite_code: inviteCode,
    })
    .select()
    .single()

  if (error) { console.error('addStudent:', error); return { student: null, inviteCode } }
  return { student: data, inviteCode }
}

// Progress
export async function getProgressForSchool(schoolId: string): Promise<Progress[]> {
  // Get all students for school, then their progress
  const students = await getStudentsForSchool(schoolId)
  if (students.length === 0) return []

  const studentIds = students.map(s => s.id)
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .in('student_id', studentIds)
    .order('week_number', { ascending: true })

  if (error) { console.error('getProgressForSchool:', error); return [] }
  return data || []
}

export async function getProgressForStudent(studentId: string): Promise<Progress[]> {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('student_id', studentId)
    .order('week_number', { ascending: true })

  if (error) { console.error('getProgressForStudent:', error); return [] }
  return data || []
}

export async function updateProgress(
  studentId: string,
  weekNumber: number,
  status: 'not_started' | 'in_progress' | 'completed',
  teacherNotes?: string
): Promise<Progress | null> {
  const { data, error } = await supabase
    .from('progress')
    .upsert(
      {
        student_id: studentId,
        week_number: weekNumber,
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
        teacher_notes: teacherNotes ?? null,
      },
      { onConflict: 'student_id,week_number' }
    )
    .select()
    .single()

  if (error) { console.error('updateProgress:', error); return null }
  return data
}

// Demo Submissions
export async function getDemoSubmissionsForSchool(schoolId: string): Promise<DemoSubmission[]> {
  const { data, error } = await supabase
    .from('demo_submissions')
    .select('*')
    .eq('school_id', schoolId)
    .order('submitted_at', { ascending: true })

  if (error) { console.error('getDemoSubmissionsForSchool:', error); return [] }
  return data || []
}

export async function addDemoSubmission(data: {
  student_id: string
  school_id: string
  project_name: string
  project_description?: string
  demo_video_url?: string
}): Promise<DemoSubmission | null> {
  const { data: result, error } = await supabase
    .from('demo_submissions')
    .insert({
      student_id: data.student_id,
      school_id: data.school_id,
      project_name: data.project_name,
      project_description: data.project_description || null,
      demo_video_url: data.demo_video_url || null,
      is_top_three: false,
    })
    .select()
    .single()

  if (error) { console.error('addDemoSubmission:', error); return null }
  return result
}

export async function toggleTopThree(submissionId: string, isTopThree: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('demo_submissions')
    .update({ is_top_three: isTopThree })
    .eq('id', submissionId)

  if (error) { console.error('toggleTopThree:', error); return false }
  return true
}

// Helper: count completed weeks for a student from progress array
export function getCompletedWeeks(progress: Progress[]): number {
  return progress.filter(p => p.status === 'completed').length
}

// Helper: average progress across students
export function getAverageProgress(allProgress: Progress[], studentCount: number): number {
  if (studentCount === 0) return 0
  const totalPossible = studentCount * 8
  const totalCompleted = allProgress.filter(p => p.status === 'completed').length
  return Math.round((totalCompleted / totalPossible) * 100)
}
