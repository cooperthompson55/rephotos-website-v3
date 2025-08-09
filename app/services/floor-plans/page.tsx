import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Ruler, Layers, Download, Zap, Users, CheckCircle, Star, ArrowRight, Play } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

export default function FloorPlansPage() {
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
            <span className="text-white">Floor Plans</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">FLOOR PLANS</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Help Buyers Visualize With Floor Plans
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Accurate and attractive floor plans to help buyers understand the space and layout of your property.
          </p>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Floor Plans Drive Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional floor plans help buyers understand space layout and increase engagement with your listings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">52%</div>
              <div className="text-gray-600">More Online Views</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">38%</div>
              <div className="text-gray-600">Longer Time on Listing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24%</div>
              <div className="text-gray-600">Faster Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Buyer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Our Floor Plan Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our range of floor plan solutions for every listing and marketing need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Ruler className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">2D Floor Plans</h3>
                <p className="text-gray-600 mb-4">
                  Accurate, clean, and professional. Perfect for MLS and print.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Precise room measurements</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Clean layout with labels</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Delivered in print + web formats</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">3D House Models</h3>
                <p className="text-gray-600 mb-4">
                  Immersive models that make your listing stand out.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Realistic furniture and textures</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Multiple camera angles</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Great for digital showings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">360° Interactive Floor Plan</h3>
                <p className="text-gray-600 mb-4">
                  Virtual walk-through experience layered over the home's layout.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Buyers explore the space at their own pace</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />See room dimensions and layout while touring</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Perfect for out-of-town or remote buyers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Delivered Formats</h3>
                <p className="text-gray-600 mb-4">You'll get your plans in:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />High-resolution PDF</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Web-optimized PNG</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Ready-to-print files</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Turnaround Time</h3>
                <p className="text-gray-600 mb-4">Fast and reliable delivery for your listings:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />24–48 hour delivery</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Rush options available</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Quality guaranteed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Accuracy & Compliance</h3>
                <p className="text-gray-600 mb-4">Fast, accurate, and MLS-compliant:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Includes measurement disclaimers</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Created with accuracy tools and CAD software</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Compliant with local real estate board guidelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Interactive 3D Floor Plan Display */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative group rounded-2xl shadow-2xl overflow-hidden border-4 border-primary/20">
              <Image
                src="/images/photobank/ChatGPT Image May 31, 2025, 01_39_06 AM-gallery.webp"
                alt="Interactive 3D Floor Plan"
                width={600}
                height={400}
                className="w-full max-w-xl h-auto object-cover"
                style={{ boxShadow: '0 8px 32px 0 rgba(80, 60, 180, 0.15)' }}
              />
            </div>
          </div>
          {/* Benefits List & CTA */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">Experience Our 3D Floor Plans</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start text-lg text-gray-700"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /> Immersive, photorealistic 3D visualization</li>
              <li className="flex items-start text-lg text-gray-700"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /> Explore every room and layout detail</li>
              <li className="flex items-start text-lg text-gray-700"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /> Perfect for marketing luxury and modern listings</li>
              <li className="flex items-start text-lg text-gray-700"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /> Helps buyers visualize space before visiting</li>
              <li className="flex items-start text-lg text-gray-700"><CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" /> MLS and web-ready formats included</li>
            </ul>
            <Button asChild size="lg" className="bg-primary text-white font-bold px-8 py-4 text-xl rounded-full shadow-lg hover:bg-primary/90 transition">
              <Link href="/book-now">Book Your 3D Floor Plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Floor Plan Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial measurements to final delivery, we ensure accuracy and quality at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Measurement & Survey</h3>
              <p className="text-gray-600">
                Professional measurement of the property using laser tools and architectural standards for precise
                accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Design & Draft</h3>
              <p className="text-gray-600">
                Creation of detailed 2D architectural drawings and 3D models using professional CAD software and design
                tools.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Review & Refine</h3>
              <p className="text-gray-600">
                Quality review process with client feedback integration and professional refinements for optimal
                presentation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Delivery & Formats</h3>
              <p className="text-gray-600">
                Final delivery in multiple formats optimized for MLS, websites, print materials, and digital marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Floor Plan Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple pricing. High-impact visuals. No hidden fees.
            </p>
          </div>

          {/* Two single-card pricing blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* 2D Floor Plans */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">2D FLOOR PLANS</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-extrabold">$119.00</span>
                  <p className="text-sm text-muted-foreground">starting up to 1499 sq ft</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">Up to 1499 sq ft</span>
                    <span className="font-bold">$119.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md">
                    <span className="font-medium">1500–2499 sq ft</span>
                    <span className="font-bold">$149.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">2500–3499 sq ft</span>
                    <span className="font-bold">$179.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md">
                    <span className="font-medium">3500–4499 sq ft</span>
                    <span className="font-bold">$209.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">4500–5499 sq ft</span>
                    <span className="font-bold">$239.00</span>
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

            {/* 3D House Model */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">3D HOUSE MODEL</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-extrabold">$159.00</span>
                  <p className="text-sm text-muted-foreground">starting up to 1499 sq ft</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">Up to 1499 sq ft</span>
                    <span className="font-bold">$159.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md">
                    <span className="font-medium">1500–2499 sq ft</span>
                    <span className="font-bold">$199.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">2500–3499 sq ft</span>
                    <span className="font-bold">$239.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md">
                    <span className="font-medium">3500–4499 sq ft</span>
                    <span className="font-bold">$279.00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                    <span className="font-medium">4500–5499 sq ft</span>
                    <span className="font-bold">$319.00</span>
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
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="uppercase tracking-widest text-gray-400 text-xs mb-2">Why Agents Choose Us</div>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-primary">Trusted for Accuracy, Speed & Flexibility</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <span className="text-4xl mb-4">📏</span>
              <div className="font-bold text-lg mb-2">Accurate & MLS-Compliant</div>
              <div className="text-gray-600">Every plan is created with pro tools, includes proper disclaimers, and meets real estate board formatting standards—so agents can list with confidence.</div>
            </div>
            <div className="bg-[#FAF8F5] rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <span className="text-4xl mb-4">⚡</span>
              <div className="font-bold text-lg mb-2">Fast Turnaround Times</div>
              <div className="text-gray-600">2D and 3D floor plans delivered within 24–48 hours. Perfect for fast-moving listings or back-to-back showings.</div>
            </div>
            <div className="bg-[#FAF8F5] rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🏠</span>
              <div className="font-bold text-lg mb-2">Flexible Options for Any Listing</div>
              <div className="text-gray-600">Whether it's a basic condo or a large detached home, we offer 2D, 3D, and 360° options that fit every type of property and marketing strategy.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
