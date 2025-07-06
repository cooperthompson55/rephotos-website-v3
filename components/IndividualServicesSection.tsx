"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Premium Photography",
    description: "Make a stunning first impression with the best photography in the Bay Area.",
    image: "/images/home/s_1.webp",
    link: "/services/photography",
  },
  {
    title: "Matterport 3D Virtual Tours",
    description: "Hand potential renters and buyers the keys from anywhere in the world.",
    image: "/images/home/s_5.webp",
    link: "/services/virtual-tours",
  },
  {
    title: "Slideshow Video Tour",
    description: "Cinematic slideshow of your property's best features.",
    image: "/images/home/s_2.webp",
    link: "/services/videography",
  },
  {
    title: "Aerial Photos & Video",
    description: "Elevate your listing or project above the rest with incredible drone photography.",
    image: "/images/home/s_4.webp",
    link: "/services/aerial",
  },
  {
    title: "Premium Property Websites",
    description: "Give your listing a home on the web and a place for all of your beautiful content.",
    image: "/images/home/s_7.png",
    link: "/services/websites",
  },
  {
    title: "Floor Plans & Models",
    description: "Help renters and buyers plan ahead with flexible measurements and styles.",
    image: "/images/home/s_6.png",
    link: "/services/floor-plans",
  },
  {
    title: "Virtual Twilight",
    description: "Transform daytime photos into stunning twilight scenes.",
    image: "/images/photobank/colour-after-thumb.webp",
    link: "/services/virtual-services",
  },
  {
    title: "Virtual Staging",
    description: "Beautifully stage your listings without the heavy lifting using impressive CGI.",
    image: "/images/book-now/addons/stage2.jpg",
    link: "/services/virtual-services",
  },
  {
    title: "Virtual Declutter",
    description: "Remove clutter and personal items from photos digitally.",
    image: "/images/photobank/DSC_7939-thumb.webp",
    link: "/services/virtual-services",
  },
]

export function IndividualServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h6 className="text-[#B42222] uppercase tracking-wider text-sm font-medium mb-2">OUR SERVICES</h6>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#262F3F] mb-4">What we Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional real estate marketing services designed to showcase your property at its best. From stunning photography to cutting-edge virtual tours, we have everything you need to market your listing stand out.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group block relative overflow-hidden rounded-lg h-64 shadow-md hover:shadow-xl transition-all duration-300"
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
              <div className="absolute inset-0 z-10 pointer-events-none" 
                   style={{background: 'linear-gradient(to top, rgba(38,47,63,0.85) 60%, rgba(38,47,63,0.25) 100%, rgba(38,47,63,0) 100%)'}}
              ></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#f5efe0] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="inline-flex items-center text-sm font-semibold text-[#1c4596] bg-white hover:bg-gray-100 px-4 py-2 rounded-md transition-colors border border-gray-200">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 