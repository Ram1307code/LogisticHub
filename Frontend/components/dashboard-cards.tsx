'use client';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function KPICard({ label, value, unit, trend, icon, highlight }: KPICardProps) {
  return (
    <div className={`rounded-lg p-6 border ${highlight ? 'bg-card/80 border-primary/30' : 'bg-card border-border'}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`mt-3 text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
        </div>
      )}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="rounded-lg p-6 bg-card border border-border">
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-8 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-1/4" />
      </div>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg p-12 bg-card border border-border text-center">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
