import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Video, CheckCircle, Smartphone, Plane, Music, Zap, Edit } from "lucide-react"

const videographyFeatures = [
  {
    icon: <Video className="h-6 w-6" />,
    title: "Professional Videography",
    description:
      "Cinematic quality video production that showcases properties with smooth camera movements and professional lighting.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Social Media Reels",
    description:
      "Vertical 9:16 format videos optimized for Instagram, TikTok, and Facebook Reels to maximize social media engagement.",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Drone Footage",
    description:
      "Stunning aerial perspectives that showcase property exteriors, neighborhoods, and surrounding amenities from above.",
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Royalty-Free Music",
    description:
      "Professionally curated background music that enhances the viewing experience without licensing concerns.",
  },
  {
    icon: <Edit className="h-6 w-6" />,
    title: "Expert Editing",
    description:
      "Professional post-production with color grading, smooth transitions, and engaging pacing to captivate viewers.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Quick Turnaround",
    description: "Edited videos delivered within 48-72 hours, ready for immediate use across all marketing channels.",
  },
]

const videographyBenefits = [
  {
    stat: "87%",
    label: "Higher Engagement",
    description: "Video content receives significantly more engagement than static images on social media",
  },
  {
    stat: "4x",
    label: "More Shares",
    description: "Video listings are shared 4 times more often than photo-only listings",
  },
  {
    stat: "73%",
    label: "Faster Sales",
    description: "Properties with video tours sell faster than those with photos alone",
  },
  {
    stat: "403%",
    label: "More Inquiries",
    description: "Video listings generate significantly more buyer inquiries and showings",
  },
]

const videographyProcess = [
  {
    step: "01",
    title: "Pre-Production Planning",
    description:
      "We collaborate with you to understand the property's unique selling points and plan the perfect video strategy.",
    details: [
      "Property walkthrough and shot planning",
      "Storyboard creation for optimal flow",
      "Drone flight path planning",
      "Social media format optimization",
    ],
  },
  {
    step: "02",
    title: "Professional Filming",
    description:
      "Our certified videographers capture stunning footage using professional equipment and drone technology.",
    details: [
      "4K video recording",
      "Stabilized camera movements",
      "Licensed drone operations",
      "Multiple angle coverage",
    ],
  },
  {
    step: "03",
    title: "Expert Post-Production",
    description: "Professional editing brings your property to life with cinematic quality and engaging storytelling.",
    details: [
      "Color grading and correction",
      "Smooth transitions and pacing",
      "Royalty-free music integration",
      "Multiple format delivery",
    ],
  },
  {
    step: "04",
    title: "Multi-Format Delivery",
    description: "Receive your videos in multiple formats optimized for different platforms and marketing needs.",
    details: [
      "Landscape format for websites",
      "9:16 vertical for social media",
      "Square format for Instagram",
      "Raw footage available",
    ],
  },
]

const pricingTiers = [
  {
    size: "Basic Video Package",
    price: "$299.99",
    duration: "1-2 minute video",
    features: [
      "Interior walkthrough video",
      "Professional editing",
      "Royalty-free music",
      "Multiple format delivery",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Social Media Package",
    price: "$399.99",
    duration: "30-60 second reel",
    features: [
      "9:16 vertical format",
      "Engagement-optimized editing",
      "Trending music selection",
      "Interior + exterior footage",
      "Social media ready",
      "Multiple platform formats",
    ],
    popular: true,
  },
  {
    size: "Drone + Interior Package",
    price: "$549.99",
    duration: "2-3 minute video",
    features: [
      "Aerial drone footage",
      "Interior walkthrough",
      "Professional editing",
      "Royalty-free music",
      "Multiple format delivery",
      "Neighborhood showcase",
    ],
  },
  {
    size: "Premium Package",
    price: "$799.99",
    duration: "3-5 minute video",
    features: [
      "Cinematic drone footage",
      "Complete interior tour",
      "Social media reel included",
      "Professional voiceover option",
      "Custom music selection",
      "Priority 24-hour delivery",
    ],
  },
]

const faqItems = [
  {
    question: "What's included in the social media reel format?",
    answer:
      "Our 9:16 vertical format videos are specifically edited for Instagram Reels, TikTok, and Facebook Reels. They include engaging transitions, trending music, and are optimized for maximum social media engagement with quick cuts and dynamic pacing.",
  },
  {
    question: "Do you have drone licensing and insurance?",
    answer:
      "Yes, all our drone operators are FAA Part 107 certified and fully insured. We handle all necessary permissions and follow strict safety protocols for aerial filming in residential areas.",
  },
  {
    question: "Can I choose the background music?",
    answer:
      "We provide a curated selection of royalty-free music that works well with real estate videos. You can request specific styles or moods, and we'll select the best tracks that complement your property and target audience.",
  },
  {
    question: "How long does video production take?",
    answer:
      "Filming typically takes 1-2 hours depending on property size and package. Edited videos are delivered within 48-72 hours for standard packages, with rush delivery available for urgent needs.",
  },
  {
    question: "What video formats do you provide?",
    answer:
      "We deliver videos in multiple formats: landscape (16:9) for websites and YouTube, vertical (9:16) for social media reels, and square (1:1) for Instagram posts. All formats are optimized for their respective platforms.",
  },
  {
    question: "Can you add property information or text overlays?",
    answer:
      "Yes, we can include property details, pricing, contact information, and custom text overlays. We'll work with you to ensure all important information is prominently displayed in an attractive way.",
  },
]

export default function VideographyServicePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-18 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-repeat opacity-10 z-0"></div>

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-white/80 mb-6">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
              <span>/</span>
              <span className="text-white">Videography</span>
            </nav>

            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <h6 className="text-sm uppercase tracking-wider text-white font-medium">Real Estate Videography</h6>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 text-white">
              Professional Video Production
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Bring your listings to life with cinematic videography, social media reels, and stunning drone footage.
              Engage buyers with dynamic content that showcases every detail of your properties.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/quote">Get a Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-white hover:text-primary"
              >
                <Link href="#portfolio">View Video Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">The Impact</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Video marketing drives exceptional results
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Video content is the most engaging form of real estate marketing. See how professional videography
              transforms your listing performance and buyer engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {videographyBenefits.map((benefit, index) => (
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
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Services</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Comprehensive video production services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From social media reels to cinematic property tours and aerial drone footage, we create compelling video
              content that captures attention and drives buyer interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videographyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Work</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">See our videography in action</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse examples of our video work and see how professional videography brings properties to life and
              engages potential buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Social Media Reel Example */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Smartphone className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Social Media Reel</h3>
                  <p className="text-sm text-gray-600 mb-4">9:16 Vertical Format</p>
                  <div className="bg-secondary text-white px-3 py-1 rounded-full text-xs">30-60 seconds</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Instagram/TikTok Ready</p>
                <p className="text-white/80 text-xs">Optimized for engagement</p>
              </div>
            </div>

            {/* Drone Footage Example */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1564013434775-f71db0030976?q=80&w=2000"
                alt="Aerial drone footage of luxury home"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Aerial Drone Footage</p>
                <p className="text-white/80 text-xs">Stunning bird's eye views</p>
              </div>
            </div>

            {/* Interior Walkthrough Example */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
                alt="Interior walkthrough video"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Interior Walkthrough</p>
                <p className="text-white/80 text-xs">Smooth cinematic movement</p>
              </div>
            </div>

            {/* Neighborhood Showcase */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000"
                alt="Neighborhood showcase video"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Neighborhood Tour</p>
                <p className="text-white/80 text-xs">Showcase local amenities</p>
              </div>
            </div>

            {/* Luxury Property Tour */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000"
                alt="Luxury property video tour"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Luxury Property Tour</p>
                <p className="text-white/80 text-xs">Premium cinematic quality</p>
              </div>
            </div>

            {/* Twilight Exterior */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md group">
              <Image
                src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2000"
                alt="Twilight exterior video"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">Twilight Showcase</p>
                <p className="text-white/80 text-xs">Golden hour magic</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/portfolio">View Full Video Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Process</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">From concept to compelling video</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our proven video production process ensures every property is showcased with cinematic quality and
              engaging storytelling that resonates with potential buyers.
            </p>
          </div>

          <div className="space-y-16">
            {videographyProcess.map((step, index) => (
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
                        <Video className="h-12 w-12 text-secondary" />
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
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Professional video packages</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the perfect video package for your property. All packages include professional editing,
              royalty-free music, and multiple format delivery.
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
                  <CardDescription>{tier.duration}</CardDescription>
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
            <p className="text-gray-600 mb-4">Need a custom video package or have special requirements?</p>
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
              Get answers to common questions about our videography services and production process.
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
                "The social media reels from RePhotos have completely transformed our online presence. Our listings now
                get 10x more engagement, and we're seeing significantly more showings. The drone footage is absolutely
                stunning!"
              </p>
              <div className="flex items-center justify-center">
                <Image
                  src="https://ext.same-assets.com/148878086/2418568282.jpeg"
                  alt="Michael Rodriguez"
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">Michael Rodriguez</p>
                  <p className="text-sm text-gray-500">Broker, Century 21</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-white">
              Ready to bring your listings to life?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the video revolution in real estate marketing. Create engaging content that captures attention,
              drives engagement, and sells properties faster.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/quote">Book Video Production</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-primary hover:bg-white hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
