-- Create financial management tables
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  budget_amount DECIMAL(12,2) NOT NULL,
  spent_amount DECIMAL(12,2) DEFAULT 0,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, category, month, year)
);

CREATE TABLE IF NOT EXISTS public.financial_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  investment_horizon INTEGER,
  risk_tolerance TEXT CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')),
  monthly_income DECIMAL(12,2) DEFAULT 0,
  monthly_expenses DECIMAL(12,2) DEFAULT 0,
  savings_goal DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transactions
CREATE POLICY "transactions_select_own" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "transactions_insert_own" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "transactions_update_own" ON public.transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "transactions_delete_own" ON public.transactions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for budgets
CREATE POLICY "budgets_select_own" ON public.budgets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "budgets_insert_own" ON public.budgets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "budgets_update_own" ON public.budgets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "budgets_delete_own" ON public.budgets FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for financial profiles
CREATE POLICY "financial_profiles_select_own" ON public.financial_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "financial_profiles_insert_own" ON public.financial_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "financial_profiles_update_own" ON public.financial_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "financial_profiles_delete_own" ON public.financial_profiles FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON public.budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_profiles_user_id ON public.financial_profiles(user_id);
