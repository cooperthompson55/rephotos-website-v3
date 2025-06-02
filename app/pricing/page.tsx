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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { QuoteModuleSection } from "@/components/home/QuoteModuleSection"

// BeforeAfterSlider Component
const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt }: { beforeSrc: string; afterSrc: string; alt: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '3/2' }}>
      {/* Before Image */}
      <img
        src={beforeSrc}
        alt={`${alt} - Before`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* After Image with Clip */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterSrc}
          alt={`${alt} - After`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-3 h-3 text-gray-600 absolute -left-0.5" />
          <ChevronRight className="w-3 h-3 text-gray-600 absolute -right-0.5" />
        </div>
      </div>
      {/* Slider Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
      {/* Labels */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Before</div>
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">After</div>
    </div>
  )
}

// Pricing data
const pricingData = {
  "<1000": {
    hdrPhotography: 189.99,
    virtualTour: 199.99,
    propertyHighlightsVideo: 319.99,
    socialMediaReel: 229.99,
    droneAerialPhotos: 159.99,
    droneAerialVideo: 159.99,
    floorPlan2d: 119.99,
    houseModel3d: 189.99,
    propertyWebsite: 129.99,
    customDomainName: 39.99,
    virtualStaging: "39.99/image",
    virtualTwilight: "49.99/image",
    virtualDeclutter: "29.99/image",
  },
  "1000-2000": {
    hdrPhotography: 249.99,
    virtualTour: 239.99,
    propertyHighlightsVideo: 349.99,
    socialMediaReel: 249.99,
    droneAerialPhotos: 159.99,
    droneAerialVideo: 159.99,
    floorPlan2d: 149.99,
    houseModel3d: 229.99,
    propertyWebsite: 129.99,
    customDomainName: 39.99,
    virtualStaging: "39.99/image",
    virtualTwilight: "49.99/image",
    virtualDeclutter: "29.99/image",
  },
  "2000-3000": {
    hdrPhotography: 319.99,
    virtualTour: 279.99,
    propertyHighlightsVideo: 389.99,
    socialMediaReel: 279.99,
    droneAerialPhotos: 159.99,
    droneAerialVideo: 159.99,
    floorPlan2d: 189.99,
    houseModel3d: 269.99,
    propertyWebsite: 129.99,
    customDomainName: 39.99,
    virtualStaging: "39.99/image",
    virtualTwilight: "49.99/image",
    virtualDeclutter: "29.99/image",
  },
  "3000-4000": {
    hdrPhotography: 379.99,
    virtualTour: 319.99,
    propertyHighlightsVideo: 429.99,
    socialMediaReel: 299.99,
    droneAerialPhotos: 159.99,
    droneAerialVideo: 159.99,
    floorPlan2d: 229.99,
    houseModel3d: 299.99,
    propertyWebsite: 129.99,
    customDomainName: 39.99,
    virtualStaging: "39.99/image",
    virtualTwilight: "49.99/image",
    virtualDeclutter: "29.99/image",
  },
  "4000-5000": {
    hdrPhotography: 439.99,
    virtualTour: 349.99,
    propertyHighlightsVideo: 469.99,
    socialMediaReel: 329.99,
    droneAerialPhotos: 159.99,
    droneAerialVideo: 159.99,
    floorPlan2d: 269.99,
    houseModel3d: 339.99,
    propertyWebsite: 129.99,
    customDomainName: 39.99,
    virtualStaging: "39.99/image",
    virtualTwilight: "49.99/image",
    virtualDeclutter: "29.99/image",
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
    id: "virtualTour",
    name: "360° Virtual Tour",
    description: "Interactive 3D tours that let buyers explore every corner of the property",
    icon: <Compass className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000",
  },
  {
    id: "propertyHighlightsVideo",
    name: "Property Highlights Video",
    description: "Stunning walkthrough videos with professional editing and music",
    icon: <Video className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  },
  {
    id: "socialMediaReel",
    name: "Social Media Reel",
    description: "Engaging short-form video content optimized for social media platforms",
    icon: <Instagram className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000",
  },
  {
    id: "droneAerialPhotos",
    name: "Drone Aerial Photos",
    description: "Breathtaking aerial photographs that showcase the property and surroundings",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000",
  },
  {
    id: "droneAerialVideo",
    name: "Drone Aerial Video",
    description: "Dynamic aerial footage that captures the property from unique perspectives",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2000",
  },
  {
    id: "floorPlan2d",
    name: "2D Floor Plan",
    description: "Accurate 2D floor plans that help buyers understand the layout",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  },
  {
    id: "houseModel3d",
    name: "3D House Model",
    description: "Comprehensive 3D house models for immersive visualization",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2000",
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
    id: "virtualStaging",
    name: "Virtual Staging",
    description: "Digitally furnish empty spaces to help buyers visualize the potential",
    icon: <Building className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  },
  {
    id: "virtualTwilight",
    name: "Virtual Twilight",
    description: "Transform daytime photos into stunning twilight scenes",
    icon: <PenTool className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2000",
  },
  {
    id: "virtualDeclutter",
    name: "Virtual Declutter",
    description: "Remove unwanted items and clean up spaces digitally",
    icon: <PenTool className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
  },
]

// Replace dynamic package logic with hardcoded content for each size and package
const hardcodedPackages: Record<SizeKey, PackageCard[]> = {
  '<1000': [
    {
      name: 'ESSENTIALS PACKAGE',
      price: '$229.99',
      subtitle: '',
      sqft: '0–999 sq ft',
      discount: 'Save $20',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '1–2 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: false },
        { label: '2D Floor Plan', included: false },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'DELUXE TOUR PACKAGE',
      price: '$489.99',
      subtitle: '',
      sqft: '0–999 sq ft',
      discount: 'Save $80',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'MARKETING PRO PACKAGE',
      price: '$829.99',
      subtitle: '',
      sqft: '0–999 sq ft',
      discount: 'Save $130',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#e6a100] hover:bg-[#ffd24d] text-[#262F3F]',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'PREMIUM SELLER EXPERIENCE',
      price: '$1069.99',
      subtitle: '',
      sqft: '0–999 sq ft',
      discount: 'Save $420',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '3–5 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: '3D House Model', included: true },
        { label: 'Virtual Twilight', included: true },
        { label: 'Virtual Staging', included: false },
      ],
      image: '',
    },
  ],
  '1000-2000': [
    {
      name: 'ESSENTIALS PACKAGE',
      price: '$289.99',
      subtitle: '',
      sqft: '1000–1999 sq ft',
      discount: 'Save $30',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '1–2 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: false },
        { label: '2D Floor Plan', included: false },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'DELUXE TOUR PACKAGE',
      price: '$579.99',
      subtitle: '',
      sqft: '1000–1999 sq ft',
      discount: 'Save $120',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'MARKETING PRO PACKAGE',
      price: '$959.99',
      subtitle: '',
      sqft: '1000–1999 sq ft',
      discount: 'Save $160',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#e6a100] hover:bg-[#ffd24d] text-[#262F3F]',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'PREMIUM SELLER EXPERIENCE',
      price: '$1199.99',
      subtitle: '',
      sqft: '1000–1999 sq ft',
      discount: 'Save $450',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '3–5 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: '3D House Model', included: true },
        { label: 'Virtual Twilight', included: true },
        { label: 'Virtual Staging', included: false },
      ],
      image: '',
    },
  ],
  '2000-3000': [
    {
      name: 'ESSENTIALS PACKAGE',
      price: '$349.99',
      subtitle: '',
      sqft: '2000–2999 sq ft',
      discount: 'Save $30',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '1–2 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: false },
        { label: '2D Floor Plan', included: false },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'DELUXE TOUR PACKAGE',
      price: '$649.99',
      subtitle: '',
      sqft: '2000–2999 sq ft',
      discount: 'Save $190',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'MARKETING PRO PACKAGE',
      price: '$1079.99',
      subtitle: '',
      sqft: '2000–2999 sq ft',
      discount: 'Save $200',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#e6a100] hover:bg-[#ffd24d] text-[#262F3F]',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'PREMIUM SELLER EXPERIENCE',
      price: '$1319.99',
      subtitle: '',
      sqft: '2000–2999 sq ft',
      discount: 'Save $490',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '3–5 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: '3D House Model', included: true },
        { label: 'Virtual Twilight', included: true },
        { label: 'Virtual Staging', included: false },
      ],
      image: '',
    },
  ],
  '3000-4000': [
    {
      name: 'ESSENTIALS PACKAGE',
      price: '$389.99',
      subtitle: '',
      sqft: '3000–3999 sq ft',
      discount: 'Save $50',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '1–2 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: false },
        { label: '2D Floor Plan', included: false },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'DELUXE TOUR PACKAGE',
      price: '$719.99',
      subtitle: '',
      sqft: '3000–3999 sq ft',
      discount: 'Save $260',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'MARKETING PRO PACKAGE',
      price: '$1179.99',
      subtitle: '',
      sqft: '3000–3999 sq ft',
      discount: 'Save $260',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#e6a100] hover:bg-[#ffd24d] text-[#262F3F]',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'PREMIUM SELLER EXPERIENCE',
      price: '$1419.99',
      subtitle: '',
      sqft: '3000–3999 sq ft',
      discount: 'Save $550',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '3–5 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: '3D House Model', included: true },
        { label: 'Virtual Twilight', included: true },
        { label: 'Virtual Staging', included: false },
      ],
      image: '',
    },
  ],
  '4000-5000': [
    {
      name: 'ESSENTIALS PACKAGE',
      price: '$449.99',
      subtitle: '',
      sqft: '4000–4999 sq ft',
      discount: 'Save $50',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '1–2 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: false },
        { label: '2D Floor Plan', included: false },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'DELUXE TOUR PACKAGE',
      price: '$799.99',
      subtitle: '',
      sqft: '4000–4999 sq ft',
      discount: 'Save $320',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: false },
        { label: 'Property Website', included: false },
        { label: 'Custom Domain', included: false },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'MARKETING PRO PACKAGE',
      price: '$1299.99',
      subtitle: '',
      sqft: '4000–4999 sq ft',
      discount: 'Save $310',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#e6a100] hover:bg-[#ffd24d] text-[#262F3F]',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '2–3 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: 'Virtual Twilight', included: false },
        { label: 'Virtual Staging', included: false },
        { label: '3D House Model', included: false },
      ],
      image: '',
    },
    {
      name: 'PREMIUM SELLER EXPERIENCE',
      price: '$1539.99',
      subtitle: '',
      sqft: '4000–4999 sq ft',
      discount: 'Save $600',
      discountColor: 'text-[#B42222]',
      buttonColor: 'bg-[#262F3F] text-white',
      features: [
        { label: 'HDR Photography', included: true },
        { label: '3–5 Drone Shots', included: true },
        { label: '360° Virtual Tour', included: true },
        { label: '2D Floor Plan', included: true },
        { label: 'Custom Video (Built with Your Preferences)', included: true },
        { label: 'Property Website', included: true },
        { label: 'Custom Domain', included: true },
        { label: '3D House Model', included: true },
        { label: 'Virtual Twilight', included: true },
        { label: 'Virtual Staging', included: false },
      ],
      image: '',
    },
  ],
};

// Move type definitions above hardcodedPackages and outside the component

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

export default function PricingPage() {
  const [selectedSize, setSelectedSize] = useState<SizeKey>("<1000")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  // Track quantity for each service
  const [serviceQuantities, setServiceQuantities] = useState<{ [id: string]: number }>({})

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

  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSelection = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
      // If adding, set default quantity to 1 (or keep existing)
      if (!prev.includes(serviceId)) {
        setServiceQuantities((q) => ({ ...q, [serviceId]: q[serviceId] || 1 }))
      }
      // If removing, remove quantity
      if (prev.includes(serviceId)) {
        setServiceQuantities((q) => {
          const newQ = { ...q }
          delete newQ[serviceId]
          return newQ
        })
      }
      // Calculate new total
      const newTotal = newSelection.reduce((sum, id) => {
        const value = pricingData[selectedSize][id as keyof (typeof pricingData)["<1000"]];
        const qty = (id === "virtualStaging" || id === "virtualTwilight") ? (serviceQuantities[id] || 1) : 1;
        if (typeof value === "number") return sum + value * qty;
        if (typeof value === "string" && !isNaN(Number(value))) return sum + Number(value) * qty;
        if (typeof value === "string" && value.endsWith("/image")) return sum + Number(value.replace("/image", "")) * qty;
        return sum;
      }, 0)
      setTotalPrice(newTotal)
      return newSelection
    })
  }

  // Handle quantity change for a service
  const handleQuantityChange = (serviceId: string, delta: number) => {
    setServiceQuantities((prev) => {
      const current = prev[serviceId] || 1;
      // If decreasing from 1 to 0, remove from selectedServices and quantities
      if (current === 1 && delta === -1) {
        setSelectedServices((prevSel) => prevSel.filter((id) => id !== serviceId));
        // Remove from quantities
        const newQ = { ...prev };
        delete newQ[serviceId];
        // Recalculate total
        const newTotal = Object.keys(newQ).reduce((sum, id) => {
          const value = pricingData[selectedSize][id as keyof (typeof pricingData)["<1000"]];
          const qty = newQ[id] || 1;
          if (typeof value === "number") return sum + value * qty;
          if (typeof value === "string" && !isNaN(Number(value))) return sum + Number(value) * qty;
          if (typeof value === "string" && value.endsWith("/image")) return sum + Number(value.replace("/image", "")) * qty;
          return sum;
        }, 0);
        setTotalPrice(newTotal);
        return newQ;
      }
      const next = Math.max(1, current + delta);
      // Update quantity and recalculate total
      const updatedQ = { ...prev, [serviceId]: next };
      const newTotal = Object.keys(updatedQ).reduce((sum, id) => {
        const value = pricingData[selectedSize][id as keyof (typeof pricingData)["<1000"]];
        const qty = updatedQ[id] || 1;
        if (typeof value === "number") return sum + value * qty;
        if (typeof value === "string" && !isNaN(Number(value))) return sum + Number(value) * qty;
        if (typeof value === "string" && value.endsWith("/image")) return sum + Number(value.replace("/image", "")) * qty;
        return sum;
      }, 0);
      setTotalPrice(newTotal);
      return updatedQ;
    });
  }

  // Define a style string for the + and - buttons
  const qtyBtnStyle = "w-6 h-6 text-lg font-bold text-[#262F3F] bg-transparent border-none p-0 hover:bg-transparent focus:outline-none";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-18 md:pt-20">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-no-repeat bg-cover opacity-10 z-0"
          style={{ backgroundColor: '#F8F5F0' }}
        ></div>

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
              <button
                type="button"
                className="bg-white text-primary hover:bg-gray-100 rounded-md font-medium transition-colors px-6 py-3"
                onClick={() => {
                  const el = document.getElementById('individual-services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn more
              </button>
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
              {hardcodedPackages[selectedSize].map((pkg, idx) => (
                <div
                  key={pkg.name + idx}
                  className={`flex flex-col rounded-xl border ${pkg.borderColor || "border-gray-200"} bg-white p-6 shadow-sm transition-all`}
                >
                  <div className="mb-2 text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86]">{pkg.name}</div>
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-mazzard font-semibold text-[#262F3F]">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">
                    {pkg.sqft}
                  </div>
                  <div className={`mb-2 text-sm font-mazzard font-semibold ${pkg.discountColor}`}>{pkg.discount}</div>
                  <BookButton href="/book-now" size="lg" className={`w-full mb-4 mt-2 font-mazzard font-semibold ${pkg.buttonColor}`}>Get Started</BookButton>
                  <ul className="flex-1 mb-4 space-y-1 text-sm">
                    {pkg.features.map((feature: PackageFeature, i: number) => (
                      <li key={i} className={`flex items-center gap-2 ${feature.included ? "text-[#262F3F]" : "text-[#B0B7C3] line-through"}`}>
                        {feature.included ? (
                          <span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>
                        ) : (
                          <span className="inline-block w-4 h-4 rounded-full bg-[#E5E7EB] text-[#B0B7C3] flex items-center justify-center">✗</span>
                        )}
                        <span>{feature.label}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Included with every package section */}
                  <div className="bg-[#f8f9fa] rounded-lg px-4 py-3 -mx-2 border-t border-gray-100">
                    <div className="text-[10px] font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-2">INCLUDED WITH EVERY PACKAGE</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                        <span className="text-[#262F3F] font-medium">Next-Day Turnaround</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                        <span className="text-[#262F3F] font-medium">Quality Guarantee</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="inline-block w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">✓</span>
                        <span className="text-[#262F3F] font-medium">Secure Cloud Backup</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Module Section */}
          <div className="mb-16 md:mb-24">
            <QuoteModuleSection />
          </div>

          {/* Individual Services Pricing */}
          <div className="mb-24" id="individual-services">
            <h2 className="text-3xl font-serif font-bold mb-2 text-[#262F3F]">Individual services</h2>
            <p className="text-lg text-[#262F3F] mb-8">Mix and match our premium services to create a custom marketing experience for your listing or project, or add services to a package.</p>
            <div className="flex flex-col gap-10">
              {/* Premium Photography */}
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg h-full flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/pricing/photography.jpg" alt="Premium Photography" className="absolute inset-0 w-full h-full object-cover object-bottom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Premium Photography</h3>
                      <p className="text-white text-base font-normal mb-4">Help any property stand out on the MLS, social media, and more with stunning photography by our award-winning Visual Artists</p>
                      <button
                        type="button"
                        className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D] rounded-md transition-colors px-6 py-3 mt-4"
                        onClick={() => {
                          window.location.href = '/book-now';
                        }}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1 w-full mb-6 h-full flex flex-col">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-full border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/pricing/photography.jpg" alt="Premium Photography" className="w-full h-48 object-cover object-bottom" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="text-left">
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">PHOTOGRAPHY</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].hdrPhotography)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 999 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$60 per 1,000 sq ft</div>
                        <div className="mb-2 text-sm font-mazzard font-semibold text-[#B42222]">Recommended for most listings</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>0–999 sq ft</span><span className="font-semibold">{formatPrice(pricingData["<1000"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>1000–1999 sq ft</span><span className="font-semibold">{formatPrice(pricingData["1000-2000"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>2000–2999 sq ft</span><span className="font-semibold">{formatPrice(pricingData["2000-3000"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>3000–3999 sq ft</span><span className="font-semibold">{formatPrice(pricingData["3000-4000"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>4000–4999 sq ft</span><span className="font-semibold">{formatPrice(pricingData["4000-5000"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>5000+ sq ft</span><span className="font-semibold"><a href="/contact-us" className="text-primary underline hover:text-[#B42222]">Contact us</a></span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2 justify-center"><span>ⓘ</span>Combine with Drone Shots to showcase the full property experience.</div>
                      </div>
                      <button
                        type="button"
                        className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D] rounded-md transition-colors px-6 py-3 mt-4"
                        onClick={() => {
                          window.location.href = '/book-now';
                        }}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Services: Property Highlights Video, Social Media Reel, Drone Aerial Video */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
                {/* Property Highlights Video Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[360px] border border-gray-200 overflow-hidden">
                  <div>
                    <video
                      src="/horizontal.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/photobank/s_2.webp"
                      className="w-full rounded-lg mb-4 object-cover max-h-56"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center">Property Highlights Video</h3>
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["<1000"].propertyHighlightsVideo)}</div>
                    <div className="text-center text-[#6B7A86] mb-4">1–2 minute horizontal video</div>
                    <ul className="mb-6 text-sm text-[#262F3F] font-mazzard space-y-1 text-center">
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Smooth cinematic video</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Shot in 4K on iPhone</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Professional editing</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Royalty-free background music</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Delivered MLS-ready</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>48–72 hour turnaround</li>
                    </ul>
                  </div>
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
                </div>
                {/* Social Media Reel Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[360px] border border-gray-200 overflow-hidden">
                  <div>
                    <video
                      src="/vertical.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/photobank/s_3-thumb.webp"
                      className="w-full rounded-lg mb-4 object-cover max-h-56"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center">Social Media Reel</h3>
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["<1000"].socialMediaReel)}</div>
                    <div className="text-center text-[#6B7A86] mb-4">30–60 second vertical video</div>
                    <ul className="mb-6 text-sm text-[#262F3F] font-mazzard space-y-1 text-center">
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Optimized for Instagram, TikTok, and Reels</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Shot in 4K on iPhone</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Professional editing</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Royalty-free trending music</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Social-ready delivery</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>48–72 hour turnaround</li>
                    </ul>
                  </div>
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
                </div>
                {/* Drone Aerial Video Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[360px] border border-gray-200 overflow-hidden">
                  <div>
                    <video
                      src="/aerial.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/services/videography/lot_lines.gif"
                      className="w-full rounded-lg mb-4 object-cover max-h-56"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center">Drone Aerial Video</h3>
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["<1000"].droneAerialVideo)}</div>
                    <div className="text-center text-[#6B7A86] mb-4">30–60 seconds of aerial footage</div>
                    <ul className="mb-6 text-sm text-[#262F3F] font-mazzard space-y-1 text-center">
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>High-resolution exterior shots</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Captures the property and surroundings</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Smooth motion edits</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Royalty-free music included</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Delivered in multiple formats</li>
                      <li className="flex items-center gap-2 justify-center"><span className="inline-block w-4 h-4 rounded-full bg-[#262F3F] text-white flex items-center justify-center">✓</span>Next day turnaround</li>
                    </ul>
                  </div>
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
                </div>
              </div>

              {/* 3D Virtual Tours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/photobank/s_5-thumb.webp" alt="Matterport 3D Virtual Tours" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Matterport 3D Virtual Tours</h3>
                      <p className="text-white text-base font-normal mb-4">Hand clients and buyers the keys from anywhere in the world with industry-leading Matterport 3D Virtual Tours</p>
                      <BookButton href="/services/virtual-tours" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_5-thumb.webp" alt="Matterport 3D Virtual Tours" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">3D VIRTUAL TOURS</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].virtualTour)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 999 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$50 per 1,000 sq ft</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>0–999 sq ft</span><span className="font-semibold">$199.99</span></li>
                          <li className="flex justify-between"><span>1000–1999 sq ft</span><span className="font-semibold">$239.99</span></li>
                          <li className="flex justify-between"><span>2000–2999 sq ft</span><span className="font-semibold">$279.99</span></li>
                          <li className="flex justify-between"><span>3000–3999 sq ft</span><span className="font-semibold">$319.99</span></li>
                          <li className="flex justify-between"><span>4000–4999 sq ft</span><span className="font-semibold">$349.99</span></li>
                          <li className="flex justify-between"><span>5000+ sq ft</span><span className="font-semibold"><a href="/contact-us" className="text-primary underline hover:text-[#B42222]">Contact us</a></span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aerial Photos & Video */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/photobank/s_4-thumb.webp" alt="Aerial Photos & Video" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Aerial Photos & Video</h3>
                      <p className="text-white text-base font-normal mb-4">Elevate any home or property above the rest with incredible drone footage captured by our FAA-certified Visual Artists</p>
                      <BookButton href="/services/aerial" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_4-thumb.webp" alt="Aerial Photos & Video" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">AERIAL PHOTOS & VIDEO</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].droneAerialPhotos)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Aerial Drone Photos (10-15 images)</span><span className="font-semibold">$159.99</span></li>
                          <li className="flex justify-between"><span>Aerial Drone Video (30-60 seconds)</span><span className="font-semibold">$159.99</span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2 justify-center"><span>ⓘ</span>Smaller aerial photo options are available for properties that require 1-10 aerial images</div>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full mx-auto">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Services (Staging and Twilight) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/photobank/s_8-thumb.webp" alt="Virtual Services" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Virtual Services</h3>
                      <p className="text-white text-base font-normal mb-4">Beautifully stage, declutter, or even remodel any space with Virtual Service magic—no moving truck required</p>
                      <BookButton href="/services/virtual-services" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_8-thumb.webp" alt="Virtual Services" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIRTUAL SERVICES</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].virtualStaging)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Virtual Twilight</span><span className="font-semibold">$49.99/img</span></li>
                          <li className="flex justify-between"><span>Virtual Staging</span><span className="font-semibold">$39.99/img</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Twilight & Virtual Declutter Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-10">
                {/* Virtual Twilight Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[360px] border border-gray-200 overflow-hidden">
                  <div>
                    <BeforeAfterSlider
                      beforeSrc="/images/photobank/after-gallery.webp"
                      afterSrc="/images/photobank/before-gallery.webp"
                      alt="Virtual Twilight"
                    />
                    <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center mt-4">Virtual Twilight</h3>
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["<1000"].virtualTwilight)}</div>
                    <p className="text-sm text-[#262F3F] font-mazzard text-center mb-6">Transform day to twilight</p>
                  </div>
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
                </div>
                {/* Virtual Declutter Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[360px] border border-gray-200 overflow-hidden">
                  <div>
                    <BeforeAfterSlider
                      beforeSrc="/images/photobank/declutter-after-gallery.webp"
                      afterSrc="/images/photobank/DSC_7594-gallery.webp"
                      alt="Virtual Declutter"
                    />
                    <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center mt-4">Virtual Declutter</h3>
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["<1000"].virtualDeclutter)}</div>
                    <p className="text-sm text-[#262F3F] font-mazzard text-center mb-6">Remove personal items</p>
                  </div>
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
                </div>
              </div>

              {/* Property Websites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/photobank/s_7-thumb.webp" alt="Premium Property Websites" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Premium Property Websites</h3>
                      <p className="text-white text-base font-normal mb-4">Control the narrative of your listing or project and showcase all of your beautiful content in one place</p>
                      <BookButton href="/services/websites" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_7-thumb.webp" alt="Premium Property Websites" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">PROPERTY WEBSITES</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].propertyWebsite)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Custom Domain for 1 Year</span><span className="font-semibold">$39.99</span></li>
                          <li className="flex justify-between"><span>Live in 24-48 hours</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/photobank/s_6-thumb.webp" alt="Professional Floor & Site Plans" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Professional Floor Plans & Model</h3>
                      <p className="text-white text-base font-normal mb-4">Land more qualified buyers and clients by showing them the layout of the property before they show up</p>
                      <BookButton href="/services/floor-plans" size="lg" className="bg-[#f3a952] text-[#262F3F] font-mazzard font-semibold hover:bg-[#FFD24D]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_6-thumb.webp" alt="Professional Floor & Site Plans" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">FLOOR PLANS</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["<1000"].floorPlan2d)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>2D Floor Plan</span><span className="font-semibold">$119.99</span></li>
                          <li className="flex justify-between"><span>3D House Model</span><span className="font-semibold">$189.99</span></li>
                        </ul>
                          </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#f3a952] hover:text-[#262F3F] mt-2 w-full">Get Started</BookButton>
                            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Build Your Own Package */}
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-md" id="build-your-own-package">
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
                        const value = pricingData[size as SizeKey][id as keyof (typeof pricingData)["<1000"]];
                        return typeof value === "number" ? sum + value : sum;
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
                  const isQty = service.id === "virtualStaging" || service.id === "virtualTwilight" || service.id === "virtualDeclutter";
                  const qty = serviceQuantities[service.id] || 1;
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
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                          {formatPrice(price)}
                          {selectedServices.includes(service.id) && (
                            <span className="flex items-center ml-2">
                              <button
                                type="button"
                                className={qtyBtnStyle}
                                onClick={() => handleQuantityChange(service.id, -1)}
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="mx-2 min-w-[20px] text-center">{qty}</span>
                              <button
                                type="button"
                                className={qtyBtnStyle}
                                onClick={() => handleQuantityChange(service.id, 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="w-full md:min-w-[340px] md:max-w-[480px] md:flex-1">
                <h4 className="text-base sm:text-lg font-medium">Your Custom Package</h4>
                <p className="text-sm text-gray-600">
                  {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""} selected
                </p>
                {/* Order Overview */}
                {selectedServices.length > 0 && (
                  <div className="mt-5 mb-4 p-4 bg-gray-100 rounded-lg shadow-sm w-full">
                    <h5 className="text-base font-semibold mb-3 text-[#262F3F]">Order Overview</h5>
                    <ul className="text-base text-gray-800 space-y-2">
                      {selectedServices.map((id) => {
                        const service = services.find(s => s.id === id);
                        const price = pricingData[selectedSize][id as keyof (typeof pricingData)[SizeKey]];
                        const qty = serviceQuantities[id] || 1;
                        return (
                          <li key={id} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
                            <span className="font-medium flex items-center">
                              {service?.name}
                              <span className="ml-3 flex items-center gap-1">
                                <button
                                  type="button"
                                  className={qtyBtnStyle}
                                  onClick={() => handleQuantityChange(id, -1)}
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="mx-2 min-w-[20px] text-center">{qty}</span>
                                <button
                                  type="button"
                                  className={qtyBtnStyle}
                                  onClick={() => handleQuantityChange(id, 1)}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </span>
                            </span>
                            <span className="font-semibold">{formatPrice(price)}{qty > 1 ? ` x${qty}` : ""}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-center md:text-right mt-4 md:mt-0 w-full md:w-auto md:flex-shrink-0 md:pl-8">
                <div className="text-2xl sm:text-3xl font-light mb-2">{formatPrice(totalPrice)}</div>
                <Button
                  disabled={selectedServices.length === 0}
                  className="bg-secondary hover:bg-secondary/90 w-full md:w-auto"
                  onClick={() => { window.location.href = '/book-now'; }}
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
            <button
              type="button"
              className="bg-white text-primary hover:bg-gray-100 rounded-md font-medium transition-colors px-6 py-3"
              onClick={() => { window.location.href = '/book-now'; }}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
