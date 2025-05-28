"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BookButton } from "../../components/ui/book-button"
import {
  Camera,
  Video,
  Compass,
  DrillIcon as Drone,
  LayoutGrid,
  Sunset,
  Instagram,
  Building,
  Globe,
  PenTool,
} from "lucide-react"
import { QuoteModuleSection } from "@/components/home/QuoteModuleSection"

// Pricing data
const pricingData = {
  "<1000": {
    hdrPhotography: 149.99,
    cinematicVideo: 249.99,
    virtualTour: 159.99,
    droneAerialPhotos: 124.99,
    droneAerialVideoPhotos: 124.99,
    floorPlan: 89.99,
    floorPlan2d3d: 149.99,
    twilightPhotography: 124.99,
    socialMediaReel: 179.99,
    socialMediaPosts: 39.99,
    virtualStaging: 39.99,
    propertyWebsite: 99.99,
    customDomainName: 24.99,
    virtualTwilight: 49.99,
  },
  "1000-2000": {
    hdrPhotography: 199.99,
    cinematicVideo: 279.99,
    virtualTour: 189.99,
    droneAerialPhotos: 124.99,
    droneAerialVideoPhotos: 124.99,
    floorPlan: 119.99,
    floorPlan2d3d: 179.99,
    twilightPhotography: 124.99,
    socialMediaReel: 199.99,
    socialMediaPosts: 39.99,
    virtualStaging: 39.99,
    propertyWebsite: 99.99,
    customDomainName: 24.99,
    virtualTwilight: 49.99,
  },
  "2000-3000": {
    hdrPhotography: 249.99,
    cinematicVideo: 309.99,
    virtualTour: 219.99,
    droneAerialPhotos: 124.99,
    droneAerialVideoPhotos: 124.99,
    floorPlan: 149.99,
    floorPlan2d3d: 209.99,
    twilightPhotography: 124.99,
    socialMediaReel: 219.99,
    socialMediaPosts: 39.99,
    virtualStaging: 39.99,
    propertyWebsite: 99.99,
    customDomainName: 24.99,
    virtualTwilight: 49.99,
  },
  "3000-4000": {
    hdrPhotography: 299.99,
    cinematicVideo: 339.99,
    virtualTour: 249.99,
    droneAerialPhotos: 124.99,
    droneAerialVideoPhotos: 124.99,
    floorPlan: 179.99,
    floorPlan2d3d: 239.99,
    twilightPhotography: 124.99,
    socialMediaReel: 239.99,
    socialMediaPosts: 39.99,
    virtualStaging: 39.99,
    propertyWebsite: 99.99,
    customDomainName: 24.99,
    virtualTwilight: 49.99,
  },
  "4000-5000": {
    hdrPhotography: 349.99,
    cinematicVideo: 369.99,
    virtualTour: 279.99,
    droneAerialPhotos: 124.99,
    droneAerialVideoPhotos: 124.99,
    floorPlan: 209.99,
    floorPlan2d3d: 269.99,
    twilightPhotography: 124.99,
    socialMediaReel: 259.99,
    socialMediaPosts: 39.99,
    virtualStaging: 39.99,
    propertyWebsite: 99.99,
    customDomainName: 24.99,
    virtualTwilight: 49.99,
  },
} as const;

type SizeKey = keyof typeof pricingData;

// Service details with icons and descriptions
const services = [
  {
    id: "hdrPhotography",
    name: "HDR Photography",
    description: "Professional high-dynamic-range photos that showcase your property in the best light",
    icon: <Camera className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000",
  },
  {
    id: "cinematicVideo",
    name: "Cinematic Video",
    description: "Stunning walkthrough videos with professional editing and music",
    icon: <Video className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  },
  {
    id: "virtualTour",
    name: "Virtual Tour",
    description: "Interactive 3D tours that let buyers explore every corner of the property",
    icon: <Compass className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000",
  },
  {
    id: "droneAerialPhotos",
    name: "Drone Aerial Photos",
    description: "Breathtaking aerial photographs that showcase the property and surroundings",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000",
  },
  {
    id: "droneAerialVideoPhotos",
    name: "Drone Aerial Video",
    description: "Dynamic aerial footage that captures the property from unique perspectives",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2000",
  },
  {
    id: "floorPlan",
    name: "Floor Plan",
    description: "Accurate 2D floor plans that help buyers understand the layout",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  },
  {
    id: "floorPlan2d3d",
    name: "Floor Plan (2D & 3D)",
    description: "Comprehensive floor plans with both 2D layouts and 3D visualizations",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000",
  },
  {
    id: "twilightPhotography",
    name: "Twilight Photography",
    description: "Captivating twilight shots that create a magical atmosphere",
    icon: <Sunset className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1564013434775-f71db0030976?q=80&w=2000",
  },
  {
    id: "socialMediaReel",
    name: "Social Media Reel",
    description: "Engaging short-form video content optimized for social media platforms",
    icon: <Instagram className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000",
  },
  {
    id: "socialMediaPosts",
    name: "Social Media Posts",
    description: "Ready-to-share images and captions for your social media marketing",
    icon: <Instagram className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000",
  },
  {
    id: "virtualStaging",
    name: "Virtual Staging",
    description: "Digitally furnish empty spaces to help buyers visualize the potential",
    icon: <Building className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  },
  {
    id: "propertyWebsite",
    name: "Property Website",
    description: "Dedicated website showcasing all your property's features and media",
    icon: <Globe className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?q=80&w=2000",
  },
  {
    id: "customDomainName",
    name: "Custom Domain Name",
    description: "Personalized web address for your property website (e.g., 123mainstreet.com)",
    icon: <Globe className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000",
  },
  {
    id: "virtualTwilight",
    name: "Virtual Twilight",
    description: "Transform daytime photos into stunning twilight scenes",
    icon: <PenTool className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2000",
  },
]

export default function PricingPage() {
  const [selectedSize, setSelectedSize] = useState<SizeKey>("<1000")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  // Add this type above the packages section
  type PackageFeature = {
    label: string;
    included: boolean;
    gold?: boolean;
    bold?: boolean;
  };

  type PackageCard = {
    name: string;
    price: string;
    subtitle: string;
    sqft: string;
    discount: string;
    discountColor: string;
    buttonColor: string;
    borderColor?: string;
    features: PackageFeature[];
    image: string;
  };

  // Add this helper for slider stops
  const sizeOptions: { value: SizeKey; label: string; range: string }[] = [
    { value: "<1000", label: "1", range: "0–999 sq ft" },
    { value: "1000-2000", label: "2", range: "1000–1999 sq ft" },
    { value: "2000-3000", label: "3", range: "2000–2999 sq ft" },
    { value: "3000-4000", label: "4", range: "3000–3999 sq ft" },
    { value: "4000-5000", label: "5", range: "4000–4999 sq ft" },
  ];

  // Pricing and discount maps for each package
  const essentialsPriceMap: Record<SizeKey, number> = {
    '<1000': 179.99,
    '1000-2000': 219.99,
    '2000-3000': 269.99,
    '3000-4000': 309.99,
    '4000-5000': 359.99,
  };
  const essentialsDiscountMap: Record<SizeKey, string> = {
    '<1000': 'Save $20',
    '1000-2000': 'Save $25',
    '2000-3000': 'Save $30',
    '3000-4000': 'Save $35',
    '4000-5000': 'Save $40',
  };
  const deluxePriceMap: Record<SizeKey, number> = {
    '<1000': 369.99,
    '1000-2000': 429.99,
    '2000-3000': 499.99,
    '3000-4000': 569.99,
    '4000-5000': 629.99,
  };
  const deluxeDiscountMap: Record<SizeKey, string> = {
    '<1000': 'Save $65',
    '1000-2000': 'Save $75',
    '2000-3000': 'Save $90',
    '3000-4000': 'Save $100',
    '4000-5000': 'Save $115',
  };
  const marketingProPriceMap: Record<SizeKey, number> = {
    '<1000': 559.99,
    '1000-2000': 639.99,
    '2000-3000': 709.99,
    '3000-4000': 779.99,
    '4000-5000': 849.99,
  };
  const marketingProDiscountMap: Record<SizeKey, string> = {
    '<1000': 'Save $120',
    '1000-2000': 'Save $140',
    '2000-3000': 'Save $165',
    '3000-4000': 'Save $185',
    '4000-5000': 'Save $205',
  };
  const premiumSellerPriceMap: Record<SizeKey, number> = {
    '<1000': 799.99,
    '1000-2000': 909.99,
    '2000-3000': 1019.99,
    '3000-4000': 1129.99,
    '4000-5000': 1239.99,
  };
  const premiumSellerDiscountMap: Record<SizeKey, string> = {
    '<1000': 'Save $200',
    '1000-2000': 'Save $225',
    '2000-3000': 'Save $255',
    '3000-4000': 'Save $280',
    '4000-5000': 'Save $305',
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSelection = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]

      // Calculate new total
      const newTotal = newSelection.reduce((sum, id) => {
        return sum + pricingData[selectedSize][id as keyof (typeof pricingData)["<1000"]]
      }, 0)

      setTotalPrice(newTotal)
      return newSelection
    })
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-18 md:pt-20">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-no-repeat bg-cover opacity-10 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"></div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <h6 className="text-sm uppercase tracking-wider text-white font-medium">Pricing</h6>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-white">
              Transparent pricing for exceptional results
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Invest in quality real estate marketing that sells properties faster and at better prices.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <BookButton href="/quote" size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get a Quote
              </BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          {/* Introduction */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
              Choose the perfect package for your property
            </h2>
            <p className="text-gray-600">
              Our pricing is based on property size and the services you need. Select from our pre-designed packages or
              build your own custom solution.
            </p>
          </div>

          {/* Pre-designed Packages */}
          <div className="mb-24">
            <h2 className="text-4xl font-serif font-bold mb-2 text-[#262F3F]">Packages</h2>
            <p className="text-lg text-[#262F3F] mb-8">Save on our most popular services and check out in a flash with a package. Pricing is straightforward and additional services can be added à la carte.</p>
            {/* Size Selector */}
            {/* Mobile: slider/progress bar */}
            <div className="mb-8">
              <div className="block md:hidden">
                <div className="text-center mb-2 text-sm font-medium text-[#262F3F]">Select Property Size</div>
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-xs">
                    <input
                      type="range"
                      min={0}
                      max={sizeOptions.length - 1}
                      step={1}
                      value={sizeOptions.findIndex(opt => opt.value === selectedSize)}
                      onChange={e => {
                        const idx = Number(e.target.value)
                        setSelectedSize(sizeOptions[idx].value)
                      }}
                      className="w-full h-2 bg-[#f5efe0] rounded-full appearance-none focus:outline-none transition-all"
                      style={{ accentColor: '#262F3F' }}
                      aria-label="Select property size"
                    />
                    {/* Slider stops */}
                    <div className="absolute left-0 top-1/2 w-full flex justify-between items-center pointer-events-none" style={{transform: 'translateY(-50%)'}}>
                      {sizeOptions.map((opt, i) => (
                        <span
                          key={opt.value}
                          className={`w-4 h-4 rounded-full border-2 box-content flex-shrink-0 ${selectedSize === opt.value ? 'bg-[#262F3F] border-[#262F3F] z-10' : 'bg-white border-[#262F3F]'} transition-all duration-200`}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Range label under slider */}
                  <div className="mt-3 text-base font-semibold text-[#262F3F]">{sizeOptions.find(opt => opt.value === selectedSize)?.range}</div>
                </div>
              </div>
              {/* Desktop: tabs/pills */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="hidden md:block text-center mb-2 text-sm font-medium text-[#262F3F]">Select Property Size</div>
                <Tabs value={selectedSize} onValueChange={(val) => setSelectedSize(val as SizeKey)} className="w-full max-w-2xl">
                  <TabsList className="w-full flex bg-[#f5efe0] rounded-full shadow-sm p-1">
                    {sizeOptions.map(opt => (
                      <TabsTrigger
                        key={opt.value}
                        value={opt.value}
                        className="flex-1 data-[state=active]:bg-[#262F3F] data-[state=active]:text-white data-[state=active]:scale-105 transition-all rounded-full px-2 py-2 text-xs sm:text-sm font-semibold"
                      >
                        {opt.range}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {([
                {
                  name: "ESSENTIALS PACKAGE",
                  price: `$${essentialsPriceMap[selectedSize].toFixed(2)}`,
                  subtitle: "starting",
                  sqft: `up to ${sizeOptions.find(opt => opt.value === selectedSize)?.range.split('–')[1]}`,
                  discount: essentialsDiscountMap[selectedSize],
                  discountColor: "text-[#B42222]",
                  buttonColor: "bg-[#262F3F] text-white",
                  features: [
                    { label: "HDR Photography", included: true },
                    { label: "1–2 Drone Shots", included: true },
                    { label: "MLS-Optimized & High-Res Delivery", included: true },
                    { label: "24-Hour Turnaround", included: true },
                    { label: "360° Virtual Tour", included: false },
                    { label: "Floor Plan", included: false },
                    { label: "Social Media Video", included: false },
                    { label: "Property Website", included: false },
                    { label: "Custom Domain", included: false },
                    { label: "Drone Video", included: false },
                    { label: "Virtual Staging", included: false },
                    { label: "3D House Model", included: false },
                    { label: "Twilight or Virtual Twilight", included: false },
                  ],
                  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
                },
                {
                  name: "DELUXE TOUR PACKAGE",
                  price: `$${deluxePriceMap[selectedSize].toFixed(2)}`,
                  subtitle: "starting",
                  sqft: `up to ${sizeOptions.find(opt => opt.value === selectedSize)?.range.split('–')[1]}`,
                  discount: deluxeDiscountMap[selectedSize],
                  discountColor: "text-[#B42222]",
                  buttonColor: "bg-[#262F3F] text-white",
                  features: [
                    { label: "HDR Photography", included: true },
                    { label: "2–3 Drone Shots", included: true },
                    { label: "360° Virtual Tour", included: true },
                    { label: "Floor Plan (2D)", included: true },
                    { label: "MLS-Optimized & High-Res Delivery", included: true },
                    { label: "Social Media Video", included: false },
                    { label: "Property Website", included: false },
                    { label: "Custom Domain", included: false },
                    { label: "Drone Video", included: false },
                    { label: "Virtual Staging", included: false },
                    { label: "3D House Model", included: false },
                    { label: "Twilight or Virtual Twilight", included: false },
                  ],
                  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000",
                },
                {
                  name: "MARKETING PRO PACKAGE",
                  price: `$${marketingProPriceMap[selectedSize].toFixed(2)}`,
                  subtitle: "starting",
                  sqft: `up to ${sizeOptions.find(opt => opt.value === selectedSize)?.range.split('–')[1]}`,
                  discount: marketingProDiscountMap[selectedSize],
                  discountColor: "text-[#B42222]",
                  buttonColor: "bg-[#f3a952] text-[#262F3F]",
                  features: [
                    { label: "HDR Photography", included: true },
                    { label: "2–3 Drone Shots", included: true },
                    { label: "360° Virtual Tour", included: true },
                    { label: "Floor Plan (2D)", included: true },
                    { label: "Social Media Vertical Video", included: true },
                    { label: "Property Website (Branded + Unbranded)", included: true },
                    { label: "MLS-Optimized & High-Res Delivery", included: true },
                    { label: "Custom Domain", included: false },
                    { label: "Drone Video", included: false },
                    { label: "Virtual Staging", included: false },
                    { label: "3D House Model", included: false },
                    { label: "Twilight or Virtual Twilight", included: false },
                  ],
                  image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000",
                },
                {
                  name: "PREMIUM SELLER EXPERIENCE",
                  price: `$${premiumSellerPriceMap[selectedSize].toFixed(2)}`,
                  subtitle: "starting",
                  sqft: `up to ${sizeOptions.find(opt => opt.value === selectedSize)?.range.split('–')[1]}`,
                  discount: premiumSellerDiscountMap[selectedSize],
                  discountColor: "text-[#B42222]",
                  buttonColor: "bg-[#262F3F] text-white",
                  features: [
                    { label: "HDR Photography", included: true },
                    { label: "3–5 Drone Shots", included: true },
                    { label: "360° Virtual Tour", included: true },
                    { label: "Floor Plan (2D)", included: true },
                    { label: "Social Media Vertical Video", included: true },
                    { label: "Property Website (Branded + Unbranded)", included: true },
                    { label: "Custom Domain", included: true },
                    { label: "Drone Video (60–90 sec)", included: true },
                    { label: "Virtual Twilight (1 image)", included: true },
                    { label: "MLS-Optimized & High-Res Delivery", included: true },
                    { label: "3D House Model", included: false },
                    { label: "Additional Virtual Staging", included: false },
                  ],
                  image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000",
                },
              ] as PackageCard[]).map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className={`flex flex-col rounded-xl border ${pkg.borderColor || "border-gray-200"} bg-white p-6 shadow-sm transition-all`}
                >
                  <div className="mb-2 text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86]">{pkg.name}</div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-mazzard font-semibold text-[#262F3F]">
                      {pkg.name === 'Essentials Package' ? `$${essentialsPriceMap[selectedSize].toFixed(2)}` : pkg.price}
                    </span>
                    <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">
                      {selectedSize === '<1000' ? pkg.subtitle : ''}
                    </span>
                    </div>
                  <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">
                    {`up to ${sizeOptions.find(opt => opt.value === selectedSize)?.range.split('–')[1] || pkg.sqft.replace('up to ', '')}`}
                  </div>
                  <div className={`mb-2 text-sm font-mazzard font-semibold ${pkg.discountColor}`}>{pkg.discount}</div>
                  <BookButton href="/quote" size="lg" className={`w-full mb-4 mt-2 font-mazzard font-semibold ${pkg.buttonColor}`}>Get quote</BookButton>
                  <ul className="flex-1 mb-0 space-y-1 text-sm">
                      {pkg.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 ${feature.included ? (feature.gold ? "text-[#f3a952]" : "text-[#262F3F]") : "text-[#B0B7C3] line-through"} ${feature.bold ? "font-semibold" : ""}`}>
                        {feature.included ? (
                          <span className={`inline-block w-4 h-4 rounded-full flex items-center justify-center ${feature.gold ? "bg-[#f3a952] text-white" : "bg-[#262F3F] text-white"}`}>
                            ✓
                          </span>
                        ) : (
                          <span className="inline-block w-4 h-4 rounded-full bg-[#E5E7EB] text-[#B0B7C3] flex items-center justify-center">✗</span>
                        )}
                        <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Module Section */}
          <QuoteModuleSection />

          {/* Individual Services Pricing */}
          <div className="mb-24">
            <h2 className="text-3xl font-serif font-bold mb-2 text-[#262F3F]">Individual services</h2>
            <p className="text-lg text-[#262F3F] mb-8">Mix and match our premium services to create a custom marketing experience for your listing or project, or add services to a package.</p>
            <div className="flex flex-col gap-10">
              {/* Premium Photography */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/pricing/photography.jpg" alt="Premium Photography" className="absolute inset-0 w-full h-full object-cover object-bottom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Premium Photography</h3>
                      <p className="text-white text-base font-normal mb-4">Help any property stand out on the MLS, social media, and more with stunning photography by our award-winning Visual Artists</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/pricing/photography.jpg" alt="Premium Photography" className="w-full h-48 object-cover object-bottom" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">PHOTOGRAPHY</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$300</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 999 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$50 per 1,000 sq ft</div>
                        <div className="mb-2 text-sm font-mazzard font-semibold text-[#B42222]">Recommended for most listings</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Residential</span><span className="font-semibold">$300+</span></li>
                          <li className="flex justify-between"><span>Commercial & Hourly</span><span className="font-semibold">$300/hr</span></li>
                          <li className="flex justify-between"><span>Twilight Shoot</span><span className="font-semibold">$350</span></li>
                          <li className="flex justify-between"><span>Pre-Marketing Mini Shoot</span><span className="font-semibold">$200</span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2"><span>ⓘ</span>Automatically save $100 on any full Premium Photography service by adding a Property Website</div>
                      </div>
                      <BookButton href="/services/photography" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video (Social Media & Cinematic, both shot on iPhone) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/services/videography/iphone-video.jpg" alt="Cinematic Video Tours" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Cinematic Video Tours</h3>
                      <p className="text-white text-base font-normal mb-4">Transform any property into the main character of its own unique story with awe-inspiring Cinematic Video Tours, shot on iPhone</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/videography/iphone-video.jpg" alt="Cinematic Video Tours" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIDEO TOURS</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$400</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 999 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$100 per 1,000 sq ft</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Residential</span><span className="font-semibold">$400+</span></li>
                          <li className="flex justify-between"><span>Commercial & Hourly</span><span className="font-semibold">$300/hr</span></li>
                          <li className="flex justify-between"><span>Agent Introduction Add-On</span><span className="font-semibold">$200</span></li>
                          <li className="flex justify-between"><span>Lifestyle Video Add-On</span><span className="font-semibold">$300/hr</span></li>
                        </ul>
                      </div>
                      <BookButton href="/services/videography" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Virtual Tours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/services/virtual-tours/3d-tour.jpg" alt="Matterport 3D Virtual Tours" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Matterport 3D Virtual Tours</h3>
                      <p className="text-white text-base font-normal mb-4">Hand clients and buyers the keys from anywhere in the world with industry-leading Matterport 3D Virtual Tours</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/virtual-tours/3d-tour.jpg" alt="Matterport 3D Virtual Tours" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">3D VIRTUAL TOURS</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$250</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 999 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$50 per 1,000 sq ft</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Commercial (8,000+ sq ft)</span><span className="font-semibold">$250/hr</span></li>
                          <li className="flex justify-between"><span>Detached Structure Scan</span><span className="font-semibold">$50</span></li>
                          <li className="flex justify-between"><span>Floor Plan from Matterport</span><span className="font-semibold">$150 starting</span></li>
                        </ul>
                      </div>
                      <BookButton href="/services/virtual-tours" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aerial Photos & Video */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/services/aerial/aerial.jpg" alt="Aerial Photos & Video" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Aerial Photos & Video</h3>
                      <p className="text-white text-base font-normal mb-4">Elevate any home or property above the rest with incredible drone footage captured by our FAA-certified Visual Artists</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/aerial/aerial.jpg" alt="Aerial Photos & Video" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">AERIAL PHOTOS & VIDEO</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$300</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Aerial Twilight Photography</span><span className="font-semibold">$400</span></li>
                          <li className="flex justify-between"><span>Aerial Photo Add-On (1-7 photos)</span><span className="font-semibold">$200</span></li>
                          <li className="flex justify-between"><span>Aerial Video Add-On (15-30s)</span><span className="font-semibold">$250</span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2"><span>ⓘ</span>Aerial Add-Ons require the purchase of a Premium Photography or Cinematic Video service</div>
                      </div>
                      <BookButton href="/services/aerial" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Services (Staging and Twilight) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/services/virtual-staging/staging.jpg" alt="Virtual Services" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Virtual Services</h3>
                      <p className="text-white text-base font-normal mb-4">Beautifully stage, declutter, or even remodel any space with Virtual Service magic—no moving truck required</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/virtual-staging/staging.jpg" alt="Virtual Services" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIRTUAL SERVICES</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$100</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Virtual Twilight Add-Ons</span><span className="font-semibold">$100/img</span></li>
                          <li className="flex justify-between"><span>Virtual Staging/Add-Ons</span><span className="font-semibold">$100/img</span></li>
                          <li className="flex justify-between"><span>Virtual Remodel/Add-On</span><span className="font-semibold">$300/img</span></li>
                        </ul>
                      </div>
                      <BookButton href="/services/virtual-staging" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Websites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/services/websites/website.jpg" alt="Premium Property Websites" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Premium Property Websites</h3>
                      <p className="text-white text-base font-normal mb-4">Control the narrative of your listing or project and showcase all of your beautiful content in one place</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/websites/website.jpg" alt="Premium Property Websites" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">PROPERTY WEBSITES</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$250</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Custom Domain for 1 Year</span><span className="font-semibold">Included</span></li>
                          <li className="flex justify-between"><span>Neighborhood Photo Gallery</span><span className="font-semibold">Included</span></li>
                          <li className="flex justify-between"><span>Automatically live in 1-2 days</span><span className="font-semibold">Included</span></li>
                        </ul>
                      </div>
                      <BookButton href="/services/websites" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/services/floor-plans/floorplan.jpg" alt="Professional Floor & Site Plans" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Professional Floor & Site Plans</h3>
                      <p className="text-white text-base font-normal mb-4">Land more qualified buyers and clients by showing them the layout of the property before they show up</p>
                      <BookButton href="/quote" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold">Get quote</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/services/floor-plans/floorplan.jpg" alt="Professional Floor & Site Plans" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">FLOOR PLANS</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">$250</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Studio to Existing Plans</span><span className="font-semibold">$100</span></li>
                          <li className="flex justify-between"><span>Interactive Floor Plan</span><span className="font-semibold">$100</span></li>
                          <li className="flex justify-between"><span>Place Plan from Hotspot</span><span className="font-semibold">$50/room</span></li>
                        </ul>
                          </div>
                      <BookButton href="/services/floor-plans" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Learn more</BookButton>
                            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Build Your Own Package */}
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md">
            <h3 className="text-xl sm:text-2xl font-serif mb-6 sm:mb-8 text-center">Build Your Own Package</h3>

            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">1. Select your property size</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
                {Object.keys(pricingData).map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => {
                      setSelectedSize(size as SizeKey)
                      // Recalculate total when size changes
                      const newTotal = selectedServices.reduce((sum, id) => {
                        return sum + pricingData[size as SizeKey][id as keyof (typeof pricingData)["<1000"]]
                      }, 0)
                      setTotalPrice(newTotal)
                    }}
                    className="w-full text-sm py-1.5 h-auto sm:h-10"
                  >
                    {size === "<1000" ? "Under 1000 sq ft" : `${size} sq ft`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">2. Select your services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {services.map((service) => {
                  const price = pricingData[selectedSize as SizeKey][service.id as keyof (typeof pricingData)["<1000"]]
                  return (
                    <div key={service.id} className="flex items-start space-x-3 p-3 sm:p-4 border rounded-lg">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <Label htmlFor={service.id} className="font-medium cursor-pointer text-sm sm:text-base">
                          {service.name}
                        </Label>
                        <p className="text-xs sm:text-sm text-gray-500">{formatPrice(price)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div>
                <h4 className="text-base sm:text-lg font-medium">Your Custom Package</h4>
                <p className="text-sm text-gray-600">
                  {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0 w-full md:w-auto">
                <div className="text-2xl sm:text-3xl font-light mb-2">{formatPrice(totalPrice)}</div>
                <Button
                  disabled={selectedServices.length === 0}
                  className="bg-secondary hover:bg-secondary/90 w-full md:w-auto"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-3xl font-serif mb-12 text-center">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">How quickly will I receive my photos?</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Most photo shoots are edited and delivered within 24 hours, so you can market your listing without
                  delay.
                </p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Do you offer rush delivery?</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Yes, we offer same-day rush delivery for an additional fee. Please contact us for availability.
                </p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                  What if my property is larger than 5000 sq ft?
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  For properties over 5000 sq ft, please contact us for a custom quote tailored to your specific needs.
                </p>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Can I customize the packages?</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Use our "Build Your Own Package" tool to select exactly the services you need.
                </p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">
                  Do you offer discounts for multiple properties?
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Yes, we offer volume discounts for agents and brokerages. Contact us to discuss your specific needs.
                </p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">What areas do you service?</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  We service the entire Southern Ontario region, including Toronto, Mississauga, Hamilton, and
                  surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
            Ready to showcase your property at its best?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get started today and see the difference professional real estate marketing can make.
          </p>
          <div className="mt-6">
            <BookButton href="/quote" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Get a Quote
            </BookButton>
          </div>
        </div>
      </section>
    </div>
  )
}
