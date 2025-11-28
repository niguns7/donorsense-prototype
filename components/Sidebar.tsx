'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Megaphone,
  Video,
  Share2,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  primaryColor?: string
}

export function Sidebar({ primaryColor = '#6A5ACD' }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: DollarSign, label: 'Donations', href: '/donations' },
    { icon: Users, label: 'Donors', href: '/donors' },
    { icon: Megaphone, label: 'Campaigns', href: '/campaigns' },
    { icon: Video, label: 'Video', href: '/video' },
    { icon: Share2, label: 'Meta Ads', href: '/meta' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div
      className="w-64 h-screen border-r border-gray-100 bg-white flex flex-col sticky top-0"
      style={{
        borderRight: `1px solid ${primaryColor}10`
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
            }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-[#1A1A1A]">
            DonorSense<span style={{ color: primaryColor }}>.AI</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-[#6B6B6B] hover:bg-gray-50'
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
                } : {}}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="p-3 bg-gray-50 rounded-lg mb-2">
          <p className="text-sm font-medium text-[#1A1A1A] truncate">{user?.name || 'Organization'}</p>
          <p className="text-xs text-[#6B6B6B] truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-[#6B6B6B] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
