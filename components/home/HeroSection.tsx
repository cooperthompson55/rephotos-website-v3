"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

const backgroundImages = [
  "/images/photobank/background/fs2-2.jpg",
  "/images/photobank/background/4.jpg", 
  "/images/photobank/background/colour-after.jpg",
  "/images/photobank/background/fs5.jpg"
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      // After transition completes, update indices
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex)
        // Use functional update to avoid stale closures and ensure correct wrap-around
        setNextImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
        setIsTransitioning(false)
      }, 2000) // 2-second transition duration
      
    }, 10000) // Change image every 10 seconds (8-13 second range, using 10)

    return () => clearInterval(interval)
  }, [nextImageIndex])

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      const headerOffset = 0 // Adjust this if you have a fixed header
      const elementPosition = servicesSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => {
          // Current image should always be visible
          const isCurrentImage = index === currentImageIndex
          // Next image should fade in during transition
          const isNextImage = index === nextImageIndex && isTransitioning
          // Determine opacity
          const isVisible = isCurrentImage || isNextImage
          
          return (
            <Image
              key={src}
              src={src}
              alt={`Gallery Background ${index + 1}`}
              fill
              className={`object-cover transition-opacity ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                // Ensure stacking order: next image on top during transition, then current image above others
                zIndex: isNextImage ? 2 : isCurrentImage ? 1 : 0,
                transitionDuration: '2000ms',
                pointerEvents: 'none',
                willChange: 'opacity'
              }}
              priority={index === 0}
              unoptimized
              quality={100}
            />
          )
        })}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-8">
          Bring your listing
          <br />
          <span className="italic">into focus</span>
        </h1>

        <div className="mt-10">
          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center rounded-md text-white bg-transparent hover:bg-white hover:text-black border-2 border-white px-3 py-1.5 text-sm md:px-6 md:py-2 md:text-base font-medium tracking-wide transition-all duration-300"
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  )
}
