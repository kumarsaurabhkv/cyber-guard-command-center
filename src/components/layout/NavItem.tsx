
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NavItemProps {
  name: string;
  icon: LucideIcon;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ name, icon: Icon, active, collapsed }: NavItemProps) => {
  const { toast } = useToast();

  const handleNavClick = () => {
    toast({
      title: `Navigating to ${name}`,
      description: "This feature is coming soon!",
    });
  };

  return (
    <li key={name}>
      <button 
        onClick={handleNavClick}
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md transition-colors",
          active ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent"
        )}
      >
        <Icon size={18} className={active ? "text-primary" : ""} />
        {!collapsed && (
          <span className="ml-3">{name}</span>
        )}
      </button>
    </li>
  );
};

export default NavItem;
