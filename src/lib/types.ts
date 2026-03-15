export interface School {
  id: string
  name: string
  district: string | null
  state: string | null
  contact_name: string
  contact_email: string
  license_type: 'school' | 'district'
  license_start: string | null
  license_end: string | null
  created_at: string
}

export interface Teacher {
  id: string
  school_id: string
  name: string
  email: string
  role: 'teacher' | 'admin'
  created_at: string
}

export interface Student {
  id: string
  school_id: string
  teacher_id: string | null
  display_name: string
  invite_code: string
  agent_name: string | null
  created_at: string
}

export interface Progress {
  id: string
  student_id: string
  week_number: number
  status: 'not_started' | 'in_progress' | 'completed'
  completed_at: string | null
  teacher_notes: string | null
  created_at: string
}

export interface DemoSubmission {
  id: string
  student_id: string
  school_id: string
  project_name: string
  project_description: string | null
  demo_video_url: string | null
  is_top_three: boolean
  submitted_at: string
}

export interface CurriculumWeek {
  week: number
  title: string
  description: string
  objectives: string[]
  activities: string[]
}
