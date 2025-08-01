"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Expanded gallery with 8 images total
const galleryImages = [
  {
    src: "/images/photobank/48caseootes/1-gallery.webp",
    alt: "48 Case Ootes Drive - Image 1",
  },
  {
    src: "/images/photobank/DSC_8119-gallery.webp",
    alt: "Luxury Real Estate Photography - Interior Shot",
  },
  {
    src: "/images/photobank/48caseootes/3-gallery.webp",
    alt: "48 Case Ootes Drive - Image 3",
  },
  {
    src: "/images/photobank/48caseootes/4-gallery.webp",
    alt: "48 Case Ootes Drive - Image 4",
  },
  {
    src: "/images/photobank/DSC_8071-gallery.webp",
    alt: "Luxury Real Estate Photography - Interior View",
  },
  {
    src: "/images/photobank/48caseootes/2-gallery.webp",
    alt: "48 Case Ootes Drive - Image 6",
  },
]

export function GalleryDisplay() {
  const [visibleImages, setVisibleImages] = useState(galleryImages)

  useEffect(() => {
    // Show all 6 images
    setVisibleImages(galleryImages)
  }, [])

  return (
    <section className="hidden md:block py-10 relative overflow-visible w-full bg-[#F8F5F0] px-4 md:px-8 xl:px-20">
      {/* Background shape */}
      <div className="absolute inset-0 bg-[#F8F5F0] w-full h-full"></div>

      <div className="relative z-10 w-full">
        <div className="w-full overflow-visible px-0 md:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-8 pb-8 mx-auto max-w-7xl">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className="relative transition-all duration-500 hover:scale-110 hover:z-50 min-w-0"
                style={{ zIndex: 10 + index }}
              >
                <div
                  className="aspect-[3/2] w-full relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image 
                    src={image.src || "/placeholder.svg"} 
                    alt={image.alt} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
