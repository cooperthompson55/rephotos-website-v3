import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-primary text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-48 h-14 relative">
                <Image
                  src="/images/re-logo.png"
                  alt="Re"
                  width={240}
                  height={70}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Real estate photography, websites, Matterport, brochures, floor plans, video, aerial, 3D and more—tailored
              to suit your real estate needs and branded to promote your business.
            </p>
            <div className="text-sm text-gray-300">
              <p>Contact us:</p>
              <p>(415) 592-5187</p>
              <p>(408) 944-5289</p>
              <p>(800) 647-8310</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">More</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/frequently-asked-questions" className="hover:underline">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/photo-day" className="hover:underline">
                  Photo Day
                </Link>
              </li>
              <li>
                <Link href="/3d-matterport" className="hover:underline">
                  3D Matterport
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog/tag/3d-matterport"
                className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white"
              >
                3D Matterport
              </Link>
              <Link
                href="/blog/tag/aerial"
                className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white"
              >
                Aerial
              </Link>
              <Link
                href="/blog/tag/analytics"
                className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white"
              >
                Analytics
              </Link>
              <Link
                href="/blog/tag/architectural-photography"
                className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white"
              >
                Architectural Photography
              </Link>
              <Link href="/blog/tag/before-and-after" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Before and After</Link>
              <Link href="/blog/tag/branding-for-realtors" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Branding for Realtors</Link>
              <Link href="/blog/tag/buyer-psychology" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Buyer Psychology</Link>
              <Link href="/blog/tag/cinematic-video-tours" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Cinematic Video Tours</Link>
              <Link href="/blog/tag/closing-day-media" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Closing Day Media</Link>
              <Link href="/blog/tag/condos" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Condos</Link>
              <Link href="/blog/tag/content-marketing" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Content Marketing</Link>
              <Link href="/blog/tag/curb-appeal" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Curb Appeal</Link>
              <Link href="/blog/tag/day-to-dusk-edits" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Day-to-Dusk Edits</Link>
              <Link href="/blog/tag/decluttering-tips" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Decluttering Tips</Link>
              <Link href="/blog/tag/delivery-times" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Delivery Times</Link>
              <Link href="/blog/tag/drone-licensing" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Drone Licensing</Link>
              <Link href="/blog/tag/drone-safety" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Drone Safety</Link>
              <Link href="/blog/tag/editing-workflow" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Editing Workflow</Link>
              <Link href="/blog/tag/empty-property-solutions" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Empty Property Solutions</Link>
              <Link href="/blog/tag/exposure-blending" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Exposure Blending</Link>
              <Link href="/blog/tag/facebook-marketing" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Facebook Marketing</Link>
              <Link href="/blog/tag/fast-turnaround" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Fast Turnaround</Link>
              <Link href="/blog/tag/feature-sheets" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Feature Sheets</Link>
              <Link href="/blog/tag/first-impressions" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">First Impressions</Link>
              <Link href="/blog/tag/floor-plans" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Floor Plans</Link>
              <Link href="/blog/tag/for-sale-by-owner" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">For Sale by Owner</Link>
              <Link href="/blog/tag/framing-techniques" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Framing Techniques</Link>
              <Link href="/blog/tag/golden-hour" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Golden Hour</Link>
              <Link href="/blog/tag/hdr-explained" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">HDR Explained</Link>
              <Link href="/blog/tag/highlight-reels" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Highlight Reels</Link>
              <Link href="/blog/tag/home-staging" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Home Staging</Link>
              <Link href="/blog/tag/instagram-reels" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Instagram Reels</Link>
              <Link href="/blog/tag/interactive-tours" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Interactive Tours</Link>
              <Link href="/blog/tag/interior-photos" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Interior Photos</Link>
              <Link href="/blog/tag/keywords-for-listings" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Keywords for Listings</Link>
              <Link href="/blog/tag/kitchen-photography" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Kitchen Photography</Link>
              <Link href="/blog/tag/lighting-techniques" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Lighting Techniques</Link>
              <Link href="/blog/tag/listing-descriptions" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Listing Descriptions</Link>
              <Link href="/blog/tag/local-seo" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Local SEO</Link>
              <Link href="/blog/tag/luxury-listings" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Luxury Listings</Link>
              <Link href="/blog/tag/market-trends" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Market Trends</Link>
              <Link href="/blog/tag/mls-guidelines" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">MLS Guidelines</Link>
              <Link href="/blog/tag/neighborhood-videos" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Neighborhood Videos</Link>
              <Link href="/blog/tag/new-construction" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">New Construction</Link>
              <Link href="/blog/tag/open-house-tips" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Open House Tips</Link>
              <Link href="/blog/tag/photography-roi" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Photography ROI</Link>
              <Link href="/blog/tag/pre-shoot-checklist" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Pre-Shoot Checklist</Link>
              <Link href="/blog/tag/property-websites" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Property Websites</Link>
              <Link href="/blog/tag/real-estate-marketing" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Real Estate Marketing</Link>
              <Link href="/blog/tag/selling-faster" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Selling Faster</Link>
              <Link href="/blog/tag/seo-for-realtors" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">SEO for Realtors</Link>
              <Link href="/blog/tag/social-media-ads" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Social Media Ads</Link>
              <Link href="/blog/tag/virtual-staging" className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white">Virtual Staging</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Re. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
