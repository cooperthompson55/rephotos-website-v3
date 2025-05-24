import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, MapPin, Shield, Clock, CheckCircle, Star, Eye } from "lucide-react"

export default function AerialPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src="/images/waves-pattern.svg"
          alt=""
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="container-wide relative z-10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-white">Aerial Photos & Video</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">Aerial Photos & Video</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Capture stunning bird's-eye perspectives that showcase properties like never before. Our FAA-certified
              drone pilots deliver breathtaking aerial photography and videography that elevates your listings above the
              competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Book Aerial Shoot</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-primary hover:bg-white hover:text-primary"
              >
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
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
              <div className="text-4xl font-serif font-light text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Client satisfaction rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">24hr</div>
              <p className="text-muted-foreground">Typical delivery time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-light text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Properties captured</p>
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
                <h3 className="text-xl font-serif font-medium mb-3">FAA Certified</h3>
                <p className="text-muted-foreground">
                  All our drone pilots are FAA Part 107 certified with full commercial insurance, ensuring legal
                  compliance and professional operation.
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
                <h3 className="text-xl font-serif font-medium mb-3">Quick Turnaround</h3>
                <p className="text-muted-foreground">
                  Professional editing and delivery within 24-48 hours, ensuring your listings go live quickly with
                  stunning aerial content.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial view luxury estate with pool and gardens"
                alt="Luxury Estate Aerial View"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Luxury Estate</h3>
                  <p className="text-sm">Aerial Photography</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial drone video of waterfront property with dock"
                alt="Waterfront Property Aerial"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Waterfront Property</h3>
                  <p className="text-sm">Aerial Video</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial view of commercial building and parking lot"
                alt="Commercial Property Aerial"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Commercial Property</h3>
                  <p className="text-sm">Aerial Photography</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial view of farm property with fields and barn"
                alt="Farm Property Aerial"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Farm Property</h3>
                  <p className="text-sm">Aerial Mapping</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial view of suburban neighborhood with houses"
                alt="Residential Neighborhood Aerial"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Residential Area</h3>
                  <p className="text-sm">Neighborhood Context</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600&query=aerial sunset view of lakefront cottage property"
                alt="Lakefront Cottage Aerial"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-serif font-medium mb-2">Lakefront Cottage</h3>
                  <p className="text-sm">Golden Hour Aerial</p>
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Basic Aerial</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$199</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>10-15 aerial photos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Multiple angles & heights</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Professional editing</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>24-hour delivery</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Basic</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-secondary border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Aerial Plus</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$299</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>20-25 aerial photos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>1-2 minute aerial video</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Property mapping shots</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Neighborhood context</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Plus</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Aerial Pro</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$399</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>30+ aerial photos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>3-4 minute cinematic video</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Golden hour shots</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Social media formats</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Pro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-medium mb-2">Commercial</h3>
                <div className="text-3xl font-serif font-light text-primary mb-4">$599</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Unlimited aerial photos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Extended video content</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Detailed property mapping</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Rush delivery available</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/contact">Choose Commercial</Link>
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
                <h3 className="text-lg font-serif font-medium mb-3">Are your drone pilots FAA certified?</h3>
                <p className="text-muted-foreground">
                  Yes, all our drone pilots hold FAA Part 107 Remote Pilot Certificates and maintain current commercial
                  insurance. We operate legally and safely in accordance with all federal aviation regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">What weather conditions affect aerial shoots?</h3>
                <p className="text-muted-foreground">
                  We monitor wind speeds, precipitation, and visibility conditions. Flights are postponed if winds
                  exceed 25 mph, during rain or snow, or when visibility is poor. We'll reschedule at no additional cost
                  for weather delays.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">Can you fly in all areas of Southern Ontario?</h3>
                <p className="text-muted-foreground">
                  We can fly in most areas, but some locations near airports or restricted airspace require special
                  authorization. We check all airspace restrictions during our planning phase and obtain necessary
                  permits when required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">
                  What's the difference between aerial photos and videos?
                </h3>
                <p className="text-muted-foreground">
                  Aerial photos are high-resolution still images perfect for MLS listings and print materials. Aerial
                  videos provide dynamic movement and cinematic perspectives ideal for virtual tours and social media
                  marketing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">How high do you fly for aerial shots?</h3>
                <p className="text-muted-foreground">
                  We typically fly between 50-400 feet above ground level, depending on the property size and desired
                  perspective. All flights comply with FAA altitude restrictions and local regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-serif font-medium mb-3">
                  Do you provide raw footage or only edited content?
                </h3>
                <p className="text-muted-foreground">
                  Our packages include professionally edited photos and videos. Raw footage can be provided upon request
                  for an additional fee. All edited content is color-corrected and optimized for web and print use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-serif font-light text-primary mb-6 leading-relaxed">
                "The aerial shots completely transformed our listing presentation. We had multiple offers within days,
                and buyers specifically mentioned how the drone footage helped them understand the property's full
                potential. The professionalism and quality exceeded our expectations."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/placeholder.svg?height=60&width=60&query=professional real estate agent headshot"
                  alt="Client"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="text-left">
                  <div className="font-medium">Sarah Mitchell</div>
                  <div className="text-sm text-muted-foreground">Royal LePage, Toronto</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <Image
          src="/images/waves-pattern.svg"
          alt=""
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
            Ready to Elevate Your Listings?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Give your properties the aerial advantage they deserve. Our professional drone photography and videography
            services will showcase your listings from breathtaking new perspectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Book Aerial Shoot</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-primary hover:bg-white hover:text-primary"
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
