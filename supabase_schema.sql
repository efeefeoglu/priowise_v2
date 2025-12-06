-- Create the assessment table
create table if not exists user_assessments (
  user_id text primary key,
  answers jsonb default '{}'::jsonb,
  current_question_index integer default 0,
  status text default 'in_progress', -- 'in_progress', 'completed'
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (though we are using Service Role Key on backend, it's good practice)
alter table user_assessments enable row level security;

-- Create policy to allow users to see their own assessment (if we were using user token)
create policy "Users can view own assessment"
  on user_assessments for select
  using (auth.uid()::text = user_id);

create policy "Users can update own assessment"
  on user_assessments for update
  using (auth.uid()::text = user_id);

create policy "Users can insert own assessment"
  on user_assessments for insert
  with check (auth.uid()::text = user_id);
