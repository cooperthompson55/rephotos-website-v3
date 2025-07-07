"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format, addDays, format as formatDate, isSameDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { Camera, Compass, Video, Instagram, LayoutGrid, Globe, Building, PenTool, ChevronUp, ChevronDown } from "lucide-react"
import { useState as useLocalState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { loadPricingData, type SizeKey, type PricingData, type PackagesData, type PackageFeature, type PackageCard } from "@/lib/pricing-parser"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import GlareHover from "@/components/ui/glare-hover"

// Sliding Carousel Component with seamless infinite loop
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
                beforeImage={image.beforeImage}
                afterImage={image.afterImage}
                title={image.title}
                onInteractionChange={onHover}
              />
            ) : image.type === 'video' ? (
              <div className="relative w-full h-full">
                                  <iframe
                    src={isPlaying[index] ? `${image.videoUrl}?autoplay=1&muted=0` : image.videoUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                                  {/* Thumbnail with play button */}
                  {!isPlaying[index] && (
                    <div className="absolute inset-0 cursor-pointer" onClick={() => {
                      setIsPlaying(prev => ({ ...prev, [index]: true }));
                      onHover(true);
                    }}>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ) : image.type === 'youtube' ? (
              <div className="relative w-full h-full group">
                {!isPlaying[index] ? (
                  // Show thumbnail with custom play button
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
                        // Fallback to high quality thumbnail if maxres fails
                        e.currentTarget.src = `https://img.youtube.com/vi/${image.embedId}/hqdefault.jpg`;
                      }}
                    />
                    {/* Custom play button overlay to match other addons */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 hover:opacity-0 group"
                      style={{ opacity: '0.8' }}
                    >
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
                  // Show YouTube player when playing
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
          {/* Previous Button */}
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

          {/* Next Button */}
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

// Before/After Slider Component
const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  title = "Blue Sky Guarantee",
  onInteractionChange 
}: { 
  beforeImage: string, 
  afterImage: string, 
  title?: string,
  onInteractionChange?: (isInteracting: boolean) => void
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    onInteractionChange?.(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    onInteractionChange?.(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    onInteractionChange?.(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    onInteractionChange?.(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const percentage = ((clientX - rect.left) / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX)
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      onInteractionChange?.(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, onInteractionChange])

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Before Image (Clipped) */}
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          draggable={false}
        />
        
        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 cursor-ew-resize flex items-center justify-center">
            <div className="w-3 h-3 border-l-2 border-r-2 border-gray-400"></div>
          </div>
        </div>
        
        {/* Title Overlay */}
        {title && title.trim() && (
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-medium">
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Google Places API type declarations
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
    initConfirmationMap: () => void;
    initGoogleMaps: () => void;
  }
}

declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
        addListener(eventName: string, handler: () => void): void;
        getPlace(): PlaceResult;
      }
      interface AutocompleteOptions {
        componentRestrictions?: { country: string | string[] };
        fields?: string[];
        types?: string[];
      }
      interface PlaceResult {
        address_components?: AddressComponent[];
        formatted_address?: string;
        geometry?: {
          location: {
            lat(): number;
            lng(): number;
          };
        };
      }
      interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }
    }
    namespace event {
      function clearInstanceListeners(instance: any): void;
    }
  }
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  brokerage: z.string().optional(),
  designation: z.string().optional(),
  additionalInstructions: z.string().optional(),
  promotionCode: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  postalCode: z.string().min(1, {
    message: "Postal code is required.",
  }),
  suiteUnit: z.string().optional(),
  propertyType: z.enum([
    "condo-apartment",
    "condo-townhouse", 
    "townhouse",
    "semi-detached",
    "detached",
    "luxury-property",
    "commercial"
  ]).optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  parkingSpaces: z.string().optional(),
  accessInstructions: z.string().optional(),
  additionalInfo: z.string().optional(),
  date: z.string().min(1, {
    message: "Please select a preferred date.",
  }),
  time: z.string().min(1, {
    message: "Please select a preferred time.",
  }),
})

// Generate services from dynamic pricing data
const getServicesFromPricingData = (pricingData: PricingData | null) => {
  if (!pricingData) return [];
  
  const sampleSize = "Under 1500" as SizeKey;
  return [

    { id: "matterportTour", name: "Matterport 3D Tour", prices: [pricingData["Under 1500"].matterportTour, pricingData["1500-2500"].matterportTour, pricingData["2500-3500"].matterportTour, pricingData["3500-4500"].matterportTour, pricingData["4500-5500"].matterportTour] },
    { id: "propertyHighlightsVideo", name: "Property Highlights Video", prices: [pricingData["Under 1500"].propertyHighlightsVideo, pricingData["1500-2500"].propertyHighlightsVideo, pricingData["2500-3500"].propertyHighlightsVideo, pricingData["3500-4500"].propertyHighlightsVideo, pricingData["4500-5500"].propertyHighlightsVideo] },
    { id: "socialMediaReel", name: "Social Media Reel", prices: [pricingData["Under 1500"].socialMediaReel, pricingData["1500-2500"].socialMediaReel, pricingData["2500-3500"].socialMediaReel, pricingData["3500-4500"].socialMediaReel, pricingData["4500-5500"].socialMediaReel] },
    { id: "slideshowVideoTour", name: "Slideshow Video Tour", prices: [pricingData["Under 1500"].slideshowVideoTour, pricingData["1500-2500"].slideshowVideoTour, pricingData["2500-3500"].slideshowVideoTour, pricingData["3500-4500"].slideshowVideoTour, pricingData["4500-5500"].slideshowVideoTour] },
    { id: "droneAerialPhotos", name: "Drone Aerial Photos", prices: [pricingData["Under 1500"].droneAerialPhotos, pricingData["1500-2500"].droneAerialPhotos, pricingData["2500-3500"].droneAerialPhotos, pricingData["3500-4500"].droneAerialPhotos, pricingData["4500-5500"].droneAerialPhotos] },
    { id: "droneAerialVideo", name: "Drone Aerial Video", prices: [pricingData["Under 1500"].droneAerialVideo, pricingData["1500-2500"].droneAerialVideo, pricingData["2500-3500"].droneAerialVideo, pricingData["3500-4500"].droneAerialVideo, pricingData["4500-5500"].droneAerialVideo] },
    { id: "dronePhotosVideo", name: "Drone Photos + Video", prices: [pricingData["Under 1500"].dronePhotosVideo, pricingData["1500-2500"].dronePhotosVideo, pricingData["2500-3500"].dronePhotosVideo, pricingData["3500-4500"].dronePhotosVideo, pricingData["4500-5500"].dronePhotosVideo] },
    { id: "floorPlan2d", name: "2D Floor Plan", prices: [pricingData["Under 1500"].floorPlan2d, pricingData["1500-2500"].floorPlan2d, pricingData["2500-3500"].floorPlan2d, pricingData["3500-4500"].floorPlan2d, pricingData["4500-5500"].floorPlan2d] },
    { id: "houseModel3d", name: "3D House Model", prices: [pricingData["Under 1500"].houseModel3d, pricingData["1500-2500"].houseModel3d, pricingData["2500-3500"].houseModel3d, pricingData["3500-4500"].houseModel3d, pricingData["4500-5500"].houseModel3d] },
    { id: "propertyWebsite", name: "Property Website", prices: [pricingData["Under 1500"].propertyWebsite, pricingData["1500-2500"].propertyWebsite, pricingData["2500-3500"].propertyWebsite, pricingData["3500-4500"].propertyWebsite, pricingData["4500-5500"].propertyWebsite] },
    { id: "customDomainName", name: "Custom Domain Name", prices: [pricingData["Under 1500"].customDomainName, pricingData["1500-2500"].customDomainName, pricingData["2500-3500"].customDomainName, pricingData["3500-4500"].customDomainName, pricingData["4500-5500"].customDomainName] },
    { id: "virtualDeclutter", name: "Virtual Declutter", prices: [pricingData["Under 1500"].virtualDeclutter, pricingData["1500-2500"].virtualDeclutter, pricingData["2500-3500"].virtualDeclutter, pricingData["3500-4500"].virtualDeclutter, pricingData["4500-5500"].virtualDeclutter] },
    { id: "virtualStaging", name: "Virtual Staging", prices: [pricingData["Under 1500"].virtualStaging, pricingData["1500-2500"].virtualStaging, pricingData["2500-3500"].virtualStaging, pricingData["3500-4500"].virtualStaging, pricingData["4500-5500"].virtualStaging] },
    { id: "virtualTwilight", name: "Virtual Twilight", prices: [pricingData["Under 1500"].virtualTwilight, pricingData["1500-2500"].virtualTwilight, pricingData["2500-3500"].virtualTwilight, pricingData["3500-4500"].virtualTwilight, pricingData["4500-5500"].virtualTwilight] },
  ];
};

// Update size options to match new CSV structure
const sizeOptions: { value: SizeKey | '5500plus'; label: string; range: string }[] = [
  { value: "Under 1500", label: "Under 1500 sq ft", range: "Under 1500 sq ft" },
  { value: "1500-2500", label: "1500-2499 sq ft", range: "1500-2499 sq ft" },
  { value: "2500-3500", label: "2500-3499 sq ft", range: "2500-3499 sq ft" },
  { value: "3500-4500", label: "3500-4499 sq.ft.", range: "3500-4499 sq.ft." },
  { value: "4500-5500", label: "4500-5499 sq.ft.", range: "4500-5499 sq.ft." },
  { value: "5500plus", label: "5500+ sq ft", range: "5500+ sq ft" },
];

// Types for carousel items that can be images, videos, YouTube embeds, or before/after sliders
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

const extraImages: ImageItem[] = [
  "/images/book-now/1-social-posts.webp",
  "/images/book-now/2-story.webp",
  "/images/book-now/3-story.webp",
  "/images/book-now/4.webp",
  "/images/book-now/5.webp",
  "/images/book-now/6.jpg",
  "/images/book-now/7.jpg",
  "/images/book-now/8.jpg",
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

const packagePrependImages = [
  "/images/book-now/11.jpg",
  "/images/book-now/12.jpg"
];

const sliderImages: ImageItem[] = [
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

const serviceBundles = [
  {
    id: "essentials",
    title: "Essentials",
    description: "All-in-one listing package",
    icon: "📸",
    images: [
      "/images/book-now/packages/main.jpg",
      ...packageImages
    ],
    services: [
      "Professional Photography",
      "2-4 Aerial Photos Optimized For Your Listing",
      "Listing Website",
      "Slideshow Video",
      "Feature Sheet (PDF)",
      "Social Media Post",
      "Social Media Story",
      "Blue Sky Replacement"
    ]
  },
  {
    id: "essentials-twilight",
    title: "Essentials + Twilight",
    description: "Essential package with stunning twilight photography",
    icon: "📸🌅",
    images: ["/images/book-now/packages/t.jpg"],
    services: [
      "Everything in Essentials",
      "Virtual Twilight Photography"
    ]
  },
  {
    id: "essentials-floor-plans",
    title: "Essentials + 2D Floor Plans",
    description: "Essential package with detailed floor plans",
    icon: "📸📐",
    images: ["/images/book-now/packages/f.jpg"],
    services: [
      "Everything in Essentials",
      "2D Floor Plan (Color-coded + Black and white)"
    ]
  },
  {
    id: "essentials-matterport",
    title: "Essentials + Matterport Tour",
    description: "Essential package with immersive virtual tour",
    icon: "📸🏠",
    images: ["/images/book-now/packages/m.jpg"],
    services: [
      "Everything in Essentials",
      "360° Virtual Tour (Matterport)"
    ],
    badge: "Popular"
  },
  {
    id: "essentials-property-video",
    title: "Essentials + Property Tour Video",
    description: "Essential package with dynamic property video",
    icon: "📸🎬",
    images: ["/images/book-now/packages/v.jpg"],
    services: [
      "Everything in Essentials",
      "Property Tour Video (Drone Footage)"
    ]
  },
  {
    id: "marketing-pro",
    title: "Marketing Pro",
    description: "Complete marketing package for serious agents",
    icon: "🎯",
    images: [...marketingProImages],
    services: [
      "Everything in Essentials",
      "Enhanced Twilight Listing Image",
      "360° Virtual Tour",
      "2D Floor Plan",
      "Property Highlights Video",
      "Drone Aerial Photos",
      "Custom Domain Name"
    ]
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

type Package = { name: string; price: string; discount: string; features: string[] };
const hardcodedPackages: { [key: string]: Package[] } = {
  'Under 1500': [
    { name: 'Essentials', price: '$279.00', discount: '', features: ['Professional Photography', '1-2 Drone Photos', 'Listing Website', 'Slideshow Video', 'Feature Sheet (PDF)', 'Social Media Post', 'Social Media Story', 'Blue Sky Replacement'] },
    { name: 'Essentials + 2D Floor Plans', price: '$349.00', discount: '', features: ['Everything in Essentials', '2D Floor Plan (Color-coded + Black and white)'] },
    { name: 'Essentials + Matterport Tour', price: '$399.00', discount: '', features: ['Everything in Essentials', '360 Virtual Tour'] },
    { name: 'Marketing Pro', price: '$679.00', discount: '', features: ['Everything in Essentials', 'Enhanced Twilight Listing Image', '360 Virtual Tour', 'Property Highlights Video', '2D Floor Plan', 'Full Aerial Coverage', 'Custom Domain Name'] },
    { name: 'Top Agent', price: '$799.00', discount: '', features: ['Everything in Marketing Pro', 'Agent on video', '2 Additional Twilight Images', 'Social Media Reel Video', 'Extra social media content', '2D + 3D Floor Plan', 'Agent Branding on All Media', 'Complete Aerial Coverage'] },
  ],
  '1500-2500': [
    { name: 'Essentials', price: '$329.00', discount: '', features: ['Professional Photography', '1-2 Drone Photos', 'Listing Website', 'Slideshow Video', 'Feature Sheet (PDF)', 'Social Media Post', 'Social Media Story', 'Blue Sky Replacement'] },
    { name: 'Essentials + 2D Floor Plans', price: '$399.00', discount: '', features: ['Everything in Essentials', '2D Floor Plan (Color-coded + Black and white)'] },
    { name: 'Essentials + Matterport Tour', price: '$449.00', discount: '', features: ['Everything in Essentials', '360 Virtual Tour'] },
    { name: 'Marketing Pro', price: '$729.00', discount: '', features: ['Everything in Essentials', 'Enhanced Twilight Listing Image', '360 Virtual Tour', 'Property Highlights Video', '2D Floor Plan', 'Full Aerial Coverage', 'Custom Domain Name'] },
    { name: 'Top Agent', price: '$849.00', discount: '', features: ['Everything in Marketing Pro', 'Agent on video', '2 Additional Twilight Images', 'Social Media Reel Video', 'Extra social media content', '2D + 3D Floor Plan', 'Agent Branding on All Media', 'Complete Aerial Coverage'] },
  ],
  '2500-3500': [
    { name: 'Essentials', price: '$379.00', discount: '', features: ['Professional Photography', '1-2 Drone Photos', 'Listing Website', 'Slideshow Video', 'Feature Sheet (PDF)', 'Social Media Post', 'Social Media Story', 'Blue Sky Replacement'] },
    { name: 'Essentials + 2D Floor Plans', price: '$449.00', discount: '', features: ['Everything in Essentials', '2D Floor Plan (Color-coded + Black and white)'] },
    { name: 'Essentials + Matterport Tour', price: '$499.00', discount: '', features: ['Everything in Essentials', '360 Virtual Tour'] },
    { name: 'Marketing Pro', price: '$779.00', discount: '', features: ['Everything in Essentials', 'Enhanced Twilight Listing Image', '360 Virtual Tour', 'Property Highlights Video', '2D Floor Plan', 'Full Aerial Coverage', 'Custom Domain Name'] },
    { name: 'Top Agent', price: '$899.00', discount: '', features: ['Everything in Marketing Pro', 'Agent on video', '2 Additional Twilight Images', 'Social Media Reel Video', 'Extra social media content', '2D + 3D Floor Plan', 'Agent Branding on All Media', 'Complete Aerial Coverage'] },
  ],
  '3500-4500': [
    { name: 'Essentials', price: '$429.00', discount: '', features: ['Professional Photography', '1-2 Drone Photos', 'Listing Website', 'Slideshow Video', 'Feature Sheet (PDF)', 'Social Media Post', 'Social Media Story', 'Blue Sky Replacement'] },
    { name: 'Essentials + 2D Floor Plans', price: '$499.00', discount: '', features: ['Everything in Essentials', '2D Floor Plan (Color-coded + Black and white)'] },
    { name: 'Essentials + Matterport Tour', price: '$549.00', discount: '', features: ['Everything in Essentials', '360 Virtual Tour'] },
    { name: 'Marketing Pro', price: '$829.00', discount: '', features: ['Everything in Essentials', 'Enhanced Twilight Listing Image', '360 Virtual Tour', 'Property Highlights Video', '2D Floor Plan', 'Full Aerial Coverage', 'Custom Domain Name'] },
    { name: 'Top Agent', price: '$949.00', discount: '', features: ['Everything in Marketing Pro', 'Agent on video', '2 Additional Twilight Images', 'Social Media Reel Video', 'Extra social media content', '2D + 3D Floor Plan', 'Agent Branding on All Media', 'Complete Aerial Coverage'] },
  ],
  '4500-5500': [
    { name: 'Essentials', price: '$479.00', discount: '', features: ['Professional Photography', '1-2 Drone Photos', 'Listing Website', 'Slideshow Video', 'Feature Sheet (PDF)', 'Social Media Post', 'Social Media Story', 'Blue Sky Replacement'] },
    { name: 'Essentials + 2D Floor Plans', price: '$549.00', discount: '', features: ['Everything in Essentials', '2D Floor Plan (Color-coded + Black and white)'] },
    { name: 'Essentials + Matterport Tour', price: '$599.00', discount: '', features: ['Everything in Essentials', '360 Virtual Tour'] },
    { name: 'Marketing Pro', price: '$879.00', discount: '', features: ['Everything in Essentials', 'Enhanced Twilight Listing Image', '360 Virtual Tour', 'Property Highlights Video', '2D Floor Plan', 'Full Aerial Coverage', 'Custom Domain Name'] },
    { name: 'Top Agent', price: '$999.00', discount: '', features: ['Everything in Marketing Pro', 'Agent on video', '2 Additional Twilight Images', 'Social Media Reel Video', 'Extra social media content', '2D + 3D Floor Plan', 'Agent Branding on All Media', 'Complete Aerial Coverage'] },
  ],
};

// Add this above the BookNowPage function
const serviceImages: { [label: string]: ImageItem[] } = {
  'Photography': ['/images/home/s_1.webp', '/images/home/s_1b.webp'],
  'Listing Website': ['/images/home/s_7.png', '/images/home/s_7b.png'],
  'Feature Sheet': ['/images/home/s_6.png', '/images/home/s_6b.png'],
  'Social Media Story': ['/images/home/s_3.webp', '/images/home/s_3b.webp'],
  'Blue Sky Replacement': ['/images/photobank/after-gallery.webp', '/images/photobank/after-gallery2.webp'],
  'Drone Aerial Photos': ['/images/home/s_2.webp', '/images/home/s_2b.webp'],
  'Drone Aerial Video': ['/images/home/s_2.webp', '/images/home/s_2b.webp'],
  '360° Virtual Tour': ['/images/home/s_4.webp', '/images/home/s_4b.webp'],
  '2D Floor Plan': ['/images/home/s_5.png', '/images/home/s_5b.png'],
  'Custom Video': ['/images/home/s_8.png', { type: 'video', videoUrl: 'https://player.vimeo.com/video/1095656738' }],
  'Custom Domain Name': ['/images/home/s_7.png', '/images/home/s_7b.png'],
  'Virtual Twilight': ['/images/home/s_9.png', '/images/home/s_9b.png'],
  '3D House Model': ['/images/home/s_10.png', '/images/home/s_10b.png'],
};

// Add addon services data with dynamic pricing
const getAddonServices = (selectedSize: string) => [
  // Services included with all packages (show first)
  {
    id: "featureSheet",
    title: "Feature Sheet (PDF)",
    description: "✓ Professional property brochure with photos, features, and agent branding",
    images: [
      "/images/book-now/addons/1feature.jpg",
      "/images/book-now/addons/2feature.jpg",
      "/images/book-now/addons/3feature.jpg"
    ],
    image: "/images/services/marketing/feature-sheet.webp", // fallback for single-image usage
    icon: "📄",
    getPrice: () => 49
  },
  {
    id: "socialMediaStory",
    title: "Social Media Story",
    description: "Vertical format story for Instagram and Facebook",
    image: "/images/services/marketing/social-media-story.webp",
    icon: "📲",
    getPrice: () => 29
  },

  // Virtual services (next - with quantity controls)
  {
        id: "virtualDeclutter",
    title: "Virtual Declutter", 
    description: "✓ Remove personal items, clutter, and distractions from photos\n✓ Creates clean, buyer-ready spaces that show better online",
    images: [
      { type: "before-after", beforeImage: "/images/photobank/DSC_7594-gallery.webp", afterImage: "/images/photobank/declutter-after-gallery.webp", title: "" }
    ],
    icon: "🧹",
    getPrice: () => 29,
    perImage: true
  },
  {
    id: "virtualStaging",
    title: "Virtual Staging",
    description: "✓ Digitally furnish empty rooms to help buyers visualize the space\n✓ Includes both staged and original versions for MLS compliance",
    images: [
      { type: "before-after", beforeImage: "/images/book-now/addons/stage1.jpg", afterImage: "/images/book-now/addons/stage2.jpg", title: "" }
    ],
    icon: "🛋️",
    getPrice: () => 39,
    perImage: true
  },
  {
    id: "virtualTwilight",
    title: "Virtual Twilight",
    description: "✓ Transform day photos into stunning twilight scenes with dramatic skies\n✓ Adds luxury appeal and warmth to exterior shots",
    images: [
      { type: "before-after", beforeImage: "/images/photobank/before-gallery.webp", afterImage: "/images/photobank/colour-after-gallery.webp", title: "" }
    ],
    icon: "🌅",
    getPrice: () => 49,
    perImage: true
  },
  // Other addon services

  {
    id: "matterportTour",
    title: "Matterport 3D Tour",
    description: "✓ Interactive 3D walkthrough with dollhouse view and floor plans\n✓ 24/7 virtual access for out-of-town buyers",
    image: "/images/services/virtual-tours/matterport.webp",
    icon: "🏠",
    getPrice: () => {
      const prices = { "Under 1500": 199, "1500-2500": 239, "2500-3500": 279, "3500-4500": 319, "4500-5500": 359 };
      return prices[selectedSize as keyof typeof prices] || 199;
    }
  },
  {
    id: "propertyHighlightsVideo",
    title: "Property Highlights Video", 
    description: "✓ 1-2 minute professional walkthrough showcasing key features and flow\n✓ Shot in 4K horizontal format, perfect for MLS and websites",
    image: "/images/book-now/packages/INSTAGRAM STORY (21).jpg",
    icon: "🎥",
    getPrice: () => {
      const prices = { "Under 1500": 289, "1500-2500": 309, "2500-3500": 329, "3500-4500": 349, "4500-5500": 369 };
      return prices[selectedSize as keyof typeof prices] || 289;
    }
  },
  {
    id: "slideshowVideoTour",
    title: "Slideshow Video Tour",
    description: "✓ Engaging photo slideshow with music and smooth transitions",
    images: [
      "/images/book-now/INSTAGRAM STORY.jpg"
    ],
    getPrice: () => 99
  },
  {
    id: "socialMediaReel",
    title: "Social Media Reel",
    description: "✓ 30-60 second vertical video optimized for Instagram, TikTok, and Facebook\n✓ Fast-paced, trending-style editing that grabs attention",
    image: "/images/book-now/packages/INSTAGRAM STORY (20).jpg",
    icon: "📱",
    getPrice: () => {
      const prices = { "Under 1500": 229, "1500-2500": 249, "2500-3500": 269, "3500-4500": 289, "4500-5500": 309 };
      return prices[selectedSize as keyof typeof prices] || 229;
    }
  },
  {
    id: "hdrPhotography",
    title: "HDR Photography",
    description: "✓ Professional HDR photography for crisp, well-lit interior and exterior shots",
    image: "/images/book-now/packages/INSTAGRAM STORY (12).jpg",
    icon: "📸",
    getPrice: () => {
      const prices = { "Under 1500": 169, "1500-2500": 229, "2500-3500": 289, "3500-4500": 349, "4500-5500": 409 };
      return prices[selectedSize as keyof typeof prices] || 169;
    }
  },
  {
    id: "droneAerialPhotos",
    title: "Drone Aerial Photos",
    description: "✓ 10-15 high-resolution aerial shots showcasing property and surroundings",
    image: "/images/book-now/packages/INSTAGRAM STORY (13).jpg",
    icon: "🚁",
    getPrice: () => 159
  },
  {
    id: "droneAerialVideo",
    title: "Drone Aerial Video",
    description: "✓ 30-60 seconds of cinematic aerial footage included with all video orders\n✓ Showcases property boundaries, lot size, and neighborhood context",
    image: "/images/services/aerial/drone-video.webp",
    icon: "🎬",
    getPrice: () => 159
  },
  {
    id: "dronePhotosVideo",
    title: "Drone Photos + Video",
    description: "Complete aerial package with both photos and video",
    image: "/images/services/aerial/drone-combo.webp",
    icon: "📸",
    getPrice: () => 199
  },
  {
    id: "floorPlan2d",
    title: "2D Floor Plans",
    description: "✓ Clean, accurate architectural drawings with room labels and dimensions",
    image: "/images/services/floor-plans/2d-floor-plan.webp",
    icon: "📐",
    getPrice: () => {
      const prices = { "Under 1500": 119, "1500-2500": 149, "2500-3500": 179, "3500-4500": 209, "4500-5500": 239 };
      return prices[selectedSize as keyof typeof prices] || 119;
    }
  },
  {
    id: "houseModel3d",
    title: "3D House Model",
    description: "✓ Realistic 3D visualization with multiple camera angles and textures",
    image: "/images/services/virtual-tours/3d-model.webp",
    icon: "🏗️",
    getPrice: () => {
      const prices = { "Under 1500": 159, "1500-2500": 199, "2500-3500": 239, "3500-4500": 279, "4500-5500": 319 };
      return prices[selectedSize as keyof typeof prices] || 159;
    }
  },
  {
    id: "propertyWebsite",
    title: "Property Website",
    description: "✓ Custom mobile-responsive website with photo gallery and lead capture\n✓ Professional domain and fast hosting included",
    images: [
      "/images/book-now/addons/site.jpg",
      "/images/book-now/addons/site2.jpg",
      "/images/book-now/addons/site3.jpg"
    ],
    image: "/images/services/websites/property-website.webp", // fallback for single-image usage
    icon: "🌐",
    getPrice: () => 129
  },
  {
    id: "customDomainName",
    title: "Custom Domain Name",
    description: "✓ Branded web address for your property website (e.g. 972maplestreet.ca)",
    images: [
      "/images/book-now/addons/domain (1).jpg"
    ],
    image: "/images/services/websites/custom-domain.webp", // fallback for single-image usage
    icon: "🌐",
    getPrice: () => 39
  }
];

// Add categorized addon services data
const getAddonServicesByCategory = (selectedSize: string) => {
  const photographyServices = [
    {
      id: "hdrPhotography",
      title: "HDR Photography",
      description: "✓ Professional HDR photography for crisp, well-lit interior and exterior shots",
      images: ["/images/book-now/packages/INSTAGRAM STORY (12).jpg"],
      getPrice: () => {
        const prices = { "Under 1500": 169, "1500-2500": 229, "2500-3500": 289, "3500-4500": 349, "4500-5500": 409 };
        return prices[selectedSize as keyof typeof prices] || 169;
      }
    },
    {
      id: "droneAerialPhotos",
      title: "Drone Aerial Photos",
      description: "✓ 10-15 high-resolution aerial shots showcasing property and surroundings", 
      images: ["/images/book-now/packages/INSTAGRAM STORY (13).jpg"],
      getPrice: () => 159
    }
  ];

  const videoServices = [
  {
    id: "socialMediaReel",
    title: "Social Media Reel",
      description: "✓ 30-60 second vertical video optimized for Instagram, TikTok, and Facebook\n✓ Fast-paced, trending-style editing that grabs attention",
      images: ["/images/book-now/packages/INSTAGRAM STORY (20).jpg"],
      getPrice: () => {
        const prices = { "Under 1500": 229, "1500-2500": 249, "2500-3500": 269, "3500-4500": 289, "4500-5500": 309 };
        return prices[selectedSize as keyof typeof prices] || 229;
      },
      badge: "Trending"
    },
    {
      id: "propertyHighlightsVideo",
      title: "Property Highlights Video",
      description: "✓ 1-2 minute professional walkthrough showcasing key features and flow\n✓ Shot in 4K horizontal format, perfect for MLS and websites",
      images: [
        "/images/book-now/packages/INSTAGRAM STORY (21).jpg",
        { type: "video", videoUrl: "https://player.vimeo.com/video/1095656738" }
      ], 
      getPrice: () => {
        const prices = { "Under 1500": 289, "1500-2500": 309, "2500-3500": 329, "3500-4500": 349, "4500-5500": 369 };
        return prices[selectedSize as keyof typeof prices] || 289;
      }
    },
    {
          id: "slideshowVideoTour",
    title: "Slideshow Video Tour",
    description: "✓ Engaging photo slideshow with music and smooth transitions",
    images: [
      "/images/book-now/packages/0-a.jpg",
      { type: "youtube", embedId: "9F-tMSUPfGU", title: "Property Slideshow Tour Example 1" },
      { type: "youtube", embedId: "Uf5QITELM30", title: "Property Slideshow Tour Example 2" }
    ],
      getPrice: () => 99
    },
    {
          id: "droneAerialVideo",
    title: "Drone Aerial Video", 
    description: "✓ 30-60 seconds of cinematic aerial footage included with all video orders\n✓ Showcases property boundaries, lot size, and neighborhood context",
    images: [
      "/images/book-now/packages/INSTAGRAM STORY (18).jpg",
      { type: "youtube", embedId: "qWHz8nWgcVM", title: "Drone Aerial Video Example" }
    ],
      getPrice: () => 159
    }
  ];

  const floorPlanServices = [
    {
      id: "matterportTour",
      title: "Matterport 3D Tour",
      description: "✓ Interactive 3D walkthrough with dollhouse view and floor plans\n✓ 24/7 virtual access for out-of-town buyers",
      images: ["/images/book-now/addons/360tour3.jpg", "/images/book-now/addons/360tour1.jpg", "/images/book-now/addons/360tour2.jpg", "/images/book-now/addons/360tour4.jpg"],
      getPrice: () => {
        const prices = { "Under 1500": 199, "1500-2500": 239, "2500-3500": 279, "3500-4500": 319, "4500-5500": 359 };
        return prices[selectedSize as keyof typeof prices] || 199;
      }
    },
    {
      id: "floorPlan2d",
      title: "2D Floor Plan",
      description: "✓ Clean, accurate architectural drawings with room labels and dimensions",
      images: ["/images/book-now/addons/2d2.jpg", "/images/book-now/addons/2d1.jpg", "/images/book-now/addons/2d3.jpg"],
      getPrice: () => {
        const prices = { "Under 1500": 119, "1500-2500": 149, "2500-3500": 179, "3500-4500": 209, "4500-5500": 239 };
        return prices[selectedSize as keyof typeof prices] || 119;
      }
    },
    {
      id: "houseModel3d",
      title: "3D House Model",
      description: "✓ Realistic 3D visualization with multiple camera angles and textures",
      images: ["/images/book-now/addons/3d1.jpg", "/images/book-now/addons/3d2.jpg", "/images/book-now/addons/3d3.jpg"], 
      getPrice: () => {
        const prices = { "Under 1500": 159, "1500-2500": 199, "2500-3500": 239, "3500-4500": 279, "4500-5500": 319 };
        return prices[selectedSize as keyof typeof prices] || 159;
      }
    }
  ];

  const marketingServices = [
    {
      id: "propertyWebsite",
      title: "Property Website",
      description: "✓ Custom mobile-responsive website with photo gallery and lead capture\n✓ Professional domain and fast hosting included",
      images: [
        "/images/book-now/addons/site.jpg",
        "/images/book-now/addons/site2.jpg",
        "/images/book-now/addons/site3.jpg"
      ],
      getPrice: () => 129
    },
    {
      id: "customDomainName", 
      title: "Custom Domain Name",
      description: "✓ Branded web address for your property website (e.g. 972maplestreet.ca)",
      images: [
        "/images/book-now/addons/domain (1).jpg"
      ],
      getPrice: () => 39
    },
    {
      id: "featureSheet",
      title: "Feature Sheet (PDF)",
      description: "✓ Professional property brochure with photos, features, and agent branding", 
      images: [
        "/images/book-now/addons/1feature.jpg",
        "/images/book-now/addons/2feature.jpg",
        "/images/book-now/addons/3feature.jpg"
      ],
      getPrice: () => 49
    }
  ];

  const virtualServices = [
    {
      id: "virtualTwilight",
      title: "Virtual Twilight",
      description: "✓ Transform day photos into stunning twilight scenes with dramatic skies\n✓ Adds luxury appeal and warmth to exterior shots",
      images: [
        { type: "before-after", beforeImage: "/images/photobank/before-gallery.webp", afterImage: "/images/photobank/colour-after-gallery.webp", title: "" }
      ],
      getPrice: () => 49,
      perImage: true,
      badge: "Popular"
    },
    {
      id: "virtualStaging",
      title: "Virtual Staging",
      description: "✓ Digitally furnish empty rooms to help buyers visualize the space\n✓ Includes both staged and original versions for MLS compliance",
      images: [
        { type: "before-after", beforeImage: "/images/book-now/addons/stage1.jpg", afterImage: "/images/book-now/addons/stage2.jpg", title: "" }
      ],
      getPrice: () => 39,
      perImage: true,
      badge: "Popular"
    },
    {
      id: "virtualDeclutter",
      title: "Virtual Declutter", 
      description: "✓ Remove personal items, clutter, and distractions from photos\n✓ Creates clean, buyer-ready spaces that show better online",
      images: [
        { type: "before-after", beforeImage: "/images/photobank/DSC_7594-gallery.webp", afterImage: "/images/photobank/declutter-after-gallery.webp", title: "" }
      ],
      getPrice: () => 29,
      perImage: true
    }
  ];

  return {
    photography: {
      title: "Premium Photography",
      icon: "",
      description: "",
      services: photographyServices
    },
    video: {
      title: "Video & Motion", 
      icon: "🎬",
      description: "Professional video content for MLS listings, social media, and marketing",
      services: videoServices
    },
    virtual: {
      title: "Virtual Services",
      icon: "🎬",
      description: "Transform your photos with professional virtual enhancements",
      services: virtualServices
    },
    floorPlans: {
      title: "Floor Plans & Layouts",
      icon: "📐",
      description: "Professional architectural drawings and 3D models for spatial understanding", 
      services: floorPlanServices
    },
    marketing: {
      title: "Branding & Marketing",
      icon: "🌐",
      description: "Professional marketing materials and branded content to showcase your listings",
      services: marketingServices
    }
  };
};

// Helper function to check if a service is included in the selected bundle
const isServiceIncludedInBundle = (serviceId: string, bundleId: string | null) => {
  if (!bundleId) return false;
  
  // Services included with ALL packages
  const alwaysIncludedServices = [
    "propertyWebsite",
    "slideshowVideoTour", 
    "featureSheet",
    "socialMediaPost",
    "socialMediaStory",
    "blueSkyReplacement"
  ];
  
  if (alwaysIncludedServices.includes(serviceId)) {
    return true;
  }
  
  const bundle = serviceBundles.find(b => b.id === bundleId);
  if (!bundle) return false;
  
  // Handle hierarchical package dependencies
  const checkInheritedServices = (currentBundle: typeof bundle): boolean => {
    // Check if this bundle includes services from parent packages
    if (currentBundle.services.includes("Everything in Essentials")) {
      const essentialsBundle = serviceBundles.find(b => b.id === "essentials");
      if (essentialsBundle && checkDirectServices(essentialsBundle)) {
        return true;
      }
    }
    
    if (currentBundle.services.includes("Everything in Marketing Pro")) {
      const marketingProBundle = serviceBundles.find(b => b.id === "marketing-pro");
      if (marketingProBundle && checkInheritedServices(marketingProBundle)) {
        return true;
      }
    }
    
    // Check direct services in current bundle
    return checkDirectServices(currentBundle);
  };
  
  const checkDirectServices = (bundleToCheck: typeof bundle): boolean => {
    // Create a mapping of service IDs to bundle service names
    const serviceMapping: { [key: string]: string[] } = {
      "matterportTour": ["360° Virtual Tour", "Matterport Tour"],
      "propertyHighlightsVideo": ["Property Highlights Video", "Property Tour Video", "Property Tour Video (Drone Footage)"],
      "socialMediaReel": ["Social Media Reel Video"],
      "droneAerialPhotos": ["1-2 Drone Photos", "Drone Aerial Photos", "Full Aerial Coverage"],
      "droneAerialVideo": ["Drone Aerial Video", "Drone Aerial Footage", "Full Aerial Coverage"],
      "dronePhotosVideo": ["Full Aerial Coverage"],
      "floorPlan2d": ["2D Floor Plan", "2D Floor Plan (Color-coded + Black and white)"],
      "houseModel3d": ["3D House Model", "2D + 3D Floor Plan"],
      "customDomainName": ["Custom Domain Name"],
      "virtualTwilight": ["Enhanced Twilight Listing Image", "2 Additional Twilight Images"]
    };
    
    const serviceNames = serviceMapping[serviceId] || [];
    return serviceNames.some(name => 
      bundleToCheck.services.some(bundleService => 
        bundleService.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(bundleService.toLowerCase())
      )
    );
  };
  
  return checkInheritedServices(bundle);
};

export default function BookNowPage() {
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
  }

  const [step, setStep] = useState(0) // Start at step 0 now
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dateCount, setDateCount] = useState(14)
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)
  const dateDropdownButtonRef = useRef<HTMLButtonElement>(null)
  const [selectedSize, setSelectedSize] = useState('Under 1500')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [loadingMap, setLoadingMap] = useState<{ [pkgName: string]: boolean }>({})
  const [addedMap, setAddedMap] = useState<{ [pkgName: string]: boolean }>({})
  const [removingMap, setRemovingMap] = useState<{ [pkgName: string]: boolean }>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [serviceQuantities, setServiceQuantities] = useState<{ [id: string]: number }>({})
  const [submitAnim, setSubmitAnim] = useState<'idle' | 'loading' | 'error'>('idle')
  const [topLevelError, setTopLevelError] = useState<string | null>(null)
  const [tabErrors, setTabErrors] = useState<{ [tabNum: number]: boolean }>({})
  const [stickyBarVisible, setStickyBarVisible] = useState(false)
  const [stickyBarAnimating, setStickyBarAnimating] = useState(false)
  const [barExpanded, setBarExpanded] = useState(false)
  const [submitButtonError, setSubmitButtonError] = useState<string | null>(null)

  // State for dynamic pricing data
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [packagesData, setPackagesData] = useState<PackagesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // State for individual services section expansion
  const [servicesExpanded, setServicesExpanded] = useState(false)
  
  // Add state for service type toggle (packages vs individual)
  const [serviceTypeTab, setServiceTypeTab] = useState<'packages' | 'individual'>('packages')

  // Add state for carousel indices
  const [carouselIndices, setCarouselIndices] = useState<{ [label: string]: number }>({});

  // Add state for addon quantities
  const [addonQuantities, setAddonQuantities] = useState<{ [id: string]: number }>({});

  // Add state for image carousel indices
  const [addonImageIndices, setAddonImageIndices] = useState<{ [id: string]: number }>({});

  // Add state for package image carousel indices
  const [packageImageIndices, setPackageImageIndices] = useState<{ [id: string]: number }>({});

  // Add state for hover tracking to pause auto-scroll
  const [hoveredPackages, setHoveredPackages] = useState<{ [id: string]: boolean }>({});

  // Add state for addon hover tracking to pause auto-scroll
  const [hoveredAddons, setHoveredAddons] = useState<{ [id: string]: boolean }>({});

  // Add ref for address input
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [addressAutocomplete, setAddressAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  // Add state for confirmation map
  const confirmationMapRef = useRef<HTMLDivElement>(null);
  const [confirmationMapLoaded, setConfirmationMapLoaded] = useState(false);

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

  // Auto-scroll package images with random intervals
  useEffect(() => {
    const timers: { [key: string]: NodeJS.Timeout } = {};

    const startAutoScroll = (packageId: string, imageCount: number) => {
      // Random interval between 3-7 seconds
      const interval = Math.random() * 4000 + 3000;
      
      timers[packageId] = setInterval(() => {
        // Only advance if package is not being hovered
        if (!hoveredPackages[packageId]) {
          setPackageImageIndices(prev => {
            const currentIndex = prev[packageId] || 0;
            const nextIndex = (currentIndex + 1) % imageCount;
            return { ...prev, [packageId]: nextIndex };
          });
        }
      }, interval);
    };

    // Start auto-scroll for each package
    serviceBundles.forEach(bundle => {
      if (bundle.images && bundle.images.length > 1) {
        startAutoScroll(bundle.id, bundle.images.length);
      }
    });

    return () => {
      // Clean up all timers
      Object.values(timers).forEach(timer => clearInterval(timer));
    };
  }, [hoveredPackages]); // Add hoveredPackages as dependency

  // Auto-scroll addon images with random intervals
  useEffect(() => {
    const timers: { [key: string]: NodeJS.Timeout } = {};

    const startAddonAutoScroll = (addonId: string, imageCount: number) => {
      // Random interval between 3-7 seconds
      const interval = Math.random() * 4000 + 3000;
      
      timers[addonId] = setInterval(() => {
        // Only advance if addon is not being hovered
        if (!hoveredAddons[addonId]) {
          setAddonImageIndices(prev => {
            const currentIndex = prev[addonId] || 0;
            const nextIndex = (currentIndex + 1) % imageCount;
            return { ...prev, [addonId]: nextIndex };
          });
        }
      }, interval);
    };

    // Start auto-scroll for addons with multiple images (only on steps 1 and 2)
    if (step === 1) {
      const addonCategories = getAddonServicesByCategory(selectedSize);
      Object.values(addonCategories).forEach(category => {
        category.services.forEach(addon => {
          if ((addon as any).images && (addon as any).images.length > 1) {
            startAddonAutoScroll(addon.id, (addon as any).images.length);
          }
        });
      });
    }

    return () => {
      // Clean up all timers
      Object.values(timers).forEach(timer => clearInterval(timer));
    };
  }, [step, selectedSize, hoveredAddons]); // Add hoveredAddons as dependency

  // Manage sticky bar animations and visibility
  useEffect(() => {
    const shouldShow = (step === 0 || step === 1 || step === 2) && (selectedBundle || selectedServices.length > 0 || selectedAddons.length > 0)
    
    if (shouldShow && !stickyBarVisible) {
      // Show bar with entrance animation
      setStickyBarVisible(true)
      setStickyBarAnimating(false)
    } else if (!shouldShow && stickyBarVisible) {
      // Hide bar with exit animation and collapse if expanded
      setBarExpanded(false)
      setStickyBarAnimating(true)
      const timer = setTimeout(() => {
        setStickyBarVisible(false)
        setStickyBarAnimating(false)
      }, 300) // Match animation duration
      return () => clearTimeout(timer)
    }
  }, [step, selectedBundle, selectedServices.length, selectedAddons.length, stickyBarVisible])

  // Auto-collapse expanded bar when navigating steps
  useEffect(() => {
    if (step > 2) {
      setBarExpanded(false)
    }
  }, [step])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      brokerage: "",
      designation: "",
      additionalInstructions: "",
      promotionCode: "",
      address: "",
      postalCode: "",
      suiteUnit: "",
      propertyType: undefined,
      bedrooms: "",
      bathrooms: "",
      parkingSpaces: "",
      accessInstructions: "",
      additionalInfo: "",
      date: "",
      time: "",
    },
  })

  // Clear tab errors in real-time as users fill fields
  const clearTabErrorsOnChange = useCallback(() => {
    // Clear submit button error when user makes any changes
    setSubmitButtonError(null);
    // Clear top level error if user is making changes
    setTopLevelError(null);
    // Clear tab errors for current step
    setTabErrors(prev => ({ ...prev, [step]: false }));
  }, [step]);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (value: string) => void) => {
    fieldOnChange(e.target.value);
    clearTabErrorsOnChange();
  }, [clearTabErrorsOnChange]);

  // Initialize autocomplete when Google Maps is loaded and we're on the right step
  const initializeAutocomplete = useCallback(() => {
    if (!googleMapsLoaded || !addressInputRef.current || addressAutocomplete) {
      return;
    }

    try {
      // Clean up any existing autocomplete
      if (addressAutocomplete) {
        window.google?.maps?.event?.clearInstanceListeners(addressAutocomplete);
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        {
          componentRestrictions: { country: 'ca' }, // Restrict to Canada only
          fields: ['address_components', 'formatted_address'],
          types: ['address']
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (place.formatted_address) {
          // Set the address
          form.setValue('address', place.formatted_address);
          
          // Extract postal code from address components
          if (place.address_components) {
            const postalCodeComponent = place.address_components.find(
              component => component.types.includes('postal_code')
            );
            
            if (postalCodeComponent) {
              form.setValue('postalCode', postalCodeComponent.long_name);
            }
          }
          
          // Clear errors after successful address selection
          clearTabErrorsOnChange();
        }
      });

      setAddressAutocomplete(autocomplete);
    } catch (error) {
      console.error("Failed to initialize Google Places autocomplete:", error);
    }
  }, [googleMapsLoaded, addressAutocomplete, form, clearTabErrorsOnChange]);

  const handleAddressFocus = useCallback(() => {
    // Reinitialize autocomplete if it's not working
    if (googleMapsLoaded && !addressAutocomplete && addressInputRef.current) {
      initializeAutocomplete();
    }
  }, [googleMapsLoaded, addressAutocomplete, initializeAutocomplete]);

  // Single consolidated Google Maps loading and autocomplete initialization
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setGoogleMapsLoaded(true);
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        const checkInterval = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            setGoogleMapsLoaded(true);
            clearInterval(checkInterval);
          }
        }, 100);
        
        setTimeout(() => clearInterval(checkInterval), 10000); // Stop checking after 10 seconds
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      window.initGoogleMaps = () => {
        setGoogleMapsLoaded(true);
        setConfirmationMapLoaded(true);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();
  }, []); // Only run once

  // Initialize autocomplete when conditions are met
  useEffect(() => {
    if (googleMapsLoaded && step === 2 && addressInputRef.current && !addressAutocomplete) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeAutocomplete();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [googleMapsLoaded, step, initializeAutocomplete, addressAutocomplete]);

  // Cleanup autocomplete when component unmounts or step changes away
  useEffect(() => {
    return () => {
      if (addressAutocomplete && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(addressAutocomplete);
        setAddressAutocomplete(null);
      }
    };
  }, [step]); // Clean up when step changes

  // Confirmation map loading is now handled in the consolidated Google Maps loader above

  // Initialize confirmation map when step 4 is reached and address is available
  useEffect(() => {
    const currentAddress = form.getValues("address");
    if (confirmationMapLoaded && step === 4 && currentAddress && confirmationMapRef.current) {
      initializeConfirmationMap()
    }
  }, [confirmationMapLoaded, step, form])

  const initializeConfirmationMap = () => {
    const currentAddress = form.getValues("address");
    if (!window.google || !confirmationMapRef.current || !currentAddress) return

    const geocoder = new (window.google as any).maps.Geocoder()
    
    geocoder.geocode({ address: currentAddress }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location
        
        const map = new (window.google as any).maps.Map(confirmationMapRef.current!, {
          zoom: 18,
          center: location,
          mapTypeId: 'satellite',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: true
        })

        new (window.google as any).maps.Marker({
          position: location,
          map: map,
          title: currentAddress,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new (window.google as any).maps.Size(32, 32)
          }
        })
      } else {
        console.error('Geocoding failed for confirmation map:', status)
      }
    })
  }

  // Helper function to format complete address including unit
  const formatCompleteAddress = () => {
    const address = form.getValues("address");
    const unit = form.getValues("suiteUnit");
    
    if (!address) return "Not specified";
    
    if (unit && unit.trim()) {
      return `${unit.trim()}, ${address}`;
    }
    
    return address;
  };

  const today = typeof window !== "undefined" ? new Date() : new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

  // Individual step validation functions
  const validateStep0 = () => {
    const errors = [];
    if (!selectedSize) errors.push("Please select a property size from the options above");
    
    // Check if user has selected at least one service (package, individual service, or addon)
    const hasSelectedServices = selectedBundle || 
                               selectedServices.length > 0 || 
                               Object.keys(addonQuantities).some(id => addonQuantities[id] > 0);
    
    if (!hasSelectedServices) {
      errors.push("Please select at least one service (package, individual service, or add-on)");
    }
    
    return errors;
  }

  const validateStep1 = () => {
    const errors: string[] = [];
    // Step 1 is now addons - no validation required as addons are optional
    return errors;
  }

  const validateStep2 = (values: z.infer<typeof formSchema>) => {
    const errors: string[] = [];
    if (!values.address || values.address.length < 5) errors.push("Please enter the complete property address");
    if (!values.postalCode) errors.push("Postal code is required for location accuracy");
    if (!values.date) errors.push("Please select your preferred date for the photo shoot");
    if (!values.time) errors.push("Please select your preferred time for the photo shoot");
    return errors;
  }

  const validateStep3 = (values: z.infer<typeof formSchema>) => {
    const errors = [];
    if (!values.name || values.name.length < 2) errors.push("Please enter your full name");
    if (!values.email || !values.email.includes("@")) errors.push("Please enter a valid email address");
    if (!values.phone || values.phone.length < 10) errors.push("Please enter a valid phone number");
    return errors;
  }

  const validateStep4 = (values: z.infer<typeof formSchema>) => {
    const errors: string[] = [];
    // Step 4 is now just the confirmation review - no specific validation needed
    return errors;
  }

  const checkAllTabErrors = (values: z.infer<typeof formSchema>) => {
    const step1Errors = validateStep1().length > 0;
    const step2Errors = validateStep2(values).length > 0;
    const step3Errors = validateStep3(values).length > 0;
    const step4Errors = validateStep4(values).length > 0;
    
    setTabErrors({
      1: step1Errors,
      2: step2Errors,
      3: step3Errors,
      4: step4Errors
    });

    return { step1Errors, step2Errors, step3Errors, step4Errors };
  }

  // Comprehensive validation summary for users
  const getValidationSummary = (values: z.infer<typeof formSchema>) => {
    const allErrors: string[] = [];
    
    // Step 0 errors
    const step0Errors = validateStep0();
    step0Errors.forEach(error => allErrors.push(`❌ Services: ${error}`));
    
    // Step 2 errors  
    const step2Errors = validateStep2(values);
    step2Errors.forEach(error => allErrors.push(`❌ Property Details: ${error}`));
    
    // Step 3 errors
    const step3Errors = validateStep3(values);
    step3Errors.forEach(error => allErrors.push(`❌ Personal Information: ${error}`));
    
    return allErrors;
  };

  // Comprehensive validation that returns first step with errors
  const validateAllStepsAndNavigate = (values: z.infer<typeof formSchema>) => {
    // Get all validation errors first
    const allErrors = getValidationSummary(values);
    
    // If there are any errors, show comprehensive summary
    if (allErrors.length > 0) {
      const errorMessage = `Please complete the following required fields:\n\n${allErrors.join('\n')}`;
      setTopLevelError(errorMessage);
      
      // Set tab errors for each step that has issues
      const step0Errors = validateStep0();
      const step2Errors = validateStep2(values);
      const step3Errors = validateStep3(values);
      
      setTabErrors({
        0: step0Errors.length > 0,
        2: step2Errors.length > 0,
        3: step3Errors.length > 0
      });
      
      // Navigate to first step with errors
      if (step0Errors.length > 0) {
        setStep(0);
      } else if (step2Errors.length > 0) {
        setStep(2);
      } else if (step3Errors.length > 0) {
        setStep(3);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    
    // All validations passed
    setTopLevelError(null);
    setTabErrors({});
    return true;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setTopLevelError(null);
    setSubmitButtonError(null);
    setIsSubmitting(true);
    
    // Hide sticky bar during submission to prevent UI conflicts
    if (stickyBarVisible || barExpanded) {
      setBarExpanded(false);
    }
    
    // Validate all steps and navigate to first error if any
    const isValid = validateAllStepsAndNavigate(values);
    if (!isValid) {
      setIsSubmitting(false);
      setSubmitStatus('idle');
      setSubmitAnim('idle');
      
      // Show prominent popup message under submit button with stronger styling
      setSubmitButtonError("⚠️ Please complete all required fields above before submitting your booking.");
      
      // Auto-hide the popup message after 8 seconds
      setTimeout(() => {
        setSubmitButtonError(null);
      }, 8000);
      
      return;
    }

    setSubmitStatus('loading');
    setSubmitAnim('loading');

    // Generate unique reference number
    const generateReferenceNumber = () => {
      const timestamp = Date.now().toString(36);
      const randomPart = Math.random().toString(36).substring(2, 8);
      return `RP-${timestamp}-${randomPart}`.toUpperCase();
    };

    const referenceNumber = generateReferenceNumber();

    // Use selected size or default
    const propertySize = selectedSize || 'Under 1500';

    // Build services array
    let servicesArr: any[] = [];
    let totalAmount = 0;
    
    // Handle selected bundle
    if (selectedBundle) {
      let bundleData = serviceBundles.find(b => b.id === selectedBundle);
      const bundlePrice = getBundlePricing(selectedBundle, propertySize);
      const bundlePriceNum = parseFloat(bundlePrice.replace('$', ''));
      
      if (bundleData) {
        servicesArr.push({
          name: bundleData.title,
          price: bundlePriceNum,
          count: 1,
          total: bundlePriceNum,
        });
        totalAmount += bundlePriceNum;
      }
    }

    // Handle individual services
    selectedServices.forEach(id => {
      console.log(`Processing selected service: ${id}`);
      
      // First check if it's a service from getAddonServicesByCategory
      const categories = getAddonServicesByCategory(propertySize);
      let categoryService: any = null;
      
      // Find service in photography category
      categoryService = categories.photography.services.find((s: any) => s.id === id);
      if (!categoryService) {
        // Find service in video category  
        categoryService = (categories.video.services as any[]).find((s: any) => s.id === id);
      }
      if (!categoryService) {
        // Find service in floor plans category
        categoryService = (categories.floorPlans.services as any[]).find((s: any) => s.id === id);
      }
      if (!categoryService) {
        // Find service in marketing category
        categoryService = (categories.marketing.services as any[]).find((s: any) => s.id === id);
      }
      if (!categoryService) {
        // Find service in virtual category
        categoryService = (categories.virtual.services as any[]).find((s: any) => s.id === id);
      }
      
      if (categoryService) {
        // Handle services from getAddonServicesByCategory
        const price = categoryService.getPrice();
        const qty = serviceQuantities[id] || 1;
        const serviceData = {
          name: categoryService.title,
          price: price,
          count: qty,
          total: price * qty,
        };
        console.log(`Found category service ${id}:`, serviceData);
        servicesArr.push(serviceData);
        totalAmount += price * qty;
      } else {
        // Handle regular services from pricingData
        const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
        if (service) {
          const sizeIdx = sizeOptions.findIndex(opt => opt.value === propertySize);
          const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
          const qty = serviceQuantities[id] || 1;
          let priceNum = 0;
          if (typeof price === 'number') priceNum = price;
          else if (typeof price === 'string') {
            const match = price.match(/\d+(\.\d+)?/);
            priceNum = match ? parseFloat(match[0]) : 0;
          }
          const serviceData = {
            name: service.name,
            price: priceNum,
            count: qty,
            total: priceNum * qty,
          };
          console.log(`Found pricing data service ${id}:`, serviceData);
          servicesArr.push(serviceData);
          totalAmount += priceNum * qty;
        } else {
          console.log(`Service ${id} not found in any category or pricing data!`);
          
          
        }
      }
    });

    // Handle addons
    Object.entries(addonQuantities).forEach(([addonId, qty]) => {
      if (qty > 0) {
        const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
        if (addon) {
          const price = addon.getPrice();
          servicesArr.push({
            name: addon.title,
            price: price,
            count: qty,
            total: price * qty,
          });
          totalAmount += price * qty;
        }
      }
    });

    console.log('Selected services state:', selectedServices);
    console.log('Service quantities state:', serviceQuantities);
    console.log('Built services array:', servicesArr);
    console.log('Total amount:', totalAmount);

    const safe = (val: string | undefined | null) => (val && val.trim() !== '' ? val : null);
    
    // Function to normalize postal codes (Canadian format)
    const normalizePostalCode = (postalCode: string | undefined | null): string | null => {
      if (!postalCode || !postalCode.trim()) return null;
      
      // Remove all non-alphanumeric characters and convert to uppercase
      const cleaned = postalCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      
      // Canadian postal code format: Letter-Number-Letter Number-Letter-Number
      if (cleaned.length === 6 && /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleaned)) {
        // Format as K1A 0A9
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      }
      
      // US ZIP code formats
      if (/^\d{5}$/.test(cleaned) || /^\d{9}$/.test(cleaned)) {
        return cleaned.length === 9 ? `${cleaned.slice(0, 5)}-${cleaned.slice(5)}` : cleaned;
      }
      
      // Return original if it doesn't match known patterns
      return postalCode.trim();
    };
    
    // Get selected package name
    const selectedPackageName = selectedBundle ? 
      (selectedBundle === "hdr-photography-only" ? "HDR Photography" : 
       serviceBundles.find(b => b.id === selectedBundle)?.title) || null : null;

    // Create clean notes for truly additional information only
    const cleanNotes = values.additionalInfo?.trim() || null;

    const payload = {
      reference_number: referenceNumber,
      property_size: propertySize,
      services: servicesArr,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      address: safe(values.address),
      notes: cleanNotes,
      preferred_date: values.date,
      time: values.time,
      property_status: 'Vacant',
      status: 'pending',
      user_id: null,
      agent_name: safe(values.name),
      agent_email: safe(values.email),
      agent_phone: safe(values.phone),
      agent_company: safe(values.brokerage),
      // New structured columns
      selected_package_name: selectedPackageName,
      additional_instructions: safe(values.additionalInstructions),
      property_type: safe(values.propertyType),
      bedrooms: safe(values.bedrooms),
      bathrooms: safe(values.bathrooms),
      parking_spaces: safe(values.parkingSpaces),
      suite_unit: safe(values.suiteUnit),
      postal_code: normalizePostalCode(values.postalCode),
      access_instructions: safe(values.accessInstructions),
      agent_designation: safe(values.designation),
      agent_brokerage: safe(values.brokerage),

      promotion_code: safe(values.promotionCode),
    };

    console.log('Sending payload to database:', payload);

    try {
      let bookingResult = null;
      let bookingError = null;

      // First, try direct Supabase insert (for existing setups)
      try {
        console.log('Attempting direct Supabase insert...');
        const { data, error } = await supabase
          .from('bookings')
          .insert([payload])
          .select();
          
        if (error) {
          console.log('Direct Supabase insert failed:', error.message);
          bookingError = error;
        } else {
          console.log('Direct Supabase insert successful:', data);
          bookingResult = data;
        }
      } catch (directError) {
        console.log('Direct Supabase insert error:', directError);
        bookingError = directError;
      }

      // If direct insert failed, try the API route fallback
      if (!bookingResult && bookingError) {
        console.log('Falling back to API route...');
        try {
          const apiResponse = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(errorData.error || `API request failed with status ${apiResponse.status}`);
          }

          const apiResult = await apiResponse.json();
          console.log('API route booking successful:', apiResult);
          bookingResult = [apiResult.data];
          bookingError = null;
        } catch (apiError) {
          console.error('API route also failed:', apiError);
          throw apiError; // Will be caught by outer try-catch
        }
      }
      
      setIsSubmitting(false);
      
      if (bookingError && !bookingResult) {
        console.error('All booking methods failed. Last error:', bookingError);
        setSubmitStatus('error');
        setSubmitAnim('error');
        
        // Provide user-friendly error messages
        let errorMessage = 'Booking submission failed. Please try again.';
        
        // Safe error message extraction
        let errorMsg = '';
        if (bookingError && typeof bookingError === 'object' && 'message' in bookingError) {
          errorMsg = String(bookingError.message);
        } else if (bookingError) {
          errorMsg = String(bookingError);
        }
        
        if (errorMsg.includes('anon') || errorMsg.includes('RLS') || errorMsg.includes('permission')) {
          errorMessage = 'Authentication error. Please refresh the page and try again.';
        } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (errorMsg) {
          errorMessage = `Error: ${errorMsg}`;
        }
        
        setTopLevelError(errorMessage);
        setTimeout(() => setSubmitAnim('idle'), 1200);
      } else {
        console.log('Booking successful! Redirecting to confirmation...');
        setSubmitStatus('idle');
        setSubmitAnim('idle');
        
        // Redirect to confirmation page with reference number
        window.location.href = `/book-now/confirmation/${referenceNumber}`;
      }
    } catch (err) {
      console.error('Unexpected error during booking submission:', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitAnim('error');
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('network')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (err.message.includes('SUPABASE')) {
          errorMessage = 'Database connection error. Please refresh the page and try again.';
        } else {
          errorMessage = `Error: ${err.message}`;
        }
      }
      
      setTopLevelError(errorMessage);
      setTimeout(() => setSubmitAnim('idle'), 1200);
    }
  }

  // Add a function to handle step navigation with validation
  const handleStepNavigation = async (targetStep: number) => {
    if (targetStep === step) return;
    
    // Auto-collapse sticky bar when navigating
    if (barExpanded) {
      setBarExpanded(false);
    }
    
    // Clear top-level error when navigating steps
    setTopLevelError(null);
    setSubmitButtonError(null);
    
    // Clear tab error for the step being navigated to
    setTabErrors(prev => ({ ...prev, [targetStep]: false }));
    
    // Allow free navigation between all tabs
    setStep(targetStep);
    
    // Scroll to top of page smoothly when navigating steps
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const prevStep = () => {
    setStep(step - 1)
  }

  // Helper to update quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setServiceQuantities(prev => {
      const newQty = Math.max(0, (prev[id] || 1) + delta);
      if (newQty === 0) {
        setSelectedServices(selectedServices.filter(sid => sid !== id));
      } else if (!selectedServices.includes(id)) {
        setSelectedServices([...selectedServices, id]);
      }
      return { ...prev, [id]: newQty };
    });
  };

  // Check if tabs should show warning indicators
  const getTabCompletionStatus = (stepNum: number) => {
    const currentValues = form.getValues();
    
    switch (stepNum) {
      case 0:
        return validateStep0().length === 0;
      case 1:
        return validateStep1().length === 0;
      case 2:
        return validateStep2(currentValues).length === 0;
      case 3:
        return validateStep3(currentValues).length === 0;
      case 4:
        return validateStep4(currentValues).length === 0;
      default:
        return true;
    }
  };

  // Add handler for addon quantity change
  const handleAddonQuantityChange = (id: string, delta: number) => {
    setAddonQuantities(prev => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      if (newQty === 0) {
        setSelectedAddons(selectedAddons.filter(aid => aid !== id));
      } else if (!selectedAddons.includes(id)) {
        setSelectedAddons([...selectedAddons, id]);
      }
      return { ...prev, [id]: newQty };
    });
  };

  // Function to handle image navigation
  const handleImageNavigation = (addonId: string, direction: 'prev' | 'next', totalImages: number) => {
    setAddonImageIndices(prev => {
      const currentIndex = prev[addonId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex + 1 >= totalImages ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex - 1 < 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [addonId]: newIndex };
    });
  };

  // Function to handle package image navigation
  const handlePackageImageNavigation = (packageId: string, direction: 'prev' | 'next', totalImages: number) => {
    setPackageImageIndices(prev => {
      const currentIndex = prev[packageId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex + 1 >= totalImages ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex - 1 < 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [packageId]: newIndex };
    });
  };

  // Add handler for removing individual items
  const handleRemoveItem = (type: 'bundle' | 'service' | 'addon', id?: string) => {
    if (type === 'bundle') {
      setSelectedBundle(null);
    } else if (type === 'service' && id) {
      setSelectedServices(prev => prev.filter(serviceId => serviceId !== id));
      setServiceQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    } else if (type === 'addon' && id) {
      setSelectedAddons(prev => prev.filter(addonId => addonId !== id));
      setAddonQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    }
  };

  // Add handler for clearing entire cart
  const handleClearCart = () => {
    setSelectedBundle(null);
    setSelectedServices([]);
    setSelectedAddons([]);
    setServiceQuantities({});
    setAddonQuantities({});
    setBarExpanded(false);
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

  if (submitStatus === 'error') {
    return (
      <div className="relative">
        <img
          src="/book-texture.svg"
          alt="Header texture"
          className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="container max-w-4xl mx-auto pt-56 pb-12 px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center -mt-16 flex flex-col items-center">
            <span className="error-anim mb-4">
              <svg className="w-16 h-16 text-red-500 animate-error-pop" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="3" fill="none"/></svg>
            </span>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Booking failed</h1>
            <p className="text-lg mb-6">
              Something went wrong. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  console.log('Form errors:', form.formState.errors);

  return (
    <div className="relative bg-[#262F3F] min-h-screen">
      <img
        src="/book-texture.svg"
        alt="Header texture"
        className="absolute top-0 left-0 w-full h-auto min-h-[200px] object-cover z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="container w-full mx-auto pt-56 pb-12 px-0 md:px-8 relative z-10">
        <div className={`bg-white rounded-lg shadow-lg p-4 md:p-8 -mt-16 w-full ${stickyBarVisible ? 'mb-20' : ''}`}>
          <h1 className="text-3xl font-bold text-center mb-8">Book Your Service</h1>

          {topLevelError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg animate-fade-in">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold mb-2">Please complete the following required fields:</h4>
                  {topLevelError.includes('\n') ? (
                    <ul className="space-y-1 text-sm">
                      {topLevelError.split('\n').filter(line => line.trim().startsWith('❌')).map((error, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span>{error.replace('❌ ', '').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">{topLevelError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((s, idx) => (
                <div
                  key={s}
                  className={`h-1 w-1/5 transition-colors duration-200 ${step >= s - 1 ? "bg-blue-600" : "bg-gray-300"}`}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {[
                { label: "Choose Services", stepNum: 0 },
                { label: "Add-ons", stepNum: 1 },
                { label: "Property Details", stepNum: 2 },
                { label: "Personal Info", stepNum: 3 },
                { label: "Confirmation", stepNum: 4 },
              ].map(({ label, stepNum }, idx) => {
                const isActive = step === stepNum;
                const isAvailable = true;
                const hasErrors = tabErrors[stepNum] === true;
                const showWarning = hasErrors && !isActive;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`transition-colors font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-1
                      ${isActive ? "text-blue-600" : isAvailable ? "text-blue-500 hover:text-blue-700" : "text-gray-400"}
                      ${isActive ? "underline underline-offset-4" : ""}
                      ${!isAvailable ? "cursor-default" : ""}
                    `}
                    aria-current={isActive ? "step" : undefined}
                    aria-disabled={!isAvailable}
                    tabIndex={isAvailable ? 0 : -1}
                    onClick={() => handleStepNavigation(stepNum)}
                    style={isActive ? { border: 'none', boxShadow: 'none' } : {}}
                  >
                    {label}
                    {showWarning && (
                      <svg 
                        className="w-4 h-4 text-red-500 animate-pulse" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-label="Incomplete fields"
                      >
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && (
                <div className="text-center space-y-8">
                  {/* Property Size Selection */}
                  <div>
                    <h2 className="text-4xl font-serif font-bold mb-6 text-[#262F3F]">
                      Please, choose the property size
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
                      {sizeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedSize(opt.value);
                            clearTabErrorsOnChange();
                          }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedSize === opt.value
                              ? 'border-[#1c4596] bg-[#1c4596] text-white'
                              : 'border-gray-300 hover:border-[#1c4596] hover:bg-blue-50'
                          }`}
                        >
                          <div className="text-lg font-semibold">{opt.label}</div>
                          <div className="text-sm opacity-80">{opt.range}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Bundle Selection */}
                  {selectedSize && selectedSize !== '5500plus' && (
                    <div className="animate-fade-in-up space-y-12">
                      <h2 className="text-3xl font-serif font-bold mb-8 text-[#262F3F]">
                        Choose Services
                      </h2>
                      
                      {/* Service Type Toggle Buttons */}
                      <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 p-1 rounded-xl inline-flex gap-1">
                          <button
                            type="button"
                            onClick={() => setServiceTypeTab('packages')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                              serviceTypeTab === 'packages'
                                ? 'bg-[#1c4596] text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            Packages
                          </button>
                          <button
                            type="button"
                            onClick={() => setServiceTypeTab('individual')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                              serviceTypeTab === 'individual'
                                ? 'bg-[#1c4596] text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            Individual Services
                          </button>
                        </div>
                      </div>

                      {/* Packages Section */}
                      <div className={`transition-all duration-500 ease-in-out ${
                        serviceTypeTab === 'packages' 
                          ? 'opacity-100 max-h-none' 
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}>
                        {serviceTypeTab === 'packages' && (
                          <div className="animate-fade-in space-y-8">
                            {/* All Packages in Clean Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8 sm:mb-12">
                        
                        {serviceBundles.map((bundle) => {
                          return (
                          <div
                            key={bundle.id}
                              className={`relative bg-white rounded-xl border-2 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-lg ${
                              selectedBundle === bundle.id
                                  ? 'border-[#1c4596] ring-2 ring-[#1c4596] ring-opacity-20'
                                  : 'border-gray-200 hover:border-[#1c4596]'
                            }`}
                            onClick={() => {
                              if (selectedBundle === bundle.id) {
                                setSelectedBundle('');
                              } else {
                                setSelectedBundle(bundle.id);
                              }
                              clearTabErrorsOnChange();
                            }}
                            tabIndex={0}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                if (selectedBundle === bundle.id) {
                                  setSelectedBundle('');
                                } else {
                                  setSelectedBundle(bundle.id);
                                }
                                clearTabErrorsOnChange();
                              }
                            }}
                            aria-pressed={selectedBundle === bundle.id}
                            role="button"
                          >

                            {/* Image */}
                              <div className="aspect-[4/3] w-full overflow-hidden relative">
                              <SlidingCarousel
                                images={bundle.images}
                                currentIndex={packageImageIndices[bundle.id] || 0}
                                onNavigate={(direction) => handlePackageImageNavigation(bundle.id, direction, bundle.images.length)}
                                onHover={(isHovering) => setHoveredPackages(prev => ({ ...prev, [bundle.id]: isHovering }))}
                                alt={bundle.title}
                                  showIncludedBadge={false}
                              />
                            </div>

                            {/* Content */}
                               <div className="p-4 sm:p-6">
                                 {/* Package Name */}
                                 <h3 className="text-lg sm:text-xl font-bold text-[#262F3F] mb-2">{bundle.title}</h3>
                                 
                                 {/* Price */}
                                 <div className="flex items-center justify-between mb-4">
                                   <div className="flex items-center gap-2">
                                     <span className="text-2xl font-bold text-[#262F3F]">{getBundlePricing(bundle.id, selectedSize)}</span>
                                     <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                       selectedBundle === bundle.id 
                                         ? 'bg-[#1c4596] text-white' 
                                         : 'bg-gray-200 text-gray-700'
                                     }`}>
                                       {selectedBundle === bundle.id ? '✓' : '+'}
                                  </div>
                                   </div>
                              </div>
                              
                                 {/* Core Features List */}
                                 <div className="space-y-1 mb-4">
                                   {(() => {
                                     // Define core features for each package to match screenshot
                                     const getCoreFeatures = (bundleId: string) => {
                                       const essentialsFeatures = [
                                         'Professional Photography',
                                         '2-4 Aerial Photos Optimized For Your Listing',
                                         'Listing Website',
                                         'Slideshow Video',
                                         'Feature Sheet (PDF)',
                                         'Social Media Post',
                                         'Social Media Story',
                                         'Blue Sky Replacement'
                                       ];
                                       
                                       switch (bundleId) {
                                         case 'essentials':
                                           return essentialsFeatures;
                                         case 'essentials-twilight':
                                           return [
                                             ...essentialsFeatures,
                                             '**+ Virtual Twilight Photography**'
                                           ];
                                         case 'essentials-floor-plans':
                                           return [
                                             ...essentialsFeatures,
                                             '**+ 2D Floor Plan (Color-coded + Black and white)**'
                                           ];
                                         case 'essentials-matterport':
                                           return [
                                             ...essentialsFeatures,
                                             '**+ 360° Virtual Tour (Matterport)**'
                                           ];
                                         case 'essentials-property-video':
                                           return [
                                             ...essentialsFeatures,
                                             '**+ Property Tour Video (Drone Footage)**'
                                           ];
                                         case 'marketing-pro':
                                           return [
                                             'Everything in Essentials',
                                             'Enhanced Twilight Listing Image',
                                             '360° Virtual Tour',
                                             '2D Floor Plan',
                                             'Property Highlights Video',
                                             'Drone Aerial Photos',
                                             'Custom Domain Name'
                                           ];
                                         case 'top-agent':
                                           return [
                                             'Everything in Marketing Pro',
                                             'Agent on video',
                                             '2 Additional Twilight Images',
                                             'Social Media Reel Video',
                                             'Extra social media content',
                                             '2D + 3D Floor Plan',
                                             'Agent Branding on All Media',
                                             'Complete Aerial Coverage'
                                           ];
                                         default:
                                           return bundle.services.slice(0, 4);
                                       }
                                     };

                                     return getCoreFeatures(bundle.id).map((feature, idx) => {
                                       // Check if this is a bold feature (starts and ends with **)
                                       const isBoldFeature = feature.startsWith('**') && feature.endsWith('**');
                                       const displayText = isBoldFeature ? feature.slice(2, -2) : feature;
                                       
                                       return (
                                         <div key={idx} className={`flex items-start gap-2 text-sm leading-relaxed ${
                                           isBoldFeature 
                                             ? 'text-[#1c4596] font-bold' 
                                             : 'text-gray-700'
                                         }`}>
                                           <span className={`text-green-500 font-bold mt-0.5 flex-shrink-0 ${
                                             isBoldFeature ? 'text-[#1c4596]' : 'text-green-500'
                                           }`}>✓</span>
                                           <span>{displayText}</span>
                                         </div>
                                       );
                                     });
                                   })()}
                              </div>



                                {/* Selection Button */}
                                <button
                                  type="button"
                                  className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                                  selectedBundle === bundle.id
                                    ? 'bg-[#1c4596] text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-[#1c4596] hover:text-white'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (selectedBundle === bundle.id) {
                                      setSelectedBundle('');
                                    } else {
                                      setSelectedBundle(bundle.id);
                                    }
                                    clearTabErrorsOnChange();
                                  }}
                                >
                                  {selectedBundle === bundle.id ? 'Selected ✓' : 'Select Package'}
                                </button>


                          </div>
                            </div>
                          );
                        })}
                      </div>

                            {(selectedBundle || selectedServices.length > 0 || Object.keys(addonQuantities).some(id => addonQuantities[id] > 0)) && (
                              <div className="text-center mt-8 sm:mt-12">
                                <button
                                  type="button"
                                  onClick={() => handleStepNavigation(1)}
                                  className="bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                                >
                                  <span className="hidden sm:inline">Continue to Add-ons →</span>
                                  <span className="sm:hidden">Add-ons →</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Individual Services Section */}
                      <div className={`transition-all duration-500 ease-in-out ${
                        serviceTypeTab === 'individual' 
                          ? 'opacity-100 max-h-none' 
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}>
                        {serviceTypeTab === 'individual' && (
                          <div className="animate-fade-in space-y-12">
                        {/* Categorized Individual Services */}
                        <div className="max-w-6xl mx-auto space-y-12">
                          {Object.entries(getAddonServicesByCategory(selectedSize)).map(([categoryKey, category]) => (
                            <div key={categoryKey} className="space-y-6">
                              {/* Category Header */}
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                  <span className="text-3xl">{category.icon}</span>
                                  <h3 className="text-2xl font-bold text-[#262F3F]">{category.title}</h3>
                                </div>
                                <p className="text-[#262F3F] text-lg max-w-2xl mx-auto">{category.description}</p>
                              </div>
                              
                              {/* Services Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                {category.services.map((addon) => {
                                  const qty = addonQuantities[addon.id] || 0;
                                  const isIncluded = isServiceIncludedInBundle(addon.id, selectedBundle);
                                  const price = addon.getPrice();
                                  const virtualIds = ["virtualDeclutter", "virtualStaging", "virtualTwilight"];
                                  const isVirtual = virtualIds.includes(addon.id);
                                  return (
                                    <div
                                      key={addon.id}
                                      className={`relative p-3 sm:p-4 md:p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                        !isVirtual && isIncluded
                                          ? 'border-gray-200 bg-gray-50 opacity-75 cursor-default'
                                          : (qty > 0 || (!isVirtual && selectedAddons.includes(addon.id)))
                                          ? 'border-[#1c4596] bg-blue-50'
                                          : 'border-gray-300 hover:border-[#1c4596] hover:bg-blue-50'
                                      }`}
                                      onClick={() => {
                                        if (isVirtual) {
                                          handleAddonQuantityChange(addon.id, 1);
                                        } else if (!isVirtual && !isIncluded) {
                                          // Regular addon handling
                                          if (selectedAddons.includes(addon.id)) {
                                            handleRemoveItem('addon', addon.id);
                                          } else {
                                            setSelectedAddons([...selectedAddons, addon.id]);
                                            setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                          }
                                        }
                                      }}
                                      tabIndex={0}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          e.preventDefault();
                                                                                  if (isVirtual) {
                                          handleAddonQuantityChange(addon.id, 1);
                                        } else if (!isVirtual && !isIncluded) {
                                          // Regular addon handling
                                          if (selectedAddons.includes(addon.id)) {
                                            handleRemoveItem('addon', addon.id);
                                          } else {
                                            setSelectedAddons([...selectedAddons, addon.id]);
                                            setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                          }
                                        }
                                        }
                                      }}
                                      aria-pressed={isVirtual ? undefined : (!isVirtual && !isIncluded ? selectedAddons.includes(addon.id) : undefined)}
                                      role={!isVirtual && isIncluded ? undefined : "button"}
                                    >
                                      {/* Badge */}
                                      {(addon as any).badge && (
                                        <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10 ${
                                          (addon as any).badge === 'Popular' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                          {(addon as any).badge}
                                        </div>
                                      )}

                                      {/* Included Badge for non-virtual add-ons only */}
                                      {!isVirtual && isIncluded && (
                                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-100 text-green-800 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
                                          ✓ Included
                                        </div>
                                      )}

                                      {/* Quantity Controls for virtual services only */}
                                      {isVirtual && (
                                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 z-10">
                                          <button
                                            type="button"
                                            className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-gray-300 text-sm sm:text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                            onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, -1); }}
                                            aria-label="Decrease quantity"
                                            disabled={qty <= 0}
                                          >
                                            -
                                          </button>
                                          <span className="mx-0.5 sm:mx-1 min-w-[16px] sm:min-w-[20px] text-center select-none text-xs sm:text-sm">{qty}</span>
                                          <button
                                            type="button"
                                            className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-gray-300 text-sm sm:text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                            onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, 1); }}
                                            aria-label="Increase quantity"
                                          >
                                            +
                                          </button>
                                        </div>
                                      )}

                                      {/* Checkbox for non-virtual add-ons */}
                                      {!isVirtual && !isIncluded && (
                                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                                          <input
                                            type="checkbox"
                                            id={`individual-addon-${addon.id}`}
                                            checked={selectedAddons.includes(addon.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedAddons([...selectedAddons, addon.id]);
                                                setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                              } else {
                                                handleRemoveItem('addon', addon.id);
                                              }
                                            }}
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#1c4596] border-2 border-gray-300 rounded focus:ring-[#1c4596] focus:ring-2"
                                          />
                                        </div>
                                      )}
                                      
                                      {/* Image */}
                                      <div className="aspect-[3/2] mb-2 sm:mb-3 md:mb-4 rounded-lg overflow-hidden relative">
                                        <SlidingCarousel
                                          images={(addon as any).images || ['/images/home/s_1.webp']}
                                          currentIndex={addonImageIndices[addon.id] || 0}
                                          onNavigate={(direction) => handleImageNavigation(addon.id, direction, (addon as any).images?.length || 1)}
                                          onHover={(isHovering) => setHoveredAddons(prev => ({ ...prev, [addon.id]: isHovering }))}
                                          alt={addon.title}
                                        />
                                      </div>

                                      {/* Content */}
                                      <div className="text-left">
                                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                          <h3 className={`text-sm sm:text-lg md:text-xl font-bold ${isIncluded ? 'text-gray-600' : 'text-[#262F3F]'}`}>{addon.title}</h3>
                                        </div>
                                        <div className={`text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 leading-relaxed ${isIncluded ? 'text-gray-500' : 'text-gray-600'}`}>
                                          {addon.description.split('\n').map((line: string, index: number) => (
                                            <div key={index} className="mb-1 last:mb-0">
                                              {line.trim().replace(/^✓/, '✅')}
                                            </div>
                                          ))}
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                          {!isIncluded && (
                                            <span className={`text-sm sm:text-lg font-bold text-[#1c4596]`}>
                                              ${price}{isVirtual ? '/img' : ''}
                                            </span>
                                          )}
                                          
                                          {/* Action Button */}
                                          {isVirtual ? (
                                            <button
                                              type="button"
                                              onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, 1); }}
                                              className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                                                qty > 0
                                                  ? 'bg-[#1c4596] text-white'
                                                  : 'bg-gray-200 text-gray-700 hover:bg-[#1c4596] hover:text-white'
                                              }`}
                                            >
                                              {qty > 0 ? `Added ✓` : 'Add to Order'}
                                            </button>
                                          ) : !isVirtual && !isIncluded ? (
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                // Regular addon handling
                                                if (selectedAddons.includes(addon.id)) {
                                                  handleRemoveItem('addon', addon.id);
                                                } else {
                                                  setSelectedAddons([...selectedAddons, addon.id]);
                                                  setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                                }
                                              }}
                                              className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                                                selectedAddons.includes(addon.id)
                                                  ? 'bg-[#1c4596] text-white'
                                                  : 'bg-gray-200 text-gray-700 hover:bg-[#1c4596] hover:text-white'
                                              }`}
                                            >
                                              {selectedAddons.includes(addon.id) ? 'Added ✓' : 'Add to Order'}
                                            </button>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                            </div>
                            
                            {/* Continue Button for Individual Services */}
                            {(selectedBundle || selectedServices.length > 0 || Object.keys(addonQuantities).some(id => addonQuantities[id] > 0)) && (
                              <div className="text-center mt-8 sm:mt-12">
                                <button
                                  type="button"
                                  onClick={() => handleStepNavigation(1)}
                                  className="bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                                >
                                  <span className="hidden sm:inline">Continue to Add-ons →</span>
                                  <span className="sm:hidden">Add-ons →</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
                </div>
              )}

              {step === 1 && (
                <div className="text-center space-y-8">
                <div>
                    <h2 className="text-4xl font-serif font-bold mb-4 text-[#262F3F]">
                      Enhance your package
                    </h2>
                    <p className="text-lg text-[#262F3F] mb-8">
                      Add premium services to make your listing stand out even more
                    </p>
                        </div>
                  {/* Categorized Services */}
                  <div className="max-w-6xl mx-auto space-y-12">
                    {Object.entries(getAddonServicesByCategory(selectedSize)).map(([categoryKey, category]) => (
                      <div key={categoryKey} className="space-y-6">
                        {/* Category Header */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="text-3xl">{category.icon}</span>
                            <h3 className="text-2xl font-bold text-[#262F3F]">{category.title}</h3>
                          </div>
                          <p className="text-[#262F3F] text-lg max-w-2xl mx-auto">{category.description}</p>
                        </div>
                        
                        {/* Services Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                          {category.services.map((addon) => {
                            const qty = addonQuantities[addon.id] || 0;
                            const isIncluded = isServiceIncludedInBundle(addon.id, selectedBundle);
                            const price = addon.getPrice();
                            const virtualIds = ["virtualDeclutter", "virtualStaging", "virtualTwilight"];
                            const isVirtual = virtualIds.includes(addon.id);
                            return (
                      <div
                        key={addon.id}
                                className={`relative p-3 sm:p-4 md:p-6 rounded-xl border-2 transition-all cursor-pointer ${
                                  !isVirtual && isIncluded
                                    ? 'border-gray-200 bg-gray-50 opacity-75 cursor-default'
                                    : (qty > 0 || (!isVirtual && selectedAddons.includes(addon.id)))
                            ? 'border-[#1c4596] bg-blue-50'
                            : 'border-gray-300 hover:border-[#1c4596] hover:bg-blue-50'
                        }`}
                              onClick={() => {
                                  if (isVirtual) {
                                    handleAddonQuantityChange(addon.id, 1);
                                  } else if (!isVirtual && !isIncluded) {
                                    // Regular addon handling
                                    if (selectedAddons.includes(addon.id)) {
                                      handleRemoveItem('addon', addon.id);
                                    } else {
                                      setSelectedAddons([...selectedAddons, addon.id]);
                                      setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                    }
                                  }
                                }}
                                tabIndex={0}
                                onKeyDown={e => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    if (isVirtual) {
                                      handleAddonQuantityChange(addon.id, 1);
                                    } else if (!isVirtual && !isIncluded) {
                                      if (selectedAddons.includes(addon.id)) {
                                setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                                        setAddonQuantities(q => ({ ...q, [addon.id]: 0 }));
                                      } else {
                                        setSelectedAddons([...selectedAddons, addon.id]);
                                        setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                      }
                                    }
                                  }
                                }}
                                aria-pressed={isVirtual ? undefined : (!isVirtual && !isIncluded ? selectedAddons.includes(addon.id) : undefined)}
                                role={!isVirtual && isIncluded ? undefined : "button"}
                              >
                                {/* Badge */}
                                {(addon as any).badge && (
                                  <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10 ${
                                    (addon as any).badge === 'Popular' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {(addon as any).badge}
                        </div>
              )}

                                {/* Included Badge for non-virtual add-ons only */}
                                {!isVirtual && isIncluded && (
                                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-100 text-green-800 text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
                                    ✓ Included
                        </div>
                      )}

                                {/* Quantity Controls for virtual services only */}
                                {isVirtual && (
                                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 z-10">
                                      <button
                                        type="button"
                                      className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-gray-300 text-sm sm:text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                      onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, -1); }}
                                        aria-label="Decrease quantity"
                                      disabled={qty <= 0}
                                      >
                                        -
                                      </button>
                                    <span className="mx-0.5 sm:mx-1 min-w-[16px] sm:min-w-[20px] text-center select-none text-xs sm:text-sm">{qty}</span>
                                      <button
                                        type="button"
                                      className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded border border-gray-300 text-sm sm:text-lg font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                      onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, 1); }}
                                        aria-label="Increase quantity"
                                      >
                                        +
                                      </button>
                        </div>
                      )}

                                {/* Checkbox for non-virtual add-ons */}
                                {!isVirtual && !isIncluded && (
                                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                                    <input
                                      type="checkbox"
                                      id={`addon-${addon.id}`}
                                      checked={selectedAddons.includes(addon.id)}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedAddons([...selectedAddons, addon.id]);
                                          setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                              } else {
                                          setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                                          setAddonQuantities(q => ({ ...q, [addon.id]: 0 }));
                                        }
                                      }}
                                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#1c4596] border-2 border-gray-300 rounded focus:ring-[#1c4596] focus:ring-2"
                                    />
                              </div>
                                )}
                                
                                {/* Image */}
                                <div className="aspect-[3/2] mb-2 sm:mb-3 md:mb-4 rounded-lg overflow-hidden relative">
                                  <SlidingCarousel
                                    images={(addon as any).images || ['/images/home/s_1.webp']}
                                    currentIndex={addonImageIndices[addon.id] || 0}
                                    onNavigate={(direction) => handleImageNavigation(addon.id, direction, (addon as any).images?.length || 1)}
                                    onHover={(isHovering) => setHoveredAddons(prev => ({ ...prev, [addon.id]: isHovering }))}
                                    alt={addon.title}
                                  />
                                </div>

                                {/* Content */}
                                <div className="text-left">
                                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                    <h3 className={`text-sm sm:text-lg md:text-xl font-bold ${isIncluded ? 'text-gray-600' : 'text-[#262F3F]'}`}>{addon.title}</h3>
                                  </div>
                                  <div className={`text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 leading-relaxed ${isIncluded ? 'text-gray-500' : 'text-gray-600'}`}>
                                    {addon.description.split('\n').map((line: string, index: number) => (
                                      <div key={index} className="mb-1 last:mb-0">
                                        {line.trim().replace(/^✓/, '✅')}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    {!isIncluded && (
                                      <span className={`text-sm sm:text-lg font-bold text-[#1c4596]`}>
                                        ${price}{(addon as any).perImage ? '/img' : ''}
                                        </span>
                                      )}
                                    
                                    {/* Action Button */}
                                    {isVirtual ? (
                                          <button
                                            type="button"
                                        onClick={(e) => { e.stopPropagation(); handleAddonQuantityChange(addon.id, 1); }}
                                        className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                                          qty > 0
                                            ? 'bg-[#1c4596] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-[#1c4596] hover:text-white'
                                        }`}
                                      >
                                        {qty > 0 ? `Added ✓` : 'Add to Order'}
                                          </button>
                                    ) : !isVirtual && !isIncluded ? (
                                          <button
                                            type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Regular addon handling
                                          if (selectedAddons.includes(addon.id)) {
                                            handleRemoveItem('addon', addon.id);
                                          } else {
                                            setSelectedAddons([...selectedAddons, addon.id]);
                                            setAddonQuantities(q => ({ ...q, [addon.id]: 1 }));
                                          }
                                        }}
                                        className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                                                                                        selectedAddons.includes(addon.id)
                                            ? 'bg-[#1c4596] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-[#1c4596] hover:text-white'
                                        }`}
                                      >
                                                                                  {selectedAddons.includes(addon.id) ? 'Added ✓' : 'Add to Order'}
                                          </button>
                                    ) : null}
                                    </div>
                                  </div>
                                  </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between max-w-4xl mx-auto mt-8">
                    <button
                      type="button"
                      onClick={() => handleStepNavigation(0)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto transition-colors"
                    >
                      ← Back to Services
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepNavigation(2)}
                      className="bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto transition-colors"
                    >
                      Continue to Property Details →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-[#262F3F]">Property Details</h2>
                  <div className="max-w-4xl mx-auto space-y-8">
                    {/* Listing Location Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Listing Location*</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field: { ref, ...fieldProps } }) => (
                              <FormItem>
                                <FormLabel>Address*</FormLabel>
                          <FormControl>
                                  <Input 
                                    ref={addressInputRef}
                                    placeholder="Start typing your address..." 
                                    autoComplete="off"
                                    {...fieldProps}
                                    onChange={(e) => handleAddressChange(e, fieldProps.onChange)}
                                    onFocus={handleAddressFocus}
                                  />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                        </div>
                        <div>
                    <FormField
                      control={form.control}
                            name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                  <Input placeholder="" {...field} onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }} />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                        </div>
                        <div>
                    <FormField
                      control={form.control}
                            name="suiteUnit"
                      render={({ field }) => (
                        <FormItem>
                                <FormLabel>Suite / Unit / Apartment No</FormLabel>
                          <FormControl>
                                  <Input placeholder="" {...field} onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        * Please verify your complete address including postal code is accurate. Our photographer uses this information to navigate to your property and ensure timely arrival for your photo shoot.
                      </p>
                    </div>

                    {/* Date and Time Preference Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Preferred Date and Time*</h3>
                      <p className="text-sm text-gray-600">
                        Please select your preferred date and time for the photo shoot. We'll contact you to confirm availability.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="block">Preferred Date*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="date"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                        clearTabErrorsOnChange();
                                      }}
                                      min={format(new Date(), 'yyyy-MM-dd')}
                                      className="w-full h-[40px] px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 focus:border-gray-950 cursor-pointer appearance-none bg-white"
                                      style={{
                                        colorScheme: 'light',
                                      }}
                                      placeholder="yyyy-mm-dd"
                                      onFocus={(e) => e.target.showPicker?.()}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="block">Preferred Time*</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white h-[40px] border-gray-300 focus:ring-2 focus:ring-gray-950 focus:border-gray-950">
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="08:30">8:30 AM</SelectItem>
                                    <SelectItem value="09:00">9:00 AM</SelectItem>
                                    <SelectItem value="09:30">9:30 AM</SelectItem>
                                    <SelectItem value="10:00">10:00 AM</SelectItem>
                                    <SelectItem value="10:30">10:30 AM</SelectItem>
                                    <SelectItem value="11:00">11:00 AM</SelectItem>
                                    <SelectItem value="11:30">11:30 AM</SelectItem>
                                    <SelectItem value="12:00">12:00 PM</SelectItem>
                                    <SelectItem value="12:30">12:30 PM</SelectItem>
                                    <SelectItem value="13:00">1:00 PM</SelectItem>
                                    <SelectItem value="13:30">1:30 PM</SelectItem>
                                    <SelectItem value="14:00">2:00 PM</SelectItem>
                                    <SelectItem value="14:30">2:30 PM</SelectItem>
                                    <SelectItem value="15:00">3:00 PM</SelectItem>
                                    <SelectItem value="15:30">3:30 PM</SelectItem>
                                    <SelectItem value="16:00">4:00 PM</SelectItem>
                                    <SelectItem value="16:30">4:30 PM</SelectItem>
                                    <SelectItem value="17:00">5:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* How to Get Access Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">How to Get Access to the Property</h3>
                    <FormField
                      control={form.control}
                        name="accessInstructions"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Access Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                                placeholder=""
                                className="resize-none min-h-[100px] bg-white"
                              {...field}
                                onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                      <p className="text-sm text-gray-600">
                        Provide entry details, lockbox codes, or parking instructions for our photographer.
                      </p>
                  </div>

                    {/* Property Type Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Property Type</h3>
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="condo-apartment" id="condo-apartment" />
                                  <label htmlFor="condo-apartment" className="text-sm">Condo Apartment</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="condo-townhouse" id="condo-townhouse" />
                                  <label htmlFor="condo-townhouse" className="text-sm">Condo Townhouse</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="townhouse" id="townhouse" />
                                  <label htmlFor="townhouse" className="text-sm">Townhouse</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="semi-detached" id="semi-detached" />
                                  <label htmlFor="semi-detached" className="text-sm">Semi-Detached</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="detached" id="detached" />
                                  <label htmlFor="detached" className="text-sm">Detached</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="luxury-property" id="luxury-property" />
                                  <label htmlFor="luxury-property" className="text-sm">Luxury Property</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="commercial" id="commercial" />
                                  <label htmlFor="commercial" className="text-sm">Commercial</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Property Details Section */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedroom(s)</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="6+">6+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bathroom(s)</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="1.5">1.5</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="2.5">2.5</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="4+">4+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="parkingSpaces"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Parking Space(s)</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Please Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">0</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5+">5+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Features & Focus Areas */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Property Features & Focus Areas</h3>
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Features & Photography Focus</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List any special features or areas to highlight (e.g., renovated kitchen, pool area)"
                                className="resize-none min-h-[120px] bg-white"
                                {...field}
                                onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-sm text-gray-600">
                        Tell us about key features or areas that need special attention during the photoshoot.
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between pt-8">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleStepNavigation(step - 1)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                      >
                        ← Back to Property Details
                      </Button>
                      <div className="relative w-full sm:w-auto">
                        <Button 
                          type="button"
                          onClick={() => {
                            // Validate step 2 before proceeding
                            const currentValues = form.getValues();
                            const step2Errors = validateStep2(currentValues);
                            
                            if (step2Errors.length === 0) {
                              // All fields valid, go to Personal Info
                              handleStepNavigation(3);
                            } else {
                              // Show validation errors
                              setTopLevelError(`Please complete the following required fields:\n\n${step2Errors.map(error => `❌ ${error}`).join('\n')}`);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="bg-[#1c4596] hover:bg-[#2853AE] text-white min-w-[120px] font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                        >
                          Continue to Personal Info →
                        </Button>
                        {/* Submit Button Error Popup */}
                        {submitButtonError && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-red-600 border border-red-700 text-white rounded-lg shadow-2xl z-10 animate-fade-in">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <p className="text-sm font-bold mb-1">Validation Error</p>
                                <p className="text-sm text-red-100">{submitButtonError}</p>
                              </div>
                            </div>
                            {/* Small arrow pointing up to button */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-600"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-[#262F3F]">Personal Details</h2>
                  <div className="max-w-4xl mx-auto space-y-8">
                    {/* Contact Information Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Contact Information*</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name*</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your full name" 
                                    {...field} 
                                    onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address*</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    {...field} 
                                    onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number*</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="(555) 123-4567" 
                                    {...field} 
                                    onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-[#262F3F] mb-4">Brokerage Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormField
                            control={form.control}
                            name="brokerage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Brokerage Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your brokerage name" 
                                    {...field} 
                                    onChange={(e) => { field.onChange(e); clearTabErrorsOnChange(); }}
                                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1c4596] focus:border-[#1c4596] cursor-pointer bg-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Designation</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); clearTabErrorsOnChange(); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Select Your Designation" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="realtor">Realtor®</SelectItem>
                                    <SelectItem value="sales-representative">Sales Representative</SelectItem>
                                    <SelectItem value="broker">Broker</SelectItem>
                                    <SelectItem value="broker-of-record">Broker of Record</SelectItem>
                                    <SelectItem value="real-estate-team">Real Estate Team</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>



                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between pt-8">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleStepNavigation(step - 1)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                      >
                        ← Back to Property Details
                      </Button>
                      <div className="relative w-full sm:w-auto">
                        <Button 
                          type="button"
                          onClick={() => {
                            // Validate step 3 before proceeding
                            const currentValues = form.getValues();
                            const step3Errors = validateStep3(currentValues);
                            
                            if (step3Errors.length === 0) {
                              // All fields valid, go to confirmation
                              handleStepNavigation(4);
                            } else {
                              // Show validation errors
                              setTopLevelError(`Please complete the following required fields:\n\n${step3Errors.map(error => `❌ ${error}`).join('\n')}`);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          className="bg-[#1c4596] hover:bg-[#2853AE] text-white min-w-[120px] font-semibold px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-lg w-full sm:w-auto"
                        >
                          Continue to Confirmation →
                        </Button>
                        {/* Submit Button Error Popup */}
                        {submitButtonError && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-red-600 border border-red-700 text-white rounded-lg shadow-2xl z-10 animate-fade-in">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <p className="text-sm font-bold mb-1">Validation Error</p>
                                <p className="text-sm text-red-100">{submitButtonError}</p>
                              </div>
                            </div>
                            {/* Small arrow pointing up to button */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-600"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Confirmation</h2>
                  
                  {/* Property Location Map */}
                  {form.getValues("address") && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="text-xl font-semibold mb-4 text-[#262F3F]">Property Location</h3>
                      <div className="space-y-4">
                        <p className="text-gray-700">
                          <strong>Address:</strong> {formatCompleteAddress()}
                        </p>
                        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                          {confirmationMapLoaded && form.getValues("address") ? (
                            <div
                              ref={confirmationMapRef}
                              className="w-full h-full"
                              style={{ minHeight: '256px' }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1c4596] mx-auto mb-2"></div>
                                <p className="text-sm">Loading map...</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          📍 Our photographer will arrive at this location for your scheduled shoot.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Property Size:</span>
                        <span>{sizeOptions.find(opt => opt.value === selectedSize)?.label}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Property Address:</span>
                        <span>{formatCompleteAddress()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Preferred Date:</span>
                        <span>{(() => {
                          const currentDate = form.getValues("date");
                          if (!currentDate) return "Not specified";
                          try {
                            // Parse the date as local date to avoid timezone issues
                            const [year, month, day] = currentDate.split('-').map(num => parseInt(num, 10));
                            const localDate = new Date(year, month - 1, day); // month is 0-indexed in JS
                            return format(localDate, "PPP");
                          } catch {
                            return currentDate;
                          }
                        })()}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Services Selected:</h4>
                      {selectedBundle && (() => {
                        const bundleData = serviceBundles.find(b => b.id === selectedBundle);
                        const bundlePrice = getBundlePricing(selectedBundle, selectedSize);
                        return bundleData ? (
                        <div className="flex justify-between items-center mb-2">
                            <span>{bundleData.title}</span>
                            <span className="font-semibold">{bundlePrice}</span>
                        </div>
                        ) : null;
                      })()}
                      {selectedServices.map((id) => {
                        const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
                        if (!service) return null;
                        const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                        const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                        const qty = serviceQuantities[id] || 1;
                        return (
                          <div key={id} className="flex justify-between items-center mb-2">
                            <span>{service.name} {qty > 1 && `×${qty}`}</span>
                            <span className="font-semibold">
                              {typeof price === 'number' ? `$${(price * qty).toFixed(2)}` : `$${price}`}
                            </span>
                          </div>
                        );
                      })}
                      {Object.entries(addonQuantities).filter(([id, qty]) => qty > 0).map(([addonId, qty]) => {
                        const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
                        if (!addon) return null;
                        const price = addon.getPrice();
                        return (
                          <div key={addonId} className="flex justify-between items-center mb-2">
                            <span>{addon.title} {qty > 1 && `×${qty}`}</span>
                            <span className="font-semibold">
                              ${(price * qty).toFixed(2)}{(addon as any).perImage ? '/img' : ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span>
                          ${(() => {
                            let total = 0;
                            if (selectedBundle) {
                              const bundlePrice = getBundlePricing(selectedBundle, selectedSize);
                              total += parseFloat(bundlePrice.replace('$', ''));
                            }
                            total += selectedServices.reduce((sum, id) => {
                              const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
                              if (!service) return sum;
                              const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                              const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                              const qty = serviceQuantities[id] || 1;
                              let priceNum = 0;
                              if (typeof price === 'number') priceNum = price;
                              else if (typeof price === 'string') {
                                const match = price.match(/\d+(\.\d+)?/);
                                priceNum = match ? parseFloat(match[0]) : 0;
                              }
                              return sum + priceNum * qty;
                            }, 0);
                            total += Object.entries(addonQuantities).reduce((sum, [addonId, qty]) => {
                              const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
                              return sum + (addon ? addon.getPrice() * qty : 0);
                            }, 0);
                            return total.toFixed(2);
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Name:</span>
                        <p>{form.getValues("name") || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <p>{form.getValues("email") || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>
                        <p>{form.getValues("phone") || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Brokerage:</span>
                        <p>{form.getValues("brokerage") || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Designation:</span>
                        <p>{form.getValues("designation") || "Not specified"}</p>
                      </div>
                    </div>
                    {form.getValues("additionalInstructions") && (
                      <div className="mt-4">
                        <span className="font-medium">Additional Instructions:</span>
                        <p className="mt-1 text-gray-600">{form.getValues("additionalInstructions")}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={() => handleStepNavigation(step - 1)}>
                      ← Back to Personal Information
                    </Button>
                    <div className="relative">
                      <Button 
                        type="button"
                        disabled={isSubmitting}
                        className="bg-[#1c4596] hover:bg-[#2853AE] text-white min-w-[120px]"
                        onClick={() => {
                          console.log('Confirm button clicked!');
                          const currentValues = form.getValues();
                          console.log('Current form values:', currentValues);
                          
                          // Directly call our onSubmit function
                          onSubmit(currentValues);
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Submitting...
                          </>
                        ) : (
                          'Confirm'
                        )}
                      </Button>
                      
                      {/* Submit Button Error Popup */}
                      {submitButtonError && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-red-600 border border-red-700 text-white rounded-lg shadow-2xl z-10 animate-fade-in">
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="text-sm font-bold mb-1">Validation Error</p>
                              <p className="text-sm text-red-100">{submitButtonError}</p>
                            </div>
                          </div>
                          {/* Small arrow pointing up to button */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-600"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Sticky Bottom Bar - Shows when services/packages selected on steps 0, 1, and 2 */}
      {stickyBarVisible && (
        <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out
          ${stickyBarAnimating ? 'animate-slide-down opacity-0' : 'animate-slide-up opacity-100'}
          ${barExpanded ? 'max-h-[60vh]' : 'h-[64px] sm:h-[72px]'}
        `} style={{overflow: barExpanded ? 'hidden' : 'hidden'}}>
          <div className={`container max-w-6xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col h-full transition-all duration-300`}>
            <div className="flex items-center justify-between flex-shrink-0">
              {/* Left side - Item count and total */}
              <div className="flex items-center gap-1 sm:gap-4">
                {/* Drop-up arrow + Cart as a single toggle button */}
                <button
                  aria-label={barExpanded ? 'Hide order details' : 'Show order details'}
                  onClick={() => setBarExpanded(v => !v)}
                  className="focus:outline-none flex items-center justify-center group"
                  style={{height: '32px', minWidth: '40px', padding: 0, background: 'none', border: 'none'}}
                >
                  {barExpanded ? (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition-transform group-hover:-translate-y-1" />
                  ) : (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition-transform group-hover:-translate-y-1" />
                  )}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1c4596] ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
                <span className="font-medium text-gray-700 text-xs sm:text-sm">
                  <span className="hidden sm:inline">
                    {(selectedBundle ? 1 : 0) + selectedServices.length + Object.keys(addonQuantities).filter(id => addonQuantities[id] > 0).length} item{(selectedBundle ? 1 : 0) + selectedServices.length + Object.keys(addonQuantities).filter(id => addonQuantities[id] > 0).length !== 1 ? 's' : ''} selected
                  </span>
                  <span className="sm:hidden">
                    {(selectedBundle ? 1 : 0) + selectedServices.length + Object.keys(addonQuantities).filter(id => addonQuantities[id] > 0).length} item{(selectedBundle ? 1 : 0) + selectedServices.length + Object.keys(addonQuantities).filter(id => addonQuantities[id] > 0).length !== 1 ? 's' : ''}
                  </span>
                </span>
              </div>
              
              {/* Right side - Total and Proceed button */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-lg sm:text-xl font-bold text-[#262F3F]">
                  {(() => {
                    let total = 0;
                    if (selectedBundle) {
                      const bundlePrice = getBundlePricing(selectedBundle, selectedSize);
                      total += parseFloat(bundlePrice.replace('$', ''));
                    }
                    total += selectedServices.reduce((sum, id) => {
                      // Special handling for HDR Photography
                      if (id === 'hdrPhotography') {
                        const photographyServices = getAddonServicesByCategory(selectedSize).photography.services;
                        const hdrService = photographyServices.find(s => s.id === 'hdrPhotography');
                        if (hdrService) {
                          const qty = serviceQuantities[id] || 1;
                          return sum + (hdrService.getPrice() * qty);
                        }
                        return sum;
                      }
                      
                      // Regular service price calculation
                      const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
                      if (!service) return sum;
                      const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                      const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                      const qty = serviceQuantities[id] || 1;
                      let priceNum = 0;
                      if (typeof price === 'number') priceNum = price;
                      else if (typeof price === 'string') {
                        const match = price.match(/\d+(\.\d+)?/);
                        priceNum = match ? parseFloat(match[0]) : 0;
                      }
                      return sum + priceNum * qty;
                    }, 0);
                    total += Object.entries(addonQuantities).reduce((sum, [addonId, qty]) => {
                      const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
                      return sum + (addon ? addon.getPrice() * qty : 0);
                    }, 0);
                    return `$${total.toFixed(2)}`;
                  })()}
                </div>
                <button
                  className="bg-[#1c4596] hover:bg-[#2853AE] text-white font-semibold rounded-lg px-2 py-2 sm:px-4 sm:py-2 transition disabled:opacity-60 text-xs sm:text-sm"
                  disabled={!(selectedBundle || selectedServices.length > 0 || Object.keys(addonQuantities).some(id => addonQuantities[id] > 0))}
                  type="button"
                  onClick={() => {
                    const nextStep = step === 0 ? 1 : step === 1 ? 2 : step === 2 ? 3 : 4;
                    handleStepNavigation(nextStep);
                  }}
                >
                  <span className="hidden sm:inline">
                    {step === 0 ? 'Continue to Add-ons →' : 
                     step === 1 ? 'Continue to Property Details →' :
                     step === 2 ? 'Continue to Personal Info →' : 
                     'Proceed to Checkout'}
                  </span>
                  <span className="sm:hidden">
                    {step === 0 ? 'Add-ons →' : 
                     step === 1 ? 'Property →' :
                     step === 2 ? 'Personal →' : 
                     'Checkout'}
                  </span>
                </button>
              </div>
            </div>
            
            {/* Expandable order details */}
            {barExpanded && (
              <div className="flex-1 mt-4 overflow-hidden animate-fade-in-up">
                <div className="bg-gray-50 rounded-xl shadow-inner p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3 flex-shrink-0">
                    <h4 className="text-base font-semibold text-[#262F3F]">Order Details</h4>
                    <button
                      onClick={() => setBarExpanded(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      aria-label="Close details"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2 flex-1 overflow-y-auto pr-2" style={{maxHeight: 'calc(60vh - 140px)'}}>
                    {selectedBundle && (() => {
                      const bundleData = serviceBundles.find(b => b.id === selectedBundle);
                      const bundlePrice = getBundlePricing(selectedBundle, selectedSize);
                      return bundleData ? (
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2 animate-fade-in">
                          <span className="font-medium flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#d4a03a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
                            <span className="text-sm">{bundleData.title}</span>
                          </span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-sm">{bundlePrice}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem('bundle')}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove package"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : null;
                    })()}
                    
                    {selectedServices.map((id, idx) => {
                      // Special handling for specific services from getAddonServicesByCategory
                      const categories = getAddonServicesByCategory(selectedSize);
                      let categoryService: any = null;
                      
                      // Find service in photography category
                      categoryService = categories.photography.services.find((s: any) => s.id === id);
                      if (!categoryService) {
                        // Find service in video category  
                        categoryService = (categories.video.services as any[]).find((s: any) => s.id === id);
                      }
                      if (!categoryService) {
                        // Find service in floor plans category
                        categoryService = (categories.floorPlans.services as any[]).find((s: any) => s.id === id);
                      }
                      if (!categoryService) {
                        // Find service in marketing category
                        categoryService = (categories.marketing.services as any[]).find((s: any) => s.id === id);
                      }
                      if (!categoryService) {
                        // Find service in virtual category
                        categoryService = (categories.virtual.services as any[]).find((s: any) => s.id === id);
                      }
                      
                      if (categoryService) {
                        const price = categoryService.getPrice();
                        const qty = serviceQuantities[id] || 1;
                        const priceDisplay = qty > 1 ? `$${price.toFixed(2)} ×${qty}` : `$${price.toFixed(2)}`;
                        return (
                          <div key={id} className={`flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 transition-all duration-300 ${idx % 2 === 0 ? 'bg-white/40' : ''} rounded-lg group hover:bg-blue-50/60 animate-fade-in-up p-2`}>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="font-medium text-sm truncate">{categoryService.title}</span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  type="button"
                                  className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                  onClick={() => handleQuantityChange(id, -1)}
                                  aria-label="Decrease quantity"
                                  disabled={qty <= 1}
                                >
                                  -
                                </button>
                                <span className="mx-1 min-w-[16px] text-center select-none text-sm">{qty}</span>
                                <button
                                  type="button"
                                  className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition"
                                  onClick={() => handleQuantityChange(id, 1)}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-semibold text-sm">{priceDisplay}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem('service', id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                aria-label="Remove service"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      }

                      // Regular service price calculation
                      const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
                      if (!service) return null;
                      const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                      const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                      const qty = serviceQuantities[id] || 1;
                      const isPerImage = typeof price === 'string' && price.includes('/image');
                      let priceNum = 0;
                      if (typeof price === 'number') priceNum = price;
                      else if (typeof price === 'string') {
                        const match = price.match(/\d+(\.\d+)?/);
                        priceNum = match ? parseFloat(match[0]) : 0;
                      }
                      const priceDisplay = isPerImage
                        ? `$${priceNum.toFixed(2)}/img ×${qty}`
                        : qty > 1
                          ? `$${priceNum.toFixed(2)} ×${qty}`
                          : `$${priceNum.toFixed(2)}`;
                      return (
                        <div key={id} className={`flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 transition-all duration-300 ${idx % 2 === 0 ? 'bg-white/40' : ''} rounded-lg group hover:bg-blue-50/60 animate-fade-in-up p-2`}>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="font-medium text-sm truncate">{service.name}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                onClick={() => handleQuantityChange(id, -1)}
                                aria-label="Decrease quantity"
                                disabled={qty <= 1}
                              >
                                -
                              </button>
                              <span className="mx-1 min-w-[16px] text-center select-none text-sm">{qty}</span>
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition"
                                onClick={() => handleQuantityChange(id, 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-sm">{priceDisplay}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem('service', id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove service"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    
                    {Object.entries(addonQuantities).filter(([id, qty]) => qty > 0).map(([addonId, qty]) => {
                      const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
                      if (!addon) return null;
                      const price = addon.getPrice();
                      const priceDisplay = (addon as any).perImage 
                        ? `$${(price * qty).toFixed(2)} (${qty} × $${price}/img)`
                        : qty > 1 
                          ? `$${(price * qty).toFixed(2)}`
                          : `$${price.toFixed(2)}`;
                      return (
                        <div key={addonId} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 animate-fade-in p-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="font-medium text-sm truncate">{addon.title}</span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition disabled:opacity-50"
                                onClick={() => handleAddonQuantityChange(addonId, -1)}
                                aria-label="Decrease quantity"
                                disabled={qty <= 1}
                              >
                                -
                              </button>
                              <span className="mx-1 min-w-[16px] text-center select-none text-sm">{qty}</span>
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-sm font-bold bg-white hover:bg-gray-100 transition"
                                onClick={() => handleAddonQuantityChange(addonId, 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-sm">{priceDisplay}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem('addon', addonId)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove addon"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between text-base font-semibold border-t pt-3 mt-3 animate-fade-in flex-shrink-0 bg-gray-50">
                    <span>Total</span>
                    <span>
                      {(() => {
                        let total = 0;
                        if (selectedBundle) {
                          const bundlePrice = getBundlePricing(selectedBundle, selectedSize);
                          total += parseFloat(bundlePrice.replace('$', ''));
                        }
                        total += selectedServices.reduce((sum, id) => {
                          // Special handling for specific services from getAddonServicesByCategory
                          const categories = getAddonServicesByCategory(selectedSize);
                          let categoryService: any = null;
                          
                          // Find service in photography category
                          categoryService = categories.photography.services.find((s: any) => s.id === id);
                          if (!categoryService) {
                            // Find service in video category  
                            categoryService = (categories.video.services as any[]).find((s: any) => s.id === id);
                          }
                          if (!categoryService) {
                            // Find service in floor plans category
                            categoryService = (categories.floorPlans.services as any[]).find((s: any) => s.id === id);
                          }
                          if (!categoryService) {
                            // Find service in marketing category
                            categoryService = (categories.marketing.services as any[]).find((s: any) => s.id === id);
                          }
                          if (!categoryService) {
                            // Find service in virtual category
                            categoryService = (categories.virtual.services as any[]).find((s: any) => s.id === id);
                          }
                          
                          if (categoryService) {
                            const qty = serviceQuantities[id] || 1;
                            return sum + (categoryService.getPrice() * qty);
                          }
                          
                          // Regular service price calculation
                          const service = getServicesFromPricingData(pricingData).find(s => s.id === id);
                          if (!service) return sum;
                          const sizeIdx = sizeOptions.findIndex(opt => opt.value === selectedSize);
                          const price = Array.isArray(service.prices) ? service.prices[sizeIdx] : service.prices;
                          const qty = serviceQuantities[id] || 1;
                          let priceNum = 0;
                          if (typeof price === 'number') priceNum = price;
                          else if (typeof price === 'string') {
                            const match = price.match(/\d+(\.\d+)?/);
                            priceNum = match ? parseFloat(match[0]) : 0;
                          }
                          return sum + priceNum * qty;
                        }, 0);
                        total += Object.entries(addonQuantities).reduce((sum, [addonId, qty]) => {
                          const addon = getAddonServices(selectedSize).find(a => a.id === addonId);
                          return sum + (addon ? addon.getPrice() * qty : 0);
                        }, 0);
                        return `$${total.toFixed(2)}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add padding to bottom when sticky bar is visible to prevent content overlap */}
      {stickyBarVisible && <div className="h-[80px] sm:h-[88px]" />}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.7s linear infinite;
        }
        @keyframes pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-in;
        }
        @keyframes success-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-success-pop {
          animation: success-pop 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes error-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-error-pop {
          animation: error-pop 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .notice-tag {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.13rem 0.5rem;
          box-shadow: 0 1px 4px 0 rgba(38,47,63,0.10);
          margin-left: 0.25rem;
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
          min-width: 0;
          white-space: normal;
          letter-spacing: 0.01em;
          transition: background 0.2s, color 0.2s;
          line-height: 1.2;
          max-width: 100%;
          word-break: break-word;
        }
        .notice-tag svg {
          width: 0.95em;
          height: 0.95em;
          margin-right: 0.3em;
          flex-shrink: 0;
        }
        .notice-gold {
          background: #d4a03a;
          color: #fff;
        }
        .notice-blue {
          background: #1c4596;
          color: #fff;
        }
        @media (max-width: 640px) {
          .notice-tag {
            font-size: 0.68rem;
            padding: 0.10rem 0.35rem;
            margin-left: 0.15rem;
          }
          .notice-tag svg {
            width: 0.9em;
            height: 0.9em;
            margin-right: 0.18em;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Service toggle animations */
        .service-tab-enter {
          animation: slideInFromBottom 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .service-tab-exit {
          animation: slideOutToBottom 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        @keyframes slideInFromBottom {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
            max-height: 0;
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
            max-height: 5000px;
          }
        }
        
        @keyframes slideOutToBottom {
          from { 
            opacity: 1; 
            transform: translateY(0); 
            max-height: 5000px;
          }
          to { 
            opacity: 0; 
            transform: translateY(-20px); 
            max-height: 0;
          }
        }
        .custom-checkbox-anim {
          transition: box-shadow 0.2s, background 0.2s, border 0.2s;
        }
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(100%); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 1; 
            transform: translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: translateY(100%); 
          }
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-down {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Enhanced Date Input Styling */
        input[type="date"] {
          position: relative;
          font-family: inherit;
          color: inherit;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          position: absolute;
          right: 0;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        
        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-clear-button {
          display: none;
        }
        
        /* Firefox date input styling */
        input[type="date"]::-moz-placeholder {
          opacity: 1;
        }
        
        /* Improved date input appearance */
        input[type="date"]:focus {
          outline: none;
        }
        
        input[type="date"]:invalid {
          color: #6b7280;
        }
        
        input[type="date"]:valid {
          color: #1f2937;
        }

        /* Line clamp utilities for text truncation */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        .line-clamp-none {
          overflow: visible;
          display: block;
          -webkit-box-orient: horizontal;
          -webkit-line-clamp: none;
        }

        /* Toast notification animations */
        @keyframes bounceIn {
          0% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-20px) scale(0.9); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0px) scale(1); 
          }
        }
        
        @keyframes fadeOut {
          0% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0px) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(-10px) scale(0.95); 
          }
        }
      `}</style>
    </div>
  )
}