import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import BalanceCard from '@/components/dashboard/BalanceCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import SavingsGoals from '@/components/dashboard/SavingsGoals';
import BudgetPlanner from '@/components/dashboard/BudgetPlanner';
import AIAssistant from '@/components/dashboard/AIAssistant';
import Sidebar from '@/components/dashboard/Sidebar';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchWallet();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
    if (data) setProfile(data);
  };

  const fetchWallet = async () => {
    const { data, error } = await supabase.from('wallets').select('*').eq('user_id', user?.id).single();
    if (data) setWallet(data);
  };

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {t('dashboard.welcome', { name: profile?.full_name || user?.email?.split('@')[0] || 'User' })}
              </h1>
              <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BalanceCard balance={wallet?.balance || 0} />
              <QuickActions />
              <RecentTransactions />
            </div>
            <div className="space-y-8">
              <SavingsGoals />
              <BudgetPlanner />
            </div>
          </div>
        </div>
      </main>
      <AIAssistant />
    </div>
  );
}
