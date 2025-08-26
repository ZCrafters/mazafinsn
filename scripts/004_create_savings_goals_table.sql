-- Create savings_tracker table for tracking savings progress
CREATE TABLE IF NOT EXISTS public.savings_tracker (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES public.savings_goals(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.savings_tracker ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own savings tracker entries" ON public.savings_tracker
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings tracker entries" ON public.savings_tracker
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings tracker entries" ON public.savings_tracker
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings tracker entries" ON public.savings_tracker
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_savings_tracker_user_id ON public.savings_tracker(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_tracker_goal_id ON public.savings_tracker(goal_id);
CREATE INDEX IF NOT EXISTS idx_savings_tracker_date ON public.savings_tracker(date);
