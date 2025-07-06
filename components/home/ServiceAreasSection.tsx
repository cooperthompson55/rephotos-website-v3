"use client"

import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"

export function ServiceAreasSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Service Areas</h6>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Where we work</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            RePhotos provides premium real estate photography and marketing services throughout Southern Ontario. Our professional photography operation serves all areas shown on the map below with no travel fees, and extends to additional locations throughout the region for a small travel fee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/home/map.webp"
              alt="RePhotos Service Areas Map"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-sm">
              © 2025 RePhotos | Map data represents our primary service areas
            </div>
          </div>

          <div>
            <div className="bg-[#fcfaf7] p-6 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* No Travel Fee (Covered Area) */}
              <div>
                <h4 className="font-medium text-lg mb-1">No Travel Fee <span className="text-xs text-[#6B7A86]">(Covered Area)</span></h4>
                <p className="text-xs text-gray-500 mb-2">These towns fall within our core service zone. No travel fee applies.</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Milton</li>
                  <li>• Oakville</li>
                  <li>• Burlington</li>
                  <li>• Mississauga</li>
                  <li>• Brampton</li>
                  <li>• Hamilton</li>
                  <li>• Cambridge</li>
                  <li>• Guelph</li>
                  <li>• Kitchener</li>
                </ul>
              </div>
              {/* $0.65/km Travel Fee (Extended Area) */}
              <div>
                <h4 className="font-medium text-lg mb-1">$0.65/km Travel Fee <span className="text-xs text-[#6B7A86]">(Extended Area)</span></h4>
                <p className="text-xs text-gray-500 mb-2">Travel fees apply to locations outside the core zone.</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Toronto</li>
                  <li>• Scarborough</li>
                  <li>• Vaughan</li>
                  <li>• Markham</li>
                  <li>• Richmond Hill</li>
                  <li>• St. Catharines</li>
                  <li>• Niagara Falls</li>
                  <li>• Newmarket</li>
                  <li>• Etobicoke</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-serif mb-4">Our Commitment</h3>
              <p className="text-gray-600 mb-4">
                We're committed to delivering exceptional real estate media with speed and reliability. Most photo
                shoots are edited and delivered within 24 hours, so you can market your listing without delay.
              </p>
              <p className="text-gray-600 mb-4">
                For locations outside our primary service areas, additional travel fees may apply. Please contact us for
                a custom quote.
              </p>
            </div>

            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/contact-us">Check availability in your area</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
