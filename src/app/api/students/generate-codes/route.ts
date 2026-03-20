import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

// Generate CLAW-XXXX invite codes
function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'CLAW-'
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const { count, schoolId } = await request.json()
    
    if (!count || !schoolId || count > 50) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const supabase = createClient()
    
    // Check if user is authorized for this school
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: teacher } = await supabase
      .from('teachers')
      .select('school_id')
      .eq('id', user.id)
      .single()

    if (!teacher || teacher.school_id !== schoolId) {
      return NextResponse.json({ error: 'Unauthorized for this school' }, { status: 403 })
    }

    // Generate unique invite codes
    const codes: string[] = []
    const existingCodes = new Set()
    
    // Get existing codes to avoid duplicates
    const { data: existing } = await supabase
      .from('students')
      .select('invite_code')
    
    existing?.forEach(s => existingCodes.add(s.invite_code))
    
    // Generate unique codes
    while (codes.length < count) {
      const code = generateInviteCode()
      if (!existingCodes.has(code) && !codes.includes(code)) {
        codes.push(code)
      }
    }

    // Insert student records with invite codes
    const studentRecords = codes.map(code => ({
      school_id: schoolId,
      invite_code: code,
      display_name: null, // Will be set when student joins
      agent_name: null,
    }))

    const { data: students, error } = await supabase
      .from('students')
      .insert(studentRecords)
      .select()

    if (error) {
      console.error('Failed to create student invite codes:', error)
      return NextResponse.json({ error: 'Failed to generate codes' }, { status: 500 })
    }

    return NextResponse.json({ 
      codes: students?.map(s => s.invite_code) || [],
      message: `Generated ${codes.length} invite codes`
    })
  } catch (error) {
    console.error('Generate codes error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}