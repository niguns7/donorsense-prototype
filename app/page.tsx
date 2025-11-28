'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Target, 
  Zap, 
  Heart, 
  TrendingUp, 
  Users, 
  Video, 
  Shield,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleGetStarted = () => {
    router.push('/auth/signup')
  }

  const handleSignIn = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F7FB] via-white to-[#F7F7FB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">DonorSense<span className="text-[#6A5ACD]">.AI</span></span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" className="hidden md:inline-flex">Features</Button>
            <Button variant="ghost" className="hidden md:inline-flex">Pricing</Button>
            <Button variant="outline" onClick={handleSignIn}>Sign In</Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C7BFFF]/20 via-transparent to-[#9B87FF]/10 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6A5ACD]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B87FF]/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Sparkles className="w-4 h-4 text-[#6A5ACD]" />
              <span className="text-sm text-[#6B6B6B]">AI-Powered Nonprofit Management</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] leading-tight"
            >
              Where Impact <br />
              <span className="bg-gradient-to-r from-[#6A5ACD] via-[#9B87FF] to-[#6A5ACD] bg-clip-text text-transparent gradient-animate">
                Grows
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed"
            >
              A unified platform that helps nonprofits manage donations, engage donors, 
              and launch intelligent fundraising campaigns — all powered by AI.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" className="text-base" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base" onClick={handleSignIn}>
                Explore Platform
              </Button>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              variants={fadeInUp}
              className="pt-16 relative"
            >
              <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl bg-gradient-to-br from-[#6A5ACD] via-[#9B87FF] to-[#C7BFFF] p-1 shadow-2xl shadow-[#6A5ACD]/20">
                <div className="w-full h-full rounded-3xl bg-white p-8 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="h-20 rounded-xl bg-gradient-to-br from-[#C7BFFF]/30 to-[#9B87FF]/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -left-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4ADE80] to-[#4ADE80]/50 shadow-lg flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-4 -right-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] shadow-lg flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: What is DonorSense.AI */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <motion.h2 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold text-[#1A1A1A]"
              >
                What is DonorSense.AI?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-[#6B6B6B] leading-relaxed"
              >
                DonorSense.AI is an intelligent donor management and automation platform that 
                simplifies fundraising for nonprofit organizations. From donation processing to 
                communication, campaigns, and AI-generated videos, it brings everything into one 
                modern ecosystem.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button variant="secondary" className="mt-4">
                  Explore features
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div 
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 border-[#C7BFFF]/50">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Smart Donation Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Track donations in real time with seamless Stripe/PayPal integration 
                      and offline receipt scanning.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 border-[#C7BFFF]/50">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9B87FF] to-[#C7BFFF] flex items-center justify-center mb-4">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Always Organized, Always Accessible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Manage donor profiles, communication, and campaigns from a clean, 
                      unified dashboard.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 border-[#C7BFFF]/50">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C7BFFF] to-[#9B87FF] flex items-center justify-center mb-4">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">100% Automated Processes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Let AI handle video generation, campaign optimization, and donor 
                      engagement — fully hands-free.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Use Cases */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F7F7FB] to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <motion.h2 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold text-[#1A1A1A]"
              >
                How DonorSense Works
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-[#6B6B6B] leading-relaxed"
              >
                Designed to support nonprofits, charities, churches, fundraisers, and 
                organizations that want to simplify operations and grow donations effortlessly.
              </motion.p>
            </div>

            <motion.div 
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white to-[#C7BFFF]/5">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ADE80] to-[#4ADE80]/70 flex items-center justify-center mb-4">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">For Nonprofits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Accept donations, automate receipts, and manage campaigns with confidence.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white to-[#C7BFFF]/5">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center mb-4">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">For Fundraisers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Launch high-converting campaigns with AI-powered creatives and smart targeting.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-white to-[#C7BFFF]/5">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9B87FF] to-[#C7BFFF] flex items-center justify-center mb-4">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl">For Donor Engagement Teams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Automate thank-you messages, tax letters, and personalized communications.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Business Value */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <motion.h2 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold text-[#1A1A1A]"
              >
                Built for Growth
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-[#6B6B6B] leading-relaxed"
              >
                DonorSense.AI empowers organizations to grow trust, increase donations, and 
                operate efficiently — without needing a technical team.
              </motion.p>
            </div>

            <motion.div 
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <Card className="overflow-hidden border-2 border-[#6A5ACD]/20 hover:border-[#6A5ACD]/40 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-12 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center mb-6">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl mb-4">Operational Excellence</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Streamline donation workflows, reporting, compliance, and donor 
                      relationships in one place.
                    </CardDescription>
                    <div className="mt-8 space-y-3">
                      <div className="flex items-center gap-3 text-[#6B6B6B]">
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        <span>Real-time analytics</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#6B6B6B]">
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        <span>Automated compliance</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#6B6B6B]">
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        <span>Donor insights</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#C7BFFF]/20 to-[#9B87FF]/10 p-12 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="aspect-square rounded-2xl bg-white shadow-lg"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#6A5ACD] via-[#9B87FF] to-[#6A5ACD] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold"
            >
              Ready to simplify nonprofit fundraising?
            </motion.h2>
            
            <motion.div variants={fadeInUp}>
              <Button 
                size="lg" 
                className="bg-white text-[#6A5ACD] hover:bg-gray-100 shadow-2xl text-base"
              >
                Book a demo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">DonorSense<span className="text-[#9B87FF]">.AI</span></span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 DonorSense.AI. Empowering nonprofits with AI-driven growth.
          </p>
        </div>
      </footer>
    </div>
  )
}
