import { Outlet } from 'react-router-dom';
import { SideNav } from '@/components/dashboard/SideNav';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <SideNav />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
