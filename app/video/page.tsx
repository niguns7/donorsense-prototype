'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Video, 
  Sparkles, 
  Play, 
  Wand2, 
  Image as ImageIcon,
  Music,
  Type,
  Clock,
  Target,
  X,
  Check,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Gift,
  Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import campaignsData from '@/data/campaigns.json'

interface VideoTemplate {
  id: string
  name: string
  description: string
  category: string
  duration: number
  thumbnail: string
  style: string
  color: string
}

interface Campaign {
  id: string
  name: string
  description: string
  goal: number
  raised: number
  status: string
}

export default function VideoPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null)
  const [showAttachModal, setShowAttachModal] = useState(false)
  const [showCustomGenerator, setShowCustomGenerator] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const campaigns: Campaign[] = campaignsData as Campaign[]

  const videoTemplates: VideoTemplate[] = [
    {
      id: 'vt-1',
      name: 'Impact Story',
      description: 'Showcase the real impact of donations with emotional storytelling',
      category: 'Impact',
      duration: 30,
      thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
      style: 'Cinematic',
      color: '#6A5ACD'
    },
    {
      id: 'vt-2',
      name: 'Donation Thank You',
      description: 'Express gratitude to donors with a heartfelt message',
      category: 'Gratitude',
      duration: 15,
      thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
      style: 'Warm & Personal',
      color: '#4ADE80'
    },
    {
      id: 'vt-3',
      name: 'Campaign Launch',
      description: 'Create excitement for new fundraising campaigns',
      category: 'Promotion',
      duration: 45,
      thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
      style: 'Energetic',
      color: '#FFA500'
    },
    {
      id: 'vt-4',
      name: 'Year in Review',
      description: 'Celebrate annual achievements and milestones',
      category: 'Impact',
      duration: 60,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      style: 'Professional',
      color: '#1976D2'
    },
    {
      id: 'vt-5',
      name: 'Donor Spotlight',
      description: 'Highlight inspiring donor stories and testimonials',
      category: 'Community',
      duration: 30,
      thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
      style: 'Documentary',
      color: '#9B87FF'
    },
    {
      id: 'vt-6',
      name: 'Event Highlight',
      description: 'Capture the best moments from fundraising events',
      category: 'Events',
      duration: 90,
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      style: 'Dynamic',
      color: '#EC4899'
    },
    {
      id: 'vt-7',
      name: 'Social Media Teaser',
      description: 'Quick engaging videos for social media promotion',
      category: 'Promotion',
      duration: 15,
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      style: 'Trendy',
      color: '#10B981'
    },
    {
      id: 'vt-8',
      name: 'Emergency Appeal',
      description: 'Urgent messaging for critical fundraising needs',
      category: 'Urgent',
      duration: 20,
      thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      style: 'Direct & Powerful',
      color: '#EF4444'
    },
    {
      id: 'vt-9',
      name: 'Monthly Update',
      description: 'Keep donors informed with regular progress updates',
      category: 'Updates',
      duration: 30,
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      style: 'Clean & Modern',
      color: '#8B5CF6'
    }
  ]

  const categories = ['all', 'Impact', 'Gratitude', 'Promotion', 'Community', 'Events', 'Urgent', 'Updates']

  const filteredTemplates = videoTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAttachToCampaign = (template: VideoTemplate) => {
    setSelectedTemplate(template)
    setShowAttachModal(true)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Impact': return <Heart className="w-4 h-4" />
      case 'Gratitude': return <Gift className="w-4 h-4" />
      case 'Promotion': return <TrendingUp className="w-4 h-4" />
      case 'Community': return <Users className="w-4 h-4" />
      case 'Events': return <Calendar className="w-4 h-4" />
      case 'Urgent': return <Target className="w-4 h-4" />
      default: return <Video className="w-4 h-4" />
    }
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">AI Video Generation</h1>
            <p className="text-[#6B6B6B]">Create professional fundraising videos in minutes with AI</p>
          </div>
          <Button 
            onClick={() => setShowCustomGenerator(true)}
            className="bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] hover:from-[#5A4ABD] hover:to-[#8B77EF] shadow-lg"
          >
            <Wand2 className="w-4 h-4" />
            Custom Video Generator
          </Button>
        </div>

        {/* Generate Video Section */}
        <Card className="border-2 border-[#6A5ACD]/20 bg-gradient-to-br from-[#6A5ACD]/5 via-[#9B87FF]/5 to-transparent shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-1 gap-6">
              {/* Left: Quick Generator */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Quick Generate</h2>
                    <p className="text-sm text-[#6B6B6B]">Start with a template and customize</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">
                      What&apos;s your video about?
                    </label>
                    <textarea
                      placeholder="E.g., 'A heartwarming story about how donations helped build a school in rural Africa...'"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Duration</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]">
                        <option>15 seconds</option>
                        <option>30 seconds</option>
                        <option>60 seconds</option>
                        <option>90 seconds</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Style</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]">
                        <option>Cinematic</option>
                        <option>Modern</option>
                        <option>Minimalist</option>
                        <option>Energetic</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-[#6A5ACD] hover:bg-[#5A4ABD] py-6 text-base">
                    <Sparkles className="w-5 h-5" />
                    Generate Video with AI
                  </Button>
                </div>
              </div>

              {/* Right: Features */}
  
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className=" flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-md smadow-md">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 bg-white">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#6A5ACD] text-white'
                  : 'bg-gray-100 text-[#6B6B6B] hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="mb-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Video Templates</h2>
          <p className="text-sm text-[#6B6B6B]">{filteredTemplates.length} templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#6A5ACD] overflow-hidden">
                <div className="relative">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative">
                    <Image
                      src={template.thumbnail}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-[#6A5ACD] ml-1" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white" />
                        <span className="text-xs text-white font-medium">{template.duration}s</span>
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div 
                      className="absolute top-3 left-3 px-3 py-1 backdrop-blur-sm rounded-full flex items-center gap-1"
                      style={{ backgroundColor: `${template.color}20` }}
                    >
                      {getCategoryIcon(template.category)}
                      <span className="text-xs font-medium" style={{ color: template.color }}>
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#6A5ACD] transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {template.style}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleAttachToCampaign(template)}
                        className="flex-1 bg-[#6A5ACD] hover:bg-[#5A4ABD]"
                      >
                        <Target className="w-4 h-4" />
                        Use Template
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Attach to Campaign Modal */}
      <AnimatePresence>
        {showAttachModal && selectedTemplate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowAttachModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">Attach Video to Campaign</h2>
                    <p className="text-white/90 text-sm">Choose which campaign to attach &quot;{selectedTemplate.name}&quot; video</p>
                  </div>
                  <button
                    onClick={() => setShowAttachModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {campaigns.filter(c => c.status === 'Active').map((campaign) => (
                    <Card 
                      key={campaign.id}
                      className="hover:border-[#6A5ACD] cursor-pointer transition-all hover:shadow-md border-2"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-[#1A1A1A] mb-1">{campaign.name}</h3>
                            <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">{campaign.description}</p>
                            <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                ${campaign.raised.toLocaleString()} raised
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {((campaign.raised / campaign.goal) * 100).toFixed(0)}% complete
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-[#6A5ACD] hover:bg-[#5A4ABD]">
                            <Check className="w-4 h-4" />
                            Attach
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#6B6B6B]">
                    Video will be automatically generated and attached
                  </p>
                  <Button variant="outline" onClick={() => setShowAttachModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Generator Modal */}
      <AnimatePresence>
        {showCustomGenerator && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCustomGenerator(false)}
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
                    <h2 className="text-2xl font-bold text-white mb-2">Custom Video Generator</h2>
                    <p className="text-white/90">Create a unique video from scratch with full customization</p>
                  </div>
                  <button
                    onClick={() => setShowCustomGenerator(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Video Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Video Title</label>
                        <input
                          type="text"
                          placeholder="Enter video title..."
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Script / Story</label>
                        <textarea
                          placeholder="Describe your video story, key messages, and call-to-action..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#6A5ACD]"
                          rows={6}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Duration</label>
                          <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                            <option>15 seconds</option>
                            <option>30 seconds</option>
                            <option>60 seconds</option>
                            <option>90 seconds</option>
                            <option>120 seconds</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Visual Style</label>
                          <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                            <option>Cinematic</option>
                            <option>Modern & Clean</option>
                            <option>Minimalist</option>
                            <option>Energetic</option>
                            <option>Documentary</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Mood</label>
                          <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                            <option>Inspirational</option>
                            <option>Urgent</option>
                            <option>Hopeful</option>
                            <option>Grateful</option>
                            <option>Professional</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#1A1A1A] mb-2 block">Music Preference</label>
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                          <option>Uplifting & Inspirational</option>
                          <option>Calm & Peaceful</option>
                          <option>Energetic & Upbeat</option>
                          <option>Emotional & Touching</option>
                          <option>No Music</option>
                        </select>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] hover:from-[#5A4ABD] hover:to-[#8B77EF] py-6 text-lg">
                        <Wand2 className="w-5 h-5" />
                        Generate Custom Video
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
