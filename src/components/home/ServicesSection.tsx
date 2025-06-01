"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "HDR Photography",
    description: "Make a stunning first impression with the best photography in the Bay Area.",
    image: "https://ext.same-assets.com/2308376233/3572846026.jpeg",
    price: "$189.99",
    link: "/real-estate-photography",
  },
  {
    title: "360° Virtual Tour",
    description: "Hand potential renters and buyers the keys from anywhere in the world.",
    image: "https://ext.same-assets.com/2308376233/342817273.jpeg",
    price: "$199.99",
    link: "/3d-matterport",
  },
  {
    title: "Property Highlights Video",
    description: "Showcase your property's best features with a dynamic highlights video.",
    image: "https://ext.same-assets.com/2308376233/428242068.jpeg",
    price: "$319.99",
    link: "/real-estate-video-tours",
  },
  {
    title: "Social Media Reel",
    description: "Engage your audience with a short, impactful video for social media.",
    image: "https://ext.same-assets.com/2308376233/428242068.jpeg",
    price: "$229.99",
    link: "/real-estate-video-tours",
  },
  {
    title: "Drone Aerial Photos",
    description: "Elevate your listing or project above the rest with incredible drone photography.",
    image: "https://ext.same-assets.com/2308376233/2681329802.jpeg",
    price: "$159.99",
    link: "/aerial-photography-and-video",
  },
  {
    title: "Drone Aerial Video",
    description: "Showcase your property with stunning aerial video footage.",
    image: "https://ext.same-assets.com/2308376233/2681329802.jpeg",
    price: "$159.99",
    link: "/aerial-photography-and-video",
  },
  {
    title: "2D Floor Plan",
    description: "Help renters and buyers plan ahead with flexible measurements and styles.",
    image: "https://ext.same-assets.com/2498839276/2279170942.jpeg",
    price: "$119.99",
    link: "/real-estate-floor-plans",
  },
  {
    title: "3D House Model",
    description: "Interactive 3D models to help buyers visualize the space.",
    image: "https://ext.same-assets.com/2308376233/342817273.jpeg",
    price: "$189.99",
    link: "/3d-matterport",
  },
  {
    title: "Property Website",
    description: "Give your listing a home on the web and a place for all of your beautiful content.",
    image: "https://ext.same-assets.com/2498839276/1384018206.jpeg",
    price: "$129.99",
    link: "/property-websites",
  },
  {
    title: "Custom Domain Name",
    description: "Make your property website memorable with a custom domain.",
    image: "https://ext.same-assets.com/2498839276/1384018206.jpeg",
    price: "$39.99",
    link: "/property-websites",
  },
  {
    title: "Virtual Staging",
    description: "Beautifully stage your listings without the heavy lifting using impressive CGI.",
    image: "https://ext.same-assets.com/2498839276/3872760327.jpeg",
    price: "$39.99/image",
    link: "/virtual-services",
  },
  {
    title: "Virtual Twilight",
    description: "Transform your property photos with stunning twilight effects.",
    image: "https://ext.same-assets.com/2498839276/3872760327.jpeg",
    price: "$49.99/image",
    link: "/virtual-services",
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
