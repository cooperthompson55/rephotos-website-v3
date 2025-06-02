import { HeroSection } from "@/components/home/HeroSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection"

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

      <ServicesSection />
      <CaseStudySection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <CTASection />
    </div>
  )
}
