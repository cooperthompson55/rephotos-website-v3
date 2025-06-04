import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Globe, Smartphone, Ruler, Home, CheckCircle, ArrowRight, Play, Users, Star } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

export default function VirtualToursPage() {
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
            <span className="text-white">3D Virtual Tours</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">3D VIRTUAL TOURS</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Immerse Buyers With 3D Virtual Tours
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Professional 3D virtual tours for every property type and budget. Let buyers explore every detail online.
          </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg bg-black">
              <iframe width="100%" height="400" src="https://my.matterport.com/show/?m=VBL9LR86Hv5" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"></iframe>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg bg-black">
              <iframe width="100%" height="400" src="https://my.matterport.com/show/?m=BBPo2Z39gRq" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"></iframe>
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Virtual Tour Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interactive Matterport tours priced by property size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-500 text-center mb-2">Up to 999 sq ft</h3>
                <div className="text-3xl font-bold text-primary mb-4 text-center">$199.99</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Smooth 3D Walkthrough Experience</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Dollhouse View Included</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Delivered in 24 hrs</span></li>
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild className="w-full"><Link href="/book-now">Choose Tour</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-500 text-center mb-2">1,000–1,999 sq ft</h3>
                <div className="text-3xl font-bold text-primary mb-4 text-center">$239.99</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">360° Walkthrough with Room Labels</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Dollhouse + Floor Plan View</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Delivered in 24–36 hrs</span></li>
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild className="w-full"><Link href="/book-now">Choose Tour</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-500 text-center mb-2">2,000–2,999 sq ft</h3>
                <div className="text-3xl font-bold text-primary mb-4 text-center">$279.99</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Interactive 3D Tour with Navigation Tags</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Branded & Unbranded Links</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Delivered in 24–48 hrs</span></li>
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild className="w-full"><Link href="/book-now">Choose Tour</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-500 text-center mb-2">3,000–3,999 sq ft</h3>
                <div className="text-3xl font-bold text-primary mb-4 text-center">$319.99</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Full Property Scan in 4K Detail</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Includes Floor Plan View & Hotspot Navigation</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Delivered in 48 hrs</span></li>
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild className="w-full"><Link href="/book-now">Choose Tour</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-primary/50 transition-colors h-full flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                <h3 className="text-sm font-semibold text-gray-500 text-center mb-2">4,000–4,999 sq ft</h3>
                <div className="text-3xl font-bold text-primary mb-4 text-center">$349.99</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Advanced Multi-Zone Tour Experience</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Lead Capture + Analytics Enabled</span></li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span className="text-sm">Delivered in 48–72 hrs</span></li>
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild className="w-full"><Link href="/book-now">Choose Tour</Link></Button>
                </div>
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
              Common questions about our Matterport 3D virtual tour services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">How long does the scan take?</h3>
                <p className="text-gray-600 mb-6">
                  Most scans take 30 minutes to 2 hours depending on square footage and layout. We work quickly and efficiently with minimal disruption.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">When will I get the finished tour?</h3>
                <p className="text-gray-600 mb-6">
                  You'll receive the completed virtual tour within 24–48 hours, including shareable links and MLS-ready embed codes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Can I add custom info to the tour?</h3>
                <p className="text-gray-600 mb-6">
                  Yes. We can add info tags, room labels, and even feature callouts to highlight selling points inside the home.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Is the tour compatible with mobile?</h3>
                <p className="text-gray-600 mb-6">
                  Absolutely. All tours are responsive and work smoothly on phones, tablets, and desktops with easy tap-to-move navigation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Do you offer virtual staging inside the tour?</h3>
                <p className="text-gray-600 mb-6">
                  We can digitally stage empty rooms and blend them into the 3D experience so buyers see both unfurnished and furnished versions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Do you use iGuide for your virtual tours?</h3>
                <p className="text-gray-600 mb-6">
                  No. We use Matterport because of its higher image quality, smoother navigation, and better overall viewer experience compared to iGuide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-2">
            <div className="uppercase tracking-widest text-xs text-gray-400 mb-4">Client Success</div>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-12">Trusted by top real estate professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F7] rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <div className="text-3xl mb-4">🔗</div>
              <div className="font-bold mb-2">MLS-Ready + Branded Versions</div>
              <div className="text-gray-600 text-sm">Each tour comes with both branded and unbranded links—perfect for agent marketing and MLS compliance without any extra steps.</div>
            </div>
            <div className="bg-[#FAF9F7] rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <div className="text-3xl mb-4">⚡</div>
              <div className="font-bold mb-2">Delivered Fast, No Hassle</div>
              <div className="text-gray-600 text-sm">Tours are scanned, edited, and delivered within 24–48 hours so your listing goes live quickly and looks polished from day one.</div>
            </div>
            <div className="bg-[#FAF9F7] rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center text-center">
              <div className="text-3xl mb-4">🏠</div>
              <div className="font-bold mb-2">Smooth, Realistic Experience</div>
              <div className="text-gray-600 text-sm">Matterport's industry-leading tech gives buyers a true feel for the layout and flow—way more immersive than photos or slideshows.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
