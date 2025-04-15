
import React, { useState } from 'react';
import { 
  Shield, Menu, Bell, BarChart3, Activity, 
  Cpu, Database, Wifi, Terminal, Settings, 
  AlertTriangle, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(5);
  
  const navItems = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Alerts', icon: AlertTriangle, count: notifications },
    { name: 'Network', icon: Wifi },
    { name: 'Systems', icon: Cpu },
    { name: 'Database', icon: Database },
    { name: 'Logs', icon: Terminal },
    { name: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Shield className="text-primary" />
              <span className="font-bold text-lg">CyberGuard</span>
            </div>
          )}
          {collapsed && <Shield className="text-primary mx-auto" />}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-1 rounded-md hover:bg-sidebar-accent"
          >
            <Menu size={18} />
          </button>
        </div>
        
        <div className="flex-grow py-4">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href="#" 
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-colors",
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
                </a>
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
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Security Command Center</h1>
            <div className="status-active ml-4">System Online</div>
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
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-destructive" />
                )}
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
