import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SavingsGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    const { data } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', user?.id);
    if (data) setGoals(data);
  };

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Savings Goals</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length > 0 ? (
          goals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{goal.name}</span>
                  <span className="text-muted-foreground">₦{goal.current_amount.toLocaleString()} / ₦{goal.target_amount.toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="text-right text-xs text-primary font-medium">{Math.round(progress)}%</div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Set your first savings goal</p>
            <Button size="sm" variant="outline">Create Goal</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
