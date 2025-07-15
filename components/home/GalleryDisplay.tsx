"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Expanded gallery with 8 images total
const galleryImages = [
  // New images from 48caseootes folder (replaced the preview folder images)
  {
    src: "/images/photobank/48caseootes/1-gallery.webp",
    alt: "48 Case Ootes Drive - Image 1",
  },
  {
    src: "/images/photobank/48caseootes/2-gallery.webp",
    alt: "48 Case Ootes Drive - Image 2",
  },
  {
    src: "/images/photobank/48caseootes/3-gallery.webp",
    alt: "48 Case Ootes Drive - Image 3",
  },
  {
    src: "/images/photobank/48caseootes/4-gallery.webp",
    alt: "48 Case Ootes Drive - Image 4",
  },
  // Existing images
  {
    src: "/images/home/row_1.webp",
    alt: "Gallery image 1",
  },
  {
    src: "/images/home/row_2.webp",
    alt: "Gallery image 2",
  },
  {
    src: "/images/home/row_3.webp",
    alt: "Gallery image 3",
  },
  {
    src: "/images/home/row_4.webp",
    alt: "Gallery image 4",
  },
]

export function GalleryDisplay() {
  const [visibleImages, setVisibleImages] = useState(galleryImages)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleImages(galleryImages.slice(0, 4)) // Show 4 images on mobile
      } else if (width < 1024) {
        setVisibleImages(galleryImages.slice(0, 6)) // Show 6 images on tablet
      } else {
        setVisibleImages(galleryImages) // Show all 8 images on desktop
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="hidden md:block py-10 relative overflow-visible w-full bg-[#F8F5F0] px-0 md:px-8 xl:px-20">
      {/* Background shape */}
      <div className="absolute inset-0 bg-[#F8F5F0] w-full h-full"></div>

      <div className="relative z-10 w-full">
        <div className="w-full overflow-visible px-0 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 pb-8 mx-auto max-w-7xl">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`relative ${index % 2 === 0 ? "mt-8" : "mt-0"} transition-all duration-500 hover:scale-110 hover:z-50 min-w-0`}
                style={{ zIndex: 10 + index }}
              >
                <div
                  className="aspect-[3/2] w-full h-[200px] md:h-[260px] lg:h-[320px] relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
