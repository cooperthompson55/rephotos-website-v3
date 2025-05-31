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

  // Add type for room counts
  type RoomId = 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'dining' | 'office';
  type RoomCounts = Record<RoomId, number>;
  const initialRoomCounts: RoomCounts = {
    living: 0,
    bedroom: 0,
    kitchen: 0,
    bathroom: 0,
    dining: 0,
    office: 0,
  };
  const [roomCounts, setRoomCounts] = useState<RoomCounts>(initialRoomCounts);

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

  // Helper to update room count
  const updateRoomCount = (roomId: RoomId, delta: number) => {
    setRoomCounts((prev) => {
      const newCount = Math.max(0, (prev[roomId] || 0) + delta);
      return { ...prev, [roomId]: newCount };
    });
  };

  // Calculate total price
  const totalImages = Object.values(roomCounts).reduce((sum, count) => sum + count, 0);
  const totalPrice = (totalImages * 39.99).toFixed(2);

  const handleRoomToggle = (roomId: string, price: number) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId))
    } else {
      setSelectedRooms([...selectedRooms, roomId])
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
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">Up to 3x</div>
              <p className="text-gray-600">More online views when listings include virtual tours and floor plans</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">90%</div>
              <p className="text-gray-600">Of buyers say virtual tours help them make faster decisions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#2d4654] mb-2">67%</div>
              <p className="text-gray-600">Of listings with virtual media sell faster than those without</p>
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
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Build Your Virtual Staging Package</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Select the rooms you want staged – flat rate $39.99 per image
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Choose Rooms to Stage</h3>
                <div className="space-y-4">
                  {[
                    { id: "living", name: "Living Room", icon: Sofa },
                    { id: "bedroom", name: "Bedroom", icon: Bed },
                    { id: "kitchen", name: "Kitchen", icon: ChefHat },
                    { id: "bathroom", name: "Bathroom", icon: Bath },
                    { id: "dining", name: "Dining Room", icon: Home },
                    { id: "office", name: "Home Office", icon: Building },
                  ].map((room) => (
                    <Card key={room.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <room.icon className="w-5 h-5 text-gray-500" />
                          <span>{room.name} – $39.99</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="px-2 py-1 bg-gray-200 rounded text-lg font-bold"
                            onClick={() => updateRoomCount(room.id as RoomId, -1)}
                            aria-label={`Remove one ${room.name}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center">{roomCounts[room.id as RoomId]}</span>
                          <button
                            type="button"
                            className="px-2 py-1 bg-gray-200 rounded text-lg font-bold"
                            onClick={() => updateRoomCount(room.id as RoomId, 1)}
                            aria-label={`Add one ${room.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card className="p-6 sticky top-4">
                  <h3 className="text-xl font-semibold mb-6">Your Price</h3>
                  {totalImages === 0 ? (
                    <p className="text-gray-500 mb-6">Select rooms to see pricing</p>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {Object.entries(roomCounts).filter(([, count]) => count > 0).map(([roomId, count]) => {
                        const room = {
                          living: "Living Room",
                          bedroom: "Bedroom",
                          kitchen: "Kitchen",
                          bathroom: "Bathroom",
                          dining: "Dining Room",
                          office: "Home Office",
                        }[roomId as RoomId];
                        return (
                          <div key={roomId} className="flex justify-between">
                            <span>{room}</span>
                            <span>{count} × $39.99</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-xl font-semibold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full" size="lg" disabled={totalImages === 0}>
                    <Link href="/book-now">Get Started</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (replaces testimonial) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Why Choose Our Virtual Staging?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FAF9F7] rounded-lg shadow p-8 flex flex-col items-center text-center border">
                <span className="text-3xl mb-4">📋</span>
                <div className="font-bold text-lg mb-2">MLS-Compliant & Listing-Ready</div>
                <div className="text-gray-600">Every image includes both staged and original versions to meet MLS rules and avoid any compliance issues.</div>
              </div>
              <div className="bg-[#FAF9F7] rounded-lg shadow p-8 flex flex-col items-center text-center border">
                <span className="text-3xl mb-4">⚡</span>
                <div className="font-bold text-lg mb-2">Flat-Rate Pricing with Fast Delivery</div>
                <div className="text-gray-600">No surprises—$39.99 per image with 24–48 hour turnaround. Rush options available.</div>
              </div>
              <div className="bg-[#FAF9F7] rounded-lg shadow p-8 flex flex-col items-center text-center border">
                <span className="text-3xl mb-4">🔄</span>
                <div className="font-bold text-lg mb-2">Unlimited Revisions for 7 Days</div>
                <div className="text-gray-600">We'll tweak the design until it's right. Style changes, furniture swaps, no extra charge within the revision window.</div>
              </div>
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
            <p className="text-xl text-gray-600 text-center mb-10">Answers about our virtual staging process, pricing, and what's included.</p>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Is virtual staging legal and ethical?</h3>
                <p className="text-gray-600">
                  Yes. Virtual staging is completely legal and widely used in real estate. We include staged and non-staged versions of each image to stay MLS compliant and can add disclosure text or watermarks if requested.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can you remove existing furniture?</h3>
                <p className="text-gray-600">
                  Yes. We offer virtual furniture removal to clear out clutter or outdated items before staging. Just let us know which items to remove—this is billed as an add-on per image.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How many revisions are included?</h3>
                <p className="text-gray-600">
                  Unlimited revisions are included for 7 days after delivery. We want you to be fully satisfied with the result.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">How long does it take?</h3>
                <p className="text-gray-600">
                  Most virtual staging orders are delivered within 24–48 hours. Rush options are available if you're in a time crunch.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Can I choose the style of staging?</h3>
                <p className="text-gray-600">
                  Yes. You can request specific styles (modern, cozy, luxury, etc.) or let our design team choose what fits the room best. We'll work with your preferences.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">What rooms can be staged?</h3>
                <p className="text-gray-600">
                  We stage any room: living rooms, bedrooms, kitchens, offices, bathrooms, dining rooms, and more. Each image is $39.99 flat—no hidden fees.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
