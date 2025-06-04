"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookButton } from "@/components/ui/book-button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { loadPricingData, type SizeKey, type PricingData } from "@/lib/pricing-parser"
import Link from "next/link"

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

export function IndividualServicesSection() {
  // State for dynamic pricing data
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load pricing data on component mount
  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('/api/pricing-data')
        if (response.ok) {
          const data = await response.json()
          setPricingData(data.pricingData)
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

  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return `$${price}`;
  };

  // Show loading state while pricing data is being fetched
  if (isLoading || !pricingData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="" id="individual-services">
      <h2 className="text-3xl font-serif font-bold mb-2 text-[#262F3F]">What we Offer</h2>
      <p className="text-lg text-[#262F3F] mb-8">Professional real estate marketing services designed to showcase your property at its best. From stunning photography to cutting-edge virtual tours, we have everything you need to make your listing stand out.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Premium Photography */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
          <img src="/images/pricing/photography.jpg" alt="Premium Photography" className="absolute inset-0 w-full h-full object-cover object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Premium Photography</h3>
              <BookButton href="/services/photography" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Matterport 3D Virtual Tours */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
          <img src="/images/photobank/s_5-thumb.webp" alt="Matterport 3D Virtual Tours" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Matterport 3D Virtual Tours</h3>
              <BookButton href="/services/virtual-tours" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Slideshow Video Tour */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Slideshow Video Tour</h3>
              <BookButton href="/services/videography" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Aerial Photos & Video */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
          <img src="/images/photobank/s_4-thumb.webp" alt="Aerial Photos & Video" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Aerial Photos & Video</h3>
              <BookButton href="/services/aerial" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Property Websites */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
          <img src="/images/photobank/s_7-thumb.webp" alt="Premium Property Websites" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Premium Property Websites</h3>
              <BookButton href="/services/websites" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Floor Plans */}
        <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] flex flex-col justify-end bg-[#262F3F]">
          <img src="/images/photobank/s_6-thumb.webp" alt="Professional Floor & Site Plans" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262F3F]/80 to-transparent z-10" />
          <div className="relative z-20 p-8 flex flex-col justify-end h-full">
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-mazzard font-semibold text-white mb-4">Professional Floor Plans & Model</h3>
              <BookButton href="/services/floor-plans" size="lg" className="bg-white text-[#262F3F] font-mazzard font-semibold hover:bg-gray-100">Learn more</BookButton>
            </div>
          </div>
        </div>

        {/* Virtual Twilight Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
          <div>
            <BeforeAfterSlider
              beforeSrc="/images/photobank/after-gallery.webp"
              afterSrc="/images/photobank/before-gallery.webp"
              alt="Virtual Twilight"
            />
            <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center mt-2">Virtual Twilight</h3>
            <p className="text-sm text-[#262F3F] font-mazzard text-center mb-4">Transform day to twilight</p>
          </div>
          <BookButton href="/services/virtual-services" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Learn more</BookButton>
        </div>

        {/* Virtual Staging Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
          <div>
            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '3/2' }}>
              <img
                src="/images/home/s_8.png"
                alt="Virtual Staging"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center mt-2">Virtual Staging</h3>
            <p className="text-sm text-[#262F3F] font-mazzard text-center mb-4">Furnish empty spaces digitally</p>
          </div>
          <BookButton href="/services/virtual-services" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Learn more</BookButton>
        </div>

        {/* Virtual Declutter Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[320px] border border-gray-200 overflow-hidden">
          <div>
            <BeforeAfterSlider
              beforeSrc="/images/photobank/declutter-after-gallery.webp"
              afterSrc="/images/photobank/DSC_7594-gallery.webp"
              alt="Virtual Declutter"
            />
            <h3 className="text-xl font-mazzard font-semibold text-[#262F3F] mb-2 text-center mt-2">Virtual Declutter</h3>
            <p className="text-sm text-[#262F3F] font-mazzard text-center mb-4">Remove personal items</p>
          </div>
          <BookButton href="/services/virtual-services" size="lg" className="mx-auto block bg-[#262F3F] text-white font-mazzard font-semibold hover:bg-[#2853AE] active:bg-[#2853AE] mt-auto">Learn more</BookButton>
        </div>
      </div>
    </div>
  )
} 