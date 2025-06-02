import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Video, CheckCircle, Smartphone, Plane, Music, Zap, Edit } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"
import CustomVideoBuilder from "@/components/services/videography/CustomVideoBuilder";

const videographyFeatures = [
  {
    icon: <Video className="h-6 w-6" />,
    title: "Property Highlights Video",
    description:
      "A horizontal video walkthrough shot on iPhone that showcases the key selling points of the home. Delivered in 4K and MLS-ready.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Social Media Video Tours",
    description:
      "Vertical walk-throughs filmed in 9:16 format, optimized for Instagram, TikTok, and Facebook Reels. Fast-paced and built for social engagement.",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Drone Video",
    description:
      "Smooth, high-res aerial footage showcasing the home, property lines, and surrounding neighborhood. Captured with precision to elevate listing appeal.",
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "Royalty-Free Music",
    description:
      "All videos include background music selected to match the property vibe, fully licensed for online use.",
  },
  {
    icon: <Edit className="h-6 w-6" />,
    title: "Professional Editing",
    description:
      "Clean transitions, natural color grading, and fast turnaround. Delivered polished and ready to post.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "48–72 Hour Delivery",
    description:
      "Most videos are delivered within 2–3 business days, so you can start marketing the listing fast.",
  },
]

const videographyBenefits = [
  {
    stat: "4x",
    label: "More Shares",
    description: "Video listings get shared 4x more often than photo-only listings",
  },
  {
    stat: "87%",
    label: "Higher Engagement",
    description: "Video content leads to significantly more interaction on social media",
  },
  {
    stat: "73%",
    label: "Faster Sales",
    description: "Listings with video often move faster than those without",
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
    size: "Property Highlights Video",
    price: "$319.99",
    duration: "1–2 minute horizontal video",
    features: [
      "Shot in 4K on iPhone",
      "Interior walk-through",
      "Professional editing",
      "Royalty-free background music",
      "Delivered MLS-ready",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Social Media Reel",
    price: "$229.99",
    duration: "30–60 second vertical video",
    features: [
      "Optimized for Instagram, TikTok, and Reels",
      "Fast-paced and engagement-driven",
      "Interior footage formatted for mobile",
      "Royalty-free trending music",
      "Social-ready delivery",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Drone Aerial Video",
    price: "$159.99",
    duration: "30–60 seconds of aerial footage",
    features: [
      "High-resolution exterior shots",
      "Captures the property and surroundings",
      "Smooth motion edits",
      "Royalty-free music included",
      "Delivered in multiple formats",
      "Next day turnaround",
    ],
  },
]

const faqItems = [
  {
    question: "What's included in the Property Highlights Video?",
    answer:
      "You'll get a horizontal highlights video in 4K, shot on iPhone. It's professionally edited with background music and delivered MLS-ready, hosted on Vimeo for easy sharing.",
  },
  {
    question: "How are Social Media Videos different?",
    answer:
      "These are vertical 9:16 videos optimized for Instagram, TikTok, and Facebook Reels. They're shorter, faster-paced, and designed to grab attention quickly with trending-style edits and mobile-first framing.",
  },
  {
    question: "Do the Property Highlights or Social Media Videos include drone footage?",
    answer:
      "Yes — if the property is in airspace that allows drone flight, we include aerial footage in both videos at no extra cost.",
  },
  {
    question: "Do you offer standalone drone video?",
    answer:
      "Yes. We provide smooth, high-res aerial video showcasing the property, lot, and surrounding area.",
  },
  {
    question: "Can I choose the music?",
    answer:
      "We use royalty-free music selected to match the mood and energy of each listing. If you have a specific vibe or style in mind, we'll do our best to match it.",
  },
  {
    question: "Can you add text or property info to the video?",
    answer:
      "Yes. We can add listing details, your branding, or any key features you want to highlight in the video.",
  },
]

export default function VideographyServicePage() {
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
            <span className="text-white">Videography</span>
          </nav>
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">VIDEOGRAPHY</span>
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white max-w-4xl leading-tight text-left">
            Bring Your Listings To Life With Video
          </h1>
          {/* Supporting Paragraph */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-left">
            Property walkthrough videos, vertical social media tours, and smooth drone footage designed to grab attention and drive results.
          </p>
        </div>
      </section>

      {/* Benefits Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">The Impact</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Video makes listings stand out
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Buyers engage more with listings that include video. It adds movement, emotion, and a real sense of space—driving better results across platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videographyBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center">
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
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Video Services</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Video Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We produce property highlight videos, social media reels, and drone footage to help your listings stand out. Fast delivery and clean editing every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videographyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                {index === 0 && (
                  <video
                    src="/cg-824-gazley-circle.mp4"
                    controls
                    className="w-full rounded mb-4"
                    poster="/images/photobank/s_2.webp"
                    style={{ maxHeight: 240 }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Video Pricing</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Video Pricing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the perfect video service to showcase your listing. All packages include professional editing, royalty-free music, and quick delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="relative">
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
                      <Link href="/book-now">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need a custom video package or have special requirements?</p>
            <Button asChild variant="outline">
              <Link href="/contact-us">Contact Us for Custom Pricing</Link>
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

      {/* Custom Video Builder Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <CustomVideoBuilder />
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
          <div className="text-center mb-12">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Custom Video System</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">3 Ways to Customize Your Video</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our system lets you build the perfect video for every property and platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8F5F0] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
              <Edit className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mix & Match Formats</h3>
              <p className="text-gray-700">Choose from horizontal walkthroughs, vertical reels, and aerial drone shots. Build the perfect video for your listing and audience.</p>
            </div>
            <div className="bg-[#F8F5F0] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
              <Smartphone className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personalized Branding</h3>
              <p className="text-gray-700">Add your logo, agent info, and custom text overlays. Every video is tailored to your brand and marketing goals.</p>
            </div>
            <div className="bg-[#F8F5F0] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Add-Ons</h3>
              <p className="text-gray-700">Enhance your video with extras like voiceover, advanced editing, or rush delivery—just select what you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
