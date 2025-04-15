
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusCard from '@/components/dashboard/StatusCard';
import SecurityMetrics from '@/components/dashboard/SecurityMetrics';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import NetworkScanner from '@/components/dashboard/NetworkScanner';
import SystemHealth from '@/components/dashboard/SystemHealth';
import LogViewer from '@/components/dashboard/LogViewer';
import { Shield, AlertTriangle, Scan, Server } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Security Score" 
            value="83%" 
            icon={Shield}
            status="normal"
            trend={{ value: 5, isPositive: true }}
          />
          <StatusCard 
            title="Active Threats" 
            value={2} 
            icon={AlertTriangle}
            status="critical"
            trend={{ value: 2, isPositive: false }}
          />
          <StatusCard 
            title="Vulnerabilities" 
            value={15} 
            icon={Scan}
            status="warning"
            trend={{ value: 3, isPositive: true }}
          />
          <StatusCard 
            title="Systems Monitored" 
            value={5} 
            icon={Server}
            status="normal"
          />
        </div>
        
        {/* Security Metrics */}
        <SecurityMetrics />
        
        {/* Alerts */}
        <AlertsPanel />
        
        {/* Network Scanner */}
        <NetworkScanner />
        
        {/* System Health */}
        <SystemHealth />
        
        {/* Log Viewer */}
        <LogViewer />
      </div>
    </DashboardLayout>
  );
};

export default Index;
