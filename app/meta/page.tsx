'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Share2, 
  Target, 
  TrendingUp,
  Facebook,
  Linkedin,
  CheckCircle2,
  PlayCircle,
  Eye,
  MousePointerClick,
  DollarSign,
  Calendar,
  Zap,
  Settings,
  BarChart3,
  MessageSquare,
  ThumbsUp,
  Video,
  Image as ImageIcon,
  Edit,
  Pause,
  Play,
  X,
  ChevronRight,
  AlertCircle,
  Download,
  Filter,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import campaignsData from '@/data/campaigns.json'
import { useRouter } from 'next/navigation'

interface Campaign {
  id: string
  name: string
  description: string
  goal: number
  raised: number
  status: string
}

interface AdCampaign {
  id: string
  campaignName: string
  platforms: string[]
  status: 'active' | 'paused' | 'draft'
  budget: number
  spent: number
  reach: number
  clicks: number
  donations: number
  donationAmount: number
  startDate: string
  endDate: string
}

export default function SocialPlatformPage() {
  const [currentView, setCurrentView] = useState<'overview' | 'launch' | 'performance'>('overview')
  const [showLaunchModal, setShowLaunchModal] = useState(false)
  const [launchStep, setLaunchStep] = useState(1)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
    tiktok: false,
    linkedin: false
  })
  

  const router = useRouter()
  const campaigns: Campaign[] = campaignsData as Campaign[]
  const activeCampaigns = campaigns.filter(c => c.status === 'Active')

  // Platform connection status
  const platforms = [
    {
      id: 'meta',
      name: 'Meta Business',
      description: 'Facebook & Instagram',
      icon: Facebook,
      color: '#1877F2',
      connected: true,
      followers: '12.5K',
      accountName: 'DonorSense Nepal'
    },
    {
      id: 'tiktok',
      name: 'TikTok Business',
      description: 'Short-form videos',
      icon: PlayCircle,
      color: '#000000',
      connected: false,
      followers: '0',
      accountName: null
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Professional network',
      icon: Linkedin,
      color: '#0A66C2',
      connected: false,
      followers: '0',
      accountName: null
    }
  ]

  // Mock ad campaigns data
  const adCampaigns: AdCampaign[] = [
    {
      id: 'ad-1',
      campaignName: 'Clean Water Initiative 2024',
      platforms: ['facebook', 'instagram'],
      status: 'active',
      budget: 50000,
      spent: 35420,
      reach: 45230,
      clicks: 1234,
      donations: 23,
      donationAmount: 78900,
      startDate: '2024-11-15',
      endDate: '2024-12-15'
    },
    {
      id: 'ad-2',
      campaignName: 'Education for All',
      platforms: ['facebook'],
      status: 'active',
      budget: 30000,
      spent: 22100,
      reach: 28450,
      clicks: 856,
      donations: 15,
      donationAmount: 45600,
      startDate: '2024-11-20',
      endDate: '2024-12-20'
    },
    {
      id: 'ad-3',
      campaignName: 'Emergency Relief Fund',
      platforms: ['facebook', 'instagram'],
      status: 'paused',
      budget: 40000,
      spent: 18500,
      reach: 35600,
      clicks: 1045,
      donations: 31,
      donationAmount: 92400,
      startDate: '2024-11-01',
      endDate: '2024-11-30'
    }
  ]

  const totalMetrics = {
    spent: adCampaigns.reduce((sum, ad) => sum + ad.spent, 0),
    reach: adCampaigns.reduce((sum, ad) => sum + ad.reach, 0),
    clicks: adCampaigns.reduce((sum, ad) => sum + ad.clicks, 0),
    donations: adCampaigns.reduce((sum, ad) => sum + ad.donations, 0),
    donationAmount: adCampaigns.reduce((sum, ad) => sum + ad.donationAmount, 0)
  }

  const roi = totalMetrics.spent > 0 ? (totalMetrics.donationAmount / totalMetrics.spent).toFixed(2) : '0.00'

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4" />
      case 'instagram':
        return <ImageIcon className="w-4 h-4" />
      case 'tiktok':
        return <PlayCircle className="w-4 h-4" />
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const handleLaunchAd = () => {
    // Reset and show modal
    setLaunchStep(1)
    setSelectedCampaign(null)
    setShowLaunchModal(true)
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Social Platforms</h1>
            <p className="text-[#6B6B6B]">Manage your campaigns across Facebook, Instagram, TikTok & LinkedIn</p>
          </div>
          <Button 
            onClick={handleLaunchAd}
            className="bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] hover:from-[#5A4ABD] hover:to-[#8B77EF] shadow-lg"
          >
            <Zap className="w-4 h-4" />
            Launch New Ad
          </Button>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setCurrentView('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'overview'
                ? 'bg-white text-[#6A5ACD] shadow-sm'
                : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentView('performance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === 'performance'
                ? 'bg-white text-[#6A5ACD] shadow-sm'
                : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      {currentView === 'overview' && (
        <>
          {/* Platform Connection Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Connected Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((platform, index) => {
                const Icon = platform.icon
                return (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${platform.connected ? 'border-[#4ADE80]' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${platform.color}15` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: platform.color }} />
                          </div>
                          {platform.connected ? (
                            <div className="flex items-center gap-1 px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full text-xs font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Connected
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-[#6B6B6B] rounded-full text-xs font-medium">
                              <AlertCircle className="w-3 h-3" />
                              Not Connected
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{platform.name}</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">{platform.description}</p>

                        {platform.connected ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6B6B6B]">Account</span>
                              <span className="font-medium text-[#1A1A1A]">{platform.accountName}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6B6B6B]">Followers</span>
                              <span className="font-medium text-[#1A1A1A]">{platform.followers}</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full" onClick={() => router.push(`/meta/settings`)}>
                              <Settings className="w-4 h-4" />
                              Manage
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            className="w-full"
                            style={{ backgroundColor: platform.color }}
                          >
                            <Share2 className="w-4 h-4" />
                            Connect {platform.name}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-l-4 border-l-[#6A5ACD]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <DollarSign className="w-6 h-6 text-[#6A5ACD]" />
                      <span className="text-xs text-[#6B6B6B] font-medium">This Month</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">
                      ${(totalMetrics.spent / 1000).toFixed(1)}K
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">Total Spent</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-[#1976D2]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <Eye className="w-6 h-6 text-[#1976D2]" />
                      <span className="text-xs text-[#4ADE80] font-medium">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">
                      {(totalMetrics.reach / 1000).toFixed(1)}K
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">Total Reach</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-l-4 border-l-[#FFA500]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <MousePointerClick className="w-6 h-6 text-[#FFA500]" />
                      <span className="text-xs text-[#4ADE80] font-medium">+8%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">
                      {totalMetrics.clicks.toLocaleString()}
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">Total Clicks</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-l-4 border-l-[#4ADE80]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <Target className="w-6 h-6 text-[#4ADE80]" />
                      <span className="text-xs text-[#4ADE80] font-medium">+15%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">
                      {totalMetrics.donations}
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">Donations</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-l-4 border-l-[#9B87FF]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <TrendingUp className="w-6 h-6 text-[#9B87FF]" />
                      <span className="text-xs text-[#4ADE80] font-medium">Good</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">
                      {roi}x
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">ROI</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Active Ad Campaigns */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Active Ad Campaigns</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {adCampaigns.map((ad, index) => {
                const progress = (ad.spent / ad.budget) * 100
                const ctr = ((ad.clicks / ad.reach) * 100).toFixed(2)
                const cpc = (ad.spent / ad.clicks).toFixed(2)
                
                return (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow border-2 hover:border-[#6A5ACD]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-[#1A1A1A]">{ad.campaignName}</h3>
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                ad.status === 'active' 
                                  ? 'bg-[#4ADE80]/10 text-[#4ADE80]' 
                                  : 'bg-gray-100 text-[#6B6B6B]'
                              }`}>
                                {ad.status === 'active' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                                {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                              </span>
                              <div className="flex items-center gap-2">
                                {ad.platforms.map(platform => (
                                  <span key={platform} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                                    {getPlatformIcon(platform)}
                                    <span className="text-xs capitalize">{platform}</span>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Budget Progress */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-[#6B6B6B]">Budget Spent</span>
                                <span className="font-medium text-[#1A1A1A]">
                                  ${ad.spent.toLocaleString()} / ${ad.budget.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                  className="h-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] rounded-full"
                                  style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={ad.status === 'active' ? 'text-[#FFA500]' : 'text-[#4ADE80]'}
                            >
                              {ad.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">Reach</p>
                            <p className="text-lg font-bold text-[#1A1A1A]">
                              {(ad.reach / 1000).toFixed(1)}K
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">Clicks</p>
                            <p className="text-lg font-bold text-[#1A1A1A]">{ad.clicks}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">CTR</p>
                            <p className="text-lg font-bold text-[#1A1A1A]">{ctr}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">CPC</p>
                            <p className="text-lg font-bold text-[#1A1A1A]">${cpc}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">Donations</p>
                            <p className="text-lg font-bold text-[#4ADE80]">{ad.donations}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B6B6B] mb-1">Revenue</p>
                            <p className="text-lg font-bold text-[#4ADE80]">
                              ${(ad.donationAmount / 1000).toFixed(1)}K
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {currentView === 'performance' && (
        <div className="space-y-6">
          {/* Platform Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Facebook */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center">
                      <Facebook className="w-5 h-5 text-[#1877F2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Facebook</h3>
                      <p className="text-xs text-[#6B6B6B]">2 active campaigns</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Reach</span>
                      <span className="font-medium">62.4K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Clicks</span>
                      <span className="font-medium">1,856</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Donations</span>
                      <span className="font-medium text-[#4ADE80]">38</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">ROI</span>
                      <span className="font-medium text-[#4ADE80]">2.1x</span>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">Instagram</h3>
                      <p className="text-xs text-[#6B6B6B]">2 active campaigns</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Reach</span>
                      <span className="font-medium">47.2K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Clicks</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Donations</span>
                      <span className="font-medium text-[#4ADE80]">31</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">ROI</span>
                      <span className="font-medium text-[#4ADE80]">1.9x</span>
                    </div>
                  </div>
                </div>

                {/* TikTok (Not Active) */}
                <div className="space-y-4 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">TikTok</h3>
                      <p className="text-xs text-[#6B6B6B]">Not connected</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B6B6B]">Connect TikTok to see performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Top Engaging Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { post: 'Clean Water Initiative Video', likes: 1234, comments: 89, shares: 156, platform: 'facebook' },
                  { post: 'Emergency Relief Appeal', likes: 956, comments: 67, shares: 234, platform: 'instagram' },
                  { post: 'Education Campaign Story', likes: 845, comments: 45, shares: 98, platform: 'facebook' }
                ].map((post, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#1A1A1A]">{post.post}</h4>
                        <p className="text-xs text-[#6B6B6B] capitalize">{post.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-[#6B6B6B]" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-[#6B6B6B]" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4 text-[#6B6B6B]" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Launch Ad Modal */}
      <AnimatePresence>
        {showLaunchModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowLaunchModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">Launch New Ad Campaign</h2>
                    <p className="text-white/90">Step {launchStep} of 5</p>
                  </div>
                  <button
                    onClick={() => setShowLaunchModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${(launchStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                  {launchStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Select Campaign</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">Choose which campaign to promote</p>
                      </div>

                      <div className="space-y-3">
                        {activeCampaigns.map((campaign) => {
                          const progress = (campaign.raised / campaign.goal) * 100
                          return (
                            <Card 
                              key={campaign.id}
                              className={`cursor-pointer transition-all border-2 ${
                                selectedCampaign?.id === campaign.id 
                                  ? 'border-[#6A5ACD] shadow-lg' 
                                  : 'border-gray-200 hover:border-[#6A5ACD]/50'
                              }`}
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-bold text-[#1A1A1A] mb-1">{campaign.name}</h4>
                                    <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">{campaign.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
                                      <span>${campaign.raised.toLocaleString()} raised</span>
                                      <span>{progress.toFixed(0)}% complete</span>
                                    </div>
                                  </div>
                                  {selectedCampaign?.id === campaign.id && (
                                    <CheckCircle2 className="w-6 h-6 text-[#6A5ACD]" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {launchStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Choose Platforms</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">Select where you want to run your ads</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', connected: true },
                          { id: 'instagram', name: 'Instagram', icon: ImageIcon, color: '#E4405F', connected: true },
                          { id: 'tiktok', name: 'TikTok', icon: PlayCircle, color: '#000000', connected: false },
                          { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', connected: false }
                        ].map((platform) => {
                          const Icon = platform.icon
                          const isSelected = selectedPlatforms[platform.id as keyof typeof selectedPlatforms]
                          
                          return (
                            <Card
                              key={platform.id}
                              className={`cursor-pointer transition-all border-2 ${
                                !platform.connected ? 'opacity-50 cursor-not-allowed' :
                                isSelected ? 'border-[#6A5ACD] shadow-lg' : 'border-gray-200 hover:border-[#6A5ACD]/50'
                              }`}
                              onClick={() => {
                                if (platform.connected) {
                                  setSelectedPlatforms(prev => ({
                                    ...prev,
                                    [platform.id]: !prev[platform.id as keyof typeof selectedPlatforms]
                                  }))
                                }
                              }}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${platform.color}15` }}
                                  >
                                    <Icon className="w-6 h-6" style={{ color: platform.color }} />
                                  </div>
                                  {platform.connected && isSelected && (
                                    <CheckCircle2 className="w-6 h-6 text-[#6A5ACD]" />
                                  )}
                                </div>
                                <h4 className="font-bold text-[#1A1A1A] mb-1">{platform.name}</h4>
                                <p className="text-sm text-[#6B6B6B]">
                                  {platform.connected ? 'Connected & Ready' : 'Not Connected'}
                                </p>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {launchStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Ad Content</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">Create your ad copy and creative</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Headline</label>
                          <input
                            type="text"
                            placeholder="E.g., Help Us Bring Clean Water to 1000 Families"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Primary Text</label>
                          <textarea
                            placeholder="Share your campaign story and why people should donate..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                            rows={4}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Description (Optional)</label>
                          <input
                            type="text"
                            placeholder="Additional context or information"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Call-to-Action</label>
                          <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]">
                            <option>Donate Now</option>
                            <option>Learn More</option>
                            <option>Sign Up</option>
                            <option>Get Involved</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Creative</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Video className="w-12 h-12 text-[#6B6B6B] mx-auto mb-3" />
                            <p className="text-sm text-[#6B6B6B] mb-2">Campaign video will be used</p>
                            <Button variant="outline" size="sm">
                              <ImageIcon className="w-4 h-4" />
                              Change Creative
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {launchStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Targeting & Audience</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">Define who will see your ads</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Location</label>
                          <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] mb-2">
                            <option>Nepal</option>
                            <option>India</option>
                            <option>United States</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Add specific cities (e.g., Kathmandu, Pokhara)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Age Range</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="number"
                              placeholder="18"
                              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                            />
                            <span className="text-[#6B6B6B]">to</span>
                            <input
                              type="number"
                              placeholder="65"
                              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Gender</label>
                          <div className="flex gap-2">
                            {['All', 'Men', 'Women'].map(gender => (
                              <button
                                key={gender}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#6A5ACD] transition-colors"
                              >
                                {gender}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Interests</label>
                          <input
                            type="text"
                            placeholder="E.g., charity, volunteering, social causes, education"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                          />
                          <p className="text-xs text-[#6B6B6B] mt-2">Separate interests with commas</p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-[#1976D2]">
                            <strong>Estimated Reach:</strong> 15,000 - 45,000 people
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {launchStep === 5 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Budget & Schedule</h3>
                        <p className="text-sm text-[#6B6B6B] mb-4">Set your budget and campaign duration</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Daily Budget</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">$</span>
                            <input
                              type="number"
                              placeholder="50"
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                            />
                          </div>
                          <p className="text-xs text-[#6B6B6B] mt-2">Minimum: $5 per day</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Start Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">End Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                            />
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-[#6A5ACD]/10 to-[#9B87FF]/10 rounded-lg border border-[#6A5ACD]/20">
                          <h4 className="font-bold text-[#1A1A1A] mb-3">Campaign Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Daily Budget:</span>
                              <span className="font-medium">$100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Duration:</span>
                              <span className="font-medium">30 days</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-[#6A5ACD]/20">
                              <span className="text-[#6B6B6B]">Total Budget:</span>
                              <span className="font-bold text-lg">$3,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Est. Reach:</span>
                              <span className="font-medium">25,000 - 75,000 people</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-amber-900 font-medium mb-1">Review Platform Policies</p>
                            <p className="text-xs text-amber-800">
                              Make sure your ad complies with platform advertising policies before launching.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <Button 
                  variant="outline"
                  onClick={() => launchStep > 1 ? setLaunchStep(launchStep - 1) : setShowLaunchModal(false)}
                >
                  {launchStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                
                <div className="flex gap-2">
                  {launchStep < 5 ? (
                    <Button 
                      onClick={() => setLaunchStep(launchStep + 1)}
                      className="bg-[#6A5ACD] hover:bg-[#5A4ABD]"
                      disabled={launchStep === 1 && !selectedCampaign}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        setShowLaunchModal(false)
                        // Show success message
                      }}
                      className="bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] hover:from-[#5A4ABD] hover:to-[#8B77EF]"
                    >
                      <Zap className="w-4 h-4" />
                      Launch Campaign
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
