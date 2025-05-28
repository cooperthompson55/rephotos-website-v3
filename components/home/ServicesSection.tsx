"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Photography",
    price: "$149.99 STARTING",
    image: "/images/home/s_1.jpg",
    link: "/services/photography",
  },
  {
    title: "Walkthrough Videos",
    price: "$249.99 STARTING",
    image: "/images/home/s_2.jpg",
    link: "/services/videography",
  },
  {
    title: "Social Media Videos",
    price: "$179.99 STARTING",
    image: "/images/home/s_3.jpg",
    link: "/services/videography",
  },
  {
    title: "Aerial Photos & Video",
    price: "$124.99 STARTING",
    image: "/images/home/s_4.jpg",
    link: "/services/aerial",
  },
  {
    title: "360° Virtual Tours",
    price: "$159.99 STARTING",
    image: "/images/home/s_5.jpg",
    link: "/services/virtual-tours",
  },
  {
    title: "Floor Plans & Models",
    price: "$89.99 STARTING",
    image: "/images/home/s_6.png",
    link: "/services/floor-plans",
  },
  {
    title: "Property Websites",
    price: "$99.99 STARTING",
    image: "/images/home/s_7.png",
    link: "/services/websites",
  },
  {
    title: "Virtual Staging",
    price: "$39.99 PER IMAGE",
    image: "/images/home/s_8.png",
    link: "/services/virtual-staging",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h6 className="text-[#B42222] uppercase tracking-wider text-sm font-medium mb-2">OUR SERVICES</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#262F3F]">Unlock every home's potential</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white text-2xl font-mazzard mb-1">{service.title}</h3>
                <p className="text-white text-sm font-medium">{service.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
