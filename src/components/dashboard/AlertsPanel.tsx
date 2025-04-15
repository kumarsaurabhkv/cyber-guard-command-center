
import React, { useState } from 'react';
import { AlertTriangle, Shield, Clock, ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'intrusion' | 'malware' | 'policy' | 'system';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  source: string;
  timestamp: string;
  description: string;
  status: 'active' | 'investigating' | 'resolved';
}

const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'intrusion',
    severity: 'critical',
    title: 'Multiple Failed Login Attempts',
    source: '192.168.1.105',
    timestamp: '15 Apr, 10:23 AM',
    description: 'Multiple failed login attempts detected from IP address 192.168.1.105, potential brute force attack targeting admin account.',
    status: 'active',
  },
  {
    id: 'alert-002',
    type: 'malware',
    severity: 'high',
    title: 'Suspicious File Detected',
    source: 'Endpoint #7',
    timestamp: '15 Apr, 09:45 AM',
    description: 'Potential malware detected on endpoint WKSTN-7. File: system32.dll.exe quarantined in secure vault.',
    status: 'investigating',
  },
  {
    id: 'alert-003',
    type: 'policy',
    severity: 'medium',
    title: 'Unusual Network Connection',
    source: '10.0.0.15',
    timestamp: '15 Apr, 08:30 AM',
    description: 'Endpoint attempting to connect to known malicious domain. Connection blocked per security policy.',
    status: 'resolved',
  },
  {
    id: 'alert-004',
    type: 'system',
    severity: 'low',
    title: 'Certificate Expiring Soon',
    source: 'secureapp.internal',
    timestamp: '15 Apr, 07:15 AM',
    description: 'SSL Certificate for secureapp.internal will expire in 15 days. Please renew certificate.',
    status: 'active',
  },
];

const getAlertIcon = (type: Alert['type']) => {
  switch(type) {
    case 'intrusion':
      return AlertTriangle;
    case 'malware':
      return Shield;
    default:
      return AlertTriangle;
  }
};

const getSeverityColor = (severity: Alert['severity']) => {
  switch(severity) {
    case 'critical':
      return 'text-destructive';
    case 'high':
      return 'text-orange-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-primary';
    default:
      return 'text-muted-foreground';
  }
};

const getStatusBadge = (status: Alert['status']) => {
  switch(status) {
    case 'active':
      return 'bg-destructive/20 text-destructive';
    case 'investigating':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'resolved':
      return 'bg-green-500/20 text-green-500';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const AlertsPanel = () => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  
  const toggleAlert = (id: string) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };
  
  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  return (
    <div className="cyber-border bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={18} className="text-destructive mr-2" />
          <h3 className="font-medium">Security Alerts</h3>
        </div>
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock size={14} className="mr-1" />
          Last updated: 2 minutes ago
        </div>
      </div>
      
      {alerts.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          <div className="flex justify-center mb-4">
            <Shield size={48} className="text-muted-foreground/20" />
          </div>
          <p>No active alerts</p>
          <p className="text-xs mt-2">System monitoring active and working properly</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const isExpanded = expandedAlert === alert.id;
            
            return (
              <div key={alert.id} className="p-4">
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleAlert(alert.id)}
                >
                  <div className="flex items-start">
                    <div className={cn("p-2 rounded-md mr-3", 
                      alert.severity === 'critical' && "bg-destructive/10",
                      alert.severity === 'high' && "bg-orange-500/10",
                      alert.severity === 'medium' && "bg-yellow-500/10",
                      alert.severity === 'low' && "bg-primary/10",
                    )}>
                      <Icon size={16} className={getSeverityColor(alert.severity)} />
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full ml-2", getStatusBadge(alert.status))}>
                          {alert.status}
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        <span>{alert.source}</span>
                        <span className="mx-2">•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissAlert(alert.id);
                      }} 
                      className="p-1 hover:bg-secondary rounded-md mr-1"
                    >
                      <X size={14} />
                    </button>
                    {isExpanded ? 
                      <ChevronUp size={14} className="mt-1" /> : 
                      <ChevronDown size={14} className="mt-1" />
                    }
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="mt-4 pl-12">
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="space-x-2">
                        <button className={cn(
                          "text-xs px-3 py-1 rounded-md",
                          alert.status === 'resolved' ? 
                            "bg-muted text-muted-foreground cursor-not-allowed" : 
                            "bg-primary text-primary-foreground hover:bg-primary/90"
                        )} disabled={alert.status === 'resolved'}>
                          {alert.status === 'active' ? 'Investigate' : 'View Details'}
                        </button>
                        {alert.status !== 'resolved' && (
                          <button className="text-xs px-3 py-1 rounded-md bg-secondary hover:bg-secondary/90">
                            Mark Resolved
                          </button>
                        )}
                      </div>
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center">
                        <span>View Full Report</span>
                        <ExternalLink size={12} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
