
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import SidebarHeader from './SidebarHeader';
import TopHeader from './TopHeader';
import { navItems } from './nav-items';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        "fixed inset-y-0 left-0 z-50 transform transition-all duration-200 ease-in-out lg:relative lg:translate-x-0",
        collapsed ? "w-16" : "w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="h-full bg-sidebar cyber-border flex flex-col">
          <SidebarHeader 
            collapsed={collapsed} 
            setCollapsed={setCollapsed}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          
          <div className="flex-grow py-4 overflow-y-auto">
            <ul className="space-y-2 px-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  active={item.active}
                  collapsed={collapsed}
                />
              ))}
            </ul>
          </div>
          
          {/* User profile section */}
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
        <TopHeader 
          setMobileMenuOpen={setMobileMenuOpen}
          notifications={notifications}
        />
        
        {/* Main content area */}
        <main className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
