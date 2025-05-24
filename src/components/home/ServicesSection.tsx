"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Premium Photography",
    description: "Make a stunning first impression with the best photography in the Bay Area.",
    image: "https://ext.same-assets.com/2308376233/3572846026.jpeg",
    price: "$300 STARTING",
    link: "/real-estate-photography",
  },
  {
    title: "Cinematic Video Tours",
    description: "Awe clients and buyers with cinematic videos for your listing or project.",
    image: "https://ext.same-assets.com/2308376233/428242068.jpeg",
    price: "$400 STARTING",
    link: "/real-estate-video-tours",
  },
  {
    title: "Aerial Photos & Video",
    description: "Elevate your listing or project above the rest with incredible drone footage.",
    image: "https://ext.same-assets.com/2308376233/2681329802.jpeg",
    price: "$300 STARTING",
    link: "/aerial-photography-and-video",
  },
  {
    title: "Property Websites",
    description: "Give your listing a home on the web and a place for all of your beautiful content.",
    image: "https://ext.same-assets.com/2498839276/1384018206.jpeg",
    price: "$250 STARTING",
    link: "/property-websites",
  },
  {
    title: "Matterport 3D Virtual Tours",
    description: "Hand potential renters and buyers the keys from anywhere in the world.",
    image: "https://ext.same-assets.com/2308376233/342817273.jpeg",
    price: "$250 STARTING",
    link: "/3d-matterport",
  },
  {
    title: "Floor & Site Plans",
    description: "Help renters and buyers plan ahead with flexible measurements and styles.",
    image: "https://ext.same-assets.com/2498839276/2279170942.jpeg",
    price: "$100 STARTING",
    link: "/real-estate-floor-plans",
  },
  {
    title: "Virtual Staging & Decluttering",
    description: "Beautifully stage your listings without the heavy lifting using impressive CGI.",
    image: "https://ext.same-assets.com/2498839276/3872760327.jpeg",
    price: "$100 STARTING",
    link: "/virtual-staging",
  },
  {
    title: "Brochures & Flyers",
    description: "Leave visiting buyers with something to help them remember your listing.",
    image: "https://ext.same-assets.com/2308376233/1203559485.jpeg",
    price: "$100 STARTING",
    link: "/real-estate-brochures-and-flyers",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h6 className="text-[#B42222] uppercase tracking-wider text-sm font-medium mb-2">OUR SERVICES</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#2d4654]">Unlock every home's potential</h2>
          </div>
          <Link
            href="/services"
            className="text-[#2d4654] border border-[#2d4654] hover:bg-[#2d4654] hover:text-white transition-colors px-4 py-2 rounded text-sm"
          >
            See all
          </Link>
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
