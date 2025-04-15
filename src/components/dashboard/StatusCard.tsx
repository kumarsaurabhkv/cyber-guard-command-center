
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusType = 'normal' | 'warning' | 'critical' | 'offline';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  status?: StatusType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatusCard = ({ 
  title, 
  value, 
  icon: Icon,
  status = 'normal',
  trend,
  className
}: StatusCardProps) => {
  return (
    <div className={cn(
      "cyber-border p-4 bg-card",
      status === 'warning' && "border-yellow-500/30 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
      status === 'critical' && "border-destructive/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
      status === 'offline' && "border-muted/30 shadow-none bg-opacity-50",
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-muted-foreground text-sm">{title}</span>
        <Icon 
          size={18} 
          className={cn(
            status === 'normal' && "text-primary",
            status === 'warning' && "text-yellow-500",
            status === 'critical' && "text-destructive",
            status === 'offline' && "text-muted-foreground"
          )} 
        />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <div className={cn(
              "text-xs flex items-center mt-1",
              trend.isPositive ? "text-green-400" : "text-destructive"
            )}>
              <span>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "text-xs rounded-full px-2 py-0.5",
          status === 'normal' && "bg-primary/20 text-primary",
          status === 'warning' && "bg-yellow-500/20 text-yellow-500",
          status === 'critical' && "bg-destructive/20 text-destructive",
          status === 'offline' && "bg-muted text-muted-foreground"
        )}>
          {status === 'normal' && 'Secure'}
          {status === 'warning' && 'Warning'}
          {status === 'critical' && 'Critical'}
          {status === 'offline' && 'Offline'}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
