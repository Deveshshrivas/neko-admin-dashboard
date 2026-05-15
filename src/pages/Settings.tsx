import { useState, useEffect } from 'react'
import { Save, RotateCcw } from 'lucide-react'

export function SettingsPage() {
  const [settings, setSettings] = useState({
    supabaseUrl: '',
    supabaseKey: '',
    n8nUrl: '',
    theme: 'light',
    timezone: 'Asia/Kolkata',
    refreshInterval: '30000',
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('dashboard-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('dashboard-settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setSettings({
      supabaseUrl: '',
      supabaseKey: '',
      n8nUrl: '',
      theme: 'light',
      timezone: 'Asia/Kolkata',
      refreshInterval: '30000',
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">Settings saved successfully!</p>
        </div>
      )}

      {/* Supabase Settings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Supabase Connection</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Supabase URL</label>
            <input
              type="text"
              value={settings.supabaseUrl}
              onChange={(e) => setSettings({ ...settings, supabaseUrl: e.target.value })}
              placeholder="https://xxxxx.supabase.co"
              className="input"
            />
          </div>
          <div>
            <label className="label">Supabase API Key</label>
            <input
              type="password"
              value={settings.supabaseKey}
              onChange={(e) => setSettings({ ...settings, supabaseKey: e.target.value })}
              placeholder="Your API Key"
              className="input"
            />
          </div>
        </div>
      </div>

      {/* n8n Settings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">n8n Configuration</h2>
        <div>
          <label className="label">n8n URL</label>
          <input
            type="text"
            value={settings.n8nUrl}
            onChange={(e) => setSettings({ ...settings, n8nUrl: e.target.value })}
            placeholder="https://n8n.example.com"
            className="input"
          />
        </div>
      </div>

      {/* App Settings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">App Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className="input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="label">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="input"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (ICT)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
            </select>
          </div>
          <div>
            <label className="label">Refresh Interval (ms)</label>
            <input
              type="number"
              value={settings.refreshInterval}
              onChange={(e) => setSettings({ ...settings, refreshInterval: e.target.value })}
              min="5000"
              step="5000"
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">How often to refresh data (in milliseconds)</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={handleSave} className="btn btn-primary flex items-center gap-2">
          <Save size={18} />
          Save Settings
        </button>
        <button onClick={handleReset} className="btn btn-secondary flex items-center gap-2">
          <RotateCcw size={18} />
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
