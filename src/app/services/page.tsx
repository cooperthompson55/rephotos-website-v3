import { CTASection } from "@/components/home/CTASection"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h6 className="text-sm uppercase tracking-wider text-gray-300 mb-2">Services</h6>
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">Real Estate Photography</h1>
            <div className="relative h-[300px] md:h-[400px] mt-8 rounded-md overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2498839276/3489217698.png"
                alt="Real Estate Photography"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-4">
            <a href="#photo-video" className="text-secondary hover:underline">
              Photos & video
            </a>
            <a href="#floor-plans" className="text-primary hover:text-secondary">
              Floor plans & virtual tours
            </a>
            <a href="#websites-brand" className="text-primary hover:text-secondary">
              Websites & brand
            </a>
          </div>
        </div>
      </section>

      {/* Brand Videos Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-md overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2498839276/977628229.png"
                alt="Brand Videos"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-serif mb-4">Brand Videos</h3>
              <p className="text-gray-600 mb-6">
                Make unforgettable first impressions and show potential clients why they should choose you with a
                beautiful, professional Brand Video.
              </p>
              <a href="/real-estate-brand-videos" className="text-secondary hover:underline">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section id="photo-video" className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <h4 className="text-2xl font-serif mb-4">Photos & video</h4>
          <p className="text-gray-600 mb-8">
            Capture the story of your listing or project with stunning real estate marketing content that turns heads
            and drives clicks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card - Photography */}
            <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ext.same-assets.com/2498839276/1310112241.jpeg"
                  alt="Photography"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h5 className="text-xl font-serif mb-2">Photography</h5>
                <p className="text-gray-600 text-sm mb-4">
                  Make a lasting first impression with the best photography in the Bay Area.
                </p>
                <div className="text-secondary font-medium mb-4">$300 starting</div>
                <div className="flex flex-col gap-2">
                  <a href="/order" className="text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Order
                  </a>
                  <a href="/real-estate-photography" className="text-center text-sm text-gray-500 hover:text-secondary">
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Service Card - Video Tours */}
            <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ext.same-assets.com/2498839276/3158266849.jpeg"
                  alt="Video Tours"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h5 className="text-xl font-serif mb-2">Video Tours</h5>
                <p className="text-gray-600 text-sm mb-4">
                  Awe clients and buyers with cinematic videos for your listing or project.
                </p>
                <div className="text-secondary font-medium mb-4">$300 starting</div>
                <div className="flex flex-col gap-2">
                  <a href="/order" className="text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Order
                  </a>
                  <a href="/real-estate-video-tours" className="text-center text-sm text-gray-500 hover:text-secondary">
                    Learn more
                  </a>
                </div>
              </div>
            </div>

            {/* Service Card - Aerial Photos & Video */}
            <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src="https://ext.same-assets.com/2498839276/4115041327.jpeg"
                  alt="Aerial Photos & Video"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h5 className="text-xl font-serif mb-2">Aerial Photos & Video</h5>
                <p className="text-gray-600 text-sm mb-4">
                  Elevate your listing or project above the rest with incredible drone footage.
                </p>
                <div className="text-secondary font-medium mb-4">$300 starting</div>
                <div className="flex flex-col gap-2">
                  <a href="/order" className="text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Order
                  </a>
                  <a
                    href="/aerial-photography-and-video"
                    className="text-center text-sm text-gray-500 hover:text-secondary"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
