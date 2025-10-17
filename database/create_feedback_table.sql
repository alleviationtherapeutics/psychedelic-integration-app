-- Create feedback table for bug reports and feature requests
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'feedback')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  app_version TEXT,
  platform TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own feedback (or anonymous feedback)
CREATE POLICY "Users can submit feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback"
  ON feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Admins can view all feedback (you'll need to add admin role logic)
-- For now, we'll allow authenticated users to see all feedback
CREATE POLICY "Authenticated users can view all feedback"
  ON feedback
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
