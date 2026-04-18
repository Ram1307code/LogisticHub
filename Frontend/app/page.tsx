'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Truck, AlertCircle, Zap } from 'lucide-react';
import { KPICard } from '@/components/dashboard-cards';
import { mockAnalytics, mockShipments, mockDisruptions } from '@/lib/mock-data';

export default function Dashboard() {
  const deliveredCount = mockShipments.filter(s => s.status === 'delivered').length;
  const inTransitCount = mockShipments.filter(s => s.status === 'in-transit').length;
  const delayedCount = mockShipments.filter(s => s.status === 'delayed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Real-time logistics visibility and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Shipments"
          value={mockAnalytics.totalShipments}
          trend={12}
          icon={<Truck size={24} />}
        />
        <KPICard
          label="On-Time Delivery"
          value={mockAnalytics.onTimeDelivery}
          unit="%"
          trend={2.3}
          icon={<TrendingUp size={24} />}
        />
        <KPICard
          label="Avg Delivery Time"
          value={mockAnalytics.averageDeliveryTime}
          unit="days"
          trend={-0.5}
          highlight
        />
        <KPICard
          label="Active Disruptions"
          value={mockDisruptions.length}
          icon={<AlertCircle size={24} />}
          highlight
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <div className="rounded-lg bg-card border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Shipment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151' }} />
              <Legend />
              <Bar dataKey="shipped" stackId="a" fill="#3b7bff" />
              <Bar dataKey="delivered" stackId="a" fill="#48d597" />
              <Bar dataKey="delayed" stackId="a" fill="#ff6b5b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shipment Status */}
        <div className="rounded-lg bg-card border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Shipment Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAnalytics.shipmentStatusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockAnalytics.shipmentStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Delivered Today</h3>
            <Truck size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{deliveredCount}</p>
          <p className="text-sm text-muted-foreground mt-2">On schedule</p>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">In Transit</h3>
            <Truck size={20} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{inTransitCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Actively moving</p>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Delayed</h3>
            <AlertCircle size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{delayedCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Requiring attention</p>
        </div>
      </div>

      {/* Route Optimization */}
      <div className="rounded-lg bg-card border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Route Optimization Opportunity</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Distance Savings</p>
            <p className="text-2xl font-bold text-green-400">
              {((1 - mockAnalytics.routeOptimization.optimizedDistance / mockAnalytics.routeOptimization.currentDistance) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">{mockAnalytics.routeOptimization.currentDistance - mockAnalytics.routeOptimization.optimizedDistance} miles</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Time Savings</p>
            <p className="text-2xl font-bold text-green-400">
              {mockAnalytics.routeOptimization.currentTime - mockAnalytics.routeOptimization.optimizedTime} hrs
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {((1 - mockAnalytics.routeOptimization.optimizedTime / mockAnalytics.routeOptimization.currentTime) * 100).toFixed(1)}% reduction
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Fuel Savings</p>
            <p className="text-2xl font-bold text-green-400">${mockAnalytics.routeOptimization.fuelSavings}</p>
            <p className="text-xs text-muted-foreground mt-1">Per optimization cycle</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Cost Savings</p>
            <p className="text-2xl font-bold text-green-400">${mockAnalytics.routeOptimization.costSavings}</p>
            <p className="text-xs text-muted-foreground mt-1">Total weekly impact</p>
          </div>
        </div>
      </div>

      {/* Recent Disruptions */}
      <div className="rounded-lg bg-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Active Disruptions</h2>
        <div className="space-y-3">
          {mockDisruptions.slice(0, 5).map((disruption) => (
            <div key={disruption.id} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                disruption.severity === 'critical' ? 'bg-primary/20 text-primary' : 
                disruption.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                'bg-secondary/20 text-secondary'
              }`}>
                <AlertCircle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-foreground capitalize">{disruption.type.replace('-', ' ')}</h3>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    disruption.severity === 'critical' ? 'bg-primary/20 text-primary' :
                    disruption.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-secondary/20 text-secondary'
                  }`}>
                    {disruption.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{disruption.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{disruption.location} • {disruption.affectedShipments} shipments affected</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
