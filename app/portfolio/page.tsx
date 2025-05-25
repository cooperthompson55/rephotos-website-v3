import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CTASection } from "@/components/home/CTASection"
import Image from "next/image"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header-texture.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90" />
        </div>
        <div className="container relative z-10 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white text-center max-w-4xl leading-tight">
            Portfolio
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-center">
            Explore our recent photography, video, and marketing projects. See how we help agents stand out and sell faster.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <GalleryDisplay />

      {/* Featured Case Study */}
      <CaseStudySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
} 