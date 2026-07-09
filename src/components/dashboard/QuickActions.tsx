import { Send, Plus, CreditCard, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActions() {
  const actions = [
    { icon: Send, label: 'Send Money', color: 'bg-primary/10 text-primary' },
    { icon: Plus, label: 'Add Funds', color: 'bg-[#D4AF37]/10 text-[#D4AF37]' },
    { icon: CreditCard, label: 'Pay Bills', color: 'bg-blue-100 text-blue-600' },
    { icon: GraduationCap, label: 'Education', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          className="h-auto py-6 flex flex-col gap-3 border-border hover:border-primary/30 hover:bg-card transition-all"
        >
          <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
            <action.icon className="w-6 h-6" />
          </div>
          <span className="font-semibold text-sm">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
