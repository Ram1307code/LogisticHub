'use client';

import { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Truck } from 'lucide-react';
import { mockDisruptions } from '@/lib/mock-data';

export default function DisruptionsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredDisruptions = mockDisruptions.filter((disruption) => {
    return filterSeverity === 'all' || disruption.severity === filterSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-primary/20 text-primary border border-primary/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return '🌩️';
      case 'traffic':
        return '🚗';
      case 'mechanical':
        return '🔧';
      case 'customs':
        return '📋';
      default:
        return '⚠️';
    }
  };

  const criticalCount = filteredDisruptions.filter(d => d.severity === 'critical').length;
  const highCount = filteredDisruptions.filter(d => d.severity === 'high').length;
  const mediumCount = filteredDisruptions.filter(d => d.severity === 'medium').length;
  const lowCount = filteredDisruptions.filter(d => d.severity === 'low').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Disruptions & Alerts</h1>
        <p className="text-muted-foreground">Active incidents affecting shipments and routes</p>
      </div>

      {/* Severity Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Critical</p>
          <p className="text-3xl font-bold text-primary">{criticalCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Requiring immediate action</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">High</p>
          <p className="text-3xl font-bold text-orange-400">{highCount}</p>
          <p className="text-xs text-muted-foreground mt-2">May cause delays</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Medium</p>
          <p className="text-3xl font-bold text-yellow-400">{mediumCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Monitoring situation</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Low</p>
          <p className="text-3xl font-bold text-green-400">{lowCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Minor impact</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="bg-input border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Severity Levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Disruptions List */}
      <div className="space-y-4">
        {filteredDisruptions.map((disruption) => {
          const isResolved = disruption.estimatedResolution && new Date(disruption.estimatedResolution) < new Date();
          
          return (
            <div
              key={disruption.id}
              className={`rounded-lg border p-6 ${
                disruption.severity === 'critical'
                  ? 'bg-primary/5 border-primary/30'
                  : disruption.severity === 'high'
                  ? 'bg-orange-500/5 border-orange-500/30'
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-xl ${getSeverityColor(disruption.severity).split(' ').slice(0, 2).join(' ')}`}>
                  {getTypeIcon(disruption.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground capitalize">
                        {disruption.type.replace('-', ' ')}
                      </h3>
                      <p className="text-sm text-muted-foreground">{disruption.description}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ${getSeverityColor(disruption.severity)}`}>
                      {disruption.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{disruption.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Truck size={16} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{disruption.affectedShipments} shipments affected</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">
                        {disruption.estimatedResolution
                          ? `ETA: ${new Date(disruption.estimatedResolution).toLocaleTimeString()}`
                          : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                      View Affected Shipments
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-background border border-border text-foreground rounded hover:bg-card transition-colors">
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDisruptions.length === 0 && (
        <div className="rounded-lg bg-card border border-border p-12 text-center">
          <AlertTriangle size={48} className="mx-auto text-green-400 mb-4" />
          <p className="text-lg font-semibold text-foreground mb-2">No disruptions found</p>
          <p className="text-muted-foreground">Everything is running smoothly!</p>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="rounded-lg bg-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">AI Recommendations</h2>
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-background rounded-lg border border-border">
            <div className="w-1 bg-primary flex-shrink-0 rounded-full" />
            <div>
              <p className="text-sm font-medium text-foreground">Proactive Route Adjustment</p>
              <p className="text-xs text-muted-foreground mt-1">Consider rerouting 3 shipments via I-81 to avoid the I-95 incident affecting time loss by 2 hours</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-background rounded-lg border border-border">
            <div className="w-1 bg-secondary flex-shrink-0 rounded-full" />
            <div>
              <p className="text-sm font-medium text-foreground">Customer Communication</p>
              <p className="text-xs text-muted-foreground mt-1">Send proactive notifications to 8 customers about potential 4-6 hour delays due to Texas weather</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-background rounded-lg border border-border">
            <div className="w-1 bg-green-400 flex-shrink-0 rounded-full" />
            <div>
              <p className="text-sm font-medium text-foreground">Resource Allocation</p>
              <p className="text-xs text-muted-foreground mt-1">Dispatch 2 additional support vehicles to Colorado region to handle peak pickup demands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
