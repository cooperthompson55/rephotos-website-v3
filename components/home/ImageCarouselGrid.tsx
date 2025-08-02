"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useState } from "react"

interface CarouselImages {
  images: string[]
}

interface ImageCarouselGridProps {
  carousels: CarouselImages[]
}

export function ImageCarouselGrid({ carousels }: ImageCarouselGridProps) {
  const [selectedIndexes, setSelectedIndexes] = useState(carousels.map(() => 0))

  const handleDotClick = (carouselIndex: number, imageIndex: number) => {
    setSelectedIndexes(prev => {
      const newIndexes = [...prev]
      newIndexes[carouselIndex] = imageIndex
      return newIndexes
    })
  }

  return (
    <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[500px] overflow-hidden">
      {carousels.map((carousel, carouselIndex) => {
        const gridClasses = [
          "col-span-5 row-span-3", // First carousel
          "col-span-7 row-span-3", // Second carousel
          "col-span-8 row-span-3", // Third carousel
          "col-span-4 row-span-3", // Fourth carousel
        ][carouselIndex]

        return (
          <div key={carouselIndex} className={`${gridClasses} rounded-lg overflow-hidden shadow-md relative`} style={{ height: "100%" }}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
                startIndex: selectedIndexes[carouselIndex],
                dragFree: false
              }}
              className="!w-full !h-full overflow-hidden"
              style={{ height: "100%" }}
            >
              <CarouselContent className="!h-full -ml-0" style={{ height: "100%" }}>
                {carousel.images.map((image, imageIndex) => (
                  <CarouselItem key={imageIndex} className="!h-full !pl-0 !basis-full" style={{ height: "100%" }}>
                    <div className="w-full h-full" style={{ position: "relative", height: "100%" }}>
                      <img
                        src={image}
                        alt={`Property image ${imageIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          width: "100%",
                          height: "100%"
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Navigation dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {carousel.images.map((_, imageIndex) => (
                <button
                  key={imageIndex}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedIndexes[carouselIndex] === imageIndex
                      ? "bg-white"
                      : "bg-white/50"
                  }`}
                  onClick={() => handleDotClick(carouselIndex, imageIndex)}
                />
              ))}
            </div>
            {/* Copyright overlay for the third carousel */}
            {carouselIndex === 2 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white">
                <p className="font-medium">RePhotos © 2025</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}