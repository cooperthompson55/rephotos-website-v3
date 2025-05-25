import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
            <Link href="/services" className="hover:underline">Services</Link>
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
              Complete Floor Plan Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From traditional 2D architectural drawings to immersive 3D house models, we provide every format you need.
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
                  Professional architectural drawings with accurate measurements, room labels, and dimensions for
                  traditional marketing materials.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Precise measurements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Room dimensions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multiple formats
                  </li>
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
                  Detailed three-dimensional models with realistic textures, lighting, and furniture to showcase space
                  potential.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Realistic textures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Professional lighting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multiple angles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Interactive Plans</h3>
                <p className="text-gray-600 mb-4">
                  Clickable floor plans with room information, measurements, and virtual furniture placement options.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Clickable hotspots
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Room information
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Virtual staging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Multiple Formats</h3>
                <p className="text-gray-600 mb-4">
                  Receive your floor plans in various formats optimized for MLS, websites, print materials, and social
                  media.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    High-res PDF
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Web-optimized PNG
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Print-ready files
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Quick Turnaround</h3>
                <p className="text-gray-600 mb-4">
                  Professional floor plans delivered within 24-48 hours, ensuring your listings go live without delay.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    24-48 hour delivery
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Rush options available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Quality guaranteed
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Custom Branding</h3>
                <p className="text-gray-600 mb-4">
                  Floor plans branded with your logo, colors, and contact information for consistent marketing
                  materials.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Your logo & branding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom color schemes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Contact information
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Floor Plan Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See examples of our professional 2D and 3D floor plans across different property types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=modern 2D floor plan with measurements"
                  alt="2D Floor Plan Example"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Modern Condo - 2D Plan</h3>
                <p className="text-gray-600 text-sm">Professional architectural drawing with precise measurements</p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=3D house model floor plan with furniture"
                  alt="3D Floor Plan Example"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Family Home - 3D Model</h3>
                <p className="text-gray-600 text-sm">Detailed 3D visualization with realistic textures</p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=luxury home floor plan with multiple levels"
                  alt="Multi-Level Floor Plan"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Luxury Estate - Multi-Level</h3>
                <p className="text-gray-600 text-sm">Complex property with multiple floors and detailed layouts</p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=commercial office floor plan layout"
                  alt="Commercial Floor Plan"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Commercial Office</h3>
                <p className="text-gray-600 text-sm">Professional office space layout with room designations</p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=interactive floor plan with clickable rooms"
                  alt="Interactive Floor Plan"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Interactive Plan</h3>
                <p className="text-gray-600 text-sm">Clickable floor plan with room information and virtual staging</p>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=townhouse floor plan with multiple units"
                  alt="Townhouse Floor Plan"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-primary">Townhouse Complex</h3>
                <p className="text-gray-600 text-sm">Multi-unit development with individual floor plans</p>
              </div>
            </div>
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
              Transparent pricing for professional floor plans that fit your budget and marketing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-2">Basic 2D</h3>
                <div className="text-3xl font-bold text-primary mb-4">$149</div>
                <p className="text-gray-600 mb-6">Perfect for standard residential properties</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    2D floor plan
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Room dimensions
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    PDF & PNG formats
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    48-hour delivery
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-white">
                Most Popular
              </Badge>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-2">Professional 3D</h3>
                <div className="text-3xl font-bold text-primary mb-4">$299</div>
                <p className="text-gray-600 mb-6">Enhanced visualization with 3D modeling</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    2D & 3D floor plans
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Realistic textures
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multiple angles
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom branding
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    24-hour delivery
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-2">Interactive Plus</h3>
                <div className="text-3xl font-bold text-primary mb-4">$449</div>
                <p className="text-gray-600 mb-6">Interactive features and virtual staging</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Interactive hotspots
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Virtual furniture
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Web-ready format
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    24-hour delivery
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-2">Commercial</h3>
                <div className="text-3xl font-bold text-primary mb-4">$699</div>
                <p className="text-gray-600 mb-6">Large properties and commercial spaces</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Everything in Interactive
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multi-level properties
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Commercial layouts
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited revisions
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about our floor plan services and delivery process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-primary mb-3">
                How accurate are your floor plan measurements?
              </h3>
              <p className="text-gray-600">
                Our floor plans are created using professional laser measurement tools and follow architectural
                standards. We guarantee accuracy within 2% for all measurements, which exceeds industry standards for
                real estate marketing materials.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-primary mb-3">
                What's the difference between 2D and 3D floor plans?
              </h3>
              <p className="text-gray-600">
                2D floor plans are traditional architectural drawings showing room layouts, dimensions, and labels from
                a top-down view. 3D floor plans add depth, realistic textures, lighting, and furniture to help buyers
                better visualize the space and understand room flow.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-primary mb-3">How long does it take to create floor plans?</h3>
              <p className="text-gray-600">
                Standard 2D floor plans are delivered within 48 hours, while 3D models and interactive plans are
                completed within 24-48 hours. Rush delivery options are available for urgent listings with same-day or
                next-day delivery.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-primary mb-3">What file formats do you provide?</h3>
              <p className="text-gray-600">
                We provide floor plans in multiple formats including high-resolution PDF for print materials,
                web-optimized PNG for online listings, and interactive web formats for websites. All files are optimized
                for their intended use.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-primary mb-3">Can you add furniture to the floor plans?</h3>
              <p className="text-gray-600">
                Yes! Our 3D and interactive floor plans can include virtual furniture placement to help buyers visualize
                how spaces can be used. We offer both standard furniture layouts and custom arrangements based on your
                preferences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Do you handle commercial properties?</h3>
              <p className="text-gray-600">
                Absolutely. We create floor plans for all property types including residential homes, condos, commercial
                offices, retail spaces, warehouses, and multi-unit developments. Our commercial package includes
                specialized layouts and room designations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-serif text-primary mb-6 leading-relaxed">
              "The 3D floor plans from RePhotos completely transformed how buyers engage with our listings. We've seen a
              40% increase in showing requests and buyers come more prepared because they already understand the
              layout."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <Image
                src="/placeholder.svg?height=60&width=60&query=professional realtor headshot"
                alt="Client"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="text-left">
                <div className="font-semibold text-primary">Jennifer Martinez</div>
                <div className="text-gray-600">Senior Real Estate Agent, Royal LePage</div>
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
