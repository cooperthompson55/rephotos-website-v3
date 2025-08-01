"use client"

import { useState, useCallback, TouchEvent } from 'react'

interface CarouselImage {
  images: string[]
}

interface ImageCarouselProps {
  images: CarouselImage[]
  aspectRatio?: string
  objectPosition?: string
}

export function ImageCarousel({ images, aspectRatio = '16/9', objectPosition = 'center' }: ImageCarouselProps) {
  const [currentImageSet, setCurrentImageSet] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const currentImages = images[currentImageSet].images

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % currentImages.length)
  }, [currentImages.length])

  const handlePrevious = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }, [currentImages.length])

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full" style={{ aspectRatio }}>
        <button
          onClick={handleNext}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full focus:outline-none"
        >
          <img
            src={currentImages[currentImage]}
            alt={`Carousel image ${currentImageSet + 1}`}
            className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
            style={{ objectPosition }}
          />
        </button>
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {currentImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentImage === index ? 'bg-white' : 'bg-white/50'
              } hover:bg-white/90`}
            />
          ))}
        </div>
        {/* Dark overlay for better dot visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    </div>
  )
}