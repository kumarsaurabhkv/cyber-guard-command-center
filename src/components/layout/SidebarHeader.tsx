
import { Shield, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

const SidebarHeader = ({ collapsed, setCollapsed, setMobileMenuOpen }: SidebarHeaderProps) => {
  return (
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
  );
};

export default SidebarHeader;
