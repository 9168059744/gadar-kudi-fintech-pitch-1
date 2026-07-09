import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function DashboardHeader() {
    const { user } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b">
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"/>
        </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5" />
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <span>{user?.email}</span>
      </div>
    </header>
  );
}
