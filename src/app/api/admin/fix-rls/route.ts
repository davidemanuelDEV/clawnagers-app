import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin endpoint to apply RLS fixes
// This requires service role key to modify database policies
export async function POST(request: NextRequest) {
  try {
    // Get admin auth header
    const authHeader = request.headers.get('authorization')
    if (authHeader !== 'Bearer admin-fix-rls-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Service role key would be needed here
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
      return NextResponse.json({ 
        error: 'Service role key not configured',
        message: 'Need to add SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables'
      }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Apply RLS policies
    const policies = [
      `create policy "Allow school registration" 
        on schools for insert 
        with check (auth.uid() is not null);`,
      
      `create policy "School contacts update own school"
        on schools for update
        using (contact_email = auth.email());`,
        
      `create policy "Allow teacher profile creation"
        on teachers for insert
        with check (auth.uid() = id);`,
        
      `create policy "Teachers update own profile"
        on teachers for update  
        using (id = auth.uid());`
    ]

    const results = []
    for (const policy of policies) {
      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: policy })
        results.push({ 
          policy: policy.split('\n')[0], 
          success: !error, 
          error: error?.message 
        })
      } catch (err) {
        results.push({ 
          policy: policy.split('\n')[0], 
          success: false, 
          error: (err as Error).message 
        })
      }
    }

    return NextResponse.json({
      message: 'RLS fix applied',
      results,
      nextSteps: [
        'Test registration at https://clawnagers.com/register',
        'Use email: demo.teacher@gmail.com',
        'Use password: clawnagers2026'
      ]
    })

  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to apply RLS fix',
      details: (error as Error).message 
    }, { status: 500 })
  }
}