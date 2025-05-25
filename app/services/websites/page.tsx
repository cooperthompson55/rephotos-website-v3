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
            <Link href="/services" className="hover:underline">Services</Link>
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
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  description: "Track visitors, engagement, and lead sources in real-time",
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
                <div className="bg-gray-900 rounded-lg p-4 max-w-5xl mx-auto">
                  <div className="bg-white rounded aspect-[16/9]">
                    <Image
                      src="/placeholder.svg?height=720&width=1280&query=luxury-property-website-desktop"
                      alt="Desktop website preview"
                      width={1280}
                      height={720}
                      className="rounded"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tablet" className="mt-0">
                <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-auto">
                  <div className="bg-white rounded aspect-[4/3]">
                    <Image
                      src="/placeholder.svg?height=768&width=1024&query=luxury-property-website-tablet"
                      alt="Tablet website preview"
                      width={1024}
                      height={768}
                      className="rounded"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="bg-gray-900 rounded-3xl p-4 max-w-sm mx-auto">
                  <div className="bg-white rounded-2xl aspect-[9/16]">
                    <Image
                      src="/placeholder.svg?height=844&width=390&query=luxury-property-website-mobile"
                      alt="Mobile website preview"
                      width={390}
                      height={844}
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d4654] mb-4">
                Build Your Perfect Property Website
              </h2>
              <p className="text-xl text-gray-600">Start with our base package and add features as needed</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Base Package Includes:</h3>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Custom property website",
                      "Mobile responsive design",
                      "Photo gallery (up to 50 photos)",
                      "Property details & features",
                      "Contact form with lead capture",
                      "Basic analytics",
                      "SSL security",
                      "1 year hosting",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Add Premium Features:</h3>
                  <div className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <label
                        key={feature.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={() => handleFeatureToggle(feature.id, feature.price)}
                          />
                          <span className="text-gray-700">{feature.name}</span>
                        </div>
                        <span className="text-gray-600">+${feature.price}</span>
                      </label>
                    ))}
                  </div>

                  <div className="bg-[#2d4654] text-white rounded-lg p-6 text-center">
                    <p className="text-sm mb-2">Your Investment:</p>
                    <p className="text-4xl font-bold mb-4">${calculatedPrice}</p>
                    <Button asChild size="lg" className="w-full bg-white text-[#2d4654] hover:bg-gray-100">
                      <Link href="/pricing">Get Started Today</Link>
                    </Button>
                  </div>
                </div>
              </div>
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
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How long does it take to build a property website?",
                  answer:
                    "Most property websites are completed within 48 hours. Complex sites with custom features may take 3-5 business days.",
                },
                {
                  question: "Can I update the website content myself?",
                  answer:
                    "Yes! Every website comes with an easy-to-use content management system. We also provide training and support.",
                },
                {
                  question: "What happens after the first year of hosting?",
                  answer:
                    "Hosting renewal is $99/year, which includes continued support, security updates, and unlimited content changes.",
                },
                {
                  question: "Can I use my own domain name?",
                  answer:
                    "We can use your existing domain or help you register a new one. Custom domains are included in our premium features.",
                },
                {
                  question: "Do you integrate with MLS systems?",
                  answer:
                    "Yes, we can integrate with most MLS systems to automatically sync property details and updates.",
                },
                {
                  question: "What kind of analytics do you provide?",
                  answer:
                    "Our analytics dashboard tracks visitors, page views, lead sources, device types, and user behavior to help you optimize your marketing.",
                },
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.answer}</p>
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
                "The property website RePhotos created for our luxury listing was incredible. We had over 500 virtual
                visitors in the first week, and it directly led to 3 serious offers. The interactive features really set
                our listing apart."
              </blockquote>
              <cite className="text-gray-600 not-italic">
                <span className="font-semibold">Jennifer Martinez</span>
                <span className="block">Luxury Real Estate Specialist, Toronto</span>
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
