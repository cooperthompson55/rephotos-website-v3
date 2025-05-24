"use client"

import { useState } from "react"
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
}

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

// Pre-defined packages
const packages = [
  {
    name: "Essential",
    description: "Perfect for smaller properties and budget-conscious sellers",
    price: "$299.99",
    features: ["HDR Photography", "Floor Plan", "Property Website"],
    popular: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  },
  {
    name: "Premium",
    description: "Our most popular package for standard residential properties",
    price: "$499.99",
    features: [
      "HDR Photography",
      "Cinematic Video",
      "Virtual Tour",
      "Floor Plan",
      "Property Website",
      "Social Media Posts",
    ],
    popular: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000",
  },
  {
    name: "Luxury",
    description: "Comprehensive coverage for high-end properties",
    price: "$799.99",
    features: [
      "HDR Photography",
      "Cinematic Video",
      "Virtual Tour",
      "Drone Aerial Photos & Video",
      "Floor Plan (2D & 3D)",
      "Twilight Photography",
      "Social Media Reel",
      "Property Website",
      "Custom Domain Name",
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000",
  },
]

export default function PricingPage() {
  const [selectedSize, setSelectedSize] = useState("<1000")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

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
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-repeat opacity-10 z-0"></div>

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
            <h3 className="text-2xl font-serif mb-8 text-center">Popular Packages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden border flex flex-col ${pkg.popular ? "border-secondary shadow-lg" : "border-gray-200"}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 z-10 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="h-48 relative">
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 sm:p-6 bg-white flex flex-col flex-1">
                    <h4 className="text-xl font-medium mb-2">{pkg.name}</h4>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base flex-1">{pkg.description}</p>
                    <div className="text-2xl sm:text-3xl font-light mb-4">{pkg.price}</div>
                    <ul className="mb-6 space-y-2 text-sm sm:text-base flex-1">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-secondary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <BookButton href="/quote" className="w-full mt-auto">
                      Get Started
                    </BookButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Services Pricing */}
          <div className="mb-24">
            <h3 className="text-2xl font-serif mb-8 text-center">Individual Services</h3>

            <Tabs defaultValue="<1000" className="w-full" onValueChange={setSelectedSize}>
              <div className="flex justify-center mb-8 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                <TabsList className="grid grid-cols-5 w-full max-w-3xl min-w-[600px] md:min-w-0">
                  <TabsTrigger value="<1000">Under 1000 sq ft</TabsTrigger>
                  <TabsTrigger value="1000-2000">1000-2000 sq ft</TabsTrigger>
                  <TabsTrigger value="2000-3000">2000-3000 sq ft</TabsTrigger>
                  <TabsTrigger value="3000-4000">3000-4000 sq ft</TabsTrigger>
                  <TabsTrigger value="4000-5000">4000-5000 sq ft</TabsTrigger>
                </TabsList>
              </div>

              {Object.keys(pricingData).map((size) => (
                <TabsContent key={size} value={size} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {services.map((service) => {
                      const price =
                        pricingData[size as keyof typeof pricingData][service.id as keyof (typeof pricingData)["<1000"]]
                      return (
                        <Card key={service.id} className="overflow-hidden flex flex-col h-full">
                          <div className="h-32 sm:h-40 relative">
                            <Image
                              src={service.image || "/placeholder.svg"}
                              alt={service.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader className="p-3 sm:p-6">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">{service.icon}</div>
                              <CardTitle className="text-base sm:text-lg">{service.name}</CardTitle>
                            </div>
                            <CardDescription className="text-xs sm:text-sm mt-1">{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-3 sm:p-6 pt-0 flex-grow">
                            <div className="text-xl sm:text-2xl font-light">{formatPrice(price)}</div>
                          </CardContent>
                          <CardFooter className="p-3 sm:p-6 pt-0 mt-auto">
                            <Button asChild className="w-full bg-[#3182ce] hover:bg-[#2c5282] text-sm sm:text-base">
                              <Link href="/quote">Order Now</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
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
                      setSelectedSize(size)
                      // Recalculate total when size changes
                      const newTotal = selectedServices.reduce((sum, id) => {
                        return sum + pricingData[size][id as keyof (typeof pricingData)["<1000"]]
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
                  const price = pricingData[selectedSize][service.id as keyof (typeof pricingData)["<1000"]]
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
