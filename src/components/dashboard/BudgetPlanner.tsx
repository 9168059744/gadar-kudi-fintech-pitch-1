import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function BudgetPlanner() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchBudgets();
  }, [user]);

  const fetchBudgets = async () => {
    const { data } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user?.id);
    if (data) setBudgets(data);
  };

  const COLORS = ['#006837', '#D4AF37', '#2563eb', '#9333ea', '#ef4444'];

  const chartData = budgets.map((b) => ({
    name: b.category,
    value: b.amount,
  }));

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent>
        {budgets.length > 0 ? (
          <div className="space-y-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {budgets.map((b, i) => (
                <div key={b.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-muted-foreground truncate">{b.category}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No budget set for this month
          </div>
        )}
      </CardContent>
    </Card>
  );
}
