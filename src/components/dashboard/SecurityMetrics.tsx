
import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data
const vulnerabilityTrend = [
  { name: 'Jan', value: 14 },
  { name: 'Feb', value: 12 },
  { name: 'Mar', value: 18 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 21 },
  { name: 'Jun', value: 15 },
  { name: 'Jul', value: 7 },
];

const threatData = [
  { name: 'Mon', malware: 4, phishing: 3, dos: 1 },
  { name: 'Tue', malware: 3, phishing: 2, dos: 2 },
  { name: 'Wed', malware: 2, phishing: 7, dos: 3 },
  { name: 'Thu', malware: 8, phishing: 4, dos: 1 },
  { name: 'Fri', malware: 5, phishing: 3, dos: 0 },
  { name: 'Sat', malware: 2, phishing: 1, dos: 0 },
  { name: 'Sun', malware: 1, phishing: 2, dos: 1 },
];

const riskDistribution = [
  { name: 'Critical', value: 15, color: '#ef4444' },
  { name: 'High', value: 25, color: '#f97316' },
  { name: 'Medium', value: 40, color: '#eab308' },
  { name: 'Low', value: 20, color: '#00c8ff' },
];

const SecurityMetrics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="cyber-border p-4 bg-card lg:col-span-2">
        <h3 className="text-sm font-medium mb-4">Threat Detection (7-day)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={threatData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="malwareGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c8ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00c8ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="phishingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dosGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                  borderColor: '#374151',
                  borderRadius: '0.375rem',
                }} 
              />
              <Area type="monotone" dataKey="malware" stroke="#00c8ff" strokeWidth={2} fillOpacity={1} fill="url(#malwareGradient)" />
              <Area type="monotone" dataKey="phishing" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#phishingGradient)" />
              <Area type="monotone" dataKey="dos" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#dosGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-2 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
            <span className="text-xs">Malware</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-xs">Phishing</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
            <span className="text-xs">DoS Attacks</span>
          </div>
        </div>
      </div>

      <div className="cyber-border p-4 bg-card">
        <h3 className="text-sm font-medium mb-4">Risk Distribution</h3>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="70%"
                cy="70%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                  borderColor: '#374151',
                  borderRadius: '0.375rem',
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-2 flex-wrap gap-4">
          {riskDistribution.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityMetrics;
