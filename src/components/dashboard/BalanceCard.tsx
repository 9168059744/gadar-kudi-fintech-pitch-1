import { Wallet, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BalanceCard({ balance }: { balance: number }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="bg-gradient-green text-white border-none shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Wallet className="w-32 h-32" />
      </div>
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Available Balance</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        <div className="text-4xl md:text-5xl font-bold mb-6">
          {showBalance ? `₦${balance.toLocaleString()}` : '••••••'}
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-xs text-white/60">Income</div>
              <div className="text-sm font-semibold">₦120,500</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-white/60">Expenses</div>
              <div className="text-sm font-semibold">₦45,200</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
