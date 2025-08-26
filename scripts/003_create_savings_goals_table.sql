-- Create savings_goals table
CREATE TABLE IF NOT EXISTS public.savings_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    target_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    current_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    target_date DATE NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own savings goals" ON public.savings_goals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings goals" ON public.savings_goals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings goals" ON public.savings_goals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings goals" ON public.savings_goals
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON public.savings_goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON public.savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_goals_target_date ON public.savings_goals(target_date);
CREATE INDEX IF NOT EXISTS idx_savings_goals_category ON public.savings_goals(category);
