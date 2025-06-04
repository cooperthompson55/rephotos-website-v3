import { HeroSection } from "@/components/home/HeroSection"
import { IndividualServicesSection } from "@/components/IndividualServicesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const pricingTiers = [
  {
    size: "Property Highlights Video",
    price: "$319.99",
    duration: "1–2 minute horizontal video",
    features: [
      "Shot in 4K on iPhone",
      "Interior walk-through",
      "Professional editing",
      "Royalty-free background music",
      "Delivered MLS-ready",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Social Media Reel",
    price: "$229.99",
    duration: "30–60 second vertical video",
    features: [
      "Optimized for Instagram, TikTok, and Reels",
      "Fast-paced and engagement-driven",
      "Interior footage formatted for mobile",
      "Royalty-free trending music",
      "Social-ready delivery",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Drone Aerial Video",
    price: "$159.99",
    duration: "30–60 seconds of aerial footage",
    features: [
      "High-resolution exterior shots",
      "Captures the property and surroundings",
      "Smooth motion edits",
      "Royalty-free music included",
      "Delivered in multiple formats",
      "Next day turnaround",
    ],
  },
]

export default function Home() {
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
              <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[500px]">
                <div className="col-span-5 row-span-3 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/images/home/1.webp"
                    alt="Modern kitchen interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-7 row-span-3 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/images/home/4.webp"
                    alt="Cozy interior space"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-8 row-span-3 rounded-lg overflow-hidden shadow-md relative">
                  <img
                    src="/images/home/3.webp"
                    alt="Modern Woodland Estate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white">
                    <p className="font-medium">RePhotos © 2025</p>
                  </div>
                </div>
                <div className="col-span-4 row-span-3 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="/images/home/2.webp"
                    alt="Luxury living room"
                    className="w-full h-full object-cover"
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
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <IndividualServicesSection />
        </div>
      </section>

      <CaseStudySection />

      {/* Video Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Video Pricing</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Video Pricing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the perfect video service to showcase your listing. All packages include professional editing, royalty-free music, and quick delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="relative">
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
                  <CardTitle className="text-lg">{tier.size}</CardTitle>
                  <div className="text-3xl font-light">{tier.price}</div>
                  <CardDescription>{tier.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <Link href="/book-now">Book Now</Link>
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
