
import React, { useState } from 'react';
import { Terminal, Filter, Download, Copy, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2025-04-15T10:32:15.123Z',
    level: 'error',
    source: 'firewall',
    message: 'Blocked suspicious connection attempt',
    details: 'Source: 203.0.113.42 | Destination: 10.0.0.15:22 | Protocol: TCP | Rule: Block SSH access'
  },
  {
    id: 'log-002',
    timestamp: '2025-04-15T10:30:22.453Z',
    level: 'warning',
    source: 'auth',
    message: 'Failed login attempt',
    details: 'Username: admin | IP: 192.168.1.105 | Reason: Invalid password'
  },
  {
    id: 'log-003',
    timestamp: '2025-04-15T10:28:10.987Z',
    level: 'info',
    source: 'system',
    message: 'Service started',
    details: 'Service: nginx | PID: 12345'
  },
  {
    id: 'log-004',
    timestamp: '2025-04-15T10:27:05.324Z',
    level: 'debug',
    source: 'app',
    message: 'Database connection established',
    details: 'Database: postgres | User: app_user | Host: db.internal'
  },
  {
    id: 'log-005',
    timestamp: '2025-04-15T10:25:55.778Z',
    level: 'warning',
    source: 'system',
    message: 'High CPU usage detected',
    details: 'Usage: 92% | Process: node | PID: 12350 | Duration: 120s'
  },
  {
    id: 'log-006',
    timestamp: '2025-04-15T10:24:30.112Z',
    level: 'info',
    source: 'security',
    message: 'User password changed',
    details: 'Username: john.doe | Source: account settings'
  },
  {
    id: 'log-007',
    timestamp: '2025-04-15T10:22:15.908Z',
    level: 'error',
    source: 'app',
    message: 'API request failed',
    details: 'Endpoint: /api/v1/users | Method: GET | Status: 500 | Error: Internal server error'
  }
];

const LogViewer = () => {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [levelFilters, setLevelFilters] = useState({
    info: true,
    warning: true,
    error: true,
    debug: true
  });
  
  const toggleLogExpand = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };
  
  const getLevelColor = (level: LogEntry['level']) => {
    switch(level) {
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-primary';
      case 'debug':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  const toggleLevelFilter = (level: keyof typeof levelFilters) => {
    setLevelFilters(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };
  
  const filteredLogs = mockLogs.filter(log => 
    (levelFilters[log.level]) &&
    (
      filter === '' ||
      log.message.toLowerCase().includes(filter.toLowerCase()) ||
      log.source.toLowerCase().includes(filter.toLowerCase())
    )
  );
  
  return (
    <div className="cyber-border bg-card">
      <div className="p-4 border-b border-border flex items-center">
        <Terminal size={18} className="text-primary mr-2" />
        <h3 className="font-medium">Security Logs</h3>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter logs..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 pl-8 rounded-md bg-secondary border border-border"
              />
              <Filter size={14} className="absolute left-2.5 top-2.5 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button 
              className={cn(
                "px-3 py-1 rounded-md text-xs",
                levelFilters.info ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              )}
              onClick={() => toggleLevelFilter('info')}
            >
              Info
            </button>
            <button 
              className={cn(
                "px-3 py-1 rounded-md text-xs",
                levelFilters.warning ? "bg-yellow-500/20 text-yellow-500" : "bg-secondary text-muted-foreground"
              )}
              onClick={() => toggleLevelFilter('warning')}
            >
              Warning
            </button>
            <button 
              className={cn(
                "px-3 py-1 rounded-md text-xs",
                levelFilters.error ? "bg-destructive/20 text-destructive" : "bg-secondary text-muted-foreground"
              )}
              onClick={() => toggleLevelFilter('error')}
            >
              Error
            </button>
            <button 
              className={cn(
                "px-3 py-1 rounded-md text-xs",
                levelFilters.debug ? "bg-muted text-muted-foreground" : "bg-secondary text-muted-foreground"
              )}
              onClick={() => toggleLevelFilter('debug')}
            >
              Debug
            </button>
          </div>
          
          <button className="p-2 rounded-md bg-secondary hover:bg-secondary/90">
            <RefreshCcw size={14} />
          </button>
          <button className="p-2 rounded-md bg-secondary hover:bg-secondary/90">
            <Download size={14} />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No logs match your filter criteria
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => {
              const isExpanded = expandedLog === log.id;
              
              return (
                <div key={log.id} className="terminal-text">
                  <div 
                    className="p-3 cursor-pointer flex items-start justify-between hover:bg-secondary/50"
                    onClick={() => toggleLogExpand(log.id)}
                  >
                    <div className="flex items-start">
                      <div className="min-w-[80px] text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </div>
                      <div className={cn("min-w-[60px] text-xs font-medium", getLevelColor(log.level))}>
                        [{log.level.toUpperCase()}]
                      </div>
                      <div className="min-w-[80px] text-xs mr-2">
                        {log.source}:
                      </div>
                      <div className="text-xs">
                        {log.message}
                      </div>
                    </div>
                    <div>
                      {log.details && (
                        isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && log.details && (
                    <div className="px-3 pb-3 pt-0 bg-secondary/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-muted-foreground">Details:</div>
                        <button 
                          className="text-xs flex items-center text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(log.details || '');
                          }}
                        >
                          <Copy size={12} className="mr-1" />
                          Copy
                        </button>
                      </div>
                      <div className="text-xs bg-secondary p-2 rounded-md">
                        {log.details}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
