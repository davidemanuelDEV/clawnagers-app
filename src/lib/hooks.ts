"use client"

import { useEffect, useState } from 'react'
import { createClient } from './supabase'
import { getSchoolForTeacher, getStudentsForSchool, getProgressForSchool, getDemoSubmissionsForSchool } from './queries'
import type { School, Teacher, Student, Progress, DemoSubmission } from './types'

export interface DashboardData {
  school: School
  teacher: Teacher
  students: Student[]
  progress: Progress[]
  demoSubmissions: DemoSubmission[]
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setLoading(false); return }

    const result = await getSchoolForTeacher(user.id)
    if (!result) { setError('No school found for this account'); setLoading(false); return }

    const [students, progress, demoSubmissions] = await Promise.all([
      getStudentsForSchool(result.school.id),
      getProgressForSchool(result.school.id),
      getDemoSubmissionsForSchool(result.school.id),
    ])

    setData({
      school: result.school,
      teacher: result.teacher,
      students,
      progress,
      demoSubmissions,
    })
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  return { data, loading, error, reload }
}

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ? { id: user.id, email: user.email ?? undefined } : null)
      setLoading(false)
    })
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  return { user, loading, signOut }
}
