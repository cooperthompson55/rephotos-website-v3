"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, MapPin, Shield, Clock, CheckCircle, Star, Eye } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"
import { useState } from "react"

export default function AerialPage() {
  const [media, setMedia] = useState<'video' | 1 | 2 | 3>('video')

  return (
    <div className="min-h-screen">
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
            <span className="text-white">Aerial Photos & Video</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">AERIAL PHOTOS & VIDEO</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Elevate Your Listings With Aerial Views
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Stunning aerial perspectives that showcase property exteriors, neighborhoods, and amenities from above.
          </p>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">68%</div>
              <p className="text-muted-foreground">More online views with aerial photos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">97%</div>
              <p className="text-muted-foreground">Satisfaction rating from agents</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">24hr</div>
              <p className="text-muted-foreground">Turnaround time on most projects</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">10+ Areas</div>
              <p className="text-muted-foreground">Servicing the GTA and beyond</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-subtitle">Professional Aerial Services</p>
            <h2 className="section-title">Elevate Your Property Marketing</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive aerial services provide unique perspectives that ground-level photography simply cannot
              achieve, giving your listings a competitive edge in today's market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Aerial Photography</h3>
                <p className="text-muted-foreground">
                  High-resolution aerial photos showcasing property boundaries, landscaping, and neighborhood context
                  from stunning bird's-eye perspectives.
                </p>
              </CardContent>
            </Card>

            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Aerial Videography</h3>
                <p className="text-muted-foreground">
                  Cinematic aerial videos with smooth movements and transitions, perfect for virtual tours and social
                  media marketing campaigns.
                </p>
              </CardContent>
            </Card>

            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Property Mapping</h3>
                <p className="text-muted-foreground">
                  Detailed aerial mapping showing property lines, acreage, and land features that help buyers understand
                  the full scope of the property.
                </p>
              </CardContent>
            </Card>

            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Transport Canada Certified</h3>
                <p className="text-muted-foreground">
                  All our drone pilots are certified by Transport Canada with full commercial insurance, ensuring legal compliance and professional operation.
                </p>
              </CardContent>
            </Card>

            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Neighborhood Context</h3>
                <p className="text-muted-foreground">
                  Showcase proximity to amenities, schools, and transportation while highlighting the property's
                  position within the broader community.
                </p>
              </CardContent>
            </Card>

            <Card className="service-card">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-3">Next-Day Delivery</h3>
                <p className="text-muted-foreground">
                  Professionally edited and delivered by the next day, so your listings go live fast with stunning aerial content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-subtitle">Our Work</p>
            <h2 className="section-title">Aerial Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of aerial photography and videography showcasing diverse property types across
              Southern Ontario.
            </p>
          </div>

          {/* Large Video or Selected Image */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-4xl aspect-video rounded-lg shadow-lg overflow-hidden">
              {media === 'video' ? (
                <iframe
                  src="https://player.vimeo.com/video/1031855047?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  title="Bronte Harbor, Oakville ON"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              ) : (
                <button
                  type="button"
                  className="w-full h-full cursor-pointer focus:outline-none"
                  onClick={() => setMedia('video')}
                  aria-label="Return to video"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <Image
                    src={`/images/photobank/drone_${media}-gallery.webp`}
                    alt={`Aerial Photo ${media}`}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </button>
              )}
            </div>
          </div>

          {/* 3 Photo Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                className="relative group overflow-hidden rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setMedia(num as 1 | 2 | 3)}
                aria-label={`Show Aerial Photo ${num}`}
              >
                <Image
                  src={`/images/photobank/drone_${num}-gallery.webp`}
                  alt={`Aerial Photo ${num}`}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-subtitle">Our Process</p>
            <h2 className="section-title">How We Capture Aerial Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our streamlined aerial photography process ensures safe, legal, and stunning results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="step-card">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-serif font-medium mb-4">
                1
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Flight Planning</h3>
              <p className="text-muted-foreground text-sm">
                We analyze the property location, check airspace restrictions, and plan optimal flight paths for the
                best shots.
              </p>
            </div>

            <div className="step-card">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-serif font-medium mb-4">
                2
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Weather Assessment</h3>
              <p className="text-muted-foreground text-sm">
                We monitor weather conditions and schedule flights during optimal lighting and wind conditions for
                safety and quality.
              </p>
            </div>

            <div className="step-card">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-serif font-medium mb-4">
                3
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Aerial Capture</h3>
              <p className="text-muted-foreground text-sm">
                Our certified pilots capture high-resolution photos and 4K video from multiple angles and elevations.
              </p>
            </div>

            <div className="step-card">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-xl font-serif font-medium mb-4">
                4
              </div>
              <h3 className="text-lg font-serif font-medium mb-3">Professional Editing</h3>
              <p className="text-muted-foreground text-sm">
                We enhance colors, adjust exposure, and deliver polished aerial content within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-subtitle">Transparent Pricing</p>
            <h2 className="section-title">Aerial Service Packages</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional aerial photography and videography packages designed for different property types and
              marketing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Aerial Photos Add-on */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">HDR Photography + Drone Shots</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$189.99</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Add-on to any photo package</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Great for highlighting views or lot size</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Transport Canada Certified</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Delivered next day</span></li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/book-now">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Aerial Photos */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Aerial Photos</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$159.99</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Standalone or added to a shoot</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>10–15 aerial shots from multiple angles</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Edited for sky replacement and clarity</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Delivered next day</span></li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/book-now">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            {/* Aerial Video */}
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Aerial Video</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$159.99</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Standalone or added to a shoot</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>30–60 sec cinematic drone video</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Perfect for social media and listings</span></li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-600" /><span>Delivered next day</span></li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/book-now">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="section-subtitle">Common Questions</p>
            <h2 className="section-title">Aerial Photography FAQ</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">Who operates your drones?</h3>
                <p className="text-muted-foreground">
                  All aerial shoots are handled by experienced operators trained in real estate media and safety protocols. We ensure smooth, high-quality results every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">What weather conditions affect drone shoots?</h3>
                <p className="text-muted-foreground">
                  We don't fly during rain, snow, or high winds. If weather conditions aren't safe, we'll reschedule your shoot at no extra cost.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">Can you fly anywhere in the GTA and surrounding regions?</h3>
                <p className="text-muted-foreground">
                  We cover most areas across the GTA and Golden Horseshoe. Some locations near airports or in controlled airspace may need special flight approval, which we handle ahead of time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">What's the difference between aerial photos and aerial video?</h3>
                <p className="text-muted-foreground">
                  Aerial photos are high-resolution stills great for MLS, brochures, and websites. Aerial video captures smooth flyovers and cinematic motion—perfect for social media or property promo reels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">How high do you fly?</h3>
                <p className="text-muted-foreground">
                  Most shots are taken between 10–50 feet to highlight the home, yard, and surrounding area in the best light. We fly safely and with intention to get the perfect angle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">How long does it take to receive the final aerial media?</h3>
                <p className="text-muted-foreground">
                  Photos are typically delivered within 24 hours. Videos take 48–72 hours depending on editing complexity. Let us know if you need a rush turnaround.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section (now 3-card feature section) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest text-muted-foreground mb-2">CLIENT SUCCESS</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">Trusted by top real estate professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/40 rounded-lg p-8 text-center shadow-sm border">
              <div className="flex justify-center mb-4 text-3xl">
                <Camera className="w-8 h-8 mx-auto text-primary" />
              </div>
              <div className="font-bold text-lg mb-2">Sell the view, not just the house</div>
              <div className="text-muted-foreground">
                Showcase lot size, surroundings, and neighborhood highlights that ground-level shots miss.
              </div>
            </div>
            <div className="bg-muted/40 rounded-lg p-8 text-center shadow-sm border">
              <div className="flex justify-center mb-4 text-3xl">
                <Video className="w-8 h-8 mx-auto text-primary" />
              </div>
              <div className="font-bold text-lg mb-2">Social-ready content</div>
              <div className="text-muted-foreground">
                Get vertical and cinematic drone video formatted for Instagram, TikTok, and YouTube—no extra editing needed.
              </div>
            </div>
            <div className="bg-muted/40 rounded-lg p-8 text-center shadow-sm border">
              <div className="flex justify-center mb-4 text-3xl">
                <Clock className="w-8 h-8 mx-auto text-primary" />
              </div>
              <div className="font-bold text-lg mb-2">Fast turnaround, no surprises</div>
              <div className="text-muted-foreground">
                Edited aerial photos in 24 hours, video in 48–72. No hidden fees or delays—just clean, sharp visuals delivered fast.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
