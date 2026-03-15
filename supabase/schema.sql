-- Clawnagers Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Schools
create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  district text,
  state text,
  contact_name text not null,
  contact_email text not null,
  license_type text default 'school', -- 'school' or 'district'
  license_start date,
  license_end date,
  created_at timestamptz default now()
);

-- Teachers (Supabase Auth users linked to schools)
create table teachers (
  id uuid primary key references auth.users(id),
  school_id uuid references schools(id) not null,
  name text not null,
  email text not null,
  role text default 'teacher', -- 'teacher' or 'admin'
  created_at timestamptz default now()
);

-- Students (NO email required — COPPA friendly)
create table students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references schools(id) not null,
  teacher_id uuid references teachers(id),
  display_name text not null,
  invite_code text unique not null,
  agent_name text, -- what they named their agent
  created_at timestamptz default now()
);

-- Progress tracking
create table progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) not null,
  week_number int not null check (week_number between 1 and 8),
  status text default 'not_started', -- 'not_started', 'in_progress', 'completed'
  completed_at timestamptz,
  teacher_notes text,
  created_at timestamptz default now(),
  unique(student_id, week_number)
);

-- Demo Day submissions
create table demo_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) not null,
  school_id uuid references schools(id) not null,
  project_name text not null,
  project_description text,
  demo_video_url text,
  is_top_three boolean default false,
  submitted_at timestamptz default now()
);

-- Row Level Security Policies

-- Enable RLS on all tables
alter table schools enable row level security;
alter table teachers enable row level security;
alter table students enable row level security;
alter table progress enable row level security;
alter table demo_submissions enable row level security;

-- Teachers can only see their own school's data
create policy "Teachers see own school"
  on schools for select
  using (id in (
    select school_id from teachers where id = auth.uid()
  ));

create policy "Teachers see own profile"
  on teachers for select
  using (id = auth.uid());

create policy "Teachers see own school students"
  on students for select
  using (school_id in (
    select school_id from teachers where id = auth.uid()
  ));

create policy "Teachers manage own school students"
  on students for insert
  with check (school_id in (
    select school_id from teachers where id = auth.uid()
  ));

create policy "Teachers see own school progress"
  on progress for select
  using (student_id in (
    select id from students where school_id in (
      select school_id from teachers where id = auth.uid()
    )
  ));

create policy "Teachers manage own school progress"
  on progress for all
  using (student_id in (
    select id from students where school_id in (
      select school_id from teachers where id = auth.uid()
    )
  ));

create policy "Teachers see own school demos"
  on demo_submissions for select
  using (school_id in (
    select school_id from teachers where id = auth.uid()
  ));

create policy "Teachers manage own school demos"
  on demo_submissions for all
  using (school_id in (
    select school_id from teachers where id = auth.uid()
  ));

-- Students can see their own data via invite code (handled at app level)
-- No direct auth for students — COPPA compliant
