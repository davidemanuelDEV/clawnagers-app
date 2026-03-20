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

-- Student invite code management
create table if not exists student_invite_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  school_id uuid references schools(id) not null,
  teacher_id uuid references teachers(id) not null,
  status text default 'active', -- 'active', 'used', 'expired'
  used_by_student_id uuid references students(id),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '1 year')
);

alter table student_invite_codes enable row level security;

-- Teachers can manage their school's invite codes
create policy "Teachers manage school invite codes"
  on student_invite_codes for all
  using (school_id in (
    select school_id from teachers where id = auth.uid()
  ));

-- Public read access for invite code validation (students checking codes)
create policy "Public read invite codes for validation"
  on student_invite_codes for select
  using (status = 'active' and expires_at > now());