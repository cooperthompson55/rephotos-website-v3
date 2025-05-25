"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  Palette,
  Clock,
  DollarSign,
  Sparkles,
  Sofa,
  Bed,
  ChefHat,
  Bath,
  Building,
  TreePine,
  Star,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

export default function VirtualStagingPage() {
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50)
  const [selectedStyle, setSelectedStyle] = useState("modern")
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [viewCount, setViewCount] = useState(0)
  const [leadCount, setLeadCount] = useState(0)
  const [saleCount, setSaleCount] = useState(0)

  // Animate statistics on scroll
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById("stats-section")
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setViewCount((prev) => Math.min(prev + 50, 3500))
          setLeadCount((prev) => Math.min(prev + 2, 90))
          setSaleCount((prev) => Math.min(prev + 1, 73))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const styles = [
    { id: "modern", name: "Modern", icon: Building },
    { id: "traditional", name: "Traditional", icon: Home },
    { id: "scandinavian", name: "Scandinavian", icon: TreePine },
    { id: "industrial", name: "Industrial", icon: Zap },
    { id: "luxury", name: "Luxury", icon: Sparkles },
  ]

  const roomTypes = [
    { id: "living", name: "Living Room", price: 39, icon: Sofa },
    { id: "bedroom", name: "Bedroom", price: 35, icon: Bed },
    { id: "kitchen", name: "Kitchen", price: 45, icon: ChefHat },
    { id: "bathroom", name: "Bathroom", price: 35, icon: Bath },
    { id: "dining", name: "Dining Room", price: 39, icon: Home },
    { id: "office", name: "Home Office", price: 35, icon: Building },
  ]

  const handleRoomToggle = (roomId: string, price: number) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId))
      setTotalPrice(totalPrice - price)
    } else {
      setSelectedRooms([...selectedRooms, roomId])
      setTotalPrice(totalPrice + price)
    }
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
            <span className="text-white">Virtual Staging</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">VIRTUAL STAGING</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Transform Empty Spaces Into<br />Dream Homes
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Professional virtual staging that sells properties faster at a fraction of traditional staging costs. Showcase the true potential of any space.
          </p>
        </div>
      </section>

      {/* Interactive Before/After Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">See the Transformation</h2>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <div className="relative h-[400px] md:h-[600px]">
                {/* Before Image */}
                <Image
                  src="/placeholder.svg?height=600&width=800&query=empty+living+room"
                  alt="Empty room before staging"
                  fill
                  className="object-cover"
                />
                {/* After Image with Clip */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - beforeAfterPosition}% 0 0)` }}
                >
                  <Image
                    src="/placeholder.svg?height=600&width=800&query=staged+modern+living+room"
                    alt="Room after virtual staging"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Slider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                  style={{ left: `${beforeAfterPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4 text-gray-600 absolute -left-1" />
                    <ChevronRight className="w-4 h-4 text-gray-600 absolute -right-1" />
                  </div>
                </div>
              </div>
              {/* Slider Control */}
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterPosition}
                onChange={(e) => setBeforeAfterPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />
              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded">Before</div>
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">After</div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section id="stats-section" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">{viewCount}+</div>
              <p className="text-gray-600">More Property Views</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">{leadCount}%</div>
              <p className="text-gray-600">Increase in Leads</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">{saleCount}%</div>
              <p className="text-gray-600">Faster Sales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Style Selector Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Choose Your Style</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Select from our curated collection of professional staging styles
            </p>

            {/* Style Tabs */}
            <Tabs value={selectedStyle} onValueChange={setSelectedStyle} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-8">
                {styles.map((style) => (
                  <TabsTrigger key={style.id} value={style.id} className="flex flex-col gap-1">
                    <style.icon className="w-5 h-5" />
                    <span className="text-xs md:text-sm">{style.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {styles.map((style) => (
                <TabsContent key={style.id} value={style.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`/placeholder.svg?height=400&width=600&query=${style.id}+staged+living+room`}
                        alt={`${style.name} style staging`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-serif mb-4">{style.name} Style</h3>
                      <p className="text-gray-600 mb-6">
                        {style.id === "modern" &&
                          "Clean lines, neutral colors, and contemporary furniture create a fresh, sophisticated look that appeals to today's buyers."}
                        {style.id === "traditional" &&
                          "Classic furniture pieces, warm colors, and timeless design elements create a welcoming, familiar atmosphere."}
                        {style.id === "scandinavian" &&
                          "Minimalist design with light woods, cozy textiles, and a bright, airy feel that maximizes space and light."}
                        {style.id === "industrial" &&
                          "Raw materials, exposed elements, and urban-inspired furniture create a trendy, metropolitan vibe."}
                        {style.id === "luxury" &&
                          "High-end furniture, rich textures, and elegant accessories create an aspirational, premium living experience."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#2d4654]/10 text-[#2d4654] rounded-full text-sm">
                          Most Popular
                        </span>
                        <span className="px-3 py-1 bg-[#2d4654]/10 text-[#2d4654] rounded-full text-sm">
                          Quick Turnaround
                        </span>
                        <span className="px-3 py-1 bg-[#2d4654]/10 text-[#2d4654] rounded-full text-sm">
                          Customizable
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Build Your Package</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Select the rooms you want to stage and see instant pricing
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Select Rooms to Stage</h3>
                <div className="space-y-4">
                  {roomTypes.map((room) => (
                    <Card key={room.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={room.id}
                            checked={selectedRooms.includes(room.id)}
                            onCheckedChange={() => handleRoomToggle(room.id, room.price)}
                          />
                          <Label htmlFor={room.id} className="flex items-center gap-2 cursor-pointer">
                            <room.icon className="w-5 h-5 text-gray-500" />
                            <span>{room.name}</span>
                          </Label>
                        </div>
                        <span className="font-semibold">${room.price}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="p-6 sticky top-4">
                  <h3 className="text-xl font-semibold mb-6">Your Package</h3>
                  {selectedRooms.length === 0 ? (
                    <p className="text-gray-500 mb-6">Select rooms to see pricing</p>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {selectedRooms.map((roomId) => {
                        const room = roomTypes.find((r) => r.id === roomId)
                        return room ? (
                          <div key={roomId} className="flex justify-between">
                            <span>{room.name}</span>
                            <span>${room.price}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  )}

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-semibold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                    {selectedRooms.length >= 3 && (
                      <p className="text-sm text-green-600 mt-2">You qualify for a 10% bulk discount!</p>
                    )}
                  </div>

                  <Button asChild className="w-full" size="lg" disabled={selectedRooms.length === 0}>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Why Choose Virtual Staging?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <DollarSign className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">90% Cost Savings</h3>
                <p className="text-gray-600">
                  Virtual staging costs a fraction of traditional staging while delivering the same visual impact
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Clock className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">24-48 Hour Delivery</h3>
                <p className="text-gray-600">
                  Get professionally staged photos back in days, not weeks, keeping your listings moving fast
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Palette className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Unlimited Revisions</h3>
                <p className="text-gray-600">
                  Not happy with a style? We'll revise until it's perfect at no additional cost
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Home className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">No Physical Logistics</h3>
                <p className="text-gray-600">
                  No moving trucks, no storage, no coordination - just upload photos and we handle the rest
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <TrendingUp className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Proven ROI</h3>
                <p className="text-gray-600">
                  Staged homes sell 73% faster and for up to 10% more than unstaged properties
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-[#2d4654] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Buyer Psychology</h3>
                <p className="text-gray-600">
                  Help buyers visualize themselves in the space, creating emotional connections that drive offers
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Simple 4-Step Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2d4654] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Upload Photos</h3>
                <p className="text-gray-600 text-sm">Send us high-quality photos of empty or cluttered rooms</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#2d4654] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Choose Style</h3>
                <p className="text-gray-600 text-sm">Select from our design styles or let us recommend</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#2d4654] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">We Stage</h3>
                <p className="text-gray-600 text-sm">Our designers virtually furnish and decorate the space</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#2d4654] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Download & List</h3>
                <p className="text-gray-600 text-sm">Receive staged photos ready for MLS and marketing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Is virtual staging legal and ethical?</h3>
                <p className="text-gray-600">
                  Yes, virtual staging is completely legal when properly disclosed. We provide disclosure text for all
                  listings and watermarks are available upon request.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">What photo requirements do you have?</h3>
                <p className="text-gray-600">
                  We need high-resolution photos (minimum 1920x1080) taken from a straight angle with good lighting. Our
                  team can guide you on best practices for photos.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can you remove existing furniture?</h3>
                <p className="text-gray-600">
                  Yes! We offer furniture removal services to clear cluttered or outdated furniture before adding
                  virtual staging. This service is available for an additional fee.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">How many revisions are included?</h3>
                <p className="text-gray-600">
                  We include unlimited revisions within 7 days of delivery. We want you to be completely satisfied with
                  the final result.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-2">Do you offer bulk discounts?</h3>
                <p className="text-gray-600">
                  Yes! We offer 10% off for 3+ rooms, 15% off for 5+ rooms, and custom pricing for large projects or
                  ongoing partnerships.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif mb-6 text-gray-700">
              "Virtual staging transformed our vacant listings. We're seeing 3x more online engagement and properties
              are moving 50% faster. It's become an essential part of our marketing strategy."
            </blockquote>
            <cite className="text-gray-600">
              <span className="font-semibold">Jennifer Martinez</span>
              <span className="block">Luxury Real Estate Specialist, Toronto</span>
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
