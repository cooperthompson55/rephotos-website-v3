"use client"

import { useState, useEffect, useRef } from "react"
import { GalleryDisplay } from "@/components/home/GalleryDisplay"
import { CaseStudySection } from "@/components/home/CaseStudySection"
import { CTASection } from "@/components/home/CTASection"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Fullscreen, Minimize, Grid3X3, ChevronUp, ChevronDown } from "lucide-react"

// Portfolio properties data
const portfolioProperties = [
  {
    id: "2272-mowat-oakville",
    address: "2272 Mowat Avenue",
    town: "Oakville",
    coverImage: "/images/portfolio/2272%20Mowat%20Avenue,%20Oakville/1-gallery.webp",
    totalImages: 42,
    images: Array.from({ length: 42 }, (_, i) => 
      `/images/portfolio/2272%20Mowat%20Avenue,%20Oakville/${i + 1}-gallery.webp`
    ),
    slideshowVideo: "/images/portfolio/2272%20Mowat%20Avenue,%20Oakville/2272-mowat-1080p.mp4"
  },
  {
    id: "824-gazley-milton",
    address: "824 Gazley Circle",
    town: "Milton",
    coverImage: "/images/portfolio/824%20Gazley%20Circle,%20Milton/1-exterior-gallery.webp",
    totalImages: 45,
    images: [
      "/images/portfolio/824%20Gazley%20Circle,%20Milton/1-exterior-gallery.webp",
      "/images/portfolio/824%20Gazley%20Circle,%20Milton/2-exterior-gallery.webp",
      ...Array.from({ length: 43 }, (_, i) =>
        `/images/portfolio/824%20Gazley%20Circle,%20Milton/${i + 3}-gallery.webp`
      )
    ],
    slideshowVideo: "/images/portfolio/824%20Gazley%20Circle,%20Milton/1080p-824-gazley-circle.mp4"
  }
]

export default function PortfolioPage() {
  const [selectedProperty, setSelectedProperty] = useState<typeof portfolioProperties[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false) // Mobile-specific fullscreen state
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false); // Thumbnails hidden by default on mobile
  const [videoError, setVideoError] = useState(false); // Track video loading errors
  const [isMobile, setIsMobile] = useState(false); // Track if on mobile device
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Track if video is playing
  const mainImageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      setIsFullscreen(Boolean(document.fullscreenElement || (document as any).webkitFullscreenElement));
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

  // Debug slideshow activation
  useEffect(() => {
    if (showSlideshow && currentImageIndex === 0 && selectedProperty) {
      console.log('=== SLIDESHOW ACTIVATED ===');
      console.log('Property:', selectedProperty.address);
      console.log('Video URL:', selectedProperty.slideshowVideo);
      console.log('Is Mobile:', isMobile);
      
      // Test URL accessibility
      fetch(selectedProperty.slideshowVideo, { method: 'HEAD' })
        .then(response => {
          console.log('URL Test Result:', response.status, response.statusText);
          if (response.ok) {
            console.log('✅ Video URL is accessible');
          } else {
            console.error('❌ Video URL returned error:', response.status);
          }
        })
        .catch(error => {
          console.error('❌ Failed to test video URL:', error);
        });
      
      // Reset video error state
      setVideoError(false);
      
      // Force video reload if needed
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Forcing video load...');
          videoRef.current.load();
        }
      }, 100);
    }
  }, [showSlideshow, currentImageIndex, selectedProperty, isMobile]);

  // Open gallery with optional slideshow video as first media
  const openGallery = (property: typeof portfolioProperties[0], slideshow = false) => {
    setSelectedProperty(property)
    setShowSlideshow(slideshow)
    setCurrentImageIndex(0)
    setVideoError(false) // Reset video error state when opening gallery
    setIsVideoPlaying(false) // Reset video playing state when opening gallery
  }

  const closeGallery = () => {
    // Exit fullscreen if active before closing gallery
    if (isFullscreen) {
      exitFullscreen();
    }
    // Exit mobile fullscreen mode
    if (isMobileFullscreen) {
      setIsMobileFullscreen(false);
    }
    setSelectedProperty(null)
    setCurrentImageIndex(0)
    setVideoError(false) // Reset video error state when closing gallery
    setIsVideoPlaying(false) // Reset video playing state when closing gallery
  }

  const nextImage = () => {
    if (selectedProperty) {
      const newIndex = currentImageIndex === selectedProperty.images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      const newIndex = currentImageIndex === 0 ? selectedProperty.images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
    }
  }

  // Handler to trigger fullscreen - Enhanced for mobile with better fallbacks
  const handleFullscreen = async () => {
    try {
      // On mobile, use our custom fullscreen mode instead of the unreliable Fullscreen API
      if (isMobile) {
        setIsMobileFullscreen(true);
        // Hide mobile browser UI by scrolling
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
        // Additional mobile browser UI hiding techniques
        setTimeout(() => {
          window.scrollTo(0, 1);
          setTimeout(() => window.scrollTo(0, 0), 100);
        }, 100);
        return;
      }

      // Desktop fullscreen using Fullscreen API
      const targetElement = mainImageRef.current;
      
      if (targetElement && !isFullscreen) {
        // Try different fullscreen methods for better browser compatibility
        if (targetElement.requestFullscreen) {
          await targetElement.requestFullscreen();
        } else if ((targetElement as any).webkitRequestFullscreen) {
          // Safari/webkit browsers
          await (targetElement as any).webkitRequestFullscreen();
        } else if ((targetElement as any).mozRequestFullScreen) {
          // Firefox
          await (targetElement as any).mozRequestFullScreen();
        } else if ((targetElement as any).msRequestFullscreen) {
          // IE/Edge
          await (targetElement as any).msRequestFullscreen();
        } else {
          console.warn('Fullscreen API not supported on this device/browser');
          // Fallback to mobile-style fullscreen even on desktop
          setIsMobileFullscreen(true);
        }
      }
    } catch (error) {
      console.warn('Fullscreen request failed:', error);
      // Fallback to mobile-style fullscreen
      setIsMobileFullscreen(true);
    }
  };

  // Handler to exit fullscreen - Enhanced for mobile
  const exitFullscreen = async () => {
    try {
      // Exit mobile fullscreen mode
      if (isMobileFullscreen) {
        setIsMobileFullscreen(false);
        return;
      }

      // Exit desktop fullscreen
      if (isFullscreen) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).webkitCancelFullScreen) {
          // iOS Safari
          await (document as any).webkitCancelFullScreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn('Exit fullscreen failed:', error);
      // Force exit mobile fullscreen as fallback
      setIsMobileFullscreen(false);
    }
  };

  // Handler for fullscreen button click - Enhanced for mobile
  const handleFullscreenClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Check if we're in any kind of fullscreen mode
    const isInFullscreen = isFullscreen || isMobileFullscreen;
    
    if (isInFullscreen) {
      await exitFullscreen();
    } else {
      await handleFullscreen();
    }
  };

  // Handler for touch/swipe navigation
  const handleTouchStart = useRef({ x: 0, y: 0 });
  const handleTouchEnd = useRef({ x: 0, y: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleTouchEnd.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = handleTouchStart.current.x - handleTouchEnd.current.x;
    const deltaY = handleTouchStart.current.y - handleTouchEnd.current.y;

    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextImage(); // Swipe left to go to next image
      } else {
        prevImage(); // Swipe right to go to previous image
      }
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

      {/* Image Gallery Modal - Mobile First Design */}
      {selectedProperty && (
        <div 
          ref={galleryRef}
          className={`fixed inset-0 bg-black z-50 flex flex-col overflow-hidden ${
            isMobileFullscreen ? 'h-screen w-screen' : ''
          }`}
          style={isMobileFullscreen ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999
          } : {}}
        >
          {/* Mobile Header - Minimal and Clean */}
          <div className={`flex justify-between items-center p-4 md:p-6 shrink-0 bg-black/80 backdrop-blur-sm ${
            isMobileFullscreen ? 'hidden' : ''
          }`}>
            <div className="text-white min-w-0 flex-1">
              <h3 className="text-base md:text-xl font-semibold truncate">{selectedProperty.address}</h3>
              <p className="text-gray-300 text-sm md:text-base">{selectedProperty.town}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              {/* Thumbnail toggle button for mobile */}
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className="md:hidden text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50"
                title="Toggle thumbnails"
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={closeGallery}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>

          {/* Main Image Container - Takes Full Available Space on Mobile */}
          <div 
            ref={mainImageRef} 
            className="relative flex-1 bg-black flex items-center justify-center overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Main Media (Video or Image) */}
            {showSlideshow && currentImageIndex === 0 ? (
              !videoError ? (
                <div className="relative w-full h-full">
                  {/* Simple Video Element */}
                  <video
                    key={`${selectedProperty.id}-slideshow`}
                    ref={videoRef}
                    src={selectedProperty.slideshowVideo}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    className="w-full h-full object-contain"
                    poster={selectedProperty.coverImage}
                    onLoadStart={() => {
                      console.log('VIDEO: Load started');
                    }}
                    onLoadedMetadata={() => {
                      console.log('VIDEO: Metadata loaded');
                      setVideoError(false);
                    }}
                    onLoadedData={() => {
                      console.log('VIDEO: Data loaded successfully');
                      setVideoError(false);
                    }}
                    onCanPlay={() => {
                      console.log('VIDEO: Can play');
                      setVideoError(false);
                    }}
                    onCanPlayThrough={() => {
                      console.log('VIDEO: Can play through');
                      setVideoError(false);
                    }}
                    onPlay={() => {
                      console.log('VIDEO: Started playing');
                      setIsVideoPlaying(true);
                    }}
                    onPause={() => {
                      console.log('VIDEO: Paused');
                      setIsVideoPlaying(false);
                    }}
                    onEnded={() => {
                      console.log('VIDEO: Ended');
                      setIsVideoPlaying(false);
                    }}
                    onError={(e) => {
                      console.error('VIDEO: Failed to load:', selectedProperty.slideshowVideo);
                      console.error('VIDEO: Error details:', e.currentTarget.error);
                      console.error('VIDEO: Error code:', e.currentTarget.error?.code);
                      console.error('VIDEO: Error message:', e.currentTarget.error?.message);
                      setVideoError(true);
                      setIsVideoPlaying(false);
                    }}
                    onAbort={() => {
                      console.log('VIDEO: Load aborted');
                    }}
                    onStalled={() => {
                      console.warn('VIDEO: Loading stalled');
                    }}
                    onSuspend={() => {
                      console.log('VIDEO: Loading suspended');
                    }}
                    onWaiting={() => {
                      console.log('VIDEO: Waiting for data');
                    }}
                  />
                  
                  {/* Large White Play Button Overlay - Only shown when video is not playing */}
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        className="pointer-events-auto bg-white/95 hover:bg-white text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50 flex items-center justify-center"
                        onClick={() => {
                          console.log('Play button clicked');
                          if (videoRef.current) {
                            const video = videoRef.current;
                            video.play().then(() => {
                              console.log('Video started playing successfully');
                              setIsVideoPlaying(true);
                            }).catch(error => {
                              console.error('Failed to play video:', error);
                              setVideoError(true);
                            });
                          }
                        }}
                        aria-label="Play slideshow video"
                        style={{ 
                          width: isMobile ? '100px' : '140px',
                          height: isMobile ? '100px' : '140px'
                        }}
                      >
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-8 h-8 md:w-12 md:h-12 ml-1"
                        >
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Fallback: Show error message with retry
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
                  <Image
                    src={selectedProperty.coverImage}
                    alt={`${selectedProperty.address} - Video unavailable`}
                    fill
                    className="object-contain opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">Video Unavailable</p>
                      <p className="text-sm text-gray-300 mb-4">
                        The slideshow video could not be loaded. This may be due to a slow connection, device limitations, or browser restrictions. Please try again or view on desktop for best experience.
                      </p>
                      <button
                        onClick={() => {
                          console.log('Retrying video load...');
                          console.log('Video URL:', selectedProperty.slideshowVideo);
                          setVideoError(false);
                          // Try to reload the video
                          if (videoRef.current) {
                            videoRef.current.load();
                          }
                        }}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                        aria-label="Try loading the video again"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <Image
                src={showSlideshow ? selectedProperty.images[currentImageIndex - 1] : selectedProperty.images[currentImageIndex]}
                alt={`${selectedProperty.address} - Image ${showSlideshow ? currentImageIndex : currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            )}

            {/* Fullscreen Button - Mobile Optimized */}
            <button
              onClick={handleFullscreenClick}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-white bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
              title={(isFullscreen || isMobileFullscreen) ? "Exit Fullscreen" : "Fullscreen"}
            >
              {(isFullscreen || isMobileFullscreen) ? <Minimize className="h-4 w-4 md:h-5 md:w-5" /> : <Fullscreen className="h-4 w-4 md:h-5 md:w-5" />}
            </button>

            {/* Navigation Arrows - Enhanced for Mobile */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 md:p-4 touch-manipulation"
              style={{ minHeight: '48px', minWidth: '48px' }} // Touch target size
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 md:p-4 touch-manipulation"
              style={{ minHeight: '48px', minWidth: '48px' }} // Touch target size
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Image Counter - Mobile Optimized */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm md:text-base font-medium">
              {showSlideshow ? currentImageIndex + 1 : currentImageIndex + 1} / {showSlideshow ? selectedProperty.images.length + 1 : selectedProperty.images.length}
            </div>

            {/* Swipe Indicator - Only on mobile */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-xs md:hidden opacity-50">
              Swipe to navigate
            </div>
          </div>

          {/* Thumbnail Section - Collapsible on Mobile */}
          <div className={`
            transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-sm
            ${isMobileFullscreen ? 'hidden' : ''}
            ${showThumbnails 
              ? 'h-32 md:h-40 opacity-100' 
              : 'h-0 md:h-32 md:opacity-100 opacity-0 md:block'
            }
            ${showThumbnails ? 'border-t border-gray-700' : ''}
          `}>
            {/* Thumbnail Toggle for Mobile */}
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="md:hidden w-full py-2 text-white hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              {showThumbnails ? (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm">Hide Thumbnails</span>
                </>
              ) : (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-sm">Show Thumbnails</span>
                </>
              )}
            </button>

            {/* Thumbnail Grid */}
            <div className={`
              ${showThumbnails ? 'block' : 'hidden md:block'}
              p-3 md:p-4 overflow-x-auto overflow-y-hidden
            `}>
              <div className="flex md:grid md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16 gap-2 md:gap-3 min-w-max md:min-w-0">
                {showSlideshow && (
                  <button
                    key="video-thumb"
                    onClick={() => {
                      setCurrentImageIndex(0);
                      setVideoError(false); // Reset video error when clicking video thumbnail
                    }}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-auto md:h-auto md:aspect-square overflow-hidden rounded transition-all duration-200 ${
                      currentImageIndex === 0 ? 'ring-2 ring-white' : 'hover:ring-1 hover:ring-gray-400'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                )}
                {selectedProperty.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(showSlideshow ? index + 1 : index)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-auto md:h-auto md:aspect-square overflow-hidden rounded transition-all duration-200 ${
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
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 