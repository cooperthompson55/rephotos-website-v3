"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Calendar, User, Tag, ChevronRight, ChevronLeft } from "lucide-react"

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

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Get featured posts for the slider
  const featuredPosts = blogPosts.filter((post) => post.featured)

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1))
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 py-20 md:py-28">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">RePhotos Blog</h1>
            <p className="text-lg md:text-xl mb-8">
              Expert insights, tips, and trends in real estate photography and property marketing
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Photography Tips
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Marketing Strategies
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                Industry Trends
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Slider */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Articles</h2>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post) => (
                  <div key={post.id} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="relative aspect-[4/3] md:aspect-auto">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h3>
                        <p className="text-gray-600 mb-6">{post.excerpt}</p>
                        <Button asChild className="w-fit">
                          <a href={`/blog/${post.id}`}>
                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slider Indicators */}
            <div className="flex justify-center mt-4">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full mx-1 ${currentSlide === index ? "bg-primary" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="md:w-auto"
                    onClick={() => setSearchQuery("")}
                    disabled={!searchQuery}
                  >
                    Clear
                  </Button>
                </div>

                <Tabs defaultValue="all" onValueChange={setActiveCategory}>
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-wrap mb-8">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="photography">Photography</TabsTrigger>
                    <TabsTrigger value="virtual-tours">Virtual Tours</TabsTrigger>
                    <TabsTrigger value="aerial">Aerial</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="floor-plans">Floor Plans</TabsTrigger>
                    <TabsTrigger value="virtual-staging">Virtual Staging</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-0">
                    {/* Content will be filtered by the state */}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="relative aspect-[16/9]">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="h-4 w-4 mr-1" />
                              <span>{post.author}</span>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={`/blog/${post.id}`}>
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-4">
                    Get the latest articles, tips, and industry insights delivered to your inbox.
                  </p>
                  <div className="space-y-4">
                    <Input type="email" placeholder="Your email address" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                        onClick={() => setSearchQuery(tag)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <div key={post.id} className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 text-sm">
                            <a href={`/blog/${post.id}`} className="hover:text-primary">
                              {post.title}
                            </a>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Property Marketing?</h2>
            <p className="text-lg md:text-xl mb-8">
              Contact us today to discuss how our professional photography services can help showcase your properties in
              the best light.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <a href="/contact-us">Get in Touch</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <a href="/services">Explore Services</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
