
import React from 'react';
import { Cpu, HardDrive, Wifi, BarChart2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

interface SystemResourceProps {
  name: string;
  icon: React.ReactNode;
  value: number;
  maxValue: number;
  unit: string;
}

const SystemResource = ({ name, icon, value, maxValue, unit }: SystemResourceProps) => {
  const percentage = (value / maxValue) * 100;
  
  // Determine the color based on the percentage
  const getProgressColor = () => {
    if (percentage > 90) return "bg-destructive";
    if (percentage > 70) return "bg-yellow-500";
    return "bg-primary";
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm">
          {icon}
          <span className="ml-2">{name}</span>
        </div>
        <div className="text-sm">
          {value} / {maxValue} {unit}
        </div>
      </div>
      <Progress
        value={percentage}
        className={cn(
          "h-2",
          percentage > 90 ? "bg-destructive/20" : 
          percentage > 70 ? "bg-yellow-500/20" : 
          "bg-primary/20"
        )}
        // The indicator style is now handled through CSS custom properties
        style={{
          "--progress-foreground": percentage > 90 ? "hsl(0 100% 50%)" : 
                                  percentage > 70 ? "hsl(39 100% 50%)" : 
                                  "hsl(196 100% 50%)"
        } as React.CSSProperties}
      />
    </div>
  );
};

interface ServerProps {
  name: string;
  ip: string;
  status: 'online' | 'warning' | 'offline';
  cpu: number;
  memory: number;
  disk: number;
}

const servers: ServerProps[] = [
  { name: 'Main Firewall', ip: '10.0.0.1', status: 'online', cpu: 45, memory: 3.2, disk: 120 },
  { name: 'Web Server', ip: '10.0.0.2', status: 'online', cpu: 78, memory: 6.4, disk: 420 },
  { name: 'Database', ip: '10.0.0.3', status: 'warning', cpu: 92, memory: 14.2, disk: 780 },
  { name: 'Backup Server', ip: '10.0.0.4', status: 'online', cpu: 12, memory: 4.8, disk: 1200 },
  { name: 'Auth Server', ip: '10.0.0.5', status: 'offline', cpu: 0, memory: 0, disk: 350 },
];

const SystemHealth = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="cyber-border bg-card relative overflow-hidden group">
        <div className="p-4 border-b border-border flex items-center">
          <BarChart2 size={18} className="text-primary mr-2" />
          <h3 className="font-medium">System Resources</h3>
        </div>
        <div className="p-4 space-y-4">
          <SystemResource 
            name="CPU Usage" 
            icon={<Cpu size={14} />} 
            value={45} 
            maxValue={100} 
            unit="%" 
          />
          <SystemResource 
            name="Memory Usage" 
            icon={<HardDrive size={14} />} 
            value={8.2} 
            maxValue={16} 
            unit="GB" 
          />
          <SystemResource 
            name="Disk Space" 
            icon={<HardDrive size={14} />} 
            value={1.2} 
            maxValue={2} 
            unit="TB" 
          />
          <SystemResource 
            name="Network" 
            icon={<Wifi size={14} />} 
            value={350} 
            maxValue={1000} 
            unit="Mbps" 
          />
        </div>
        {/* 3D animation effect - pulsing gradient overlay */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300"></div>
      </div>
      
      <div className="cyber-border bg-card relative overflow-hidden group">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <Cpu size={18} className="text-primary mr-2" />
            <h3 className="font-medium">Server Status</h3>
          </div>
          <span className="text-xs text-muted-foreground">5/5 servers monitored</span>
        </div>
        <div className="divide-y divide-border">
          {servers.map((server) => (
            <div key={server.name} className="p-4 relative z-10">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-medium">{server.name}</h4>
                  <span className="text-xs text-muted-foreground">{server.ip}</span>
                </div>
                <div className={cn(
                  "text-xs px-2 py-1 rounded-md transform hover:scale-105 transition-transform",
                  server.status === 'online' && "bg-green-500/20 text-green-500",
                  server.status === 'warning' && "bg-yellow-500/20 text-yellow-500",
                  server.status === 'offline' && "bg-destructive/20 text-destructive"
                )}>
                  {server.status}
                </div>
              </div>
              
              {server.status !== 'offline' && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className={cn(
                    "text-xs p-1.5 rounded-md flex items-center justify-between transform hover:translate-y-[-2px] transition-transform",
                    server.cpu > 90 ? "bg-destructive/10" : 
                    server.cpu > 70 ? "bg-yellow-500/10" : 
                    "bg-green-500/10"
                  )}>
                    <span>CPU</span>
                    <span className={cn(
                      server.cpu > 90 ? "text-destructive" : 
                      server.cpu > 70 ? "text-yellow-500" : 
                      "text-green-500"
                    )}>{server.cpu}%</span>
                  </div>
                  <div className="text-xs p-1.5 bg-primary/10 rounded-md flex items-center justify-between transform hover:translate-y-[-2px] transition-transform">
                    <span>MEM</span>
                    <span className="text-primary">{server.memory}GB</span>
                  </div>
                  <div className="text-xs p-1.5 bg-primary/10 rounded-md flex items-center justify-between transform hover:translate-y-[-2px] transition-transform">
                    <span>DISK</span>
                    <span className="text-primary">{server.disk}GB</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 3D animation effect - scanning line */}
        <div className="absolute h-1 bg-primary/50 w-full left-0 -top-1 opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite] z-0"></div>
      </div>
    </div>
  );
};

export default SystemHealth;
