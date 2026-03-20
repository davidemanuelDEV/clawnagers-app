const { createClient } = require('@supabase/supabase-js')

// From TOOLS.md - Clawnagers Supabase
const SUPABASE_URL = 'https://kxpzldqnzktbbyogpigw.supabase.co'
// Need the service role key to create accounts bypassing RLS
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_SERVICE_KEY) {
  console.error('SUPABASE_SERVICE_KEY environment variable required')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function createTestSchool() {
  try {
    // Create test teacher account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'demo@lincolnhigh.edu',
      password: 'clawnagers2026',
      email_confirm: true,
      user_metadata: {
        role: 'teacher'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return
    }

    console.log('✅ Created auth user:', authData.user.id)

    // Create school record
    const { data: schoolData, error: schoolError } = await supabase
      .from('schools')
      .insert({
        name: 'Lincoln High School',
        district: 'San Francisco Unified School District',
        city: 'San Francisco',
        state: 'CA',
        license_type: 'school',
        status: 'active'
      })
      .select()
      .single()

    if (schoolError) {
      console.error('School error:', schoolError)
      return
    }

    console.log('✅ Created school:', schoolData.id)

    // Create teacher profile linked to school
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .insert({
        id: authData.user.id,
        email: 'demo@lincolnhigh.edu',
        name: 'Sarah Johnson',
        school_id: schoolData.id,
        role: 'Computer Science Teacher',
        status: 'active'
      })
      .select()
      .single()

    if (teacherError) {
      console.error('Teacher error:', teacherError)
      return
    }

    console.log('✅ Created teacher profile:', teacherData.id)

    // Generate some test student invite codes
    const inviteCodes = []
    for (let i = 1; i <= 5; i++) {
      const code = `CLAW-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      inviteCodes.push({
        code,
        school_id: schoolData.id,
        teacher_id: teacherData.id,
        status: 'active',
        created_at: new Date().toISOString()
      })
    }

    const { data: codesData, error: codesError } = await supabase
      .from('student_invite_codes')
      .insert(inviteCodes)
      .select()

    if (codesError) {
      console.error('Codes error:', codesError)
      return
    }

    console.log('✅ Created invite codes:', codesData.map(c => c.code).join(', '))

    console.log('\n🎉 Test School Account Created Successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🏫 School: Lincoln High School')
    console.log('👩‍🏫 Teacher: Sarah Johnson')
    console.log('📧 Login: demo@lincolnhigh.edu')
    console.log('🔐 Password: clawnagers2026')
    console.log('🎓 Student Codes:', codesData.map(c => c.code).join(', '))
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🌐 Login at: https://clawnagers.com/login')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createTestSchool()