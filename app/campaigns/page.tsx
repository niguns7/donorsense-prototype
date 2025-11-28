'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Target, 
  Calendar, 
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Eye,
  Edit,
  Share2,
  BarChart3,
  Facebook,
  Instagram,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Settings,
  Map,
  Radio,
  Megaphone,
  Activity,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import campaignsData from '@/data/campaigns.json'

interface Campaign {
  id: string
  name: string
  description: string
  goal: number
  raised: number
  donors: number
  startDate: string
  endDate: string
  status: string
  category: string
}

interface CampaignDetail extends Campaign {
  adBudget?: {
    total: number
    spent: number
    platform: 'meta' | 'google' | 'both'
  }
  location?: {
    city: string
    state: string
    country: string
    radius: number
    coordinates?: { lat: number; lng: number }
  }
  metaAds?: {
    campaignId: string
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    costPerClick: number
    status: 'active' | 'paused' | 'draft'
  }
  performance?: {
    dailyAverage: number
    trend: 'up' | 'down' | 'stable'
    topSource: string
  }
}

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null)
  const [showMetaAdsDrawer, setShowMetaAdsDrawer] = useState(false)
  
  const campaigns: Campaign[] = campaignsData as Campaign[]

  // Mock data generator - stable per campaign
  const getMetaStats = (campaignId: string) => {
    const seed = parseInt(campaignId.split('-')[1] || '1')
    return {
      impressions: 50000 + (seed * 10000),
      clicks: 1000 + (seed * 500),
      conversions: 100 + (seed * 50),
      ctr: (1 + (seed % 3)).toFixed(2),
      costPerClick: (0.5 + (seed % 2)).toFixed(2)
    }
  }

  // Enhanced campaign data with Meta Ads info
  const enhancedCampaigns: CampaignDetail[] = campaigns.map(c => {
    const metaStats = getMetaStats(c.id)
    return {
      ...c,
      adBudget: {
        total: Math.floor(c.goal * 0.15),
        spent: Math.floor(c.raised * 0.12),
        platform: 'meta' as const
      },
      location: {
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        radius: 50,
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      metaAds: {
        campaignId: `META-${c.id}`,
        impressions: metaStats.impressions,
        clicks: metaStats.clicks,
        conversions: metaStats.conversions,
        ctr: parseFloat(metaStats.ctr),
        costPerClick: parseFloat(metaStats.costPerClick),
        status: c.status === 'Active' ? 'active' : 'paused'
      },
      performance: {
        dailyAverage: Math.floor(c.raised / 30),
        trend: parseInt(c.id.split('-')[1] || '1') % 2 === 0 ? 'up' : 'down',
        topSource: 'Meta Ads'
      }
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#4ADE80]/10 text-[#4ADE80]'
      case 'Completed':
        return 'bg-gray-100 text-gray-600'
      case 'Scheduled':
        return 'bg-[#9B87FF]/10 text-[#9B87FF]'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <Radio className="w-4 h-4 text-[#4ADE80]" />
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-gray-600" />
      case 'Scheduled':
        return <Clock className="w-4 h-4 text-[#9B87FF]" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Campaigns</h1>
            <p className="text-[#6B6B6B]">Manage campaigns, budgets, and Meta Ads integration</p>
          </div>
          <Button className="bg-[#6A5ACD] hover:bg-[#5A4ABD]">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-[#6A5ACD]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <Target className="w-6 h-6 text-[#6A5ACD]" />
                <span className="text-xs text-[#4ADE80] font-medium">+15%</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {campaigns.filter(c => c.status === 'Active').length}
              </h3>
              <p className="text-xs text-[#6B6B6B]">Active Campaigns</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-[#4ADE80]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <DollarSign className="w-6 h-6 text-[#4ADE80]" />
                <span className="text-xs text-[#4ADE80] font-medium">$28.5K</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                ${campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
              </h3>
              <p className="text-xs text-[#6B6B6B]">Total Raised</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-[#1976D2]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <Facebook className="w-6 h-6 text-[#1976D2]" />
                <span className="text-xs text-[#4ADE80] font-medium">Live</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {enhancedCampaigns.filter(c => c.metaAds?.status === 'active').length}
              </h3>
              <p className="text-xs text-[#6B6B6B]">Meta Ads Running</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-[#FFA500]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <Megaphone className="w-6 h-6 text-[#FFA500]" />
                <span className="text-xs text-[#1976D2] font-medium">2.4%</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                {(enhancedCampaigns.reduce((sum, c) => sum + (c.metaAds?.ctr || 0), 0) / enhancedCampaigns.length).toFixed(1)}%
              </h3>
              <p className="text-xs text-[#6B6B6B]">Avg. Click Rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid gap-4">
        {enhancedCampaigns.map((campaign, index) => {
          const progress = (campaign.raised / campaign.goal) * 100
          const adSpendProgress = campaign.adBudget ? (campaign.adBudget.spent / campaign.adBudget.total) * 100 : 0
          
          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#6A5ACD]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1A1A1A]">{campaign.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B6B6B] mb-3">{campaign.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-[#6B6B6B]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Ends {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {campaign.donors} donors
                        </span>
                        {campaign.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {campaign.location.city}, {campaign.location.state}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#1A1A1A]">
                        ${campaign.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-[#6B6B6B] mb-2">
                        of ${campaign.goal.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => setSelectedCampaign(campaign)}>
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#6B6B6B]">Campaign Progress</span>
                      <span className="font-medium text-[#1A1A1A]">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Meta Ads Section */}
                  {campaign.metaAds && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Facebook className="w-4 h-4 text-[#1976D2]" />
                          <p className="text-xs text-[#6B6B6B]">Ad Budget</p>
                        </div>
                        <p className="text-lg font-bold text-[#1A1A1A]">
                          ${campaign.adBudget?.spent.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#6B6B6B]">
                          of ${campaign.adBudget?.total.toLocaleString()}
                        </p>
                        <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                          <div
                            className="h-full bg-[#1976D2] rounded-full"
                            style={{ width: `${Math.min(adSpendProgress, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-[#6A5ACD]" />
                          <p className="text-xs text-[#6B6B6B]">Impressions</p>
                        </div>
                        <p className="text-lg font-bold text-[#1A1A1A]">
                          {(campaign.metaAds.impressions / 1000).toFixed(1)}K
                        </p>
                        <p className="text-xs text-[#4ADE80]">+12.5% this week</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-[#4ADE80]" />
                          <p className="text-xs text-[#6B6B6B]">Click Rate</p>
                        </div>
                        <p className="text-lg font-bold text-[#1A1A1A]">
                          {campaign.metaAds.ctr}%
                        </p>
                        <p className="text-xs text-[#6B6B6B]">
                          ${campaign.metaAds.costPerClick} CPC
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-[#FFA500]" />
                          <p className="text-xs text-[#6B6B6B]">Conversions</p>
                        </div>
                        <p className="text-lg font-bold text-[#1A1A1A]">
                          {campaign.metaAds.conversions}
                        </p>
                        <p className="text-xs text-[#4ADE80]">
                          {((campaign.metaAds.conversions / campaign.metaAds.clicks) * 100).toFixed(1)}% rate
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Campaign Detail Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedCampaign(null)}
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
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedCampaign.name}</h2>
                    <p className="text-white/90">{selectedCampaign.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCampaign(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-sm font-medium backdrop-blur-sm">
                    {selectedCampaign.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedCampaign.startDate).toLocaleDateString()} - {new Date(selectedCampaign.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Column - Main Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Campaign Performance */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-[#6A5ACD]" />
                          Campaign Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-4 bg-gradient-to-br from-[#6A5ACD]/10 to-transparent rounded-xl">
                            <DollarSign className="w-8 h-8 text-[#6A5ACD] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#1A1A1A]">
                              ${selectedCampaign.raised.toLocaleString()}
                            </p>
                            <p className="text-sm text-[#6B6B6B]">Raised</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-[#4ADE80]/10 to-transparent rounded-xl">
                            <Users className="w-8 h-8 text-[#4ADE80] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#1A1A1A]">
                              {selectedCampaign.donors}
                            </p>
                            <p className="text-sm text-[#6B6B6B]">Donors</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-[#FFA500]/10 to-transparent rounded-xl">
                            <TrendingUp className="w-8 h-8 text-[#FFA500] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#1A1A1A]">
                              {((selectedCampaign.raised / selectedCampaign.goal) * 100).toFixed(0)}%
                            </p>
                            <p className="text-sm text-[#6B6B6B]">Progress</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6B6B6B]">Goal Progress</span>
                            <span className="font-medium">
                              ${(selectedCampaign.goal - selectedCampaign.raised).toLocaleString()} remaining
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] rounded-full"
                              style={{ width: `${Math.min((selectedCampaign.raised / selectedCampaign.goal) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Meta Ads Dashboard */}
                    {selectedCampaign.metaAds && (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Facebook className="w-5 h-5 text-[#1976D2]" />
                              Meta Ads Campaign
                            </CardTitle>
                            <Button size="sm" onClick={() => setShowMetaAdsDrawer(true)}>
                              <Settings className="w-4 h-4" />
                              Manage Ads
                            </Button>
                          </div>
                          <CardDescription>Facebook & Instagram advertising performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">Impressions</p>
                              <p className="text-xl font-bold text-[#1A1A1A]">
                                {selectedCampaign.metaAds.impressions.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">Clicks</p>
                              <p className="text-xl font-bold text-[#1A1A1A]">
                                {selectedCampaign.metaAds.clicks.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">CTR</p>
                              <p className="text-xl font-bold text-[#1A1A1A]">
                                {selectedCampaign.metaAds.ctr}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">Conversions</p>
                              <p className="text-xl font-bold text-[#1A1A1A]">
                                {selectedCampaign.metaAds.conversions}
                              </p>
                            </div>
                          </div>

                          {/* Platform Breakdown */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-[#1976D2]/10 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Facebook className="w-5 h-5 text-[#1976D2]" />
                                <div>
                                  <p className="font-medium text-[#1A1A1A]">Facebook</p>
                                  <p className="text-xs text-[#6B6B6B]">Primary platform</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#1A1A1A]">65%</p>
                                <p className="text-xs text-[#6B6B6B]">of budget</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Instagram className="w-5 h-5 text-pink-500" />
                                <div>
                                  <p className="font-medium text-[#1A1A1A]">Instagram</p>
                                  <p className="text-xs text-[#6B6B6B]">Stories & Feed</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#1A1A1A]">35%</p>
                                <p className="text-xs text-[#6B6B6B]">of budget</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Right Column - Budget & Location */}
                  <div className="space-y-6">
                    {/* Budget Allocation */}
                    {selectedCampaign.adBudget && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[#4ADE80]" />
                            Ad Budget
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center mb-4">
                            <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
                              ${selectedCampaign.adBudget.spent.toLocaleString()}
                            </p>
                            <p className="text-sm text-[#6B6B6B]">
                              of ${selectedCampaign.adBudget.total.toLocaleString()}
                            </p>
                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4ADE80] to-[#34D399] rounded-full"
                              style={{ width: `${Math.min((selectedCampaign.adBudget.spent / selectedCampaign.adBudget.total) * 100, 100)}%` }}
                            />
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Daily Avg</span>
                              <span className="font-medium">${(selectedCampaign.adBudget.spent / 30).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Remaining</span>
                              <span className="font-medium">
                                ${(selectedCampaign.adBudget.total - selectedCampaign.adBudget.spent).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B6B6B]">Projected End</span>
                              <span className="font-medium">12 days</span>
                            </div>
                          </div>

                          <Button className="w-full mt-4" size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                            Adjust Budget
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Location Targeting */}
                    {selectedCampaign.location && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#FFA500]" />
                            Target Location
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                            <Map className="w-12 h-12 text-gray-400" />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6A5ACD]/20 to-[#9B87FF]/20" />
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">Location</p>
                              <p className="font-medium text-[#1A1A1A]">
                                {selectedCampaign.location.city}, {selectedCampaign.location.state}
                              </p>
                              <p className="text-sm text-[#6B6B6B]">{selectedCampaign.location.country}</p>
                            </div>

                            <div>
                              <p className="text-xs text-[#6B6B6B] mb-1">Radius</p>
                              <p className="font-medium text-[#1A1A1A]">
                                {selectedCampaign.location.radius} miles
                              </p>
                            </div>

                            <Button className="w-full" size="sm" variant="outline">
                              <MapPin className="w-4 h-4" />
                              Edit Location
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Quick Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <Share2 className="w-4 h-4" />
                          Share Campaign
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Edit className="w-4 h-4" />
                          Edit Details
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <BarChart3 className="w-4 h-4" />
                          View Analytics
                        </Button>
                        <Link href="/donations" className="block">
                          <Button className="w-full justify-start" variant="outline">
                            <ArrowRight className="w-4 h-4" />
                            View Donations
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Meta Ads Management Drawer */}
      <AnimatePresence>
        {showMetaAdsDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMetaAdsDrawer(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">Meta Ads Manager</h2>
                    <p className="text-sm text-[#6B6B6B]">Configure Facebook & Instagram ads</p>
                  </div>
                  <button
                    onClick={() => setShowMetaAdsDrawer(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Meta Ads Configuration would go here */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Setup</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">
                          Campaign Objective
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                          <option>Awareness</option>
                          <option>Traffic</option>
                          <option>Engagement</option>
                          <option>Conversions</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">
                          Daily Budget
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                          <input
                            type="number"
                            placeholder="100"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">
                          Platforms
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                            <Facebook className="w-5 h-5 text-[#1976D2]" />
                            <span className="font-medium">Facebook</span>
                          </label>
                          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input type="checkbox" defaultChecked className="w-4 h-4" />
                            <Instagram className="w-5 h-5 text-pink-500" />
                            <span className="font-medium">Instagram</span>
                          </label>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Zap className="w-4 h-4" />
                        Launch Campaign
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
