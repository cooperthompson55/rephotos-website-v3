"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
import { loadPricingData, type SizeKey, type PricingData, type PackagesData, type PackageFeature, type PackageCard } from "@/lib/pricing-parser"

// Image types and components from book-now page
type ImageItem = string | {
  type: "before-after";
  beforeImage: string;
  afterImage: string;
  title: string;
} | {
  type: "video";
  videoUrl: string;
  posterImage?: string;
} | {
  type: "youtube";
  embedId: string;
  title?: string;
};

// Package image arrays
const packageImages: ImageItem[] = [
  "/images/book-now/packages/INSTAGRAM STORY (12).jpg",
  "/images/book-now/packages/INSTAGRAM STORY (13).jpg",
  "/images/book-now/packages/0-a.jpg",
  "/images/book-now/packages/1-social-posts.jpg",
  "/images/book-now/packages/2.jpg",
  "/images/book-now/packages/3.jpg",
  "/images/book-now/packages/5.jpg",
  "/images/book-now/packages/12.jpg",
  {
    type: "before-after",
    beforeImage: "/images/book-now/before1.jpg",
    afterImage: "/images/book-now/after1.jpg",
    title: "Blue Sky Guarantee"
  },
  {
    type: "before-after",
    beforeImage: "/images/book-now/before2.jpg",
    afterImage: "/images/book-now/after2.jpg",
    title: "Blue Sky Guarantee"
  }
];

const marketingProImages: ImageItem[] = [
  "/images/book-now/packages/INSTAGRAM STORY (22).jpg",
  "/images/book-now/packages/INSTAGRAM STORY (12).jpg",
  "/images/book-now/packages/INSTAGRAM STORY (13).jpg",
  "/images/book-now/addons/360tour1.jpg",
  "/images/book-now/packages/INSTAGRAM STORY (21).jpg",
  "/images/book-now/addons/2d3.jpg",
  "/images/book-now/packages/INSTAGRAM STORY (18).jpg",
  "/images/book-now/addons/domain (1).jpg",
  "/images/book-now/packages/0-a.jpg",
  "/images/book-now/packages/1-social-posts.jpg",
  "/images/book-now/packages/2.jpg",
  "/images/book-now/packages/3.jpg",
  "/images/book-now/packages/5.jpg",
  "/images/book-now/packages/12.jpg",
  {
    type: "before-after",
    beforeImage: "/images/book-now/before1.jpg",
    afterImage: "/images/book-now/after1.jpg",
    title: "Blue Sky Guarantee"
  },
  {
    type: "before-after",
    beforeImage: "/images/book-now/before2.jpg",
    afterImage: "/images/book-now/after2.jpg",
    title: "Blue Sky Guarantee"
  }
];

const topAgentImages: ImageItem[] = [
  "/images/book-now/packages/INSTAGRAM STORY (24).jpg",
  "/images/book-now/packages/INSTAGRAM STORY (12).jpg",
  "/images/book-now/packages/INSTAGRAM STORY (13).jpg",
  "/images/book-now/addons/360tour1.jpg",
  "/images/book-now/packages/INSTAGRAM STORY (21).jpg",
  "/images/book-now/addons/2d3.jpg",
  "/images/book-now/packages/INSTAGRAM STORY (18).jpg",
  "/images/book-now/addons/domain (1).jpg",
  "/images/book-now/packages/0-a.jpg",
  "/images/book-now/packages/1-social-posts.jpg",
  "/images/book-now/packages/2.jpg",
  "/images/book-now/packages/3.jpg",
  "/images/book-now/packages/5.jpg",
  "/images/book-now/packages/12.jpg",
  {
    type: "before-after",
    beforeImage: "/images/book-now/before1.jpg",
    afterImage: "/images/book-now/after1.jpg",
    title: "Blue Sky Guarantee"
  },
  {
    type: "before-after",
    beforeImage: "/images/book-now/before2.jpg",
    afterImage: "/images/book-now/after2.jpg",
    title: "Blue Sky Guarantee"
  }
];

// Sliding Carousel Component
const SlidingCarousel = ({ 
  images, 
  currentIndex, 
  onNavigate, 
  onHover, 
  alt = "Carousel image",
  showIncludedBadge = false
}: { 
  images: ImageItem[], 
  currentIndex: number, 
  onNavigate: (direction: 'prev' | 'next') => void,
  onHover: (isHovering: boolean) => void,
  alt?: string,
  showIncludedBadge?: boolean
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});

  // Handle navigation
  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning || images.length <= 1) return;
    
    setIsTransitioning(true);
    onNavigate(direction);
    
    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, images.length, onNavigate]);

  if (images.length === 0) return null;

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out ${
            index === currentIndex ? 'translate-x-0' : 
            index < currentIndex ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {typeof image === 'object' ? (
            image.type === 'before-after' ? (
              <BeforeAfterSlider
                beforeSrc={image.beforeImage}
                afterSrc={image.afterImage}
                alt={image.title}
              />
            ) : image.type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  src={image.videoUrl}
                  poster={image.posterImage}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => {
                    onHover(true);
                    setIsPlaying(prev => ({ ...prev, [index]: true }));
                  }}
                  onPause={() => {
                    onHover(false);
                    setIsPlaying(prev => ({ ...prev, [index]: false }));
                  }}
                  onEnded={() => {
                    setIsPlaying(prev => ({ ...prev, [index]: false }));
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : image.type === 'youtube' ? (
              <div className="relative w-full h-full group">
                {!isPlaying[index] ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${image.embedId}/maxresdefault.jpg`}
                      alt={image.title || `YouTube Video ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => {
                        setIsPlaying(prev => ({ ...prev, [index]: true }));
                        onHover(true);
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${image.embedId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 hover:opacity-0 group">
                      <div 
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 ease-out group-hover:scale-90 group-hover:opacity-0 pointer-events-auto cursor-pointer"
                        onClick={() => {
                          setIsPlaying(prev => ({ ...prev, [index]: true }));
                          onHover(true);
                        }}
                      >
                        <svg 
                          className="w-6 h-6 sm:w-7 sm:h-7 text-white/90" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${image.embedId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
                    title={image.title || `YouTube Video ${index + 1}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            ) : null
          ) : (
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/home/s_1.webp';
              }}
            />
          )}
          
          {/* Included Badge */}
          {showIncludedBadge && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg z-10">
              ✓ Included
            </div>
          )}
        </div>
      ))}

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('prev');
            }}
            disabled={isTransitioning}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all z-10 disabled:opacity-50 group focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('next');
            }}
            disabled={isTransitioning}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all z-10 disabled:opacity-50 group focus:outline-none focus:ring-4 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isTransitioning && index !== currentIndex) {
                  setIsTransitioning(true);
                  onNavigate(index > currentIndex ? 'next' : 'prev');
                  setTimeout(() => setIsTransitioning(false), 700);
                }
              }}
              disabled={isTransitioning}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Service bundles from book-now page
const serviceBundles = [
  {
    id: "essentials",
    title: "Essentials",
    description: "Everything you need for a professional listing",
    icon: "📸",
    images: [
      "/images/book-now/packages/main.jpg",
      ...packageImages
    ],
    services: [
      "Professional Photography",
      "2-6 Aerial Photos Optimized For Your Listing",
      "Listing Website",
      "Slideshow Video",
      "Feature Sheet (PDF)",
      "Social Media Post",
      "Social Media Story",
      "Blue Sky Replacement",
      "Secure Cloud Backup",
      "Shoot today, list tomorrow"
    ]
  },
  {
    id: "essentials-twilight",
    title: "Essentials + Twilight",
    description: "Essential package with stunning twilight photography",
    icon: "📸🌅",
    images: [...packageImages],
    services: ["Everything in Essentials", "Virtual Twilight Photography"]
  },
  {
    id: "essentials-floor-plans",
    title: "Essentials + 2D Floor Plans",
    description: "Essential package with detailed floor plans",
    icon: "📸📐",
    images: [...packageImages],
    services: ["Everything in Essentials", "2D Floor Plan (Color-coded + Black and white)"]
  },
  {
    id: "essentials-matterport",
    title: "Essentials + Matterport Tour",
    description: "Essential package with immersive virtual tour",
    icon: "📸🏠",
    images: [...packageImages],
    services: ["Everything in Essentials", "360° Virtual Tour"]
  },
  {
    id: "essentials-property-video",
    title: "Essentials + Property Tour Video",
    description: "Essential package with dynamic property video",
    icon: "📸🎬",
    images: [...packageImages],
    services: ["Everything in Essentials", "Property Tour Video (Drone Footage)"]
  },
  {
    id: "marketing-pro",
    title: "Marketing Pro",
    description: "Complete marketing package for serious agents",
    icon: "🎯",
    images: [...marketingProImages],
    services: ["Everything in Essentials", "Enhanced Twilight Listing Image", "360° Virtual Tour", "Property Highlights Video", "2D Floor Plan", "Drone Aerial Photos", "Drone Aerial Footage", "Custom Domain Name"]
  },
  {
    id: "top-agent",
    title: "Top Agent",
    description: "Premium package for top-performing agents",
    icon: "👑",
    images: [...topAgentImages],
    services: [
      "Everything in Marketing Pro",
      "Agent on video",
      "2 Additional Twilight Images",
      "Social Media Reel Video",
      "Extra social media content",
      "2D + 3D Floor Plan",
      "Agent Branding on All Media",
      "Complete Aerial Coverage"
    ]
  }
];

// Get pricing for service bundles based on property size
const getBundlePricing = (bundleId: string, propertySize: string) => {
  const priceMap: { [key: string]: { [size: string]: string } } = {
    "essentials": {
      "Under 1500": "$279",
      "1500-2500": "$329", 
      "2500-3500": "$379",
      "3500-4500": "$429",
      "4500-5500": "$479"
    },
    "essentials-twilight": {
      "Under 1500": "$299",
      "1500-2500": "$349",
      "2500-3500": "$399",
      "3500-4500": "$449",
      "4500-5500": "$499"
    },
    "essentials-floor-plans": {
      "Under 1500": "$349",
      "1500-2500": "$399",
      "2500-3500": "$449", 
      "3500-4500": "$499",
      "4500-5500": "$549"
    },
    "essentials-matterport": {
      "Under 1500": "$399",
      "1500-2500": "$449",
      "2500-3500": "$499",
      "3500-4500": "$549", 
      "4500-5500": "$599"
    },
    "essentials-property-video": {
      "Under 1500": "$479",
      "1500-2500": "$529",
      "2500-3500": "$579",
      "3500-4500": "$629",
      "4500-5500": "$679"
    },
    "marketing-pro": {
      "Under 1500": "$679",
      "1500-2500": "$729",
      "2500-3500": "$779",
      "3500-4500": "$829",
      "4500-5500": "$879"
    },
    "top-agent": {
      "Under 1500": "$799",
      "1500-2500": "$849", 
      "2500-3500": "$899",
      "3500-4500": "$949",
      "4500-5500": "$999"
    }
  };
  
  return priceMap[bundleId]?.[propertySize] || "Contact for pricing";
};

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

// Service details with icons and descriptions
const services = [
  {
    id: "hdrPhotography",
    name: "HDR Photography",
    description: "Professional high-quality photography that showcases your property's best features",
    icon: <Camera className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000",
  },
  {
    id: "matterportTour",
    name: "Matterport 3D Tour",
    description: "Interactive 360° virtual tours that let buyers explore every corner",
    icon: <Compass className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2000",
  },
  {
    id: "propertyHighlightsVideo",
    name: "Property Highlights Video",
    description: "Cinematic video showcasing your property's unique selling points",
    icon: <Video className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2000",
  },
  {
    id: "slideshowVideoTour",
    name: "Slideshow Video Tour",
    description: "Dynamic slideshow combining your best photos with music",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2000",
  },
  {
    id: "socialMediaReel",
    name: "Social Media Reel",
    description: "Short-form video content perfect for social media marketing",
    icon: <Instagram className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000",
  },
  {
    id: "droneAerialPhotos",
    name: "Drone Aerial Photos",
    description: "Stunning aerial photography showing property and surroundings",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1473163928189-364b2c4e7a9f?q=80&w=2000",
  },
  {
    id: "droneAerialVideo",
    name: "Drone Aerial Video",
    description: "Professional drone footage providing unique perspectives",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000",
  },
  {
    id: "dronePhotosVideo",
    name: "Drone Photos + Video",
    description: "Complete aerial package combining photos and video footage",
    icon: <Drone className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000",
  },
  {
    id: "floorPlan2d",
    name: "2D Floor Plans",
    description: "Detailed floor plans helping buyers understand the layout",
    icon: <LayoutGrid className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2000",
  },
  {
    id: "houseModel3d",
    name: "3D House Model",
    description: "Three-dimensional models for enhanced property visualization",
    icon: <Building className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=2000",
  },
  {
    id: "propertyWebsite",
    name: "Property Website",
    description: "Custom website showcasing your property with all media",
    icon: <Globe className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
  },
  {
    id: "customDomainName",
    name: "Custom Domain Name",
    description: "Professional custom domain for your property website",
    icon: <Globe className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
  },
  {
    id: "virtualStaging",
    name: "Virtual Staging",
    description: "Digitally stage empty rooms to show their potential",
    icon: <PenTool className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000",
  },
  {
    id: "virtualTwilight",
    name: "Virtual Twilight",
    description: "Transform daytime photos into stunning twilight images",
    icon: <Sunset className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2000",
  },
  {
    id: "virtualDeclutter",
    name: "Virtual Declutter",
    description: "Remove personal items and clutter to create clean, appealing spaces",
    icon: <PenTool className="h-5 w-5" />,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2000",
  },
]

export default function PricingPage() {
  const [selectedSize, setSelectedSize] = useState<SizeKey | '5500plus'>("Under 1500")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  // Track quantity for each service
  const [serviceQuantities, setServiceQuantities] = useState<{ [id: string]: number }>({})
  
  // State for dynamic pricing data
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [packagesData, setPackagesData] = useState<PackagesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // State for package image carousels
  const [packageImageIndices, setPackageImageIndices] = useState<{ [key: string]: number }>({})
  const [hoveredPackages, setHoveredPackages] = useState<{ [key: string]: boolean }>({})

  // Load pricing data on component mount
  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('/api/pricing-data')
        if (response.ok) {
          const data = await response.json()
          setPricingData(data.pricingData)
          setPackagesData(data.packagesData)
        } else {
          console.error('Failed to fetch pricing data')
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPricingData()
  }, [])

  // Add this helper for slider stops - updated for new size structure
  const sizeOptions: { value: SizeKey | '5500plus'; label: string; range: string }[] = [
    { value: "Under 1500", label: "1", range: "Up to 1499 sq ft" },
    { value: "1500-2500", label: "2", range: "1500–2499 sq ft" },
    { value: "2500-3500", label: "3", range: "2500–3499 sq ft" },
    { value: "3500-4500", label: "4", range: "3500–4499 sq ft" },
    { value: "4500-5500", label: "5", range: "4500–5499 sq ft" },
    { value: "5500plus", label: "6", range: "5500+ sq ft" },
  ];

  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  const handleServiceToggle = (serviceId: string) => {
    if (!pricingData) return;
    
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
        if (selectedSize === '5500plus') return sum; // Skip calculation for 5500+ properties
        const value = pricingData[selectedSize as SizeKey][id as keyof (typeof pricingData)["Under 1500"]];
        const qty = (id === "virtualStaging" || id === "virtualTwilight" || id === "virtualDeclutter") ? (serviceQuantities[id] || 1) : 1;
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
    if (!pricingData) return;

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
          if (selectedSize === '5500plus') return sum; // Skip calculation for 5500+ properties
          const value = pricingData[selectedSize as SizeKey][id as keyof (typeof pricingData)["Under 1500"]];
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
        if (selectedSize === '5500plus') return sum; // Skip calculation for 5500+ properties
        const value = pricingData[selectedSize as SizeKey][id as keyof (typeof pricingData)["Under 1500"]];
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

  // Handle package image navigation
  const handlePackageImageNavigation = (packageId: string, direction: 'prev' | 'next', totalImages: number) => {
    setPackageImageIndices(prev => {
      const currentIndex = prev[packageId] || 0;
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      }
      return { ...prev, [packageId]: newIndex };
    });
  };

  // Show loading state while pricing data is being fetched
  if (isLoading || !pricingData || !packagesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    )
  }

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
          {/* Pre-designed Packages */}
          <div className="mb-24">
            <h2 className="text-4xl font-serif font-bold mb-2 text-[#262F3F]">Complete Listing Packages</h2>
            <p className="text-lg text-[#262F3F] mb-8">Get your listing ready for MLS with our all-in-one packages. They include everything you need to market your property, with clear pricing and the option to add extra services if needed.</p>
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
                <Tabs value={selectedSize} onValueChange={(val) => setSelectedSize(val as SizeKey | '5500plus')} className="w-full max-w-2xl">
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

            {/* Contact us note for 5500+ sq ft */}
            {selectedSize === '5500plus' && (
              <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-lg px-8 py-6 max-w-xl text-center shadow-md">
                  <h2 className="text-2xl font-bold mb-2">Contact Us for Custom Pricing</h2>
                  <p className="mb-4">For properties over 5500 sq ft, please <a href="/contact-us" className="text-blue-700 underline font-semibold">contact us</a> for a personalized quote and package options.</p>
                  <p className="text-sm text-yellow-800">We offer custom solutions for large and luxury properties!</p>
                </div>
              </div>
            )}

            {selectedSize !== '5500plus' && (
              <>
                        {/* First Row: Essentials (left) + Essentials+ packages (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Essentials Package - Left side, full height */}
              {serviceBundles.filter(bundle => bundle.id === 'essentials').map((bundle) => {
                const price = getBundlePricing(bundle.id, selectedSize);
                
                return (
                  <div
                    key={bundle.id}
                    className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                  >
                    {/* Image Section */}
                    {bundle.images && (
                      <div className="aspect-[3/2] mb-4 rounded-lg overflow-hidden relative">
                        <SlidingCarousel
                          images={bundle.images}
                          currentIndex={packageImageIndices[bundle.id] || 0}
                          onNavigate={(direction) => handlePackageImageNavigation(bundle.id, direction, bundle.images?.length || 1)}
                          onHover={(isHovering) => setHoveredPackages(prev => ({ ...prev, [bundle.id]: isHovering }))}
                          alt={bundle.title}
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#262F3F]">{bundle.title}</h3>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-end gap-2 mb-1">
                        <span className="text-3xl font-bold text-[#262F3F]">{price}</span>
                      </div>
                      <div className="text-xs text-[#6B7A86] mb-3">
                        {sizeOptions.find(opt => opt.value === selectedSize)?.range}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex-1 mb-4">
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                        {bundle.services.map((service, idx) => {
                          // Check if this is the essentials package and if the current image index matches this service index
                          const isEssentials = bundle.id === 'essentials';
                          const currentImageIndex = packageImageIndices[bundle.id] || 0;
                          
                          // Custom mapping for essentials package: image index to service index
                          const essentialsImageToServiceMapping: { [imageIndex: number]: number } = {
                            0: -1, // Image 1: no bold
                            1: 0,  // Image 2: "Professional Photography"
                            2: 1,  // Image 3: "2-6 Aerial Photos Optimized For Your Listing"
                            3: 2,  // Image 4: "Listing Website"
                            4: 3,  // Image 5: "Slideshow Video"
                            5: 4,  // Image 6: "Feature Sheet (PDF)"
                            6: 5,  // Image 7: "Social Media Post"
                            7: 5,  // Image 8: "Social Media Post" (same as image 7)
                            8: 6,  // Image 9: "Social Media Story"
                            9: 7,  // Image 10: "Blue Sky Replacement"
                            10: 7, // Image 11: "Blue Sky Replacement" (same as image 10)
                          };
                          
                          const isHighlighted = isEssentials && essentialsImageToServiceMapping[currentImageIndex] === idx;
                          
                          return (
                            <div 
                              key={idx} 
                              className={`flex items-center gap-2 text-[#262F3F] transition-all duration-300 ease-in-out ${
                                isHighlighted ? 'transform scale-105' : ''
                              }`}
                            >
                              <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className={`leading-relaxed transition-all duration-300 ease-in-out ${
                                isHighlighted 
                                  ? 'font-bold text-[#1c4596] transform' 
                                  : 'font-normal'
                              }`}>
                                {service}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Get Started Button */}
                    <BookButton 
                      href="/book-now" 
                      size="lg" 
                      className="w-full mt-auto bg-[#1C4596] text-white font-semibold hover:bg-[#2853AE]"
                    >
                      Get Started
                    </BookButton>
                  </div>
                );
              })}

              {/* Essentials+ packages - Right side, 2x2 grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceBundles.filter(bundle => 
                  ['essentials-twilight', 'essentials-floor-plans', 'essentials-matterport', 'essentials-property-video'].includes(bundle.id)
                ).map((bundle) => {
                  const price = getBundlePricing(bundle.id, selectedSize);
                  const addOnText = bundle.title.replace('Essentials + ', '');
                  
                  return (
                    <div
                      key={bundle.id}
                      className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg min-h-[200px]"
                    >
                      {/* Popular Badge for Matterport */}
                      {bundle.id === 'essentials-matterport' && (
                        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                          POPULAR
                        </div>
                      )}

                      {/* Header */}
                      <div className="mb-3 flex-1">
                        <h3 className="text-lg font-bold text-[#262F3F] mb-1">{bundle.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Essentials + {addOnText}</p>
                        
                        {/* Price */}
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-2xl font-bold text-[#262F3F]">{price}</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-3">
                          {sizeOptions.find(opt => opt.value === selectedSize)?.range}
                        </div>

                        {/* Package-specific features/descriptions */}
                        <div className="text-xs text-[#262F3F] space-y-1">
                          {bundle.id === 'essentials-twilight' && (
                            <>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Dramatic twilight transformation</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Perfect for luxury listings</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Warm interior lighting effects</span>
                              </div>
                            </>
                          )}
                          {bundle.id === 'essentials-floor-plans' && (
                            <>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Accurate room dimensions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Color-coded & black/white versions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Helps buyers visualize layout</span>
                              </div>
                            </>
                          )}
                          {bundle.id === 'essentials-matterport' && (
                            <>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Interactive 3D walkthrough</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>24/7 virtual open house</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Attracts remote buyers</span>
                              </div>
                            </>
                          )}
                          {bundle.id === 'essentials-property-video' && (
                            <>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Cinematic property showcase</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Includes drone footage</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-[#1C4596] rounded-full"></span>
                                <span>Perfect for social media</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Get Started Button */}
                      <div className="mt-auto pt-3">
                        <BookButton 
                          href="/book-now" 
                          size="sm" 
                          className="w-full bg-[#1C4596] text-white font-semibold hover:bg-[#2853AE]"
                        >
                          Get Started
                        </BookButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Second Row: Marketing Pro & Top Agent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {serviceBundles.filter(bundle => 
                ['marketing-pro', 'top-agent'].includes(bundle.id)
              ).map((bundle) => {
                const getBadge = () => {
                  if (bundle.id === 'marketing-pro') return { text: 'PRO', color: 'bg-slate-100 text-slate-700' };
                  if (bundle.id === 'top-agent') return { text: 'PREMIUM', color: 'bg-amber-100 text-amber-800' };
                  return null;
                };
                
                const badge = getBadge();
                const price = getBundlePricing(bundle.id, selectedSize);
                
                return (
                  <div
                    key={bundle.id}
                    className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                  >
                    {/* Badge */}
                    {badge && (
                      <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${badge.color} z-20`}>
                        {badge.text}
                      </div>
                    )}

                    {/* Image Section */}
                    {bundle.images && (
                      <div className="aspect-[3/2] mb-4 rounded-lg overflow-hidden relative">
                        <SlidingCarousel
                          images={bundle.images}
                          currentIndex={packageImageIndices[bundle.id] || 0}
                          onNavigate={(direction) => handlePackageImageNavigation(bundle.id, direction, bundle.images?.length || 1)}
                          onHover={(isHovering) => setHoveredPackages(prev => ({ ...prev, [bundle.id]: isHovering }))}
                          alt={bundle.title}
                        />
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-[#262F3F]">{bundle.title}</h3>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-end gap-2 mb-1">
                        <span className="text-3xl font-bold text-[#262F3F]">{price}</span>
                      </div>
                      <div className="text-xs text-[#6B7A86] mb-3">
                        {sizeOptions.find(opt => opt.value === selectedSize)?.range}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex-1 mb-4">
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                        {bundle.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[#262F3F]">
                            <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="leading-relaxed">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Get Started Button */}
                    <BookButton 
                      href="/book-now" 
                      size="lg" 
                      className="w-full mt-auto bg-[#1C4596] text-white font-semibold hover:bg-[#2853AE]"
                    >
                      Get Started
                    </BookButton>
                  </div>
                );
              })}
            </div>
              </>
            )}
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
                        className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE] rounded-md transition-colors px-6 py-3 mt-4"
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
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].hdrPhotography)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 1499 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$60 per 1,000 sq ft</div>

                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Up to 1499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["Under 1500"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>1500–2499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["1500-2500"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>2500–3499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["2500-3500"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>3500–4499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["3500-4500"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>4500–5499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["4500-5500"].hdrPhotography)}</span></li>
                          <li className="flex justify-between"><span>5500+ sq ft</span><span className="font-semibold"><a href="/contact-us" className="text-primary underline hover:text-[#B42222]">Contact us</a></span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2 justify-center"><span>ⓘ</span>Choose a complete listing package for exclusive discounted rates.</div>
                      </div>
                      <button
                        type="button"
                        className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE] rounded-md transition-colors px-6 py-3 mt-4"
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
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">
                      {formatPrice(pricingData["Under 1500"].propertyHighlightsVideo)}
                      <span className="text-base text-[#6B7A86] font-mazzard font-normal ml-2 align-middle">starting</span>
                    </div>
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
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
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
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">
                      {formatPrice(pricingData["Under 1500"].socialMediaReel)}
                      <span className="text-base text-[#6B7A86] font-mazzard font-normal ml-2 align-middle">starting</span>
                    </div>
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
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
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
                    <div className="text-3xl font-mazzard font-semibold text-[#262F3F] text-center mb-1">{formatPrice(pricingData["Under 1500"].droneAerialVideo)}</div>
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
                  <BookButton href="/book-now" size="lg" className="mx-auto block bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Book Now</BookButton>
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
                      <BookButton href="/services/virtual-tours" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
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
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].matterportTour)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <div className="text-xs text-[#6B7A86] mb-1 font-mazzard font-medium">up to 1499 sq ft</div>
                        <div className="text-xs text-[#6B7A86] mb-2 font-mazzard font-medium">+$50 per 1,000 sq ft</div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Up to 1499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["Under 1500"].matterportTour)}</span></li>
                          <li className="flex justify-between"><span>1500–2499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["1500-2500"].matterportTour)}</span></li>
                          <li className="flex justify-between"><span>2500–3499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["2500-3500"].matterportTour)}</span></li>
                          <li className="flex justify-between"><span>3500–4499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["3500-4500"].matterportTour)}</span></li>
                          <li className="flex justify-between"><span>4500–5499 sq ft</span><span className="font-semibold">{formatPrice(pricingData["4500-5500"].matterportTour)}</span></li>
                          <li className="flex justify-between"><span>5000+ sq ft</span><span className="font-semibold"><a href="/contact-us" className="text-primary underline hover:text-[#B42222]">Contact us</a></span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full">Get Started</BookButton>
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
                      <p className="text-white text-base font-normal mb-4">Showcase any home from above with stunning aerial footage captured by our Transport Canada-certified drone operators.</p>
                      <BookButton href="/services/aerial" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
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
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].droneAerialPhotos)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Aerial Drone Photos (10-15 images)</span><span className="font-semibold">{formatPrice(pricingData["Under 1500"].droneAerialPhotos)}</span></li>
                          <li className="flex justify-between"><span>Aerial Drone Video (30-60 seconds)</span><span className="font-semibold">{formatPrice(pricingData["Under 1500"].droneAerialVideo)}</span></li>
                        </ul>
                        <div className="bg-[#E5E7EB] text-[#262F3F] text-xs rounded-md px-3 py-2 mb-4 flex items-center gap-2 justify-center"><span>ⓘ</span>Smaller aerial photo options are available for properties that require 1-10 aerial images</div>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full mx-auto">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Services (Staging and Twilight) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/photobank/s_8-thumb.webp" alt="Virtual Staging" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Virtual Staging</h3>
                      <p className="text-white text-base font-normal mb-4">Turn empty rooms into styled spaces with realistic furniture and decor, matched to your room's layout and lighting.</p>
                      <BookButton href="/services/virtual-services" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/s_8-thumb.webp" alt="Virtual Staging" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIRTUAL STAGING</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].virtualStaging)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">per image</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Turn empty rooms into styled spaces</span></li>
                          <li className="flex justify-between"><span>Realistic furniture placement</span></li>
                          <li className="flex justify-between"><span>Matches room layout and lighting</span></li>
                          <li className="flex justify-between"><span>Professionally staged by editors</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Twilight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <img src="/images/photobank/after-gallery.webp" alt="Virtual Twilight" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Virtual Twilight</h3>
                      <p className="text-white text-base font-normal mb-4">Transform your daytime photos into stunning twilight scenes with dramatic skies and warm lighting</p>
                      <BookButton href="/services/virtual-services" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/after-gallery.webp" alt="Virtual Twilight" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIRTUAL TWILIGHT</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].virtualTwilight)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">per image</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Transform day to twilight</span></li>
                          <li className="flex justify-between"><span>Dramatic sky enhancement</span></li>
                          <li className="flex justify-between"><span>Warm interior lighting</span></li>
                          <li className="flex justify-between"><span>Professional editing</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual Declutter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
                  <img src="/images/photobank/declutter-after-gallery.webp" alt="Virtual Declutter" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Virtual Declutter</h3>
                      <p className="text-white text-base font-normal mb-4">Remove personal items, clutter, and distractions to create clean, appealing spaces that buyers love</p>
                      <BookButton href="/services/virtual-services" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <img src="/images/photobank/declutter-after-gallery.webp" alt="Virtual Declutter" className="w-full h-48 object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">VIRTUAL DECLUTTER</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].virtualDeclutter)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">per image</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Remove personal items</span></li>
                          <li className="flex justify-between"><span>Clean up clutter</span></li>
                          <li className="flex justify-between"><span>Create appealing spaces</span></li>
                          <li className="flex justify-between"><span>Professional retouching</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slideshow Video Tour */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Image and Get quote card: hidden on mobile, visible on desktop */}
                <div className="hidden md:block relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F] order-1 md:order-2">
                  <video
                    src="/images/home/slide.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
                  <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                    <div className="mt-auto">
                      <h3 className="text-2xl font-mazzard font-semibold text-white mb-2">Slideshow Video Tour</h3>
                      <p className="text-white text-base font-normal mb-4">Create engaging visual flow with professionally edited slideshow videos set to music that showcase your property's best features</p>
                      <BookButton href="/services/videography" size="lg" className="bg-[#1C4596] text-white font-mazzard font-semibold hover:bg-[#2853AE]">Learn more</BookButton>
                    </div>
                  </div>
                </div>
                {/* Price/details card: visible on all screens */}
                <div className="col-span-1 md:col-span-1">
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
                    <div className="block md:hidden mb-4 rounded-lg overflow-hidden">
                      <video
                        src="/images/home/slide.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-48 object-cover pointer-events-none"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mazzard font-semibold uppercase tracking-wider text-[#6B7A86] mb-1">SLIDESHOW VIDEO TOUR</div>
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-3xl font-mazzard font-semibold text-[#262F3F]">{formatPrice(pricingData["Under 1500"].slideshowVideoTour)}</span>
                          <span className="text-base text-[#6B7A86] font-mazzard font-normal mb-1">starting</span>
                        </div>
                        <ul className="mb-4 text-sm text-[#262F3F] font-mazzard space-y-1">
                          <li className="flex justify-between"><span>Engaging Visual Flow</span></li>
                          <li className="flex justify-between"><span>Edited to Music</span></li>
                        </ul>
                      </div>
                      <BookButton href="/book-now" size="lg" className="bg-white text-[#262F3F] border border-[#262F3F] font-mazzard font-semibold hover:bg-[#1C4596] hover:text-white mt-2 w-full">Get Started</BookButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Build Your Own Package - REMOVED */}
          {/* 
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
                        const value = pricingData[size as SizeKey][id as keyof (typeof pricingData)["Under 1500"]];
                        return typeof value === "number" ? sum + value : sum;
                      }, 0)
                      setTotalPrice(newTotal)
                    }}
                    className="w-full text-sm py-1.5 h-auto sm:h-10"
                  >
                    {size === "Under 1500" ? "Under 1500 sq ft" : `${size} sq ft`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">2. Select your services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {services.filter(service => pricingData[selectedSize as SizeKey][service.id as keyof (typeof pricingData)["Under 1500"]]).map((service) => {
                  const price = pricingData[selectedSize as SizeKey][service.id as keyof (typeof pricingData)["Under 1500"]]
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
                {selectedServices.length > 0 && (
                  <div className="mt-5 mb-4 p-4 bg-gray-100 rounded-lg shadow-sm w-full">
                    <h5 className="text-base font-semibold mb-3 text-[#262F3F]">Order Overview</h5>
                    <ul className="text-base text-gray-800 space-y-2">
                      {selectedServices.map((id) => {
                        const service = services.find(s => s.id === id);
                        const price = pricingData[selectedSize][id as keyof (typeof pricingData)["Under 1500"]];
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
          */}
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
                  Yes, you can choose any combination of our individual services to create a custom package that meets your specific needs.
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
