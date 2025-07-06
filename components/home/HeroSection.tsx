"use client"
import Image from "next/image"

export function HeroSection() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      const headerOffset = 0 // Adjust this if you have a fixed header
      const elementPosition = servicesSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image - Dark with car and reflections */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/cover.jpg"
          alt="Gallery Cover"
          fill
          className="object-cover"
          priority
          unoptimized
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-8">
          Bring your listing
          <br />
          <span className="italic">into focus</span>
        </h1>

        <div className="mt-10">
          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center rounded-md text-white bg-transparent hover:bg-white hover:text-black border-2 border-white px-3 py-1.5 text-sm md:px-6 md:py-2 md:text-base font-medium tracking-wide transition-all duration-300"
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  )
}
