import { CTASection } from "../../components/home/CTASection"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Camera, Clock, Award, Users, Zap, Shield, Star, CheckCircle } from "lucide-react"

const differentiators = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24-Hour Turnaround",
    description: "Get your professionally edited photos delivered by 9 AM the next business day, guaranteed.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Award-Winning Quality",
    description: "Our visual artists have won multiple industry awards for excellence in real estate photography.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Dedicated Support",
    description: "Personal account managers and responsive customer service ensure your success.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Cutting-Edge Technology",
    description: "Latest equipment and editing techniques deliver stunning results every time.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Fully Insured",
    description: "Complete liability coverage and bonded photographers give you peace of mind.",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "5-Star Service",
    description: "Consistently rated 5 stars by real estate professionals across Southern Ontario.",
  },
]

const stats = [
  {
    number: "50,000+",
    label: "Properties Photographed",
    description: "Trusted by thousands of real estate professionals",
  },
  {
    number: "24hrs",
    label: "Average Turnaround",
    description: "Industry-leading delivery speed",
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    description: "Consistently exceeding expectations",
  },
  {
    number: "15+",
    label: "Years Experience",
    description: "Proven track record in real estate marketing",
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
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-repeat opacity-10 z-0"></div>

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
                <Link href="/quote">Get Started Today</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-light text-secondary mb-2">{stat.number}</div>
                <h3 className="text-lg font-medium mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
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
                <div className="space-y-4">
                  <div className="h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                      alt="Professional real estate photography"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
                      alt="Interior photography"
                      width={300}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                      alt="Living room photography"
                      width={300}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5"
                      alt="Exterior photography"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
            {testimonialHighlights.map((testimonial, index) => (
              <div key={index} className="bg-[#F8F5F0] p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-secondary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Equipment Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/why-us/1.jpg"
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
                  <Zap className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Advanced Lighting Equipment</h4>
                    <p className="text-sm text-gray-600">
                      Professional strobes and continuous lighting for perfect exposure
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
