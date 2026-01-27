CREATE TABLE IF NOT EXISTS user_onboarding (
  user_id text PRIMARY KEY,
  has_roadmap_items boolean DEFAULT false,
  has_run_scoring boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policy to allow users to select their own onboarding data
CREATE POLICY "Users can view their own onboarding status" ON user_onboarding
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy to allow users to update their own onboarding data
-- Note: In some Supabase setups, inserts/updates might be handled via service role or specific functions.
-- Adding basic RLS for completeness if direct client access is enabled.
CREATE POLICY "Users can insert/update their own onboarding status" ON user_onboarding
  FOR ALL
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Enable Row Level Security
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
