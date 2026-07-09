import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, Target, Settings, User, HandCoins } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/savings', label: 'Savings', icon: Target },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function SideNav() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-col border-r bg-card p-4 hidden md:flex">
      <div className="flex items-center gap-2 mb-8">
        <HandCoins className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold">Gadar Ku\u0257i</span>
      </div>
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              location.pathname === link.href && 'bg-muted text-primary',
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
