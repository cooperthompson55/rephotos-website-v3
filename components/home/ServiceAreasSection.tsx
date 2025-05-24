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
          <p className="text-gray-600 max-w-3xl mx-auto">
            RePhotos provides premium real estate photography and marketing services throughout Southern Ontario. Our
            team of professional photographers and visual artists are strategically located to serve you better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/southern-ontario-map-toronto.png"
              alt="RePhotos Service Areas Map"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-sm">
              © 2025 RePhotos | Map data represents our primary service areas
            </div>
          </div>

          <div>
            <div className="bg-[#fcfaf7] p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-2xl font-serif mb-4">Primary Service Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-lg mb-2">Greater Toronto Area</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Toronto</li>
                    <li>• Mississauga</li>
                    <li>• Brampton</li>
                    <li>• Vaughan</li>
                    <li>• Markham</li>
                    <li>• Richmond Hill</li>
                    <li>• Etobicoke</li>
                    <li>• Newmarket</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Golden Horseshoe</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Milton</li>
                    <li>• Burlington</li>
                    <li>• Oakville</li>
                    <li>• Hamilton</li>
                    <li>• St. Catharines</li>
                    <li>• Niagara Falls</li>
                    <li>• Kitchener-Waterloo</li>
                    <li>• Guelph</li>
                  </ul>
                </div>
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
              <Link href="/contact">Check availability in your area</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
