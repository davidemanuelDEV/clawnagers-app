const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://kxpzldqnzktbbyogpigw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cHpsZHFuemt0YmJ5b2dwaWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MzAwMzksImV4cCI6MjA4OTEwNjAzOX0.1zJhPYVyfZGa5zy7fcYxdmAXsRGdu3efIJN1yXPBJVw'

async function fixRLS() {
  console.log('🔧 Applying RLS fixes for Clawnagers...')
  
  // We can't modify RLS policies with anon key, but we can test the fix
  // The real fix needs to be applied via Supabase dashboard
  
  const rqlQueries = [
    `-- Allow authenticated users to insert schools (for registration)
create policy "Allow school registration" 
  on schools for insert 
  with check (auth.uid() is not null);`,

    `-- Allow school contacts to update their school details
create policy "School contacts update own school"
  on schools for update
  using (contact_email = auth.email());`,

    `-- Allow teachers to insert their profile (for registration)  
create policy "Allow teacher profile creation"
  on teachers for insert
  with check (auth.uid() = id);`,

    `-- Allow teachers to update their own profile
create policy "Teachers update own profile"
  on teachers for update  
  using (id = auth.uid());`
  ]
  
  console.log('📝 SQL to run in Supabase SQL Editor:')
  console.log('🌐 URL: https://supabase.com/dashboard/project/kxpzldqnzktbbyogpigw/sql-editor')
  console.log('\n' + '='.repeat(80))
  rqlQueries.forEach(query => {
    console.log(query)
    console.log('')
  })
  console.log('='.repeat(80))
  
  console.log('\n✅ After running these policies, test registration at:')
  console.log('🌐 https://clawnagers.com/register')
  console.log('📧 Email: demo.teacher@gmail.com')
  console.log('🔐 Password: clawnagers2026')
}

// But let me take REAL initiative and try to apply via a different method
async function tryAlternativeApproach() {
  console.log('\n🚀 Taking initiative with alternative approach...')
  
  // Create a user and immediately try to create school to test RLS
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  
  const testEmail = 'demo.teacher@gmail.com'
  const testPassword = 'clawnagers2026'
  
  try {
    console.log('📧 Creating test account...')
    
    // Try registration
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('✅ User already exists, trying to sign in...')
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        })
        
        if (signInError) {
          console.error('❌ Sign in failed:', signInError.message)
          return
        }
        console.log('✅ Signed in successfully')
      } else {
        console.error('❌ Auth error:', authError.message)
        return
      }
    } else {
      console.log('✅ New user created')
    }

    // Now try school creation
    console.log('🏫 Attempting school creation...')
    const { data: schoolData, error: schoolError } = await supabase
      .from('schools')
      .insert({
        name: 'Lincoln High School',
        district: 'San Francisco Unified School District',
        state: 'CA',
        contact_name: 'Sarah Johnson', 
        contact_email: testEmail,
        license_type: 'school'
      })
      .select()
      .single()

    if (schoolError) {
      console.error('❌ School creation failed (RLS blocking):', schoolError.message)
      console.log('\n💡 The RLS policies need to be applied manually in Supabase dashboard')
      return false
    } else {
      console.log('✅ SUCCESS! School created:', schoolData.id)
      
      // Try to create teacher profile
      const { data: teacherData, error: teacherError } = await supabase
        .from('teachers')
        .insert({
          school_id: schoolData.id,
          name: 'Sarah Johnson',
          email: testEmail,
          role: 'admin'
        })
        .select()
        .single()

      if (teacherError) {
        console.error('❌ Teacher creation failed:', teacherError.message)
      } else {
        console.log('✅ Teacher profile created:', teacherData.id)
        
        console.log('\n🎉 CLAWNAGERS TEST ACCOUNT READY!')
        console.log('📧 Email: demo.teacher@gmail.com')
        console.log('🔐 Password: clawnagers2026')
        console.log('🌐 Login: https://clawnagers.com/login')
      }
      return true
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    return false
  }
}

async function main() {
  await fixRLS()
  
  const success = await tryAlternativeApproach()
  
  if (!success) {
    console.log('\n🔧 MANUAL ACTION REQUIRED:')
    console.log('1. Go to: https://supabase.com/dashboard/project/kxpzldqnzktbbyogpigw/sql-editor')
    console.log('2. Run the SQL policies shown above')
    console.log('3. Test registration at: https://clawnagers.com/register')
  }
}

main().catch(console.error)