"use client"

import { motion } from "framer-motion"
import { CTASection } from "@/src/components/home/CTASection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Heart, Camera, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function OurStoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1200&query=Milton Ontario cityscape with beautiful homes and real estate"
            alt="Milton, Ontario"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <MapPin className="w-4 h-4 mr-2" />
                Milton, ON
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🍁 Canadian Owned
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="w-4 h-4 mr-2" />
                Small Business
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 leading-tight">Our Story</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              From a passion project in Milton to Southern Ontario's trusted real estate photography partner
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Founded in the Heart of Milton</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                RePhotos began as a passion project by our founder, Cooper. As a proud Canadian small business, we
                understand the unique needs of our local real estate market and the value of community. Our journey
                started with a simple mission: to help realtors and homeowners showcase their properties in the best
                possible light, using the power of professional photography and marketing.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">One-Person Start</h3>
                  <p className="text-gray-600">
                    Started as Cooper's passion project to bring creativity to real estate marketing
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Trusted Partner</h3>
                  <p className="text-gray-600">Now serving real estate professionals across Southern Ontario</p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Core Values</h3>
                  <p className="text-gray-600">Quality, reliability, and personal service remain at our core</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                Over the years, we've grown from a one-person operation into a trusted partner for real estate
                professionals across Southern Ontario. Our commitment to quality, reliability, and personal service
                remains at the core of everything we do.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline" className="border-primary text-primary">
                    Founder
                  </Badge>
                  <Badge variant="outline" className="border-secondary text-secondary">
                    Milton Local
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Community Focused
                  </Badge>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Meet Cooper</h2>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Hi, I'm Cooper, the founder of RePhotos. As a lifelong resident of Milton and a passionate
                    photographer, I started this business to bring a new level of care and creativity to real estate
                    marketing.
                  </p>

                  <p>
                    I believe every home has a story, and it's my mission to help you tell it. Whether it's capturing
                    the perfect golden hour shot or highlighting the unique architectural details that make a property
                    special, I approach every project with the same dedication and artistic vision.
                  </p>

                  <p className="font-medium text-primary">
                    When you work with RePhotos, you're not just getting a service—you're partnering with a local expert
                    who cares about your success. Thank you for supporting a Canadian small business!
                  </p>
                </div>

                <div className="mt-8">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">Get in Touch with Cooper</Link>
                  </Button>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=600&width=480&query=Professional headshot of Cooper, RePhotos founder, with camera equipment in Milton Ontario"
                      alt="Cooper, Founder of RePhotos"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Camera className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-primary">RePhotos Founder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We believe in building lasting relationships, delivering exceptional quality, and supporting our local
                community. Here's what drives us every day:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Personal Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every client is unique. We take the time to understand your needs and deliver a tailored
                      experience that exceeds expectations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Quality & Creativity</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We combine technical expertise with artistic vision to make every property shine and stand out in
                      the market.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Community Roots</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We're proud to support local businesses and give back to the Milton community whenever we can.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
