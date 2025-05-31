"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Calendar, User, Tag, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { CTASection } from "@/components/home/CTASection"

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Stunning Real Estate Photography",
    excerpt:
      "Learn the professional secrets to capturing properties in their best light and making listings stand out in a competitive market.",
    image: "/placeholder.svg?height=600&width=800&query=real+estate+photography+tips",
    date: "May 15, 2024",
    author: "Cooper",
    category: "photography",
    featured: true,
    tags: ["photography", "tips", "lighting"],
  },
  {
    id: 2,
    title: "Why Virtual Tours Are Essential in 2024",
    excerpt:
      "Discover how virtual tours have transformed from a luxury to a necessity in modern real estate marketing strategies.",
    image: "/placeholder.svg?height=600&width=800&query=virtual+tour+real+estate",
    date: "May 8, 2024",
    author: "Cooper",
    category: "virtual-tours",
    featured: true,
    tags: ["virtual-tours", "technology", "marketing"],
  },
  {
    id: 3,
    title: "The Impact of Professional Photography on Selling Price",
    excerpt:
      "Research shows that professional photography can increase the final selling price of a property by up to 7%. Here's why.",
    image: "/placeholder.svg?height=600&width=800&query=professional+real+estate+photography",
    date: "April 29, 2024",
    author: "Cooper",
    category: "business",
    featured: false,
    tags: ["statistics", "sales", "roi"],
  },
  {
    id: 4,
    title: "Drone Photography: Elevating Your Property Listings",
    excerpt:
      "Aerial photography provides a unique perspective that can showcase properties in ways traditional photography cannot.",
    image: "/placeholder.svg?height=600&width=800&query=drone+real+estate+photography",
    date: "April 22, 2024",
    author: "Cooper",
    category: "aerial",
    featured: false,
    tags: ["aerial", "drones", "technology"],
  },
  {
    id: 5,
    title: "Preparing a Home for a Professional Photo Shoot",
    excerpt:
      "A comprehensive checklist for homeowners and realtors to ensure properties are camera-ready for the best results.",
    image: "/placeholder.svg?height=600&width=800&query=home+staging+photography",
    date: "April 15, 2024",
    author: "Cooper",
    category: "photography",
    featured: false,
    tags: ["preparation", "staging", "checklist"],
  },
  {
    id: 6,
    title: "The Art of Twilight Photography for Real Estate",
    excerpt:
      "Twilight shots can transform an ordinary property into something magical. Learn when and how to capture these stunning images.",
    image: "/placeholder.svg?height=600&width=800&query=twilight+real+estate+photography",
    date: "April 8, 2024",
    author: "Cooper",
    category: "photography",
    featured: true,
    tags: ["twilight", "techniques", "lighting"],
  },
  {
    id: 7,
    title: "Floor Plans: Why They're Essential for Property Marketing",
    excerpt:
      "Floor plans provide potential buyers with crucial information about the layout and flow of a property. Here's why they matter.",
    image: "/placeholder.svg?height=600&width=800&query=floor+plans+real+estate",
    date: "April 1, 2024",
    author: "Cooper",
    category: "floor-plans",
    featured: false,
    tags: ["floor-plans", "marketing", "listings"],
  },
  {
    id: 8,
    title: "Virtual Staging: Transform Empty Spaces into Selling Points",
    excerpt:
      "Virtual staging offers a cost-effective alternative to traditional staging, helping buyers visualize a property's potential.",
    image: "/placeholder.svg?height=600&width=800&query=virtual+staging+real+estate",
    date: "March 25, 2024",
    author: "Cooper",
    category: "virtual-staging",
    featured: false,
    tags: ["virtual-staging", "interior-design", "technology"],
  },
]

// Popular tags from the blog posts
const popularTags = ["photography", "virtual-tours", "technology", "marketing", "aerial", "tips", "staging"]

export default function BlogComingSoonPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.")
      return
    }
    setSubmitted(true)
    // Here you would typically send the email to your backend or a service
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header-texture.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90" />
        </div>
        <div className="container relative z-10 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Coming Soon</h1>
            <p className="text-lg md:text-xl mb-2">
              We're working on expert insights, tips, and stories to help you master real estate marketing. Stay tuned!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Card Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-50 py-16">
        <Card className="max-w-lg w-full mx-4 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <CardTitle className="text-2xl md:text-3xl mb-4 text-primary text-center">Our Blog is Launching Soon!</CardTitle>
            <CardDescription className="mb-6 text-center text-base text-gray-700">
              Be the first to know when we launch. Enter your email below to get early access, exclusive updates, and a chance to shape the content you want to see!
            </CardDescription>
            {submitted ? (
              <div className="text-green-600 text-center font-medium py-4">
                Thank you for subscribing! You'll be the first to know when our blog goes live.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-white border-gray-300 focus:border-primary focus:ring-primary"
                  required
                  aria-label="Email address"
                />
                {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" size="lg">
                  Subscribe Early
                </Button>
              </form>
            )}
            <div className="mt-6 text-center text-sm text-gray-500">
              <span role="img" aria-label="lightbulb">💡</span> Have a topic you want us to cover? <a href="mailto:info@rephotos.ca" className="text-primary underline">Let us know!</a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
