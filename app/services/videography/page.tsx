"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Video, CheckCircle, Smartphone, Plane, Music, Zap, Edit, VolumeX, Volume2, PlaySquare } from "lucide-react"
import { CTASection } from "@/components/home/CTASection"
import CustomizeVideoForm from "@/components/services/videography/CustomizeVideoForm";
import { useState } from "react"

const videographyFeatures = [
  {
    icon: <Video className="h-6 w-6" />,
    title: "Property Highlights Video",
    description:
      "A 4K horizontal walkthrough showcasing key rooms and features. Professionally shot and ideal for your MLS listing.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Social Media Reel",
    description:
      "Vertical 9:16 format built for TikTok, Instagram, and Facebook. Quick cuts, trending style, and attention-grabbing edits.",
  },
  {
    icon: <PlaySquare className="h-6 w-6" />,
    title: "Slideshow Video Tour",
    description:
      "Smooth, cinematic slideshow set to music. A simple way to showcase photos with motion and energy.",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Drone Aerial Video",
    description:
      "High-resolution drone footage showing the home's exterior, property lines, and neighborhood. Clean and stable clips.",
  },
  {
    icon: <Edit className="h-6 w-6" />,
    title: "Clean, Professional Editing",
    description:
      "Every video includes color correction, seamless transitions, and royalty-free music selected to match the vibe of the home.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Delivered in 48–72 Hours",
    description:
      "Fast turnaround—your video is delivered in 2–3 business days, ready for MLS or social media.",
  },
]

const videographyBenefits = [
  {
    stat: "12x",
    label: "More Shares",
    description: "Video content generates 1200% more shares than text and images combined across social media platforms",
  },
  {
    stat: "403%",
    label: "More Inquiries",
    description: "Listings with video get 403% more inquiries compared to photo-only listings",
  },
  {
    stat: "49%",
    label: "More Qualified Leads",
    description: "Listings with video get 49% more qualified leads than traditional marketing approaches",
  },
]

const videographyProcess = [
  {
    step: "01",
    title: "Shoot Day Setup",
    description:
      "We plan the flow of each shoot to make sure we capture the home properly.",
    details: [
      "We walk through the space and decide on key angles",
      "Plan drone paths and interior video flow",
      "Match shots to the type of video ordered (MLS, Reels, etc)",
    ],
  },
  {
    step: "02",
    title: "On-Site Filming",
    description:
      "We film quickly and professionally using stabilized 4K gear and licensed drones.",
    details: [
      "Smooth camera work with gimbal stabilization",
      "Cinematic drone clips of the property and neighborhood",
      "Footage captured in both vertical and horizontal formats as needed",
    ],
  },
  {
    step: "03",
    title: "Professional Editing",
    description: 
      "We handle all post-production in-house for consistent quality and fast turnaround.",
    details: [
      "Clean cuts, natural color grading, and audio balancing",
      "Licensed royalty-free music matched to the listing vibe",
      "Final videos exported for MLS and social platforms",
    ],
  },
  {
    step: "04",
    title: "Fast Delivery",
    description: 
      "Videos are turned around quickly and sent in multiple formats, ready to use.",
    details: [
      "Horizontal (16:9) for MLS and websites",
      "Vertical (9:16) for Reels and TikTok",
      "Delivery within 48–72 hours of the shoot",
    ],
  },
]

const pricingTiers = [
  {
    size: "Property Highlights Video",
    price: "$289",
    starting: true,
    duration: "1–2 minute horizontal video",
    features: [
      "Shot in 4K on iPhone",
      "Complete interior walk-through",
      "Delivered MLS-ready",
      "Professional editing and color correction",
      "Royalty-free background music",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Social Media Reel",
    price: "$229",
    starting: true,
    duration: "30–60 second vertical video",
    features: [
      "Optimized for Instagram, TikTok, and Reels",
      "Fast-paced and engagement-driven",
      "Interior footage formatted for mobile viewing",
      "Royalty-free trending music",
      "Social-ready delivery",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Slideshow Video Tour",
    price: "$99",
    starting: false,
    duration: "1–2 minute slideshow video",
    features: [
      "Professional photo selection",
      "Smooth transitions and effects",
      "Royalty-free background music",
      "Text overlays for key features",
      "Multi-platform delivery",
      "48-72 hour turnaround",
    ],
  },
  {
    size: "Drone Aerial Video",
    price: "$159",
    starting: false,
    duration: "30–60 seconds of aerial footage",
    features: [
      "High-resolution exterior shots",
      "Captures the property and surrounding area",
      "Smooth motion edits and transitions",
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

// Custom video card component for slideshow with audio controls
function SlideshowVideoCard() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative">
      <video
        src="/images/services/videography/824-gazley-slideshow.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
        style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
        disableRemotePlayback
        controlsList="nodownload noremoteplayback"
      >
        Your browser does not support the video tag.
      </video>
      {/* Large audio control button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

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
            <span className="text-white/80">Services</span>
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
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Professional Video Services</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Professional Video Services</h2>
            <p className="text-lg text-muted-foreground">
              Elevate your property marketing with our comprehensive video production services. All packages include professional editing, royalty-free music, and quick delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className="relative flex flex-col h-full">
                <CardHeader className="text-center">
                  {/* All videos use the same aspect ratio and max height for consistency */}
                  {index === 0 && (
                    <video
                      src="/horizontal.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/photobank/s_2.webp"
                      className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                      style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                      disableRemotePlayback
                      controlsList="nodownload noremoteplayback"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {index === 1 && (
                    <video
                      src="/vertical.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/photobank/s_3-thumb.webp"
                      className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                      style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                      disableRemotePlayback
                      controlsList="nodownload noremoteplayback"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {index === 2 && (
                    <video
                      src="/images/services/videography/824-gazley-slideshow.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/photobank/s_2.webp"
                      className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                      style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                      disableRemotePlayback
                      controlsList="nodownload noremoteplayback"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {index === 3 && (
                    <video
                      src="/aerial.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/services/videography/lot_lines.gif"
                      className="w-full rounded-lg mb-4 object-cover max-h-56 aspect-video"
                      style={{ aspectRatio: '16/9', height: '225px', maxHeight: '225px' }}
                      disableRemotePlayback
                      controlsList="nodownload noremoteplayback"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <CardTitle className="text-lg">{tier.size}</CardTitle>
                  <div className="text-3xl font-light flex items-center justify-center gap-2">
                    {tier.price}
                    {tier.starting && (
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full ml-2">Starting</span>
                    )}
                  </div>
                  <CardDescription>{tier.duration}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
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
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Simple, fast, and built for real estate</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We handle everything from filming to editing, so you get polished video content that's ready to post or list.
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
            <CustomizeVideoForm />
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
