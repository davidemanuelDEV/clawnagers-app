import { School, Teacher, Student, Progress, DemoSubmission, CurriculumWeek } from './types'

export const mockSchool: School = {
  id: 'sch-001',
  name: 'Lincoln High School',
  district: 'Bay Area Unified',
  state: 'CA',
  contact_name: 'Sarah Chen',
  contact_email: 'schen@lincolnhs.edu',
  license_type: 'school',
  license_start: '2025-01-15',
  license_end: '2025-06-15',
  created_at: '2025-01-10T00:00:00Z',
}

export const mockTeacher: Teacher = {
  id: 'tch-001',
  school_id: 'sch-001',
  name: 'Sarah Chen',
  email: 'schen@lincolnhs.edu',
  role: 'admin',
  created_at: '2025-01-10T00:00:00Z',
}

export const mockStudents: Student[] = [
  {
    id: 'stu-001',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Alex M.',
    invite_code: 'CLAW-7X9K',
    agent_name: 'StudyBot',
    created_at: '2025-01-15T00:00:00Z',
  },
  {
    id: 'stu-002',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Jordan R.',
    invite_code: 'CLAW-3P2M',
    agent_name: 'MathHelper',
    created_at: '2025-01-15T00:00:00Z',
  },
  {
    id: 'stu-003',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Taylor K.',
    invite_code: 'CLAW-8F4N',
    agent_name: 'EcoWatch',
    created_at: '2025-01-16T00:00:00Z',
  },
  {
    id: 'stu-004',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Sam W.',
    invite_code: 'CLAW-1R7Q',
    agent_name: null,
    created_at: '2025-01-16T00:00:00Z',
  },
  {
    id: 'stu-005',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Riley P.',
    invite_code: 'CLAW-5D8V',
    agent_name: 'NewsAgent',
    created_at: '2025-01-17T00:00:00Z',
  },
  {
    id: 'stu-006',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Morgan L.',
    invite_code: 'CLAW-2K6T',
    agent_name: 'CodeBuddy',
    created_at: '2025-01-17T00:00:00Z',
  },
  {
    id: 'stu-007',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Casey F.',
    invite_code: 'CLAW-9W3H',
    agent_name: null,
    created_at: '2025-01-18T00:00:00Z',
  },
  {
    id: 'stu-008',
    school_id: 'sch-001',
    teacher_id: 'tch-001',
    display_name: 'Quinn D.',
    invite_code: 'CLAW-4J1B',
    agent_name: 'HealthBot',
    created_at: '2025-01-18T00:00:00Z',
  },
]

export const mockProgress: Progress[] = [
  // Alex M. - completed through week 5
  { id: 'p-001', student_id: 'stu-001', week_number: 1, status: 'completed', completed_at: '2025-01-22T00:00:00Z', teacher_notes: 'Great enthusiasm!', created_at: '2025-01-15T00:00:00Z' },
  { id: 'p-002', student_id: 'stu-001', week_number: 2, status: 'completed', completed_at: '2025-01-29T00:00:00Z', teacher_notes: null, created_at: '2025-01-22T00:00:00Z' },
  { id: 'p-003', student_id: 'stu-001', week_number: 3, status: 'completed', completed_at: '2025-02-05T00:00:00Z', teacher_notes: 'Creative prompt design', created_at: '2025-01-29T00:00:00Z' },
  { id: 'p-004', student_id: 'stu-001', week_number: 4, status: 'completed', completed_at: '2025-02-12T00:00:00Z', teacher_notes: null, created_at: '2025-02-05T00:00:00Z' },
  { id: 'p-005', student_id: 'stu-001', week_number: 5, status: 'in_progress', completed_at: null, teacher_notes: null, created_at: '2025-02-12T00:00:00Z' },
  // Jordan R. - completed through week 4
  { id: 'p-006', student_id: 'stu-002', week_number: 1, status: 'completed', completed_at: '2025-01-22T00:00:00Z', teacher_notes: null, created_at: '2025-01-15T00:00:00Z' },
  { id: 'p-007', student_id: 'stu-002', week_number: 2, status: 'completed', completed_at: '2025-01-29T00:00:00Z', teacher_notes: null, created_at: '2025-01-22T00:00:00Z' },
  { id: 'p-008', student_id: 'stu-002', week_number: 3, status: 'completed', completed_at: '2025-02-05T00:00:00Z', teacher_notes: null, created_at: '2025-01-29T00:00:00Z' },
  { id: 'p-009', student_id: 'stu-002', week_number: 4, status: 'in_progress', completed_at: null, teacher_notes: 'Needs help with API integration', created_at: '2025-02-05T00:00:00Z' },
  // Taylor K. - completed through week 6 (ahead!)
  { id: 'p-010', student_id: 'stu-003', week_number: 1, status: 'completed', completed_at: '2025-01-22T00:00:00Z', teacher_notes: null, created_at: '2025-01-15T00:00:00Z' },
  { id: 'p-011', student_id: 'stu-003', week_number: 2, status: 'completed', completed_at: '2025-01-29T00:00:00Z', teacher_notes: null, created_at: '2025-01-22T00:00:00Z' },
  { id: 'p-012', student_id: 'stu-003', week_number: 3, status: 'completed', completed_at: '2025-02-05T00:00:00Z', teacher_notes: 'Excellent work!', created_at: '2025-01-29T00:00:00Z' },
  { id: 'p-013', student_id: 'stu-003', week_number: 4, status: 'completed', completed_at: '2025-02-12T00:00:00Z', teacher_notes: null, created_at: '2025-02-05T00:00:00Z' },
  { id: 'p-014', student_id: 'stu-003', week_number: 5, status: 'completed', completed_at: '2025-02-19T00:00:00Z', teacher_notes: null, created_at: '2025-02-12T00:00:00Z' },
  { id: 'p-015', student_id: 'stu-003', week_number: 6, status: 'in_progress', completed_at: null, teacher_notes: null, created_at: '2025-02-19T00:00:00Z' },
  // Sam W. - completed week 1 only
  { id: 'p-016', student_id: 'stu-004', week_number: 1, status: 'completed', completed_at: '2025-01-23T00:00:00Z', teacher_notes: null, created_at: '2025-01-16T00:00:00Z' },
  { id: 'p-017', student_id: 'stu-004', week_number: 2, status: 'in_progress', completed_at: null, teacher_notes: 'Falling behind, scheduled check-in', created_at: '2025-01-23T00:00:00Z' },
  // Riley P. - completed through week 5
  { id: 'p-018', student_id: 'stu-005', week_number: 1, status: 'completed', completed_at: '2025-01-24T00:00:00Z', teacher_notes: null, created_at: '2025-01-17T00:00:00Z' },
  { id: 'p-019', student_id: 'stu-005', week_number: 2, status: 'completed', completed_at: '2025-01-31T00:00:00Z', teacher_notes: null, created_at: '2025-01-24T00:00:00Z' },
  { id: 'p-020', student_id: 'stu-005', week_number: 3, status: 'completed', completed_at: '2025-02-07T00:00:00Z', teacher_notes: null, created_at: '2025-01-31T00:00:00Z' },
  { id: 'p-021', student_id: 'stu-005', week_number: 4, status: 'completed', completed_at: '2025-02-14T00:00:00Z', teacher_notes: null, created_at: '2025-02-07T00:00:00Z' },
  { id: 'p-022', student_id: 'stu-005', week_number: 5, status: 'completed', completed_at: '2025-02-21T00:00:00Z', teacher_notes: 'Strong presenter', created_at: '2025-02-14T00:00:00Z' },
  // Morgan L. - completed through week 3
  { id: 'p-023', student_id: 'stu-006', week_number: 1, status: 'completed', completed_at: '2025-01-24T00:00:00Z', teacher_notes: null, created_at: '2025-01-17T00:00:00Z' },
  { id: 'p-024', student_id: 'stu-006', week_number: 2, status: 'completed', completed_at: '2025-01-31T00:00:00Z', teacher_notes: null, created_at: '2025-01-24T00:00:00Z' },
  { id: 'p-025', student_id: 'stu-006', week_number: 3, status: 'completed', completed_at: '2025-02-07T00:00:00Z', teacher_notes: null, created_at: '2025-01-31T00:00:00Z' },
  // Casey F. - not started
  // Quinn D. - completed through week 4
  { id: 'p-026', student_id: 'stu-008', week_number: 1, status: 'completed', completed_at: '2025-01-25T00:00:00Z', teacher_notes: null, created_at: '2025-01-18T00:00:00Z' },
  { id: 'p-027', student_id: 'stu-008', week_number: 2, status: 'completed', completed_at: '2025-02-01T00:00:00Z', teacher_notes: null, created_at: '2025-01-25T00:00:00Z' },
  { id: 'p-028', student_id: 'stu-008', week_number: 3, status: 'completed', completed_at: '2025-02-08T00:00:00Z', teacher_notes: 'Innovative health focus', created_at: '2025-02-01T00:00:00Z' },
  { id: 'p-029', student_id: 'stu-008', week_number: 4, status: 'completed', completed_at: '2025-02-15T00:00:00Z', teacher_notes: null, created_at: '2025-02-08T00:00:00Z' },
]

export const mockDemoSubmissions: DemoSubmission[] = [
  {
    id: 'demo-001',
    student_id: 'stu-001',
    school_id: 'sch-001',
    project_name: 'StudyBot',
    project_description: 'An AI agent that creates personalized study plans based on your learning style and upcoming tests.',
    demo_video_url: 'https://youtube.com/watch?v=example1',
    is_top_three: true,
    submitted_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'demo-002',
    student_id: 'stu-003',
    school_id: 'sch-001',
    project_name: 'EcoWatch',
    project_description: 'An environmental monitoring agent that tracks local air quality and suggests actions students can take.',
    demo_video_url: 'https://youtube.com/watch?v=example2',
    is_top_three: true,
    submitted_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'demo-003',
    student_id: 'stu-005',
    school_id: 'sch-001',
    project_name: 'NewsAgent',
    project_description: 'A news aggregation agent that summarizes and fact-checks trending stories for teen audiences.',
    demo_video_url: 'https://youtube.com/watch?v=example3',
    is_top_three: true,
    submitted_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'demo-004',
    student_id: 'stu-008',
    school_id: 'sch-001',
    project_name: 'HealthBot',
    project_description: 'A wellness agent that helps teens track sleep, hydration, and exercise with gentle reminders.',
    demo_video_url: null,
    is_top_three: false,
    submitted_at: '2025-03-02T00:00:00Z',
  },
  {
    id: 'demo-005',
    student_id: 'stu-006',
    school_id: 'sch-001',
    project_name: 'CodeBuddy',
    project_description: 'A coding assistant agent that helps beginners debug Python code and explains errors in simple terms.',
    demo_video_url: 'https://youtube.com/watch?v=example5',
    is_top_three: false,
    submitted_at: '2025-03-02T00:00:00Z',
  },
]

// NOTE: Canonical curriculum is in src/lib/curriculum.ts (matches clawnagers-curriculum repo)
// This is kept for reference/fallback only
export const mockCurriculum: CurriculumWeek[] = [
  {
    week: 1,
    title: 'Meet Your Agent',
    description: 'Introduction to AI agents — what they are, how they differ from chatbots, and how they work. Students meet existing agents and brainstorm ideas for their own.',
    objectives: [
      'Define what an AI agent is vs. a chatbot',
      'Identify 5 real-world AI agents',
      'Brainstorm agent ideas for their project',
    ],
    activities: [
      'Agent Safari: Find and test 5 AI agents',
      'Group discussion: "What problems could agents solve at our school?"',
      'Journal entry: My agent idea',
    ],
  },
  {
    week: 2,
    title: 'Skills and Tools',
    description: 'Agents need skills. Learn how agents connect to the outside world through APIs, web search, and data sources. Build your first agent with a real tool.',
    objectives: [
      'Understand what an API is and how agents use tools',
      'Make a basic API call',
      'Define which tools and skills their agent needs',
    ],
    activities: [
      'API Scavenger Hunt: Find free APIs for your agent',
      'Build a weather agent with a real API',
      'Design doc: My agent\'s toolbox',
    ],
  },
  {
    week: 3,
    title: 'Security and Trust',
    description: 'AI safety isn\'t optional. Learn about API key management, prompt injection, permissions, and building responsible AI agents students can trust.',
    objectives: [
      'Understand API key security and secret management',
      'Learn about prompt injection attacks and defenses',
      'Implement basic permissions and guardrails',
    ],
    activities: [
      'Red Team Challenge: Try to break each other\'s agents',
      'Security audit worksheet',
      'Lab: Add guardrails to your agent',
    ],
  },
  {
    week: 4,
    title: 'Memory and Context',
    description: 'How do agents remember? Explore conversation history, persistence, identity, and giving agents the ability to learn from past interactions.',
    objectives: [
      'Understand conversation context windows',
      'Implement basic memory for their agent',
      'Design an agent identity and personality',
    ],
    activities: [
      'Memory Challenge: Can your agent remember a 10-turn conversation?',
      'Build your agent\'s personality card',
      'Group discussion: Privacy implications of agent memory',
    ],
  },
  {
    week: 5,
    title: 'Real-World Connections',
    description: 'Connect agents to messaging channels and the real world. Learn about proactive behavior, notifications, and making agents that actually help people.',
    objectives: [
      'Connect an agent to a messaging channel',
      'Implement proactive agent behavior',
      'Design agent-human interaction patterns',
    ],
    activities: [
      'Channel Setup: Connect your agent to Discord or Slack',
      'Build a proactive notification feature',
      'User testing: Get feedback from classmates',
    ],
  },
  {
    week: 6,
    title: 'Ideation and Design',
    description: 'YC-style ideation week. Find a real problem worth solving, interview potential users, and design your Demo Day agent using the Agent Design Canvas.',
    objectives: [
      'Identify a real problem through user interviews',
      'Complete the Agent Design Canvas',
      'Define MVP scope for Demo Day',
    ],
    activities: [
      'Problem Discovery: Interview 3 potential users',
      'Agent Design Canvas workshop',
      'Pitch your idea in 60 seconds',
    ],
  },
  {
    week: 7,
    title: 'Build Sprint',
    description: 'Build week. Ship something real. Take your design from Week 6 and turn it into a working prototype. Pair programming, daily standups, and rapid iteration.',
    objectives: [
      'Build a working agent prototype',
      'Practice iterative development (build → test → improve)',
      'Prepare a demo-ready version',
    ],
    activities: [
      'Build sprint: Agent v1.0',
      'Daily standups and pair programming',
      'Demo & feedback circle',
    ],
  },
  {
    week: 8,
    title: 'Demo Day Prep',
    description: 'The final stretch. Polish your agent, practice your pitch, and prepare for Demo Day. Top 3 agents win prizes and compete regionally.',
    objectives: [
      'Polish agent UX and reliability',
      'Write and practice a compelling 3-minute pitch',
      'Handle Q&A from judges',
    ],
    activities: [
      'Agent polish sprint',
      'Pitch writing workshop',
      'Practice presentations with feedback',
      'Demo Day: Presentations, judging, and awards',
    ],
  },
]

// Helper functions
export function getStudentProgress(studentId: string): Progress[] {
  return mockProgress.filter(p => p.student_id === studentId)
}

export function getStudentById(studentId: string): Student | undefined {
  return mockStudents.find(s => s.id === studentId)
}

export function getCompletedWeeks(studentId: string): number {
  return mockProgress.filter(p => p.student_id === studentId && p.status === 'completed').length
}

export function getAverageProgress(): number {
  const totalPossible = mockStudents.length * 8
  const totalCompleted = mockProgress.filter(p => p.status === 'completed').length
  return Math.round((totalCompleted / totalPossible) * 100)
}

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'CLAW-'
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}
