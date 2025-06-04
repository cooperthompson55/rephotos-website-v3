"use client"

import { useState, useEffect, useRef } from "react"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Fullscreen, Minimize } from "lucide-react"

// Portfolio properties data
const portfolioProperties = [
  {
    id: "2272-mowat-oakville",
    address: "2272 Mowat Avenue",
    town: "Oakville",
    coverImage: "/images/portfolio/2272 Mowat Avenue, Oakville/1-gallery.webp",
    totalImages: 42,
    images: Array.from({ length: 42 }, (_, i) => 
      `/images/portfolio/2272 Mowat Avenue, Oakville/${i + 1}-gallery.webp`
    ),
    slideshowVideo: "/images/portfolio/2272 Mowat Avenue, Oakville/2272-mowat-1080p.mp4"
  },
  {
    id: "824-gazley-milton",
    address: "824 Gazley Circle",
    town: "Milton",
    coverImage: "/images/portfolio/824 Gazley Circle, Milton/1-exterior-gallery.webp",
    totalImages: 45,
    images: [
      "/images/portfolio/824 Gazley Circle, Milton/1-exterior-gallery.webp",
      "/images/portfolio/824 Gazley Circle, Milton/2-exterior-gallery.webp",
      ...Array.from({ length: 43 }, (_, i) =>
        `/images/portfolio/824 Gazley Circle, Milton/${i + 3}-gallery.webp`
      )
    ],
    slideshowVideo: "/images/portfolio/824 Gazley Circle, Milton/1080p-824-gazley-circle.mp4"
  }
]

export default function PortfolioPage() {
  const [selectedProperty, setSelectedProperty] = useState<typeof portfolioProperties[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSlideshow, setShowSlideshow] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProperty]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Open gallery with optional slideshow video as first media
  const openGallery = (property: typeof portfolioProperties[0], slideshow = false) => {
    setSelectedProperty(property)
    setShowSlideshow(slideshow)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    // Exit fullscreen if active before closing gallery
    if (isFullscreen) {
      exitFullscreen();
    }
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

  // Handler to trigger fullscreen
  const handleFullscreen = () => {
    if (mainImageRef.current && !isFullscreen) {
      if (mainImageRef.current.requestFullscreen) {
        mainImageRef.current.requestFullscreen();
      } else if ((mainImageRef.current as any).webkitRequestFullscreen) {
        (mainImageRef.current as any).webkitRequestFullscreen();
      } else if ((mainImageRef.current as any).msRequestFullscreen) {
        (mainImageRef.current as any).msRequestFullscreen();
      }
    }
  };

  // Handler to exit fullscreen
  const exitFullscreen = () => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // Handler for fullscreen button click with event propagation prevention
  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFullscreen) {
      exitFullscreen();
    } else {
      handleFullscreen();
    }
  };

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
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-primary">Recent Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              View our latest work and explore complete galleries from recent real estate projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {portfolioProperties.map((property) => (
              <div
                key={property.id}
                className="group cursor-pointer"
              >
                <div onClick={() => openGallery(property)} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
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
                  <div className="p-6 flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                      {property.address}
                    </h3>
                    <p className="text-gray-600 text-lg">{property.town}</p>
                    {/* Slideshow video button */}
                    <button
                      className="text-primary underline text-sm w-fit hover:text-secondary focus:outline-none"
                      onClick={e => { e.stopPropagation(); openGallery(property, true); }}
                      type="button"
                    >
                      View Slideshow Video
                    </button>
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-6xl mx-auto flex flex-col max-h-[95vh] sm:max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 shrink-0 px-2 sm:px-0">
              <div className="text-white">
                <h3 className="text-lg sm:text-2xl font-semibold">{selectedProperty.address}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{selectedProperty.town}</p>
              </div>
              <button
                onClick={closeGallery}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>

            {/* Main Media (Video or Image) */}
            <div ref={mainImageRef} className="relative aspect-[4/3] mb-4 sm:mb-6 bg-black rounded-lg overflow-hidden grow flex items-center justify-center">
              {/* If slideshow, first media is video */}
              {showSlideshow && currentImageIndex === 0 ? (
                <video
                  src={selectedProperty.slideshowVideo}
                  controls
                  autoPlay
                  className="object-contain w-full h-full"
                  poster={selectedProperty.coverImage}
                />
              ) : (
                <Image
                  src={showSlideshow ? selectedProperty.images[currentImageIndex - (showSlideshow ? 1 : 0)] : selectedProperty.images[currentImageIndex]}
                  alt={`${selectedProperty.address} - Image ${showSlideshow ? currentImageIndex : currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              )}
              {/* Fullscreen/Exit Fullscreen Icon */}
              <button
                onClick={handleFullscreenClick}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/50 hover:bg-black/75 rounded-full p-1.5 sm:p-2 z-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4 sm:h-6 sm:w-6" /> : <Fullscreen className="h-4 w-4 sm:h-6 sm:w-6" />}
              </button>
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/75 rounded-full p-1.5 sm:p-2"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/75 rounded-full p-1.5 sm:p-2"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              {/* Image/Video Counter */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {showSlideshow ? currentImageIndex + 1 : currentImageIndex + 1} / {showSlideshow ? selectedProperty.images.length + 1 : selectedProperty.images.length}
              </div>
            </div>
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3 overflow-y-auto p-1 pb-4">
              {showSlideshow && (
                <button
                  key="video-thumb"
                  onClick={() => setCurrentImageIndex(0)}
                  className={`relative aspect-square overflow-hidden rounded transition-all duration-200 ${currentImageIndex === 0 ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-gray-400'}`}
                >
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32" height="32"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </button>
              )}
              {selectedProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(showSlideshow ? index + 1 : index)}
                  className={`relative aspect-square overflow-hidden rounded transition-all duration-200 ${
                    currentImageIndex === (showSlideshow ? index + 1 : index)
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