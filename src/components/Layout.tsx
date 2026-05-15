import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Menu,
  X,
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Mail,
  Users,
  AlertTriangle,
  Settings,
  MapPin,
} from 'lucide-react'
import { useBranches } from '../lib/db-hooks'
import { getCurrentBranch, setCurrentBranch } from '../lib/schema'
import { useBranchListener } from '../hooks/useBranchListener'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [branches, setBranches] = useState<any[]>([])
  const [selectedBranch, setSelectedBranch] = useState(getCurrentBranch())
  const branchIdFromListener = useBranchListener()

  useEffect(() => {
    setSelectedBranch(branchIdFromListener)
  }, [branchIdFromListener])

  useEffect(() => {
    async function fetchBranches() {
      try {
        const data = await useBranches()
        setBranches(data.data || [])
        if (data.data && data.data.length > 0 && !selectedBranch) {
          setCurrentBranch(data.data[0].id)
          setSelectedBranch(data.data[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch branches:', error)
      }
    }
    fetchBranches()
  }, [])

  const handleBranchChange = (branchId: string) => {
    setCurrentBranch(branchId)
    setSelectedBranch(branchId)
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: MessageCircle, label: 'Conversations', to: '/conversations' },
    { icon: Calendar, label: 'Bookings', to: '/bookings' },
    { icon: Mail, label: 'Messages', to: '/messages' },
    { icon: Users, label: 'Customers', to: '/customers' },
    { icon: AlertTriangle, label: 'Errors', to: '/errors' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Neko Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <p className={`text-xs text-gray-400 ${!sidebarOpen && 'hidden'}`}>v1.0</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Neko Salon</h2>
          <div className="flex items-center gap-6">
            {/* Branch Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" size={20} />
              <select
                value={selectedBranch}
                onChange={(e) => handleBranchChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="h-full p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
