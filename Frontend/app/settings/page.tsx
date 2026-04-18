'use client';

import { useState } from 'react';
import { Bell, Lock, Users, Palette, Database, Clock } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    disruptions: true,
    delays: true,
    weather: true,
    customs: true,
    mechanical: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    timezone: 'UTC-5',
    units: 'imperial',
    language: 'en',
  });

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings</p>
      </div>

      {/* Notification Settings */}
      <div className="rounded-lg bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Bell size={24} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
          </div>
          <p className="text-sm text-muted-foreground">Choose what alerts you receive</p>
        </div>

        <div className="p-6 space-y-4">
          {[
            { key: 'disruptions', label: 'Disruption Alerts', description: 'Get notified about traffic, weather, and operational disruptions' },
            { key: 'delays', label: 'Shipment Delays', description: 'Receive alerts when shipments fall behind schedule' },
            { key: 'weather', label: 'Severe Weather', description: 'Critical weather warnings affecting routes' },
            { key: 'customs', label: 'Customs Issues', description: 'Delays or issues with border crossings' },
            { key: 'mechanical', label: 'Vehicle Maintenance', description: 'Vehicle breakdowns or maintenance alerts' },
          ].map((item) => (
            <div key={item.key} className="flex items-start justify-between p-4 bg-background rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleNotificationChange(item.key)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-background transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-lg bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Palette size={24} className="text-secondary" />
            <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
          </div>
          <p className="text-sm text-muted-foreground">Customize your experience</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="UTC-8">Pacific (UTC-8)</option>
                <option value="UTC-6">Central (UTC-6)</option>
                <option value="UTC-5">Eastern (UTC-5)</option>
                <option value="UTC">GMT (UTC)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Unit System</label>
              <select
                value={preferences.units}
                onChange={(e) => handlePreferenceChange('units', e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="imperial">Imperial (miles, lbs)</option>
                <option value="metric">Metric (km, kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="rounded-lg bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Users size={24} className="text-accent" />
            <h2 className="text-lg font-semibold text-foreground">Account Settings</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage your account details</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Email Address</p>
            <p className="font-medium text-foreground">admin@logistichub.com</p>
            <button className="mt-2 text-sm text-primary hover:underline">Change email</button>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
            <p className="font-medium text-foreground">Admin User</p>
            <button className="mt-2 text-sm text-primary hover:underline">Edit profile</button>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Account Type</p>
            <p className="font-medium text-foreground">Administrator</p>
            <button className="mt-2 text-sm text-primary hover:underline">View permissions</button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-lg bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Lock size={24} className="text-yellow-400" />
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage your security settings</p>
        </div>

        <div className="p-6 space-y-4">
          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
            <p className="font-medium text-foreground">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground mt-1">Enhance your account security with 2FA</p>
            <span className="inline-block mt-3 px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded font-medium">Enabled</span>
          </button>

          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
            <p className="font-medium text-foreground">Change Password</p>
            <p className="text-sm text-muted-foreground mt-1">Update your login password</p>
          </button>

          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
            <p className="font-medium text-foreground">Active Sessions</p>
            <p className="text-sm text-muted-foreground mt-1">Manage your active login sessions</p>
            <span className="inline-block mt-3 px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded font-medium">2 active</span>
          </button>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="rounded-lg bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Database size={24} className="text-orange-400" />
            <h2 className="text-lg font-semibold text-foreground">Data & Privacy</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-medium text-foreground mb-3">Data Management</p>
            <div className="space-y-2">
              <button className="block text-sm text-primary hover:underline">Download my data</button>
              <button className="block text-sm text-primary hover:underline">View privacy policy</button>
              <button className="block text-sm text-primary hover:underline">View terms of service</button>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="font-medium text-foreground mb-3 text-destructive">Danger Zone</p>
            <button className="text-sm px-4 py-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition-colors font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3 pt-4">
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Save Changes
        </button>
        <button className="px-6 py-2.5 bg-background border border-border text-foreground rounded-lg hover:bg-card transition-colors font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}
