import { CTASection } from "../../components/home/CTASection"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Camera, Clock, Award, Users, Zap, Shield, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const differentiators = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Next-Day Delivery",
    description: "Professionally edited photos delivered by the next business day, so you're never waiting to list.",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Reliable Quality",
    description: "Crisp, bright, consistent visuals that help listings show their full potential every time.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Responsive Support",
    description: "Get direct help when you need it — no call centers, just real communication that respects your time.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Streamlined Process",
    description: "From booking to delivery, everything is designed to be fast, simple, and stress-free.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Trusted by Agents",
    description: "RePhotos is the go-to media partner for agents who care about how their listings look and perform.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Built for Realtors",
    description: "We understand what moves listings. Our services are tailored to help agents stand out in a competitive market.",
  },
]

const stats = [
  {
    number: "24hr",
    label: "Turnaround Time",
    description: "Photos are edited and delivered fast — usually within 24 hours or less.",
  },
  {
    number: "Top Agents",
    label: "Trust RePhotos",
    description: "We work with serious agents who care about quality, speed, and results.",
  },
  {
    number: "Client-Focused",
    label: "Service First",
    description: "Easy communication, flexible scheduling, and consistent results every time.",
  },
  {
    number: "Built for the Market",
    label: "Modern Visuals That Sell",
    description: "Everything we shoot is designed to help listings stand out and move faster.",
  },
]

const howItWorksSteps = [
  {
    step: "01",
    title: "Book Your Shoot",
    description: "Schedule online in minutes. Choose your services, date, and time that works for you.",
    image: "https://ext.same-assets.com/148878086/2444529349.png",
    details: [
      "Easy online booking system",
      "Flexible scheduling options",
      "Instant confirmation",
      "Pre-shoot consultation",
    ],
  },
  {
    step: "02",
    title: "Professional Shoot",
    description: "Our certified visual artists arrive on time with professional equipment and expertise.",
    image: "https://ext.same-assets.com/148878086/1472744727.png",
    details: [
      "Certified professional photographers",
      "State-of-the-art equipment",
      "Comprehensive shot list",
      "On-site quality assurance",
    ],
  },
  {
    step: "03",
    title: "Expert Editing",
    description: "Your photos are professionally edited using advanced techniques and industry best practices.",
    image: "https://ext.same-assets.com/148878086/4054706207.png",
    details: [
      "HDR processing and color correction",
      "Virtual staging available",
      "Sky replacement when needed",
      "Quality control review",
    ],
  },
  {
    step: "04",
    title: "Fast Delivery",
    description: "Receive your stunning, market-ready photos by 9 AM the next business day.",
    image: "https://ext.same-assets.com/148878086/4106215454.png",
    details: [
      "24-hour guaranteed turnaround",
      "High-resolution downloads",
      "Multiple format options",
      "Unlimited usage rights",
    ],
  },
]

const benefits = [
  {
    title: "Sell Faster",
    description: "Properties with professional photography sell 32% faster than those without.",
    icon: "⚡",
  },
  {
    title: "Higher Prices",
    description: "Professional photos can increase your listing price by up to 11%.",
    icon: "💰",
  },
  {
    title: "More Views",
    description: "Listings with professional photos receive 118% more online views.",
    icon: "👁️",
  },
  {
    title: "Better Impressions",
    description: "94% of buyers start their search online - make that first impression count.",
    icon: "✨",
  },
]

const testimonialHighlights = [
  {
    quote:
      "RePhotos has transformed how I market my listings. The quality is unmatched and the turnaround time is incredible.",
    author: "Sarah Chen",
    title: "Top Producer, Royal LePage",
    avatar: "https://ext.same-assets.com/148878086/2418568282.jpeg",
  },
  {
    quote: "I've tried other photography services, but none come close to RePhotos' consistency and professionalism.",
    author: "Michael Rodriguez",
    title: "Broker, Century 21",
    avatar: "https://ext.same-assets.com/148878086/4192820443.jpeg",
  },
  {
    quote: "The investment in RePhotos pays for itself. My listings get more attention and sell faster.",
    author: "Jennifer Park",
    title: "Agent, Coldwell Banker",
    avatar: "https://ext.same-assets.com/148878086/1302349157.jpeg",
  },
]

export default function WhyUsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-18 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-no-repeat bg-cover opacity-10 z-0"></div>

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <h6 className="text-sm uppercase tracking-wider text-white font-medium">Why Choose RePhotos</h6>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 text-white">
              The difference is in the details
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              When every listing matters, choose the real estate photography service that consistently delivers
              exceptional results, faster turnaround times, and unmatched customer service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/book-now">Get Started Today</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">The Impact</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Why agents choose RePhotos</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our service is built for speed, trust, and results. Here's what sets us apart in the market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center h-full">
              <Clock className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 min-h-[56px] flex items-center justify-center">24hr Turnaround Time</h3>
              <p className="text-gray-600">Photos are edited and delivered fast — usually within 24 hours or less.</p>
            </div>
            <div className="flex flex-col items-center h-full">
              <Users className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 min-h-[56px] flex items-center justify-center">Top Agents Trust RePhotos</h3>
              <p className="text-gray-600">We work with serious agents who care about quality, speed, and results.</p>
            </div>
            <div className="flex flex-col items-center h-full">
              <Star className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 min-h-[56px] flex items-center justify-center">Client-Focused Service First</h3>
              <p className="text-gray-600">Easy communication, flexible scheduling, and consistent results every time.</p>
            </div>
            <div className="flex flex-col items-center h-full">
              <Zap className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 min-h-[56px] flex items-center justify-center">Built for the Market</h3>
              <p className="text-gray-600">Everything we shoot is designed to help listings stand out and move faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Advantages</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Why real estate professionals choose RePhotos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We've built our reputation on delivering exceptional results, unmatched speed, and personalized service
              that helps you sell properties faster and at better prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary mb-4">{item.icon}</div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">The Impact</h6>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                Professional photography drives results
              </h2>
              <p className="text-gray-600 mb-8">
                The numbers don't lie. Professional real estate photography isn't just about pretty pictures—it's about
                driving real business results that impact your bottom line.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/why-us/impact_1.jpg"
                    alt="Impact 1"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/why-us/impact_2.jpg"
                    alt="Impact 2"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/why-us/impact_3.jpg"
                    alt="Impact 3"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/why-us/impact_4.jpg"
                    alt="Impact 4"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Process</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">How it works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures you get exceptional results with minimal effort. From booking to delivery,
              we've made it simple and efficient.
            </p>
          </div>

          <div className="space-y-16">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-4">
                    <div className="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center font-medium mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-serif">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">{step.description}</p>

                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="relative">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                      <div className="flex justify-center mb-6">
                        <Image
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          width={120}
                          height={120}
                          className="w-24 h-24"
                        />
                      </div>
                      <div className="text-center">
                        <h4 className="text-lg font-medium mb-2">Step {step.step}</h4>
                        <p className="text-gray-600">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Client Success</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Trusted by top real estate professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info Card 1 */}
            <Card className="bg-[#F8F5F0] p-6 rounded-lg text-center">
              <CardContent>
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-semibold mb-2">Variety of Homes Captured</h3>
                <p className="text-gray-700">From condos to luxury estates, RePhotos delivers consistent quality across every listing type. Agents count on us for clean, modern visuals that sell.</p>
              </CardContent>
            </Card>
            {/* Info Card 2 */}
            <Card className="bg-[#F8F5F0] p-6 rounded-lg text-center">
              <CardContent>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">24-Hour Turnaround</h3>
                <p className="text-gray-700">Speed matters. We deliver edited photos within 24 hours—helping agents list faster and win over sellers with quick, professional media.</p>
              </CardContent>
            </Card>
            {/* Info Card 3 */}
            <Card className="bg-[#F8F5F0] p-6 rounded-lg text-center">
              <CardContent>
                <div className="text-4xl mb-4">🏡</div>
                <h3 className="text-xl font-semibold mb-2">Trusted by Top Agents</h3>
                <p className="text-gray-700">Agents from Royal LePage, Century 21, Remax, and more use RePhotos to stand out in competitive markets. You're in good company.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology & Equipment Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/photobank/15-gallery.webp"
                alt="Professional photography equipment"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Technology</h6>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
                Cutting-edge equipment, exceptional results
              </h2>
              <p className="text-gray-600 mb-8">
                We invest in the latest photography equipment and technology to ensure every shot is perfect. From
                professional-grade cameras to advanced drone systems, we have the tools to capture your property at its
                absolute best.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Camera className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Professional Camera Systems</h4>
                    <p className="text-sm text-gray-600">
                      Full-frame DSLRs with professional lenses for maximum image quality
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Certified Drone Pilots</h4>
                    <p className="text-sm text-gray-600">Licensed and insured for safe, legal aerial photography</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
