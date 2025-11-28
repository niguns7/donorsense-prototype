'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Facebook,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Settings,
  Key,
  Eye,
  Link as LinkIcon,
  Copy,
  RefreshCw,
  Shield,
  Bell,
  Zap,
  X,
  ChevronRight,
  Info,
  ExternalLink,
  Code,
  Activity,
  Users,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PixelEvent {
  name: string
  count: number
  lastFired: string
  status: 'active' | 'inactive'
}

export default function MetaBusinessSettingsPage() {
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectionStep, setConnectionStep] = useState(1)
  const [pixelId, setPixelId] = useState('1234567890123456')
  const [accessToken] = useState('EAABzbCS7D...')
  const [isConnected, setIsConnected] = useState(true)

  const pixelEvents: PixelEvent[] = [
    { name: 'PageView', count: 15234, lastFired: '2 minutes ago', status: 'active' },
    { name: 'ViewContent', count: 3421, lastFired: '5 minutes ago', status: 'active' },
    { name: 'InitiateCheckout', count: 892, lastFired: '12 minutes ago', status: 'active' },
    { name: 'AddPaymentInfo', count: 456, lastFired: '15 minutes ago', status: 'active' },
    { name: 'Purchase', count: 234, lastFired: '8 minutes ago', status: 'active' },
    { name: 'Lead', count: 567, lastFired: '3 minutes ago', status: 'active' },
    { name: 'Donate', count: 189, lastFired: '6 minutes ago', status: 'active' },
  ]

  const accounts = [
    {
      id: 'fb-1',
      platform: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      accountName: 'DonorSense Nepal',
      accountId: '123456789012345',
      pageId: '987654321098765',
      followers: '12.5K',
      status: 'connected',
      permissions: ['ads_management', 'pages_read_engagement', 'pages_manage_posts'],
      connectedDate: '2024-10-15',
      lastSync: '2 hours ago'
    },
    {
      id: 'ig-1',
      platform: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      accountName: '@donorsense_np',
      accountId: '456789012345678',
      followers: '8.2K',
      status: 'connected',
      permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_insights'],
      connectedDate: '2024-10-15',
      lastSync: '2 hours ago'
    }
  ]

  const apiUsage = {
    callsToday: 4523,
    callsLimit: 20000,
    callsRemaining: 15477,
    resetTime: '16 hours'
  }

  const webhookEvents = [
    { event: 'lead', description: 'Lead form submissions', status: 'active', lastReceived: '5 minutes ago' },
    { event: 'page_post', description: 'New page posts', status: 'active', lastReceived: '2 hours ago' },
    { event: 'ads_insights', description: 'Ad performance updates', status: 'active', lastReceived: '30 minutes ago' },
    { event: 'conversions', description: 'Conversion events', status: 'active', lastReceived: '15 minutes ago' }
  ]

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Meta Business Settings</h1>
            <p className="text-[#6B6B6B]">Manage your Facebook & Instagram integration and tracking</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </Button>
            {isConnected ? (
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={() => setShowConnectModal(true)}
                className="bg-[#1877F2] hover:bg-[#1567D2]"
              >
                <Facebook className="w-4 h-4" />
                Connect Meta
              </Button>
            )}
          </div>
        </div>

        {/* Status Banner */}
        {isConnected ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">Meta Business Integration Active</p>
              <p className="text-xs text-green-700 mt-1">
                Connected accounts are syncing properly. Last sync: 2 hours ago
              </p>
            </div>
            <Button size="sm" variant="ghost" className="text-green-700">
              View Details
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">Meta Business Not Connected</p>
              <p className="text-xs text-amber-700 mt-1">
                Connect your Meta Business account to start running ads and tracking conversions
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={() => setShowConnectModal(true)}
              className="bg-[#1877F2] hover:bg-[#1567D2]"
            >
              Connect Now
            </Button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-[#1877F2]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Activity className="w-5 h-5 text-[#1877F2]" />
              <span className="text-xs text-[#4ADE80] font-medium">Healthy</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Active</h3>
            <p className="text-xs text-[#6B6B6B]">Connection Status</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#4ADE80]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Eye className="w-5 h-5 text-[#4ADE80]" />
              <span className="text-xs text-[#6B6B6B]">Today</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">{pixelEvents.reduce((sum, e) => sum + e.count, 0).toLocaleString()}</h3>
            <p className="text-xs text-[#6B6B6B]">Pixel Events</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FFA500]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Zap className="w-5 h-5 text-[#FFA500]" />
              <span className="text-xs text-[#4ADE80]">77%</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">
              {apiUsage.callsToday.toLocaleString()}
            </h3>
            <p className="text-xs text-[#6B6B6B]">API Calls Today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#9B87FF]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <Users className="w-5 h-5 text-[#9B87FF]" />
              <span className="text-xs text-[#6B6B6B]">2 Active</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">{accounts.length}</h3>
            <p className="text-xs text-[#6B6B6B]">Connected Accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Connected Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account, index) => {
            const Icon = account.icon
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-2 border-green-200 bg-green-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${account.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: account.color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1A1A1A]">{account.platform}</h3>
                          <p className="text-sm text-[#6B6B6B]">{account.accountName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B6B6B]">Account ID</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{account.accountId}</span>
                          <button 
                            onClick={() => handleCopyToClipboard(account.accountId)}
                            className="text-[#6A5ACD] hover:text-[#5A4ABD]"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {account.pageId && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B6B6B]">Page ID</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs">{account.pageId}</span>
                            <button 
                              onClick={() => handleCopyToClipboard(account.pageId)}
                              className="text-[#6A5ACD] hover:text-[#5A4ABD]"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B6B6B]">Followers</span>
                        <span className="font-medium">{account.followers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B6B6B]">Connected Since</span>
                        <span className="font-medium">{new Date(account.connectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B6B6B]">Last Sync</span>
                        <span className="font-medium text-[#4ADE80]">{account.lastSync}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-[#6B6B6B] mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {account.permissions.map((permission) => (
                          <span 
                            key={permission}
                            className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-[#1A1A1A]"
                          >
                            {permission.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Meta Pixel Configuration */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Meta Pixel Configuration</h2>
          <Button variant="outline">
            <Settings className="w-4 h-4" />
            Configure Pixel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pixel Setup */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#6A5ACD]" />
                Pixel Setup
              </CardTitle>
              <CardDescription>Track conversions and optimize ad performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Pixel ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] font-mono text-sm"
                  />
                  <Button variant="outline" onClick={() => handleCopyToClipboard(pixelId)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-[#6B6B6B] mt-2">
                  Find your Pixel ID in Meta Events Manager
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Installation Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 border-2 border-[#6A5ACD] bg-[#6A5ACD]/5 rounded-lg text-left">
                    <Code className="w-5 h-5 text-[#6A5ACD] mb-2" />
                    <p className="font-medium text-sm text-[#1A1A1A]">Auto-Installed</p>
                    <p className="text-xs text-[#6B6B6B]">Via integration</p>
                  </button>
                  <button className="p-4 border-2 border-gray-200 rounded-lg text-left hover:border-[#6A5ACD]/30">
                    <LinkIcon className="w-5 h-5 text-[#6B6B6B] mb-2" />
                    <p className="font-medium text-sm text-[#1A1A1A]">Manual Code</p>
                    <p className="text-xs text-[#6B6B6B]">Copy & paste</p>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Pixel Status: Active</p>
                    <p className="text-xs text-blue-700">
                      Your pixel is receiving events properly. Last event: 2 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pixel Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pixel Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#10B981] mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Excellent</h3>
                <p className="text-sm text-[#6B6B6B]">Pixel is working perfectly</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6B6B]">Events Today</span>
                  <span className="font-bold text-[#4ADE80]">
                    {pixelEvents.reduce((sum, e) => sum + e.count, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6B6B]">Firing Rate</span>
                  <span className="font-bold text-[#4ADE80]">99.8%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B6B6B]">Errors</span>
                  <span className="font-bold text-[#1A1A1A]">0</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4" />
                Test Pixel
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pixel Events */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tracked Events</CardTitle>
            <CardDescription>Monitor all pixel events and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pixelEvents.map((event) => (
                <div 
                  key={event.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1A1A1A]">{event.name}</h4>
                      <p className="text-xs text-[#6B6B6B]">Last fired: {event.lastFired}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1A1A1A]">{event.count.toLocaleString()}</p>
                      <p className="text-xs text-[#6B6B6B]">Today</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${event.status === 'active' ? 'bg-[#4ADE80]' : 'bg-gray-400'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API & Webhooks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* API Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FFA500]" />
              API Usage
            </CardTitle>
            <CardDescription>Monitor your API call limits and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B6B]">Daily API Calls</span>
                <span className="text-sm font-medium">
                  {apiUsage.callsToday.toLocaleString()} / {apiUsage.callsLimit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] rounded-full"
                  style={{ width: `${(apiUsage.callsToday / apiUsage.callsLimit) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#6B6B6B] mt-2">
                {apiUsage.callsRemaining.toLocaleString()} calls remaining • Resets in {apiUsage.resetTime}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-[#6B6B6B] mb-1">Campaign API</p>
                <p className="text-lg font-bold text-[#1A1A1A]">2,345</p>
              </div>
              <div>
                <p className="text-xs text-[#6B6B6B] mb-1">Insights API</p>
                <p className="text-lg font-bold text-[#1A1A1A]">1,234</p>
              </div>
              <div>
                <p className="text-xs text-[#6B6B6B] mb-1">Conversions</p>
                <p className="text-lg font-bold text-[#1A1A1A]">944</p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>Tip:</strong> Batch requests to optimize API usage and avoid rate limits
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#9B87FF]" />
              Webhooks
            </CardTitle>
            <CardDescription>Real-time event notifications from Meta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {webhookEvents.map((webhook) => (
                <div 
                  key={webhook.event}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm text-[#1A1A1A]">{webhook.event}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        webhook.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {webhook.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mb-1">{webhook.description}</p>
                    <p className="text-xs text-[#4ADE80]">Last received: {webhook.lastReceived}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              <Settings className="w-4 h-4" />
              Configure Webhooks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security & Access */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6A5ACD]" />
            Security & Access
          </CardTitle>
          <CardDescription>Manage API credentials and access tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Access Token</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={accessToken}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 font-mono text-sm"
              />
              <Button variant="outline">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-[#6B6B6B] mt-2">
              Keep your access token secure. Never share it publicly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-[#6B6B6B] mb-1">Token Expires</p>
              <p className="font-medium text-[#1A1A1A]">Never (Long-lived token)</p>
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B] mb-1">Last Refreshed</p>
              <p className="font-medium text-[#1A1A1A]">November 15, 2024</p>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Security Alert</p>
                <p className="text-xs text-red-700 mb-3">
                  If you believe your token has been compromised, regenerate it immediately.
                </p>
                <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                  Regenerate Token
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connect Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowConnectModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#1877F2] to-[#1567D2]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">Connect Meta Business</h2>
                    <p className="text-white/90 text-sm">Step {connectionStep} of 3</p>
                  </div>
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${(connectionStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {connectionStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Select Integration Type</h3>
                    
                    <Card className="cursor-pointer border-2 hover:border-[#1877F2] transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-6 h-6 text-[#1877F2]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#1A1A1A] mb-2">OAuth Integration (Recommended)</h4>
                            <p className="text-sm text-[#6B6B6B] mb-3">
                              Securely connect with one click using Facebook Login. Automatically manages tokens and permissions.
                            </p>
                            <ul className="space-y-1 text-xs text-[#6B6B6B]">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                                Automatic token refresh
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                                Secure & encrypted
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-[#4ADE80]" />
                                Easy setup
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer border-2 hover:border-[#6A5ACD] transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#6A5ACD]/10 flex items-center justify-center flex-shrink-0">
                            <Key className="w-6 h-6 text-[#6A5ACD]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#1A1A1A] mb-2">Manual API Integration</h4>
                            <p className="text-sm text-[#6B6B6B] mb-3">
                              Use your own App ID and Access Token from Meta Developer Portal. Requires manual token management.
                            </p>
                            <ul className="space-y-1 text-xs text-[#6B6B6B]">
                              <li className="flex items-center gap-2">
                                <AlertCircle className="w-3 h-3 text-[#FFA500]" />
                                Manual token refresh needed
                              </li>
                              <li className="flex items-center gap-2">
                                <AlertCircle className="w-3 h-3 text-[#FFA500]" />
                                Advanced setup
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {connectionStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 mx-auto mb-4 flex items-center justify-center">
                        <Facebook className="w-8 h-8 text-[#1877F2]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Authorize DonorSense</h3>
                      <p className="text-sm text-[#6B6B6B]">
                        You&apos;ll be redirected to Facebook to authorize access
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-2">Required Permissions:</p>
                      <ul className="space-y-1 text-xs text-blue-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Manage ad campaigns
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Read page insights
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Publish posts
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          Access leads
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full bg-[#1877F2] hover:bg-[#1567D2] py-6">
                      <Facebook className="w-5 h-5" />
                      Continue with Facebook
                    </Button>
                  </div>
                )}

                {connectionStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[#4ADE80]/10 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-[#4ADE80]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Successfully Connected!</h3>
                      <p className="text-sm text-[#6B6B6B]">
                        Your Meta Business account has been connected
                      </p>
                    </div>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#6B6B6B]">Business Name:</span>
                            <span className="font-medium">DonorSense Nepal</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6B6B6B]">Accounts Connected:</span>
                            <span className="font-medium">2 (Facebook, Instagram)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6B6B6B]">Pixel Detected:</span>
                            <span className="font-medium text-[#4ADE80]">Yes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-2">Next Steps:</p>
                      <ul className="space-y-1 text-xs text-blue-700">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          Configure your Meta Pixel
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          Launch your first ad campaign
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          Monitor performance metrics
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (connectionStep === 1) {
                      setShowConnectModal(false)
                    } else {
                      setConnectionStep(connectionStep - 1)
                    }
                  }}
                >
                  {connectionStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                
                {connectionStep < 3 ? (
                  <Button 
                    onClick={() => setConnectionStep(connectionStep + 1)}
                    className="bg-[#1877F2] hover:bg-[#1567D2]"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setShowConnectModal(false)
                      setIsConnected(true)
                    }}
                    className="bg-[#4ADE80] hover:bg-[#10B981]"
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
