"use client"

import { motion } from "framer-motion"
import { CTASection } from "@/components/home/CTASection"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-lg md:text-xl mb-2">
              From local roots to one of Southern Ontario's most dependable real estate media partners
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
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Founded in Milton. Built for Realtors</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                RePhotos started with one clear goal: help agents win more listings and close faster with premium visuals that convert. We understand what buyers look for and what sellers expect. We deliver both with speed, quality, and consistency.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">One Camera Start</h3>
                  <p className="text-gray-600">
                    Launched with just a camera and a few listings. Now a full-service media partner
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Trusted by Agents Across the GTA</h3>
                  <p className="text-gray-600">Chosen by agents who need reliability, fast turnaround, and professional results</p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Focused on Results</h3>
                  <p className="text-gray-600">Everything we offer is designed to get listings noticed, shared, and sold</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Why Agents Stick With Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We do more than shoot and send. We build long-term partnerships that help agents stand out in busy markets.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Real Estate Photography in Milton, Oakville, Mississauga, Burlington & GTA</strong><br />
                Looking for real estate photographers near me who actually deliver? RePhotos is your trusted real estate photography company serving Milton, Oakville, Mississauga, Burlington, and the Greater Toronto Area. We specialize in HDR real estate photography, drone photography, virtual tours, 3D walkthroughs, and real estate video tours that help your listings sell faster and stand out on MLS, Realtor.ca, and social media. From Milton real estate photography to Oakville drone video tours, our professional services are designed for agents across the Halton Region and Peel Region who want premium visuals that drive results.<br /><br />
                Our complete real estate media services include crystal-clear interior and exterior photography, stunning aerial drone shots, interactive virtual tours, cinematic video content, twilight photography, and social media-ready content. Whether you're listing luxury homes in Oakville, family properties in Burlington, condos in Mississauga, or any property throughout Georgetown, Brampton, Hamilton, and the GTA, we know what buyers want to see and how to capture it professionally.<br /><br />
                Time is money in real estate – that's why we offer same-day turnaround on most shoots and clear, upfront pricing with no surprises. Our real estate photography packages work for every agent and budget, from top producers to agents building their business. Stop losing listings to better photos. Contact RePhotos today and discover why we're the go-to real estate photography service for agents who want more views, more leads, and faster sales across the Greater Toronto Area.
              </p>
            </motion.div>
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
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Clarity Over Hype</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We focus on what matters. Helping you sell listings faster with clean visuals and transparent pricing
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
                    <h3 className="text-2xl font-semibold mb-4">Efficiency Matters</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We show up on time, deliver fast, and make it easy for you to put everything to work right away
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
                    <h3 className="text-2xl font-semibold mb-4">Local Focus</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We live and work in the same market you do. That means no guesswork. Just media that works
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
