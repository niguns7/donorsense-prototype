'use client'

import { Share2, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MetaPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Meta Ads Integration</h1>
        <p className="text-[#6B6B6B]">Manage Facebook and Instagram ad campaigns</p>
      </div>

      <Card className="mb-6 border-2 border-[#6A5ACD]/20 bg-gradient-to-br from-[#C7BFFF]/10 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6A5ACD]" />
            Coming Soon
          </CardTitle>
          <CardDescription>Meta Ads integration is currently in development</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle>Pixel Configuration</CardTitle>
            <CardDescription>Connect your Meta Pixel</CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              disabled
              placeholder="Enter Pixel ID"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
            />
            <Button disabled className="mt-4">Connect Pixel</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#6A5ACD]" />
                Audience Targeting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6B6B6B]">Define your target audience</p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#4ADE80]" />
                Campaign Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6B6B6B]">Track ad performance metrics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
