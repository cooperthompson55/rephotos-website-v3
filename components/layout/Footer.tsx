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
              <p>(905)299-9300</p>
              <p>Cooper@rephotos.ca</p>
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
                <Link href="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services/virtual-tour" className="hover:underline">
                  3D Matterport
                </Link>
              </li>
              <li>
                <Link href="/book-now" className="hover:underline">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">3D Matterport Tours</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Aerial Drone Photography</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Architectural Photography</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Cinematic Video Tours</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Virtual Staging</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Floor Plans</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">HDR Photography Explained</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Before and After Edits</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Day-to-Dusk Editing</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Fast Turnaround Times</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Property Websites</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Social Media Marketing (Reels, Ads, Branding)</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Content Marketing for Realtors</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Photography ROI</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Buyer Psychology & First Impressions</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Home Staging & Decluttering Tips</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">MLS Guidelines & Compliance</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Editing & Delivery Workflow</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">Architecture & Design Features</span>
              <span className="text-xs bg-gray-700 hover:bg-secondary px-2 py-1 rounded text-white cursor-default transition-colors">New Construction & Luxury Listings</span>
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
