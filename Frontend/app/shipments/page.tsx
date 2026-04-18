'use client';

import { useState } from 'react';
import { ChevronDown, Search, Download, Filter } from 'lucide-react';
import { mockShipments, Shipment } from '@/lib/mock-data';

export default function ShipmentsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(search.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || shipment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'in-transit':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'delayed':
        return 'bg-primary/20 text-primary border border-primary/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-primary';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Shipments</h1>
        <p className="text-muted-foreground">Manage and track all active shipments</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by tracking number, origin, or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-input border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-transit">In Transit</option>
          <option value="delayed">Delayed</option>
          <option value="delivered">Delivered</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Shipments Table */}
      <div className="rounded-lg bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Tracking #</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Route</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Priority</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Est. Delivery</th>
                <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">{shipment.trackingNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-foreground">{shipment.origin}</p>
                      <p className="text-xs text-muted-foreground">→ {shipment.destination}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('-', ' ').charAt(0).toUpperCase() + shipment.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold capitalize ${getPriorityColor(shipment.priority)}`}>
                      {shipment.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-foreground">{shipment.weight} lbs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredShipments.length === 0 && (
        <div className="rounded-lg bg-card border border-border p-12 text-center">
          <p className="text-lg font-semibold text-foreground mb-2">No shipments found</p>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Shipments</p>
          <p className="text-2xl font-bold text-foreground">{filteredShipments.length}</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">In Transit</p>
          <p className="text-2xl font-bold text-blue-400">{filteredShipments.filter(s => s.status === 'in-transit').length}</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Delayed</p>
          <p className="text-2xl font-bold text-primary">{filteredShipments.filter(s => s.status === 'delayed').length}</p>
        </div>
        <div className="rounded-lg bg-card border border-border p-4">
          <p className="text-sm text-muted-foreground mb-1">Delivered</p>
          <p className="text-2xl font-bold text-green-400">{filteredShipments.filter(s => s.status === 'delivered').length}</p>
        </div>
      </div>
    </div>
  );
}
