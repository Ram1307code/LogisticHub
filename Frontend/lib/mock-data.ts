export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: number;
  priority: 'high' | 'medium' | 'low';
  temperature?: number;
  humidity?: number;
}

export interface Disruption {
  id: string;
  type: 'weather' | 'traffic' | 'mechanical' | 'customs' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedShipments: number;
  description: string;
  reportedAt: string;
  estimatedResolution?: string;
  location: string;
}

export interface RouteOptimization {
  id: string;
  currentDistance: number;
  optimizedDistance: number;
  currentTime: number;
  optimizedTime: number;
  fuelSavings: number;
  costSavings: number;
  shipmentCount: number;
}

export const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'SHP-001-2024',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    status: 'in-transit',
    estimatedDelivery: '2024-04-22',
    weight: 2500,
    priority: 'high',
    temperature: 18,
    humidity: 45,
  },
  {
    id: '2',
    trackingNumber: 'SHP-002-2024',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    status: 'in-transit',
    estimatedDelivery: '2024-04-20',
    weight: 1800,
    priority: 'medium',
  },
  {
    id: '3',
    trackingNumber: 'SHP-003-2024',
    origin: 'Seattle, WA',
    destination: 'Dallas, TX',
    status: 'delayed',
    estimatedDelivery: '2024-04-23',
    weight: 3200,
    priority: 'high',
  },
  {
    id: '4',
    trackingNumber: 'SHP-004-2024',
    origin: 'Boston, MA',
    destination: 'Denver, CO',
    status: 'delivered',
    estimatedDelivery: '2024-04-18',
    actualDelivery: '2024-04-18',
    weight: 1500,
    priority: 'low',
  },
  {
    id: '5',
    trackingNumber: 'SHP-005-2024',
    origin: 'Portland, OR',
    destination: 'Phoenix, AZ',
    status: 'in-transit',
    estimatedDelivery: '2024-04-21',
    weight: 2100,
    priority: 'medium',
  },
  {
    id: '6',
    trackingNumber: 'SHP-006-2024',
    origin: 'Houston, TX',
    destination: 'Atlanta, GA',
    status: 'in-transit',
    estimatedDelivery: '2024-04-19',
    weight: 2800,
    priority: 'high',
  },
  {
    id: '7',
    trackingNumber: 'SHP-007-2024',
    origin: 'San Francisco, CA',
    destination: 'Philadelphia, PA',
    status: 'delivered',
    estimatedDelivery: '2024-04-18',
    actualDelivery: '2024-04-18',
    weight: 1200,
    priority: 'medium',
  },
  {
    id: '8',
    trackingNumber: 'SHP-008-2024',
    origin: 'Minneapolis, MN',
    destination: 'Las Vegas, NV',
    status: 'pending',
    estimatedDelivery: '2024-04-25',
    weight: 900,
    priority: 'low',
  },
];

export const mockDisruptions: Disruption[] = [
  {
    id: '1',
    type: 'weather',
    severity: 'critical',
    affectedShipments: 12,
    description: 'Severe thunderstorm in Texas corridor affecting 12 shipments',
    reportedAt: '2024-04-18T10:30:00',
    estimatedResolution: '2024-04-18T16:00:00',
    location: 'Texas I-35 Corridor',
  },
  {
    id: '2',
    type: 'traffic',
    severity: 'high',
    affectedShipments: 8,
    description: 'Major accident on I-95 causing significant delays',
    reportedAt: '2024-04-18T09:15:00',
    estimatedResolution: '2024-04-18T14:00:00',
    location: 'I-95 North Carolina',
  },
  {
    id: '3',
    type: 'mechanical',
    severity: 'high',
    affectedShipments: 1,
    description: 'Vehicle engine failure - replacement in progress',
    reportedAt: '2024-04-18T08:45:00',
    estimatedResolution: '2024-04-18T18:30:00',
    location: 'Salt Lake City, UT',
  },
  {
    id: '4',
    type: 'customs',
    severity: 'medium',
    affectedShipments: 3,
    description: 'Delayed customs clearance at border checkpoint',
    reportedAt: '2024-04-18T07:20:00',
    estimatedResolution: '2024-04-19T10:00:00',
    location: 'San Diego Border',
  },
  {
    id: '5',
    type: 'weather',
    severity: 'medium',
    affectedShipments: 5,
    description: 'Heavy fog reducing visibility in mountain passes',
    reportedAt: '2024-04-18T06:00:00',
    estimatedResolution: '2024-04-18T12:00:00',
    location: 'Colorado Rockies',
  },
];

export const mockAnalytics = {
  totalShipments: 487,
  onTimeDelivery: 94.2,
  averageDeliveryTime: 3.2,
  costPerMile: 2.45,
  fuelEfficiency: 8.7,
  trafficIncidents: 23,
  weatherAlerts: 15,
  mechanicalIssues: 4,
  weeklyTrends: [
    { day: 'Mon', shipped: 45, delivered: 42, delayed: 3 },
    { day: 'Tue', shipped: 52, delivered: 50, delayed: 2 },
    { day: 'Wed', shipped: 48, delivered: 45, delayed: 3 },
    { day: 'Thu', shipped: 61, delivered: 58, delayed: 3 },
    { day: 'Fri', shipped: 58, delivered: 55, delayed: 3 },
    { day: 'Sat', shipped: 38, delivered: 36, delayed: 2 },
    { day: 'Sun', shipped: 32, delivered: 32, delayed: 0 },
  ],
  routeOptimization: {
    currentDistance: 45230,
    optimizedDistance: 38950,
    currentTime: 156,
    optimizedTime: 132,
    fuelSavings: 2340,
    costSavings: 5670,
  },
  shipmentStatusDistribution: [
    { name: 'Delivered', value: 342, fill: '#48d597' },
    { name: 'In Transit', value: 112, fill: '#3b7bff' },
    { name: 'Delayed', value: 23, fill: '#ff6b5b' },
    { name: 'Pending', value: 10, fill: '#ffa841' },
  ],
};
