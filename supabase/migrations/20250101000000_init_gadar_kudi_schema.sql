-- ============================================================
-- Gadar Kuɗi Fintech MVP - Initial Schema
-- ============================================================
-- Tables: profiles, wallets, transactions, savings_goals, budgets, chat_messages
-- Auth: Supabase Auth with auth.uid() RLS policies
-- All tables have RLS enabled; only authenticated users can access their own data.
-- ============================================================

-- 1. PROFILES TABLE
-- Extends auth.users with app-specific user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'ha', 'yo', 'ig')),
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profiles extending auth.users with fintech-specific data';

-- 2. WALLETS TABLE
-- One wallet per user, tracks current balance
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
  currency TEXT NOT NULL DEFAULT 'NGN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.wallets IS 'User wallets with current balance in NGN';

-- 3. TRANSACTIONS TABLE
-- Records all income and expense transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
  category TEXT NOT NULL DEFAULT 'other',
  description TEXT,
  reference TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.transactions IS 'Financial transactions (income, expense, transfers)';

-- 4. SAVINGS GOALS TABLE
-- Tracks user savings targets and progress
CREATE TABLE IF NOT EXISTS public.savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount NUMERIC(15, 2) NOT NULL CHECK (target_amount > 0),
  current_amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00 CHECK (current_amount >= 0),
  deadline DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.savings_goals IS 'User savings goals with target and progress tracking';

-- 5. BUDGETS TABLE
-- Monthly budget categories with spending limits
CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  limit_amount NUMERIC(15, 2) NOT NULL CHECK (limit_amount > 0),
  spent_amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00 CHECK (spent_amount >= 0),
  period TEXT NOT NULL DEFAULT 'monthly' CHECK (period IN ('weekly', 'monthly', 'yearly')),
  period_start DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.budgets IS 'Monthly budget categories with spending limits';

-- 6. CHAT MESSAGES TABLE
-- AI Financial Assistant conversation history
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'ha')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.chat_messages IS 'AI Financial Assistant chat history per user';

-- ============================================================
-- INDEXES - Foreign keys and common query patterns
-- ============================================================

-- Transactions: query by user, by date, by user+date
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON public.transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(user_id, type);

-- Savings goals: query by user, active goals
CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON public.savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_savings_goals_active ON public.savings_goals(user_id, is_active) WHERE is_active = true;

-- Budgets: query by user, by period
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON public.budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_budgets_user_period ON public.budgets(user_id, period, period_start);

-- Chat messages: query by user, recent messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_date ON public.chat_messages(user_id, created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- WALLETS policies
CREATE POLICY "wallets_select_own" ON public.wallets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "wallets_insert_own" ON public.wallets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "wallets_update_own" ON public.wallets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- TRANSACTIONS policies
CREATE POLICY "transactions_select_own" ON public.transactions
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "transactions_insert_own" ON public.transactions
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "transactions_update_own" ON public.transactions
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "transactions_delete_own" ON public.transactions
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- SAVINGS GOALS policies
CREATE POLICY "savings_goals_select_own" ON public.savings_goals
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "savings_goals_insert_own" ON public.savings_goals
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "savings_goals_update_own" ON public.savings_goals
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "savings_goals_delete_own" ON public.savings_goals
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- BUDGETS policies
CREATE POLICY "budgets_select_own" ON public.budgets
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "budgets_insert_own" ON public.budgets
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "budgets_update_own" ON public.budgets
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "budgets_delete_own" ON public.budgets
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- CHAT MESSAGES policies
CREATE POLICY "chat_messages_select_own" ON public.chat_messages
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "chat_messages_insert_own" ON public.chat_messages
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "chat_messages_delete_own" ON public.chat_messages
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ============================================================
-- AUTO-PROVISION: Trigger to create profile + wallet on signup
-- ============================================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, full_name, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en')
  );

  -- Create wallet
  INSERT INTO public.wallets (user_id, balance, currency)
  VALUES (NEW.id, 0.00, 'NGN');

  RETURN NEW;
END;
$$;

-- Trigger on auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_wallets_updated_at
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_savings_goals_updated_at
  BEFORE UPDATE ON public.savings_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trigger_budgets_updated_at
  BEFORE UPDATE ON public.budgets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- HELPER: Update wallet balance when transaction is inserted
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_wallet_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.type = 'income' AND NEW.status = 'completed' THEN
    UPDATE public.wallets SET balance = balance + NEW.amount WHERE user_id = NEW.user_id;
  ELSIF NEW.type = 'expense' AND NEW.status = 'completed' THEN
    UPDATE public.wallets SET balance = balance - NEW.amount WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_transaction_wallet_update
  AFTER INSERT ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_wallet_balance();
