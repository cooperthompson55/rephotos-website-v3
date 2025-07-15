"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Clock, CheckCircle, Award, Settings, MapPin, Eye } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

export default function CaseOotesDrivePage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/photobank/48 case ootes preview/1-gallery.webp"
            alt="48 Case Ootes Drive Architecture"
            fill
            className="object-cover scale-105 transition-transform duration-1000 ease-out transform"
            priority
            quality={100}
            style={{ 
              transform: 'scale(1.05)',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10 flex flex-col justify-end h-full pb-32">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-white/90 flex items-center gap-1 mix-blend-difference">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/portfolio" className="hover:underline">Portfolio</Link>
            <span className="mx-1">/</span>
            <span className="text-white">48 Case Ootes Drive</span>
          </nav>
          
          <div className="max-w-5xl">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-block bg-white text-black text-sm font-bold rounded-full px-6 py-2.5 tracking-wide shadow-lg">
                ARCHITECTURAL SHOWCASE
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-white max-w-4xl leading-tight font-medium tracking-tight drop-shadow-2xl">
              Where Design<br />Meets Marketing
            </h1>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-lg">
                <div className="text-3xl font-serif text-white mb-1">40%</div>
                <div className="text-sm text-white/80">Increased Buyer Interest</div>
              </div>
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-lg">
                <div className="text-3xl font-serif text-white mb-1">3x</div>
                <div className="text-sm text-white/80">Faster Property Sales</div>
              </div>
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-lg hidden md:block">
                <div className="text-3xl font-serif text-white mb-1">100%</div>
                <div className="text-sm text-white/80">Client Satisfaction</div>
              </div>
            </div>
            
            {/* Property Info */}
            <div className="flex items-center gap-4 text-white backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg inline-block">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">48 Case Ootes Drive, North York</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-primary mb-2">WHY IT MATTERS</h3>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                  Professional Photography Drives Real Results
                </h2>
                <p className="text-lg text-muted-foreground">
                  In today's digital-first market, exceptional architectural photography isn't just about documentation—it's 
                  about creating an emotional connection that drives buyer action.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Increased Visibility</h3>
                    <p className="text-muted-foreground">Properties with professional photos receive 3x more online views and generate 118% more engagement.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Faster Sales</h3>
                    <p className="text-muted-foreground">High-quality architectural photos help properties sell 32% faster and often above asking price.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Premium Positioning</h3>
                    <p className="text-muted-foreground">Professional imagery helps position your development in the luxury market, attracting qualified buyers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/photobank/48 case ootes preview/2-gallery.webp"
                  alt="Architectural Detail - 48 Case Ootes Drive"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/photobank/48 case ootes preview/3-gallery.webp"
                  alt="Exterior Architecture - 48 Case Ootes Drive"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Process Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-sm font-bold tracking-wider text-primary mb-2">THE PROCESS</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Crafting Visual Excellence
            </h2>
            <p className="text-lg text-muted-foreground">
              A methodical approach to architectural photography that ensures every image tells your development's story.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-3">Golden Hour Planning</h3>
                  <p className="text-muted-foreground mb-4">
                    Careful analysis of sun paths and architectural features to determine optimal shooting times. 
                    We plan each shot to capture your development in its best light.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Site orientation analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Weather monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Lighting condition assessment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-3">Professional Equipment</h3>
                  <p className="text-muted-foreground mb-4">
                    State-of-the-art gear specifically chosen for architectural photography, ensuring exceptional image quality 
                    and versatility in any shooting condition.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Tilt-shift lenses for perspective control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Professional lighting systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Drone capabilities for aerial views</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-3">Precision Execution</h3>
                  <p className="text-muted-foreground mb-4">
                    Each shot is carefully composed and executed with attention to detail, ensuring we capture 
                    the essence of your architectural vision.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Multiple angles and perspectives</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Detail and context shots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Interior-exterior relationships</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-primary/20">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-3">Expert Post-Processing</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced editing techniques that enhance architectural features while maintaining authenticity 
                    and creating compelling marketing imagery.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Professional color grading</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Perspective correction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>High-end retouching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-sm font-bold tracking-wider text-primary mb-2">PORTFOLIO</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Architectural Excellence Captured
            </h2>
            <p className="text-lg text-muted-foreground">
              Every angle tells a story of design innovation and superior craftsmanship at 48 Case Ootes Drive.
            </p>
          </div>

          {/* Full Width Hero Shot */}
          <div className="mb-16 group relative overflow-hidden rounded-2xl">
            <Image
              src="/images/photobank/48 case ootes preview/1-gallery.webp"
              alt="Architectural Photography - Main Facade"
              width={2400}
              height={1600}
              className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-serif mb-2">Dramatic Facade Composition</h3>
              <p className="text-white/90">
                Strategic angles and natural lighting emphasize the architectural grandeur, creating an immediate emotional connection with potential buyers.
              </p>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Large Left Image */}
            <div className="col-span-12 md:col-span-8 group relative">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/photobank/48 case ootes preview/2-gallery.webp"
                  alt="Architectural Photography - Detail Shot"
                  width={1200}
                  height={900}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={100}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-serif font-medium mb-2">Material Excellence</h3>
                <p className="text-muted-foreground">
                  Detailed shots that highlight premium materials and expert craftsmanship, demonstrating the development's luxury positioning.
                </p>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="col-span-12 md:col-span-4 space-y-8">
              <div className="group relative">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/photobank/48 case ootes preview/3-gallery.webp"
                    alt="Architectural Photography - Context View"
                    width={800}
                    height={1200}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-serif font-medium mb-2">Environmental Harmony</h3>
                  <p className="text-muted-foreground">
                    Capturing how the development seamlessly integrates with its surroundings while maintaining its distinctive presence.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/photobank/48 case ootes preview/4-gallery.webp"
                    alt="Architectural Photography - Design Elements"
                    width={800}
                    height={1200}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-serif font-medium mb-2">Design Innovation</h3>
                  <p className="text-muted-foreground">
                    Highlighting unique architectural features that set this development apart in the luxury market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Ready to showcase your development?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project and create compelling architectural photography 
              that highlights the quality and craftsmanship of your development.
            </p>
                         <div className="flex justify-center">
               <Button asChild size="lg">
                 <Link href="/contact-us">Contact Me</Link>
               </Button>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
} 