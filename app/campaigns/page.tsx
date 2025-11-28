'use client'

import { Plus, Target, Calendar, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CampaignsPage() {
  const campaigns = [
    { name: 'Holiday Fundraiser 2024', goal: 50000, raised: 38500, status: 'live', endDate: '2024-12-31' },
    { name: 'Emergency Relief Fund', goal: 25000, raised: 25000, status: 'completed', endDate: '2024-11-30' },
    { name: 'Building Renovation', goal: 100000, raised: 42000, status: 'live', endDate: '2025-03-15' },
    { name: 'Spring Gala 2025', goal: 75000, raised: 0, status: 'scheduled', endDate: '2025-04-20' }
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Campaigns</h1>
            <p className="text-[#6B6B6B]">Manage your fundraising campaigns</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign, i) => {
          const progress = (campaign.raised / campaign.goal) * 100
          return (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{campaign.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Ends {campaign.endDate}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'live' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' :
                        campaign.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        'bg-[#9B87FF]/10 text-[#9B87FF]'
                      }`}>
                        {campaign.status}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1A1A1A]">${campaign.raised.toLocaleString()}</p>
                    <p className="text-sm text-[#6B6B6B]">of ${campaign.goal.toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {progress.toFixed(1)}% funded
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      ${(campaign.goal - campaign.raised).toLocaleString()} remaining
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
