"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "HDR Photography",
    price: "$189.99",
    image: "/images/home/s_1.webp",
    link: "/services/photography",
  },
  {
    title: "Property Highlights Video",
    price: "$319.99",
    image: "/images/home/s_2.webp",
    link: "/services/videography",
  },
  {
    title: "Social Media Reel",
    price: "$229.99",
    image: "/images/home/s_3.webp",
    link: "/services/videography",
  },
  {
    title: "Drone Aerial Photos",
    price: "$159.99",
    image: "/images/home/s_4.webp",
    link: "/services/aerial",
  },
  {
    title: "360° Virtual Tour",
    price: "$199.99",
    image: "/images/home/s_5.webp",
    link: "/services/virtual-tours",
  },
  {
    title: "2D Floor Plan",
    price: "$119.99",
    image: "/images/home/s_6.png",
    link: "/services/floor-plans",
  },
  {
    title: "Property Website",
    price: "$129.99",
    image: "/images/home/s_7.png",
    link: "/services/websites",
  },
  {
    title: "Virtual Staging",
    price: "$39.99/image",
    image: "/images/home/s_8.png",
    link: "/services/virtual-services",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container-wide">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h6 className="text-[#B42222] uppercase tracking-wider text-sm font-medium mb-2">OUR SERVICES</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#262F3F]">Unlock every home's potential</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group block relative overflow-hidden rounded-lg h-64 shadow-md"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none" style={{background: 'linear-gradient(to top, rgba(38,47,63,0.85) 60%, rgba(38,47,63,0.25) 100%, rgba(38,47,63,0) 100%)'}}></div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                <h3
                  className="text-white text-xl sm:text-2xl font-mazzard mb-1 text-center md:text-left break-words max-w-full"
                  style={{ wordBreak: 'break-word' }}
                >
                  {service.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2 text-center md:text-left">
                  <p className="text-white text-base font-semibold mb-0 max-w-full">{service.price}</p>
                  <span className="text-xs uppercase text-white/80 tracking-wider md:ml-2 mt-1 md:mt-0">Starting</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
