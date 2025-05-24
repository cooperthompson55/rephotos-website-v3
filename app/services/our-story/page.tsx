"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MapPin, Users, Award, Heart, Sparkles, Handshake } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&query=milton-ontario-aerial-view"
            alt="Milton, Ontario aerial view"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70" />
        </div>

        <motion.div
          className="container-wide relative z-10 text-center text-white py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Proudly Canadian • Based in Milton, ON</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            From a passion project to Southern Ontario's trusted real estate photography partner
          </p>
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container-wide">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">The RePhotos Journey</h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                Founded in the heart of Milton, Ontario, RePhotos began as a passion project by our founder, Cooper. As
                a proud Canadian small business, we understand the unique needs of our local real estate market and the
                value of community.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                Our journey started with a simple mission: to help realtors and homeowners showcase their properties in
                the best possible light, using the power of professional photography and marketing.
              </p>

              <p className="text-lg leading-relaxed">
                Over the years, we've grown from a one-person operation into a trusted partner for real estate
                professionals across Southern Ontario. Our commitment to quality, reliability, and personal service
                remains at the core of everything we do.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Canadian Owned</h3>
                <p className="text-muted-foreground">Proudly serving our local community</p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Based in Milton, ON</h3>
                <p className="text-muted-foreground">Local expertise you can trust</p>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Small Business</h3>
                <p className="text-muted-foreground">Personal service, every time</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Team</h2>
              <div className="w-24 h-1 bg-secondary mx-auto" />
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=500&query=professional-photographer-portrait"
                    alt="Cooper, Founder of RePhotos"
                    width={500}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-8">
                    <h3 className="text-3xl font-serif text-white mb-2">Cooper</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Founder
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Milton Local
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        Community Focused
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif mb-6">Meet Cooper</h3>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Hi, I'm Cooper, the founder of RePhotos. As a lifelong resident of Milton and a passionate
                    photographer, I started this business to bring a new level of care and creativity to real estate
                    marketing. I believe every home has a story, and it's my mission to help you tell it.
                  </p>
                  <p>
                    When you work with RePhotos, you're not just getting a service—you're partnering with a local expert
                    who cares about your success. Thank you for supporting a Canadian small business!
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link href="/contact">Work With Us</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe in building lasting relationships, delivering exceptional quality, and supporting our local
                community. Here's what drives us every day:
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Handshake className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Personal Service</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every client is unique. We take the time to understand your needs and deliver a tailored experience.
                  </p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Quality & Creativity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We combine technical expertise with artistic vision to make every property shine.
                  </p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Community Roots</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're proud to support local businesses and give back to the Milton community whenever we can.
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <motion.div
          className="container-wide text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Tell Your Property's Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with a local team that cares about your success as much as you do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-primary hover:bg-white hover:text-primary"
            >
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
