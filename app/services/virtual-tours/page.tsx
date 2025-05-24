import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Globe, Smartphone, Ruler, Home, CheckCircle, ArrowRight, Play, Users, Star } from "lucide-react"

export default function VirtualToursPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/waves-pattern.svg" alt="" fill className="object-cover" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-32 md:py-40">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white">Virtual Tours</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">3D Virtual Tours</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Immersive 3D experiences that let buyers explore properties from anywhere, anytime. Our Matterport
              technology creates stunning virtual walkthroughs that increase engagement and accelerate sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/contact">
                  Get Virtual Tour Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-primary hover:bg-white hover:text-primary"
              >
                <Link href="/portfolio">View Sample Tours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Virtual Tours Drive Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Properties with virtual tours receive significantly more engagement and sell faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">More Online Views</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">40%</div>
              <div className="text-gray-600">Faster Sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Property Access</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">87%</div>
              <div className="text-gray-600">Buyer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Advanced Virtual Tour Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Matterport technology delivers industry-leading virtual experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">3D Walkthrough</h3>
                <p className="text-gray-600">
                  Immersive 3D navigation that lets viewers move through the property naturally, exploring every room
                  and detail.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Dollhouse View</h3>
                <p className="text-gray-600">
                  Unique 3D dollhouse perspective that shows the entire property layout and spatial relationships at a
                  glance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Ruler className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Measurement Tools</h3>
                <p className="text-gray-600">
                  Built-in measurement tools allow viewers to check dimensions and distances throughout the property.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">VR Compatible</h3>
                <p className="text-gray-600">
                  Full virtual reality support for the most immersive property viewing experience possible.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">Mobile Optimized</h3>
                <p className="text-gray-600">
                  Seamless experience across all devices - desktop, tablet, and mobile with touch-friendly navigation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">24/7 Access</h3>
                <p className="text-gray-600">
                  Buyers can tour properties anytime, anywhere, reducing scheduling conflicts and increasing viewing
                  opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Virtual Tour Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our virtual tours across different property types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=luxury modern home interior living room"
                  alt="Luxury Home Virtual Tour"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Luxury Home</h3>
                  <p className="text-white/80 text-sm">4,500 sq ft • 5 bed • 4 bath</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=modern condo apartment interior kitchen"
                  alt="Condo Virtual Tour"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Modern Condo</h3>
                  <p className="text-white/80 text-sm">1,200 sq ft • 2 bed • 2 bath</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/placeholder.svg?height=300&width=400&query=commercial office space interior modern"
                  alt="Commercial Space Virtual Tour"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1">Commercial Space</h3>
                  <p className="text-white/80 text-sm">3,000 sq ft • Office • Retail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Virtual Tour Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional 3D scanning and processing for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Property Scan</h3>
              <p className="text-gray-600">
                Professional Matterport scanning captures every detail of your property in high-resolution 3D.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">3D Processing</h3>
              <p className="text-gray-600">
                Advanced processing creates the immersive 3D model with dollhouse view and floor plans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Enhancement</h3>
              <p className="text-gray-600">
                We add custom branding, information tags, and optimize for maximum engagement.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">Delivery</h3>
              <p className="text-gray-600">
                Receive your virtual tour with embed codes, direct links, and marketing materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Virtual Tour Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional 3D virtual tours for every property type and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">Starter</h3>
                <div className="text-3xl font-bold text-primary mb-4">$299</div>
                <p className="text-gray-600 mb-6">Perfect for smaller properties</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 2,000 sq ft</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">3D Walkthrough</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Dollhouse View</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Floor Plans</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">Professional</h3>
                <div className="text-3xl font-bold text-primary mb-4">$499</div>
                <p className="text-gray-600 mb-6">Ideal for most properties</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 4,000 sq ft</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">3D Walkthrough</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Dollhouse View</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Floor Plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Measurement Tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Custom Branding</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">Premium</h3>
                <div className="text-3xl font-bold text-primary mb-4">$799</div>
                <p className="text-gray-600 mb-6">For luxury properties</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 6,000 sq ft</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">VR Compatibility</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Information Tags</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Lead Capture</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-semibold text-primary mb-2">Commercial</h3>
                <div className="text-3xl font-bold text-primary mb-4">$1,299</div>
                <p className="text-gray-600 mb-6">For commercial properties</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Up to 10,000 sq ft</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Multiple Floors</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Advanced Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">Priority Support</span>
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Virtual Tour FAQ</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about our 3D virtual tour services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">How long does scanning take?</h3>
                <p className="text-gray-600 mb-6">
                  Scanning typically takes 1-3 hours depending on property size. We work efficiently to minimize
                  disruption to your schedule.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">When will my tour be ready?</h3>
                <p className="text-gray-600 mb-6">
                  Virtual tours are typically delivered within 24-48 hours after scanning, complete with all viewing
                  options and embed codes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Can I add information to the tour?</h3>
                <p className="text-gray-600 mb-6">
                  Yes! We can add custom information tags, room labels, and property details throughout the virtual
                  tour.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Is the tour mobile-friendly?</h3>
                <p className="text-gray-600 mb-6">
                  Our virtual tours work seamlessly on all devices - desktop, tablet, and mobile with intuitive touch
                  navigation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Can I track tour engagement?</h3>
                <p className="text-gray-600 mb-6">
                  Yes, we provide analytics showing view counts, time spent, and user engagement to help measure
                  marketing effectiveness.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Do you offer virtual staging?</h3>
                <p className="text-gray-600 mb-6">
                  We can integrate virtual staging into your 3D tour, allowing viewers to see furnished and unfurnished
                  versions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif text-primary mb-8 leading-relaxed">
              "The virtual tour was a game-changer for our listing. We had 300% more online engagement and received
              multiple offers within the first week. Buyers loved being able to explore the property in detail before
              visiting."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">Sarah Chen</div>
                <div className="text-gray-600">Royal LePage Realtor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/waves-pattern.svg" alt="" fill className="object-cover" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Create Your Virtual Tour?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Give your listings the competitive edge with immersive 3D virtual tours that engage buyers and accelerate
            sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">
                Schedule Virtual Tour
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="tel:+1234567890">Call (123) 456-7890</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
