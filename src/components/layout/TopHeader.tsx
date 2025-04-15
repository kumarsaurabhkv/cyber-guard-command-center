
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopHeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  notifications: number;
}

const TopHeader = ({ setMobileMenuOpen, notifications }: TopHeaderProps) => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold hidden sm:block">Security Command Center</h1>
        <h1 className="text-lg font-bold sm:hidden">Command Center</h1>
        <div className="status-active ml-4 hidden sm:flex">System Online</div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-secondary transition-colors">
            <Search size={18} />
          </button>
        </div>
        <div className="relative">
          <button className="p-2 rounded-md hover:bg-secondary transition-colors">
            <Bell size={18} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-destructive animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
