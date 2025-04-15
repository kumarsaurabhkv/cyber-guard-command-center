
import { 
  BarChart3, AlertTriangle, Wifi, 
  Cpu, Database, Terminal, Settings
} from 'lucide-react';

export const navItems = [
  { name: 'Dashboard', icon: BarChart3, active: true },
  { name: 'Alerts', icon: AlertTriangle },
  { name: 'Network', icon: Wifi },
  { name: 'Systems', icon: Cpu },
  { name: 'Database', icon: Database },
  { name: 'Logs', icon: Terminal },
  { name: 'Settings', icon: Settings },
];
