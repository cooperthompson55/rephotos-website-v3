"use client"

import { HeroSection } from "@/components/home/HeroSection"
import { IndividualServicesSection } from "@/components/IndividualServicesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection"
import { ImageCarousel } from "@/components/ImageCarousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Video, Instagram, Plane, Images, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

const pricingTiers = [
  {
    size: "Property Highlights Video",
    duration: "1–2 minute horizontal video",
    icon: Video,
    features: [
      "Shot in 4K on iPhone",
      "Complete interior walk-through",
      "Delivered MLS-ready",
    ],
  },
  {
    size: "Social Media Reel",
    duration: "30–60 second vertical video",
    icon: Instagram,
    features: [
      "Optimized for Instagram, TikTok, and Reels",
      "Fast-paced and engagement-driven",
      "Interior footage formatted for mobile",
    ],
  },
  {
    size: "Drone Aerial Video",
    duration: "30–60 seconds of aerial footage",
    icon: Plane,
    features: [
      "High-resolution exterior shots",
      "Captures the property and surroundings",
      "Next day turnaround",
    ],
  },
  {
    size: "Slideshow Video Tour",
    duration: "Engaging visual flow of property photos",
    icon: Images,
    features: [
      "Edited to music",
      "Professional transitions",
      "Quick delivery",
    ],
  },
]

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const slideshowVideoRef = useRef<HTMLVideoElement>(null)

  // Preload critical videos for better performance
  useEffect(() => {
    // Only preload on larger screens and with good connection
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const link1 = document.createElement('link')
      link1.rel = 'preload'
      link1.as = 'video'
      link1.href = '/horizontal.mp4'
      document.head.appendChild(link1)

      const link2 = document.createElement('link')
      link2.rel = 'preload'
      link2.as = 'video'
      link2.href = '/vertical.mp4'
      document.head.appendChild(link2)

      return () => {
        document.head.removeChild(link1)
        document.head.removeChild(link2)
      }
    }
  }, [])

  const toggleMute = () => {
    if (slideshowVideoRef.current) {
      slideshowVideoRef.current.muted = !slideshowVideoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div>
      <HeroSection />
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/images/waves-pattern.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#F8F5F0', // fallback offwhite
          }}
        ></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#262F3F] leading-tight mb-6">
                Southern Ontario's best real estate photography and marketing
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                RePhotos elevates every home—and sales price—with incredible real estate photography, videography,
                aerials, and more, artfully captured to tell the home's unique story and delivered to your inbox in
                under 24 hours.
              </p>
              <a
                href="/why-us"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#262F3F] text-white font-medium rounded-md hover:bg-[#1d3644] transition-colors"
              >
                Why RePhotos
              </a>
            </div>
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#f5efe0] opacity-70"></div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:h-[600px]">
                {/* First row */}
                <div className="md:col-span-7 h-[300px] md:h-auto rounded-lg overflow-hidden shadow-md">
                  <ImageCarousel
                    images={[
                      {
                        images: [
                          "/images/photobank/fs2-gallery.webp",
                          "/images/photobank/fs2-3-gallery.webp",
                          "/images/photobank/fs2-2-gallery.webp"
                        ]
                      }
                    ]}
                    aspectRatio="4/3"
                    objectPosition="center center"
                  />
                </div>
                <div className="md:col-span-5 h-[300px] md:h-auto rounded-lg overflow-hidden shadow-md">
                  <ImageCarousel
                    images={[
                      {
                        images: [
                          "/images/photobank/fs5-gallery.webp",
                          "/images/photobank/fs5-2-gallery.webp"
                        ]
                      }
                    ]}
                    aspectRatio="1/1"
                    objectPosition="center center"
                  />
                </div>
                {/* Second row */}
                <div className="md:col-span-5 h-[300px] md:h-auto rounded-lg overflow-hidden shadow-md">
                  <ImageCarousel
                    images={[
                      {
                        images: [
                          "/images/photobank/sky-replaced-DSC_8416-HDR-gallery.webp",
                          "/images/photobank/sky-replaced-DSC_8413-HDR-gallery.webp",
                          "/images/photobank/sky-replaced-DSC_8425-HDR-gallery.webp"
                        ]
                      }
                    ]}
                    aspectRatio="1/1"
                    objectPosition="center center"
                  />
                </div>
                <div className="md:col-span-7 h-[300px] md:h-auto rounded-lg overflow-hidden shadow-md">
                  <ImageCarousel
                    images={[
                      {
                        images: [
                          "/images/photobank/fs4-gallery.webp",
                          "/images/photobank/fs4-2-gallery.webp",
                          "/images/photobank/fs4-3-gallery.webp"
                        ]
                      }
                    ]}
                    aspectRatio="16/9"
                    objectPosition="center center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Display */}
      <GalleryDisplay />

      {/* Individual Services Section */}
      <section id="services" className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <IndividualServicesSection />
        </div>
      </section>

      <CaseStudySection />

      {/* Photography Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Text content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-[#262F3F] mb-4">Photography Pricing</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Help any property stand out on the MLS, social media, and more with stunning photography by our award-winning Visual Artists.
              </p>
              <Button asChild size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Right side: Pricing details card */}
            <div className="w-full max-w-md mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">PHOTOGRAPHY</CardTitle>
                  <div className="text-center">
                    <span className="text-4xl font-extrabold">$169.00</span>
                    <p className="text-sm text-muted-foreground">starting up to 1499 sq ft</p>
                    <p className="text-xs text-muted-foreground mt-1">+$60 per 1,000 sq ft</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm font-semibold text-primary mb-4">Recommended for most listings</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <span className="font-medium">Up to 1499 sq ft</span>
                      <span className="font-bold">$169.00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md">
                      <span className="font-medium">1500–2499 sq ft</span>
                      <span className="font-bold">$229.00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <span className="font-medium">2500–3499 sq ft</span>
                      <span className="font-bold">$289.00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md">
                      <span className="font-medium">3500–4499 sq ft</span>
                      <span className="font-bold">$349.00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <span className="font-medium">4500–5499 sq ft</span>
                      <span className="font-bold">$409.00</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md">
                      <span className="font-medium">5500+ sq ft</span>
                      <Link href="/contact-us" className="font-bold text-primary hover:underline">Contact us</Link>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground text-center p-2 bg-blue-50 border border-blue-200 rounded-md">
                    ⓘ Choose a complete listing package for exclusive discounted rates.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Professional Video Services</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Professional Video Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Elevate your property marketing with our comprehensive video production services. All packages include professional editing, royalty-free music, and quick delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="relative flex flex-col">
                <CardHeader className="text-center">
                  {/* All videos use the same aspect ratio and max height for consistency */}
                  {(index === 0 || index === 1 || index === 2) && (
                    <video
                      src={
                        index === 0
                          ? "/horizontal.mp4"
                          : index === 1
                          ? "/vertical.mp4"
                          : "/aerial.mp4"
                      }
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      disableRemotePlayback
                      controlsList="nodownload noremoteplayback"
                      poster={
                        index === 0
                          ? "/images/photobank/s_2.webp"
                          : index === 1
                          ? "/images/photobank/s_3-thumb.webp"
                          : "/images/services/videography/lot_lines.gif"
                      }
                      className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                      style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {index === 3 && (
                    <div className="relative">
                      <video
                        ref={slideshowVideoRef}
                        src="/images/services/videography/824-gazley-slideshow.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        disableRemotePlayback
                        controlsList="nodownload noremoteplayback"
                        className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                        style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-center mb-4">
                    {tier.icon && <tier.icon className="w-8 h-8 text-secondary" />}
                  </div>
                  <CardTitle className="text-lg">{tier.size}</CardTitle>
                  <CardDescription>{tier.duration}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href="/services/videography">Learn more</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom video package or have special requirements?</p>
            <Button asChild variant="outline">
              <Link href="/contact-us">Contact Us for Custom Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ServiceAreasSection />
      <CTASection />
    </div>
  )
}
