'use client'

import { Video, Sparkles, Play } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function VideoPage() {
  const templates = [
    'Impact Story', 'Donation Thank You', 'Campaign Launch', 'Year in Review', 
    'Donor Spotlight', 'Event Highlight'
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">AI Video Generation</h1>
        <p className="text-[#6B6B6B]">Create professional videos automatically</p>
      </div>

      <Card className="mb-6 border-2 border-[#6A5ACD]/20 bg-gradient-to-br from-[#C7BFFF]/10 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6A5ACD]" />
            Coming Soon
          </CardTitle>
          <CardDescription>AI-powered video generation is currently in development</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {templates.map((template, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer opacity-50">
            <CardContent className="pt-6">
              <div className="aspect-video bg-gradient-to-br from-[#6A5ACD]/20 to-[#9B87FF]/20 rounded-lg flex items-center justify-center mb-4">
                <Play className="w-12 h-12 text-[#6A5ACD]" />
              </div>
              <p className="font-medium text-[#1A1A1A]">{template}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Video (Preview)</CardTitle>
          <CardDescription>This feature is coming soon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#1A1A1A]">Prompt</label>
            <textarea
              disabled
              placeholder="Describe the video you want to create..."
              className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              rows={4}
            />
          </div>
          <Button disabled className="w-full">
            <Video className="w-4 h-4" />
            Generate Video (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
