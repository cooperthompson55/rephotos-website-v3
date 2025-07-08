"use client"

import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Premium Photography",
    description: "Professional HDR photography that makes listings stand out on MLS and social media",
    image: "/images/home/s_1.webp",
    link: "/services/photography",
  },
  {
    title: "Matterport 3D Virtual Tours",
    description: "Immersive virtual tours that let buyers explore properties 24/7 from anywhere",
    image: "/images/home/s_5.webp",
    link: "/services/virtual-tours",
  },
  {
    title: "Slideshow Video Tour",
    description: "Cinematic slideshow videos set to music that showcase your property's best features",
    image: "/images/home/s_2.webp",
    link: "/services/videography",
  },
  {
    title: "Aerial Photos & Video",
    description: "Stunning aerial perspectives that showcase property boundaries and neighborhood context",
    image: "/images/home/s_4.webp",
    link: "/services/aerial",
  },
  {
    title: "Premium Property Websites",
    description: "Custom property websites that capture leads and showcase listings professionally",
    image: "/images/home/s_7.png",
    link: "/services/websites",
  },
  {
    title: "Professional Floor Plans",
    description: "Accurate 2D and 3D floor plans that help buyers understand space and layout",
    image: "/images/home/s_6.png",
    link: "/services/floor-plans",
  },
  {
    title: "Virtual Twilight",
    description: "Transform daytime photos into stunning twilight scenes with dramatic lighting",
    image: "/images/photobank/colour-after-thumb.webp",
    link: "/services/virtual-services",
  },
  {
    title: "Virtual Staging",
    description: "Digitally furnish empty spaces to help buyers visualize the home's potential",
    image: "/images/book-now/addons/stage2.jpg",
    link: "/services/virtual-services",
  },
  {
    title: "Virtual Declutter",
    description: "Remove personal items and clutter to create clean, appealing spaces buyers love",
    image: "/images/photobank/DSC_7939-thumb.webp",
    link: "/services/virtual-services",
  },
]

export function IndividualServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-12">
          <h6 className="text-[#B42222] uppercase tracking-wider text-sm font-medium mb-2">OUR SERVICES</h6>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#262F3F] mb-4">What we Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional real estate marketing services designed to showcase your property at its best. From stunning photography to cutting-edge virtual tours, we have everything you need to make your listing stand out.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="service-card group border-0 outline-0"
              style={{ border: 'none', outline: 'none' }}
              aria-label={`Learn more about ${service.title}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 border-0 outline-0" style={{ border: 'none', outline: 'none' }}>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover border-0 outline-0"
                  style={{ border: 'none', outline: 'none' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              {/* Content Overlay with Gradient Transparency */}
              <div className="service-content-gradient">
                {/* Service Title */}
                <h3 className="text-lg md:text-xl font-semibold text-[#1a1a1a] leading-tight mb-2">
                  {service.title}
                </h3>
                
                {/* Description - Hidden on desktop until hover */}
                <p className="service-description text-sm md:text-[14px] text-[#2d3748] leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                
                {/* CTA Button - Hidden on desktop until hover */}
                <div className="service-cta inline-flex items-center text-sm font-medium text-[#1c4596] group-hover:text-[#0f2557] transition-colors">
                  Learn More
                  <svg 
                    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
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