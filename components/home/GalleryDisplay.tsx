"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Reduced number of images
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    alt: "Modern living room with large windows",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    alt: "Bright kitchen with island",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    alt: "Cozy bedroom interior",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    alt: "Modern bathroom design",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5",
    alt: "Modern home exterior",
  },
]

export function GalleryDisplay() {
  const [visibleImages, setVisibleImages] = useState(galleryImages)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleImages(galleryImages.slice(0, 2))
      } else if (width < 768) {
        setVisibleImages(galleryImages.slice(0, 3))
      } else if (width < 1024) {
        setVisibleImages(galleryImages.slice(0, 4))
      } else {
        setVisibleImages(galleryImages)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="hidden md:block py-10 relative overflow-hidden w-full bg-[#F8F5F0]">
      {/* Background shape */}
      <div className="absolute inset-0 bg-[#F8F5F0] w-full h-full"></div>

      <div className="relative z-10 w-full">
        <div className="w-full overflow-hidden px-4 md:px-8">
          <div className="flex justify-center items-center w-full gap-4 md:gap-6 lg:gap-8 pt-8 pb-8">
            {visibleImages.map((image, index) => (
              <div
                key={index}
                className={`relative ${index % 2 === 0 ? "mt-8" : "mt-0"} 
             transition-all duration-500 hover:scale-110 hover:z-50 flex-1 min-w-0`}
                style={{ zIndex: 10 + index }}
              >
                <div
                  className="aspect-[3/2] w-full
             relative rounded-2xl overflow-hidden shadow-lg"
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
