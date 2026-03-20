const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// We need the service role key to modify RLS policies
// For now, let's use a different approach - create a temporary admin endpoint

async function testAndFixRLS() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kxpzldqnzktbbyogpigw.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseAnonKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return
  }

  console.log('🔍 Testing current RLS configuration...')
  console.log('📧 This will attempt to register with a test account to trigger the RLS error')
  console.log('⚠️  Note: We need service role access to fix RLS policies directly')
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  try {
    // Try to sign up a test user to see the exact error
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'testpass123'
    
    console.log(`📝 Attempting signup with: ${testEmail}`)
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    if (authError) {
      console.error('❌ Auth signup failed:', authError.message)
      return
    }

    console.log('✅ Auth signup successful:', authData.user?.id)

    // Now try to create a school (this should fail due to RLS)
    const { data: schoolData, error: schoolError } = await supabase
      .from('schools')
      .insert({
        name: 'Test School',
        district: 'Test District',
        state: 'CA',
        contact_name: 'Test Teacher',
        contact_email: testEmail,
        license_type: 'school'
      })
      .select()
      .single()

    if (schoolError) {
      console.error('❌ School creation failed (as expected):', schoolError.message)
      console.log('\n🔧 RLS Policy Fix Needed:')
      console.log('The following SQL needs to be run in Supabase SQL Editor:')
      console.log('\n' + '='.repeat(60))
      
      const fixSQL = `
-- Fix RLS policies for schools table
-- This allows authenticated users to insert schools during registration

-- Allow authenticated users to insert schools (for registration)
create policy "Allow school registration" 
  on schools for insert 
  with check (auth.uid() is not null);

-- Allow school contacts to update their school details
create policy "School contacts update own school"
  on schools for update
  using (contact_email = auth.email());

-- Allow teachers to insert their profile (for registration)  
create policy "Allow teacher profile creation"
  on teachers for insert
  with check (auth.uid() = id);

-- Allow teachers to update their own profile
create policy "Teachers update own profile"
  on teachers for update  
  using (id = auth.uid());
`
      console.log(fixSQL)
      console.log('='.repeat(60))
      console.log('\n🌐 Apply at: https://supabase.com/dashboard/project/kxpzldqnzktbbyogpigw/sql-editor')
      
    } else {
      console.log('✅ School creation successful! RLS is already fixed:', schoolData.id)
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

testAndFixRLS().catch(console.error)