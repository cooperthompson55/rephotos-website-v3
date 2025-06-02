import Link from "next/link"
import Image from "next/image"
import { BookButton } from "../ui/book-button"

export function QuoteModuleSection() {
  return (
    <section className="py-8 md:py-12 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            {/* Left content side */}
            <div className="bg-[#262F3F] text-white p-8 md:p-12 flex flex-col justify-center md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-mazzard font-semibold mb-6">Simple Square Footage Rates</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Pay based on your home's size. We provide upfront square footage pricing for every service. What you see is what you pay, with no surprise fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button
                  type="button"
                  className="bg-white text-primary hover:bg-gray-100 rounded-md font-medium transition-colors px-6 py-3"
                  onClick={() => {
                    const el = document.getElementById('build-your-own-package');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get quote
                </button>
              </div>
            </div>

            {/* Right image side */}
            <div className="md:w-1/2 relative bg-[#262F3F] flex items-center justify-center hidden md:block">
              <div className="h-full w-full flex items-center justify-center p-10 group">
                <Image
                  src="/images/photobank/dj-gallery.webp"
                  alt="Quote process screenshot"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full rounded-lg shadow-lg border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 