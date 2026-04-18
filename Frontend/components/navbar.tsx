'use client';

import { Bell, Search, LogOut } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex-1 ml-16 lg:ml-0">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shipments, disruptions..."
              className="w-full max-w-md bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-card rounded-lg transition-colors">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          <button className="p-2 hover:bg-card rounded-lg transition-colors">
            <LogOut size={20} className="text-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
}
