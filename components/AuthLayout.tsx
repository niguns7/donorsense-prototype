'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

import { ThemeProvider, useTheme } from '@/lib/theme-context'
import { Bell, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'

function AuthenticatedContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthStore()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we're on an auth page
    const isAuthPage = pathname?.startsWith('/auth') || pathname === '/'
    
    if (!isAuthenticated && !isAuthPage) {
      router.push('/auth/login')
      return
    }

    setLoading(false)
  }, [isAuthenticated, router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7FB]">
        <div 
          className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full" 
          style={{ borderColor: `${theme.primary}40`, borderTopColor: 'transparent' }}
        />
      </div>
    )
  }

  // Show auth pages without sidebar
  const isAuthPage = pathname?.startsWith('/auth') || pathname === '/' || pathname?.startsWith('/onboarding')
  
  if (!isAuthenticated || isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FB]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                {pathname === '/dashboard' && 'Dashboard'}
                {pathname === '/donations' && 'Donation Management'}
                {pathname === '/donors' && 'Donor Management'}
                {pathname === '/campaigns' && 'Campaigns'}
                {pathname === '/video' && 'AI Video Generation'}
                {pathname === '/meta' && 'Meta Ads'}
                {pathname === '/settings' && 'Settings'}
              </h2>
              <p className="text-sm text-[#6B6B6B]">{user?.name}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* AI Campaign Generator */}
              <Button 
                className="relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Campaign with AI
              </Button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-[#6B6B6B]" />
                <span 
                  className="absolute top-1 right-1 w-2 h-2 rounded-full" 
                  style={{ backgroundColor: theme.secondary }}
                />
              </button>

              {/* Profile */}
              <button className="flex items-center gap-3 p-2 pr-4 rounded-lg hover:bg-gray-100 transition-colors">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                >
                  {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-[#1A1A1A]">{user?.name || 'User'}</p>
                  <p className="text-xs text-[#6B6B6B]">Admin</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthenticatedContent>{children}</AuthenticatedContent>
    </ThemeProvider>
  )
}
