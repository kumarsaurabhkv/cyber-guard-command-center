
import React, { useState } from 'react';
import { 
  Shield, Menu, Bell, BarChart3, Activity, 
  Cpu, Database, Wifi, Terminal, Settings, 
  AlertTriangle, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const navItems = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Alerts', icon: AlertTriangle, count: notifications },
    { name: 'Network', icon: Wifi },
    { name: 'Systems', icon: Cpu },
    { name: 'Database', icon: Database },
    { name: 'Logs', icon: Terminal },
    { name: 'Settings', icon: Settings },
  ];

  const handleNavClick = (item: string) => {
    toast({
      title: `Navigating to ${item}`,
      description: "This feature is coming soon!",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        collapsed ? "w-16" : "w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-full bg-sidebar cyber-border flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <Shield className="text-primary animate-pulse" />
                <span className="font-bold text-lg">CyberGuard</span>
              </div>
            )}
            {collapsed && <Shield className="text-primary mx-auto" />}
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              className="p-1 rounded-md hover:bg-sidebar-accent hidden lg:block"
            >
              <Menu size={18} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-md hover:bg-sidebar-accent lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
          
          <div className="flex-grow py-4 overflow-y-auto">
            <ul className="space-y-2 px-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => handleNavClick(item.name)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 rounded-md transition-colors",
                      item.active ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon size={18} className={item.active ? "text-primary" : ""} />
                    {!collapsed && (
                      <>
                        <span className="ml-3">{item.name}</span>
                        {item.count && (
                          <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-t border-border">
            {!collapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-medium">JD</span>
                </div>
                <div>
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">Security Admin</div>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-medium">JD</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Security Command Center</h1>
            <div className="status-active ml-4 hidden sm:flex">System Online</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-md hover:bg-secondary">
                <Search size={18} />
              </button>
            </div>
            <div className="relative">
              <button className="p-2 rounded-md hover:bg-secondary">
                <Bell size={18} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-destructive animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
