
import React, { useState, useEffect } from 'react';
import { Scan, Play, X, Loader2, Shield, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScanResult {
  id: string;
  host: string;
  status: 'vulnerable' | 'secure' | 'warning' | 'unknown';
  service: string;
  details: string;
  recommendation?: string;
}

const mockScanResults: ScanResult[] = [
  {
    id: 'result-1',
    host: '192.168.1.1',
    status: 'secure',
    service: 'SSH',
    details: 'Using secure configuration and up-to-date version',
  },
  {
    id: 'result-2',
    host: '192.168.1.15',
    status: 'vulnerable',
    service: 'SMB',
    details: 'Running outdated version with known vulnerabilities (CVE-2023-1234)',
    recommendation: 'Update to latest version or disable if not required'
  },
  {
    id: 'result-3',
    host: '192.168.1.25',
    status: 'warning',
    service: 'Web Server',
    details: 'HTTP headers reveal version information',
    recommendation: 'Configure server to hide version information'
  },
  {
    id: 'result-4', 
    host: '192.168.1.100',
    status: 'vulnerable',
    service: 'Database',
    details: 'MySQL server accessible from external network with weak password policy',
    recommendation: 'Restrict access to internal network and enforce strong password policy'
  }
];

const scanPresets = [
  { id: 'quick', name: 'Quick Scan', duration: 30 },
  { id: 'standard', name: 'Standard Scan', duration: 120 },
  { id: 'deep', name: 'Deep Scan', duration: 300 },
  { id: 'custom', name: 'Custom Scan', duration: 0 },
];

const NetworkScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(scanPresets[0]);
  const [ipRange, setIpRange] = useState('192.168.1.1-254');
  const [results, setResults] = useState<ScanResult[]>([]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scanning) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setScanning(false);
            setScanComplete(true);
            setResults(mockScanResults);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, selectedPreset.duration * 10); // Scale down for demo
    }
    
    return () => clearInterval(interval);
  }, [scanning, selectedPreset.duration]);
  
  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    setResults([]);
  };
  
  const cancelScan = () => {
    setScanning(false);
    setProgress(0);
  };
  
  const newScan = () => {
    setScanComplete(false);
    setResults([]);
  };
  
  const getStatusIcon = (status: ScanResult['status']) => {
    switch (status) {
      case 'secure':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'vulnerable':
        return <XCircle size={16} className="text-destructive" />;
      case 'warning':
        return <AlertCircle size={16} className="text-yellow-500" />;
      default:
        return <Shield size={16} className="text-muted-foreground" />;
    }
  };
  
  return (
    <div className="cyber-border bg-card">
      <div className="p-4 border-b border-border flex items-center">
        <Scan size={18} className="text-primary mr-2" />
        <h3 className="font-medium">Network Vulnerability Scanner</h3>
      </div>
      
      <div className="p-4">
        {!scanning && !scanComplete ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Scan Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {scanPresets.map((preset) => (
                  <button
                    key={preset.id}
                    className={cn(
                      "p-2 text-sm rounded-md border",
                      selectedPreset.id === preset.id 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:bg-secondary"
                    )}
                    onClick={() => setSelectedPreset(preset)}
                  >
                    {preset.name}
                    {preset.id !== 'custom' && (
                      <span className="block text-xs text-muted-foreground mt-1">
                        ~{preset.duration / 60} min
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-1">IP Range</label>
              <input
                type="text"
                value={ipRange}
                onChange={(e) => setIpRange(e.target.value)}
                className="w-full p-2 rounded-md bg-secondary border border-border"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                onClick={startScan}
              >
                <Play size={16} className="mr-2" />
                Start Scan
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
                Schedule
              </button>
            </div>
          </div>
        ) : scanning ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Scanning network...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Scanning {ipRange}, using {selectedPreset.name}
              </div>
            </div>
            
            <div className="terminal-text p-3 bg-secondary/50 rounded-md h-24 overflow-y-auto">
              <div className="text-green-400">Initializing scan...</div>
              <div className="text-muted-foreground">Identifying active hosts in range {ipRange}</div>
              {progress > 20 && <div className="text-muted-foreground">Found 12 active hosts</div>}
              {progress > 40 && <div className="text-muted-foreground">Scanning port ranges...</div>}
              {progress > 60 && <div className="text-yellow-400">Found potential vulnerability in host 192.168.1.15</div>}
              {progress > 80 && <div className="text-destructive">Critical vulnerability detected in MySQL service</div>}
            </div>
            
            <button
              className="flex items-center px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
              onClick={cancelScan}
            >
              <X size={16} className="mr-2" />
              Cancel Scan
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 size={18} className="text-green-500 mr-2" />
                <span>Scan complete - {results.length} issues found</span>
              </div>
              <button
                className="text-xs flex items-center px-3 py-1 bg-secondary rounded-md hover:bg-secondary/90"
                onClick={newScan}
              >
                New Scan
              </button>
            </div>
            
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="py-2 px-3 text-left">Host</th>
                    <th className="py-2 px-3 text-left">Service</th>
                    <th className="py-2 px-3 text-left">Status</th>
                    <th className="py-2 px-3 text-left">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {results.map((result) => (
                    <tr key={result.id} className={cn(
                      result.status === 'vulnerable' && "bg-destructive/5",
                      result.status === 'warning' && "bg-yellow-500/5"
                    )}>
                      <td className="py-2 px-3">{result.host}</td>
                      <td className="py-2 px-3">{result.service}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center">
                          {getStatusIcon(result.status)}
                          <span className="ml-1 capitalize">{result.status}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div>{result.details}</div>
                        {result.recommendation && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Recommendation: {result.recommendation}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <button className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Export Results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkScanner;
