"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Globe,
  Smartphone,
  BarChart3,
  Users,
  Zap,
  Shield,
  Check,
  ChevronRight,
  Monitor,
  Tablet,
  Search,
  Calendar,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Palette,
  ClipboardList,
  Mail,
  MapPin,
  Share2,
  Clock,
} from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

export default function WebsitesPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [calculatedPrice, setCalculatedPrice] = useState(299)
  const [activeTheme, setActiveTheme] = useState("modern")
  const [viewCount, setViewCount] = useState(0)
  const [leadCount, setLeadCount] = useState(0)
  const [shareCount, setShareCount] = useState(0)

  // Animate counters
  useEffect(() => {
    const timer = setTimeout(() => {
      const viewInterval = setInterval(() => {
        setViewCount((prev) => {
          if (prev >= 2500) {
            clearInterval(viewInterval)
            return 2500
          }
          return prev + 50
        })
      }, 30)

      const leadInterval = setInterval(() => {
        setLeadCount((prev) => {
          if (prev >= 85) {
            clearInterval(leadInterval)
            return 85
          }
          return prev + 1
        })
      }, 40)

      const shareInterval = setInterval(() => {
        setShareCount((prev) => {
          if (prev >= 350) {
            clearInterval(shareInterval)
            return 350
          }
          return prev + 10
        })
      }, 50)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const features = [
    { id: "virtual-tours", name: "Virtual Tour Integration", price: 50 },
    { id: "floor-plans", name: "Interactive Floor Plans", price: 50 },
    { id: "analytics", name: "Advanced Analytics", price: 75 },
    { id: "social", name: "Social Media Integration", price: 25 },
    { id: "calendar", name: "Showing Calendar", price: 50 },
    { id: "custom-domain", name: "Custom Domain", price: 100 },
  ]

  const handleFeatureToggle = (featureId: string, price: number) => {
    setSelectedFeatures((prev) => {
      const newFeatures = prev.includes(featureId) ? prev.filter((f) => f !== featureId) : [...prev, featureId]

      // Calculate new price
      const basePrice = 299
      const additionalPrice = newFeatures.reduce((sum, id) => {
        const feature = features.find((f) => f.id === id)
        return sum + (feature?.price || 0)
      }, 0)

      setCalculatedPrice(basePrice + additionalPrice)
      return newFeatures
    })
  }

  const themes = {
    modern: "bg-gradient-to-br from-gray-50 to-gray-100",
    elegant: "bg-gradient-to-br from-amber-50 to-orange-50",
    professional: "bg-gradient-to-br from-blue-50 to-indigo-50",
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header-texture.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10 flex flex-col justify-center h-full">
          {/* Extra spacing above breadcrumb */}
          <div className="mb-0" style={{ minHeight: '48px' }} />
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-white/80 flex items-center gap-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <span className="text-white/80">Services</span>
            <span className="mx-1">/</span>
            <span className="text-white">Property Websites</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">PROPERTY WEBSITES</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Make Your Listings Stand Out Online
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Custom property websites that help your listings stand out and capture more leads.
          </p>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-[#2d4654] mb-2 transition-transform group-hover:scale-110">
                  {viewCount}+
                </div>
                <p className="text-gray-600">Average Monthly Views</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-[#2d4654] mb-2 transition-transform group-hover:scale-110">
                  {leadCount}%
                </div>
                <p className="text-gray-600">More Qualified Leads</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-[#2d4654] mb-2 transition-transform group-hover:scale-110">
                  {shareCount}+
                </div>
                <p className="text-gray-600">Social Media Shares</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-4">
                Powerful Features That Drive Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every property website comes loaded with features designed to showcase your listings and capture leads.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Custom Domain",
                  description: "Branded property URL that's easy to remember and share",
                  color: "bg-blue-500",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Optimized",
                  description: "Perfect viewing experience on phones, tablets, and desktops",
                  color: "bg-green-500",
                },
                {
                  icon: Sparkles,
                  title: "Easy Content Updates",
                  description: "Need a price change, new photos, or updated info? Just ask—we'll handle it fast",
                  color: "bg-purple-500",
                },
                {
                  icon: Users,
                  title: "Lead Capture",
                  description: "Smart contact forms that qualify and notify you instantly",
                  color: "bg-orange-500",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized for speed with instant loading times",
                  color: "bg-yellow-500",
                },
                {
                  icon: Shield,
                  title: "Secure Hosting",
                  description: "SSL certificates and secure hosting included",
                  color: "bg-red-500",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Device Preview */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]" id="demo">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-4">Beautiful on Every Device</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your property websites automatically adapt to provide the perfect viewing experience on any screen size.
              </p>
            </div>

            <Tabs defaultValue="desktop" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="desktop" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="tablet" className="flex items-center gap-2">
                  <Tablet className="h-4 w-4" />
                  Tablet
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="desktop" className="mt-0">
                <div className="bg-gray-900 rounded-lg p-4 max-w-4xl mx-auto">
                  <div className="bg-white rounded aspect-[16/10] w-full" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <iframe
                      src="https://tour.homeontour.com/jnEcI7337A?branded=0"
                      className="rounded w-full h-full"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title="Desktop website preview - Property Tour"
                      loading="lazy"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tablet" className="mt-0">
                <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-auto">
                  <div className="bg-white rounded aspect-[4/3]" style={{ width: '100%', height: '600px' }}>
                    <iframe
                      src="https://tour.homeontour.com/jnEcI7337A?branded=0"
                      className="rounded w-full h-full"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title="Tablet website preview - Property Tour"
                      loading="lazy"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="bg-gray-900 rounded-3xl p-4 max-w-sm mx-auto">
                  <div className="bg-white rounded-2xl aspect-[9/16]" style={{ width: '100%', height: '600px' }}>
                    <iframe
                      src="https://tour.homeontour.com/jnEcI7337A?branded=0"
                      className="rounded-2xl w-full h-full"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title="Mobile website preview - Property Tour"
                      loading="lazy"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Unified Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-2">
                Everything You Need in a Property Website
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A modern, high-converting listing page—built for agents who want to stand out.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
              {/* Main Features */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <Monitor className="h-8 w-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Custom Design</h3>
                    <p className="text-gray-600 text-sm">Professionally designed layout<br/>Tailored to each listing with a sleek, modern look</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Smartphone className="h-8 w-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Mobile Responsive</h3>
                    <p className="text-gray-600 text-sm">Works on all devices<br/>Looks great on phones, tablets, and desktops</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Image className="h-8 w-8 text-purple-500 flex-shrink-0" src="/images/icons/gallery.svg" alt="Gallery" width={32} height={32} />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Photo Gallery</h3>
                    <p className="text-gray-600 text-sm">Up to 50 images<br/>High-resolution display optimized for fast loading</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ClipboardList className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Property Info</h3>
                    <p className="text-gray-600 text-sm">Detailed specs and highlights<br/>Showcase features, upgrades, and selling points</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-pink-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Agent Branding</h3>
                    <p className="text-gray-600 text-sm">Your face, name & logo<br/>Personalized contact section that builds trust</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-8 w-8 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Lead Capture Form</h3>
                    <p className="text-gray-600 text-sm">Built-in contact form<br/>Let buyers reach out directly without leaving the page</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Google Maps Integration</h3>
                    <p className="text-gray-600 text-sm">Location with zoom + street view<br/>Help buyers see exactly where the property is</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-gray-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">SSL Secure</h3>
                    <p className="text-gray-600 text-sm">Safe & encrypted<br/>Ensures a trusted, professional experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">1-Year Hosting</h3>
                    <p className="text-gray-600 text-sm">Fast & reliable<br/>Includes full hosting with no maintenance required</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-8 w-8 text-blue-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Fast Turnaround</h3>
                    <p className="text-gray-600 text-sm">Live in 24–48 hours<br/>After the shoot, your site is ready fast</p>
                  </div>
                </div>
              </div>
              {/* Add-Ons */}
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-semibold mb-4 text-[#2d4654]">Optional Add-Ons</h3>
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Virtual Tour Integration</h3>
                    <p className="text-gray-600 text-sm">Embed your Matterport or 360° walkthrough</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BarChart3 className="h-8 w-8 text-green-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Advanced Analytics</h3>
                    <p className="text-gray-600 text-sm">Track visits, sources, device types & more</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-8 w-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Showing Calendar</h3>
                    <p className="text-gray-600 text-sm">Highlight open houses or viewing slots</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Share2 className="h-8 w-8 text-pink-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Social Media Integration</h3>
                    <p className="text-gray-600 text-sm">Preview optimized and share-ready</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ClipboardList className="h-8 w-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Interactive Floor Plans</h3>
                    <p className="text-gray-600 text-sm">Clickable layouts for easy buyer navigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-blue-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Custom Domain</h3>
                    <p className="text-gray-600 text-sm">Branded subdomain or use your own URL</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing Section */}
            <div className="bg-gray-50 rounded-xl shadow p-8 mb-8">
              <div className="mb-6">
                <p className="text-xl font-semibold text-[#2d4654] mb-1">One-Time Setup $129.99</p>
                <p className="text-gray-700">Covers full site creation, hosting setup, domain config, and launch.</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-semibold text-[#2d4654] mb-1">Ongoing Hosting & Support $9.99/month <span className='ml-2 inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded'>First month free</span></p>
                <p className="text-gray-700">Includes fast hosting, support, and tweaks if needed.</p>
              </div>
              <p className="text-gray-600 text-sm">Billed monthly, cancel anytime. If you cancel, the site stays live until the end of the billing cycle.</p>
            </div>
            <div className="bg-[#2d4654] text-white rounded-lg p-6 text-center mb-8">
              <p className="text-xl mb-4">Your Investment</p>
              <p className="text-lg mb-4">A complete, customizable web experience for every listing—professionally built, fast, and ready to impress.</p>
              <Button asChild size="lg" className="w-full bg-white text-[#2d4654] hover:bg-gray-100">
                <Link href="/pricing">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-4">Simple 4-Step Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">From concept to launch in just 48 hours</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Share Your Vision",
                  description: "Tell us about your property and design preferences",
                  icon: MessageSquare,
                },
                {
                  step: "2",
                  title: "Design & Build",
                  description: "We create your custom website with all your content",
                  icon: Palette,
                },
                {
                  step: "3",
                  title: "Review & Refine",
                  description: "Preview your site and request any adjustments",
                  icon: Search,
                },
                {
                  step: "4",
                  title: "Launch & Promote",
                  description: "Your website goes live with full marketing support",
                  icon: Zap,
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-[#2d4654] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <item.icon className="h-10 w-10 text-white" />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: '#EAB309' }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to know about our property websites and pricing.</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: "How fast is the website ready?",
                  answer: "We usually have it live within 24–48 hours after your photo shoot. We handle the full setup and launch.",
                },
                {
                  question: "How much does it cost?",
                  answer: "A one-time setup fee of $129.99 and $9.99/month for hosting and support. First month is free. Cancel anytime.",
                },
                {
                  question: "What's included in the monthly fee?",
                  answer: (
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Fast, secure hosting</li>
                      <li>SSL certificate</li>
                      <li>Basic updates or content tweaks</li>
                      <li>Site stays live as long as you're subscribed</li>
                    </ul>
                  ),
                },
                {
                  question: "Can I use my own domain name?",
                  answer: "Yes. We can connect your domain or use a custom subdomain like 123main.new-home.ca.",
                },
                {
                  question: "Can I edit the website myself?",
                  answer: "No need. Just message us with changes—we'll handle it for you, usually the same day.",
                },
                {
                  question: "What if I cancel?",
                  answer: "You can cancel any time. Your site stays live through the current billing cycle and then goes offline.",
                },
                {
                  question: "Do you offer traffic stats or analytics?",
                  answer: "Yes. Advanced analytics are available as an optional add-on if you want to track views and engagement.",
                },
                {
                  question: "Can you embed tours or floor plans?",
                  answer: "Yes. We can embed Matterport, iGUIDE, 360° virtual tours, video walkthroughs, and interactive floor plans.",
                },
                {
                  question: "What if I change the price or need to swap photos?",
                  answer: "Easy—just send us the updates and we'll refresh the site right away.",
                },
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof item.answer === 'string' ? (
                      <p className="text-gray-600">{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "The property website RePhotos created for our listing was incredible. We had over 500 virtual
                visitors in the first week, and it directly led to 3 serious offers. The interactive features really set
                our listing apart."
              </blockquote>
              <cite className="text-gray-600 not-italic">
                <span className="font-semibold">Samantha Grewal</span>
                <span className="block">Real Estate Specialist, Oakville</span>
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
