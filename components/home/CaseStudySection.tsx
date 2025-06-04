import Link from "next/link"
import Image from "next/image"

export function CaseStudySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            {/* Left content side */}
            <div className="bg-[#262F3F] text-white p-8 md:p-12 flex flex-col justify-center md:w-1/2">
              <div className="text-[#f3a952] uppercase tracking-wider text-sm font-medium mb-4">Behind the Scenes</div>
              <h3 className="text-3xl md:text-4xl font-serif font-light mb-6">The Art of the Sale</h3>
              <p className="text-gray-300 mb-8">
                At RePhotos, we believe great visuals are more than just photos — they're tools that drive action. Every image, video, and tour is crafted to spark emotion, build trust, and move buyers closer to making an offer. That's the art of the sale.
              </p>
              <div>
                <Link
                  href="/portfolio"
                  className="inline-block bg-white text-[#262F3F] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Right image side */}
            <div className="md:w-1/2 relative">
              <div className="h-full">
                <Image
                  src="/images/home/backyard_2.webp"
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
