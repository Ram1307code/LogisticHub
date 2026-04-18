'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Navigation, TrendingDown, Zap, DollarSign } from 'lucide-react';
import { mockAnalytics } from '@/lib/mock-data';

export default function OptimizationPage() {
  const routeData = [
    { id: 1, name: 'Route 1 (CA-NV)', current: 450, optimized: 380, savings: 70 },
    { id: 2, name: 'Route 2 (TX-LA)', current: 320, optimized: 275, savings: 45 },
    { id: 3, name: 'Route 3 (CO-UT)', current: 580, optimized: 510, savings: 70 },
    { id: 4, name: 'Route 4 (NY-CT)', current: 240, optimized: 215, savings: 25 },
    { id: 5, name: 'Route 5 (FL-GA)', current: 380, optimized: 340, savings: 40 },
  ];

  const timeAnalysis = [
    { hour: '6am', efficiency: 65, stops: 12 },
    { hour: '9am', efficiency: 78, stops: 18 },
    { hour: '12pm', efficiency: 72, stops: 25 },
    { hour: '3pm', efficiency: 85, stops: 21 },
    { hour: '6pm', efficiency: 68, stops: 14 },
    { hour: '9pm', efficiency: 45, stops: 8 },
  ];

  const costBreakdown = [
    { category: 'Fuel', current: 2450, optimized: 1890, fill: '#ff6b5b' },
    { category: 'Labor', current: 3200, optimized: 2950, fill: '#3b7bff' },
    { category: 'Maintenance', current: 890, optimized: 820, fill: '#ffa841' },
    { category: 'Vehicle', current: 1200, optimized: 1050, fill: '#48d597' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Route Optimization</h1>
        <p className="text-muted-foreground">AI-powered route planning and efficiency analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Distance Saved</h3>
            <Navigation size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {((1 - mockAnalytics.routeOptimization.optimizedDistance / mockAnalytics.routeOptimization.currentDistance) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-400 mt-2">
            {mockAnalytics.routeOptimization.currentDistance - mockAnalytics.routeOptimization.optimizedDistance} miles per week
          </p>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Time Saved</h3>
            <TrendingDown size={24} className="text-secondary" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {mockAnalytics.routeOptimization.currentTime - mockAnalytics.routeOptimization.optimizedTime}h
          </p>
          <p className="text-sm text-green-400 mt-2">
            {((1 - mockAnalytics.routeOptimization.optimizedTime / mockAnalytics.routeOptimization.currentTime) * 100).toFixed(1)}% reduction
          </p>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Fuel Savings</h3>
            <Zap size={24} className="text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-foreground">${mockAnalytics.routeOptimization.fuelSavings}</p>
          <p className="text-sm text-green-400 mt-2">Weekly savings</p>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Cost Savings</h3>
            <DollarSign size={24} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-foreground">${mockAnalytics.routeOptimization.costSavings}</p>
          <p className="text-sm text-green-400 mt-2">Weekly impact</p>
        </div>
      </div>

      {/* Route Comparison */}
      <div className="rounded-lg bg-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Route Distance Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={routeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151' }} />
            <Legend />
            <Bar dataKey="current" fill="#ff6b5b" name="Current Distance (miles)" />
            <Bar dataKey="optimized" fill="#48d597" name="Optimized Distance (miles)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Route Efficiency by Time */}
      <div className="rounded-lg bg-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Route Efficiency by Time of Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151' }} />
            <Legend />
            <Line type="monotone" dataKey="efficiency" stroke="#3b7bff" strokeWidth={2} name="Route Efficiency (%)" />
            <Line type="monotone" dataKey="stops" stroke="#ffa841" strokeWidth={2} name="Delivery Stops" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Comparison */}
      <div className="rounded-lg bg-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown: Current vs. Optimized</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="category" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #374151' }} />
            <Legend />
            <Bar dataKey="current" fill="#ff6b5b" name="Current Cost ($)" />
            <Bar dataKey="optimized" fill="#48d597" name="Optimized Cost ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Optimization Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg bg-card border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h2>
          <div className="space-y-3">
            {[
              { title: 'Consolidate Route 2 & 5', benefit: '$340/week savings' },
              { title: 'Add Evening Shift Route', benefit: '$520/week potential' },
              { title: 'Optimize Stop Sequencing', benefit: '2.3 hours saved/week' },
              { title: 'Implement Dynamic Routing', benefit: '$890/week potential' },
            ].map((action, idx) => (
              <div key={idx} className="p-3 bg-background rounded-lg border border-border flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{action.title}</p>
                  <p className="text-xs text-green-400">{action.benefit}</p>
                </div>
                <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-card border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Average Route Distance', value: '342 miles', change: '-15%' },
              { label: 'Avg Delivery Time', value: '5.2 hours', change: '-22%' },
              { label: 'Cost per Delivery', value: '$18.50', change: '-18%' },
              { label: 'Vehicle Utilization', value: '87%', change: '+12%' },
            ].map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                </div>
                <span className={`text-sm font-semibold ${metric.change.startsWith('-') ? 'text-green-400' : 'text-blue-400'}`}>
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
