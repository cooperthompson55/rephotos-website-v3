import Link from "next/link"
import Image from "next/image"

export function CaseStudySection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            {/* Left content side */}
            <div className="bg-[#1e3a47] text-white p-8 md:p-12 flex flex-col justify-center md:w-1/2">
              <div className="text-[#f3a952] uppercase tracking-wider text-sm font-medium mb-4">Case Study</div>
              <h3 className="text-3xl md:text-4xl font-serif font-light mb-6">The art of the Eichler</h3>
              <p className="text-gray-300 mb-8">
                For over a decade, RePhotos has partnered with Eichler expert and owner Thomas Westfall to craft
                beautiful visual stories for the Bay Area's storied, coveted mid-century modern icons.
              </p>
              <div>
                <Link
                  href="/portfolio/the-art-of-the-eichler"
                  className="inline-block bg-white text-[#1e3a47] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>

            {/* Right image side */}
            <div className="md:w-1/2 relative">
              <div className="h-full">
                <Image
                  src="https://ext.same-assets.com/2308376233/3346176737.jpeg"
                  alt="The art of the Eichler"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
