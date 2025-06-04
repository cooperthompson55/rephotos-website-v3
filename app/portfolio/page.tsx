"use client"

import { useState } from "react"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Portfolio properties data
const portfolioProperties = [
  {
    id: "2272-mowat-oakville",
    address: "2272 Mowat Avenue",
    town: "Oakville",
    coverImage: "/images/portfolio/2272 Mowat Avenue, Oakville/1-gallery.webp",
    totalImages: 41,
    images: Array.from({ length: 41 }, (_, i) => 
      `/images/portfolio/2272 Mowat Avenue, Oakville/${i + 1}-gallery.webp`
    )
  }
  // Add more properties here as they become available
]

export default function PortfolioPage() {
  const [selectedProperty, setSelectedProperty] = useState<typeof portfolioProperties[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openGallery = (property: typeof portfolioProperties[0]) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProperty(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header-texture.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90" />
        </div>
        <div className="container relative z-10 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white text-center max-w-4xl leading-tight">
            Portfolio
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-center">
            Explore our recent photography, video, and marketing projects. See how we help agents stand out and sell faster.
          </p>
        </div>
      </section>

      {/* Portfolio Properties Grid */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-primary">Featured Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore complete property galleries showcasing our photography and marketing work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {portfolioProperties.map((property) => (
              <div
                key={property.id}
                className="group cursor-pointer"
                onClick={() => openGallery(property)}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={property.coverImage}
                      alt={`${property.address}, ${property.town}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-sm font-medium">View Gallery ({property.totalImages} photos)</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                      {property.address}
                    </h3>
                    <p className="text-gray-600 text-lg">{property.town}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <CaseStudySection />

      {/* Gallery Section */}
      <GalleryDisplay />

      {/* CTA Section */}
      <CTASection />

      {/* Image Gallery Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-white">
                <h3 className="text-2xl font-semibold">{selectedProperty.address}</h3>
                <p className="text-gray-300">{selectedProperty.town}</p>
              </div>
              <button
                onClick={closeGallery}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[4/3] mb-6 bg-black rounded-lg overflow-hidden">
              <Image
                src={selectedProperty.images[currentImageIndex]}
                alt={`${selectedProperty.address} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/75 rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/75 rounded-full p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-32 overflow-y-auto">
              {selectedProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white'
                      : 'hover:ring-1 hover:ring-gray-400'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 