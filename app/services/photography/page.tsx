import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Camera, CheckCircle, Lightbulb, Eye, Zap, Palette, Settings } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"

const photographyFeatures = [
  {
    icon: <Camera className="h-6 w-6" />,
    title: "HDR Photography",
    description:
      "High Dynamic Range imaging captures every detail from shadows to highlights, creating perfectly balanced exposures.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Professional Lighting",
    description:
      "Advanced lighting techniques and equipment ensure every room is showcased in its best possible light.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Composition Expertise",
    description:
      "Our photographers understand real estate marketing and compose shots that highlight a property's best features.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Color Correction",
    description: "Professional editing ensures accurate colors and enhances the natural beauty of each space.",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Advanced Equipment",
    description: "Full-frame cameras, professional lenses, and specialized real estate photography gear.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Turnaround",
    description: "Edited photos delivered within 24 hours, so you can start marketing immediately.",
  },
]

const photographyBenefits = [
  {
    stat: "32%",
    label: "Faster Sales",
    description: "Properties with professional photos sell significantly faster than those without",
  },
  {
    stat: "118%",
    label: "More Views",
    description: "Professional photography increases online listing views dramatically",
  },
  {
    stat: "11%",
    label: "Higher Prices",
    description: "Quality photos can increase final sale prices by up to 11%",
  },
  {
    stat: "94%",
    label: "Online Searches",
    description: "Of buyers start their property search online - make that first impression count",
  },
]

const photographyProcess = [
  {
    step: "01",
    title: "Pre-Shoot Consultation",
    description:
      "We review the property details and discuss specific requirements to ensure we capture exactly what you need.",
    details: [
      "Property walkthrough planning",
      "Shot list customization",
      "Timing optimization",
      "Special requirements discussion",
    ],
  },
  {
    step: "02",
    title: "Professional Shoot",
    description:
      "Our certified photographers arrive with professional equipment and capture comprehensive coverage of your property.",
    details: [
      "HDR bracketed exposures",
      "Multiple angles per room",
      "Exterior and interior coverage",
      "Detail and feature shots",
    ],
  },
  {
    step: "03",
    title: "Expert Post-Processing",
    description: "Advanced editing techniques enhance each image while maintaining natural, realistic appearance.",
    details: [
      "HDR processing and tone mapping",
      "Color correction and enhancement",
      "Perspective correction",
      "Sky replacement when needed",
    ],
  },
  {
    step: "04",
    title: "Quality Delivery",
    description: "High-resolution images delivered in multiple formats, ready for all your marketing needs.",
    details: ["High-resolution downloads", "Web-optimized versions", "Print-ready formats", "Unlimited usage rights"],
  },
]

const pricingTiers = [
  {
    size: "Under 1,000 sq ft",
    price: "$149.99",
    photos: "15-20 photos",
    features: [
      "HDR Photography",
      "Professional editing",
      "24-hour delivery",
      "High-resolution downloads",
      "Web-optimized versions",
    ],
  },
  {
    size: "1,000-2,000 sq ft",
    price: "$199.99",
    photos: "20-25 photos",
    features: [
      "HDR Photography",
      "Professional editing",
      "24-hour delivery",
      "High-resolution downloads",
      "Web-optimized versions",
      "Exterior shots included",
    ],
    popular: true,
  },
  {
    size: "2,000-3,000 sq ft",
    price: "$249.99",
    photos: "25-30 photos",
    features: [
      "HDR Photography",
      "Professional editing",
      "24-hour delivery",
      "High-resolution downloads",
      "Web-optimized versions",
      "Exterior shots included",
      "Detail shots",
    ],
  },
  {
    size: "3,000+ sq ft",
    price: "Custom Quote",
    photos: "30+ photos",
    features: [
      "HDR Photography",
      "Professional editing",
      "24-hour delivery",
      "High-resolution downloads",
      "Web-optimized versions",
      "Exterior shots included",
      "Detail shots",
      "Custom shot list",
    ],
  },
]

const faqItems = [
  {
    question: "How long does a photography shoot take?",
    answer:
      "Most residential shoots take 45-90 minutes depending on property size. We work efficiently while ensuring comprehensive coverage of all important areas.",
  },
  {
    question: "What should I do to prepare the property?",
    answer:
      "Turn on all lights, open blinds/curtains, remove personal items and clutter, make beds, and ensure all rooms are clean and staged. We'll provide a detailed preparation checklist upon booking.",
  },
  {
    question: "Do you shoot in all weather conditions?",
    answer:
      "We shoot in most weather conditions, but may reschedule for severe weather that could impact safety or photo quality. Overcast days often provide excellent lighting for interior shots.",
  },
  {
    question: "Can you edit out unwanted items from photos?",
    answer:
      "We can remove small items like personal photos, clutter, or minor imperfections. Major structural changes or furniture removal may require virtual staging services.",
  },
  {
    question: "What file formats do you provide?",
    answer:
      "We deliver high-resolution JPEG files optimized for both web and print use. Images are typically delivered at 300 DPI for print and web-optimized versions for online listings.",
  },
  {
    question: "Do you offer rush delivery?",
    answer:
      "Yes, we offer same-day rush delivery for an additional fee when our schedule permits. Please contact us to check availability for urgent requests.",
  },
]

export default function PhotographyServicePage() {
  return (
    <div>
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
            <span className="text-white">Photography</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">PHOTOGRAPHY</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Transform Your Listings With Stunning Photography
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Showcase your listings with professional photography that captures every detail and attracts more buyers.
          </p>
        </div>
      </section>

      {/* Benefits Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">The Impact</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Professional photography drives results</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The numbers speak for themselves. Professional real estate photography isn't just about aesthetics—it's
              about driving real business results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {photographyBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-light text-secondary mb-2">{benefit.stat}</div>
                <h3 className="text-lg font-medium mb-2">{benefit.label}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Approach</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">What makes our photography exceptional</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with artistic vision to create images that not only look beautiful but also
              drive buyer interest and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photographyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Work</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              See the difference professional photography makes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse examples of our work and see how professional photography transforms property listings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000"
                alt="Modern kitchen photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Modern Kitchen</p>
                <p className="text-white/80 text-xs">HDR Photography</p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
                alt="Luxury living room photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Luxury Living Room</p>
                <p className="text-white/80 text-xs">Professional Lighting</p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000"
                alt="Master bedroom photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Master Bedroom</p>
                <p className="text-white/80 text-xs">Natural Light Enhancement</p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000"
                alt="Modern home exterior photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Modern Exterior</p>
                <p className="text-white/80 text-xs">Architectural Photography</p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000"
                alt="Luxury bathroom photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Luxury Bathroom</p>
                <p className="text-white/80 text-xs">Detail Photography</p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1564013434775-f71db0030976?q=80&w=2000"
                alt="Twilight exterior photography"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Twilight Exterior</p>
                <p className="text-white/80 text-xs">Golden Hour Photography</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/portfolio">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Process</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">How we deliver exceptional results</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures consistent, high-quality results while making the experience effortless
              for you.
            </p>
          </div>

          <div className="space-y-16">
            {photographyProcess.map((step, index) => (
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
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Camera className="h-12 w-12 text-secondary" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-medium mb-2">Step {step.step}</h4>
                      <p className="text-gray-600">{step.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Pricing</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Transparent, value-driven pricing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our photography packages are designed to provide exceptional value while delivering the quality your
              listings deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? "border-secondary shadow-lg" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{tier.size}</CardTitle>
                  <div className="text-3xl font-light">{tier.price}</div>
                  <CardDescription>{tier.photos}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button asChild className="w-full">
                      <Link href="/quote">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom package for larger properties or special requirements?</p>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us for Custom Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">FAQ</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Frequently asked questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our photography services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-medium mb-3">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-[#F8F5F0] p-8 md:p-12 rounded-xl shadow-sm">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-2xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xl text-gray-700 italic mb-6">
                "RePhotos' photography has completely transformed how my listings perform online. The quality is
                exceptional and the turnaround time is unbeatable. My clients are always impressed with the results."
              </p>
              <div className="flex items-center justify-center">
                <Image
                  src="https://ext.same-assets.com/148878086/2418568282.jpeg"
                  alt="Sarah Chen"
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Top Producer, Royal LePage</p>
                </div>
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
