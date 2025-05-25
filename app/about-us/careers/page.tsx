"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  DollarSign,
  Users,
  Camera,
  Video,
  ChevronDown,
  ChevronUp,
  Heart,
  Coffee,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const jobListings = [
  {
    id: 1,
    title: "Real Estate Photographer",
    type: "Full-time",
    location: "Milton, ON",
    salary: "$45,000 - $60,000",
    description: "Join our team as a Real Estate Photographer and help showcase properties across Southern Ontario.",
    responsibilities: [
      "Capture high-quality interior and exterior property photos",
      "Edit and process images to professional standards",
      "Coordinate with real estate agents and homeowners",
      "Maintain and care for photography equipment",
      "Meet tight deadlines while maintaining quality",
    ],
    requirements: [
      "2+ years of professional photography experience",
      "Strong portfolio of real estate or architectural photography",
      "Proficiency in Adobe Lightroom and Photoshop",
      "Reliable transportation and valid driver's license",
      "Excellent communication and time management skills",
    ],
    icon: Camera,
  },
  {
    id: 2,
    title: "Videographer & Drone Pilot",
    type: "Full-time",
    location: "Milton, ON",
    salary: "$50,000 - $65,000",
    description: "Create stunning video content and aerial footage for real estate marketing campaigns.",
    responsibilities: [
      "Produce high-quality video tours and promotional content",
      "Operate drones safely and legally for aerial photography",
      "Edit video content using professional software",
      "Collaborate with photography team on projects",
      "Maintain drone certifications and equipment",
    ],
    requirements: [
      "Transport Canada drone pilot certification (required)",
      "3+ years of videography experience",
      "Proficiency in video editing software (Premiere Pro, Final Cut)",
      "Strong understanding of composition and lighting",
      "Portfolio demonstrating real estate or commercial work",
    ],
    icon: Video,
  },
  {
    id: 3,
    title: "Marketing Coordinator",
    type: "Part-time",
    location: "Milton, ON (Remote options available)",
    salary: "$35,000 - $45,000",
    description: "Help grow our brand and manage client relationships in the real estate photography industry.",
    responsibilities: [
      "Manage social media accounts and content creation",
      "Coordinate client communications and scheduling",
      "Assist with website updates and SEO optimization",
      "Create marketing materials and campaigns",
      "Support business development initiatives",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of marketing experience",
      "Strong written and verbal communication skills",
      "Experience with social media management",
      "Knowledge of real estate industry preferred",
    ],
    icon: Briefcase,
  },
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health benefits including dental and vision coverage",
  },
  {
    icon: Coffee,
    title: "Flexible Schedule",
    description: "Work-life balance with flexible hours and remote work options",
  },
  {
    icon: Calendar,
    title: "Paid Time Off",
    description: "Generous vacation policy and paid holidays",
  },
  {
    icon: Award,
    title: "Professional Development",
    description: "Training opportunities and conference attendance support",
  },
  {
    icon: GraduationCap,
    title: "Equipment & Tools",
    description: "Top-quality photography and video equipment provided",
  },
  {
    icon: Users,
    title: "Team Environment",
    description: "Collaborative, supportive team culture in a growing company",
  },
]

const applicationSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Send your resume and portfolio to careers@rephotos.ca",
  },
  {
    step: 2,
    title: "Initial Review",
    description: "Our team will review your application within 3-5 business days",
  },
  {
    step: 3,
    title: "Interview Process",
    description: "Phone/video interview followed by an in-person meeting",
  },
  {
    step: 4,
    title: "Portfolio Review",
    description: "Detailed review of your work and technical skills assessment",
  },
  {
    step: 5,
    title: "Final Decision",
    description: "Reference check and job offer for successful candidates",
  },
]

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg md:text-xl mb-2">
              Build your career with Southern Ontario's leading real estate photography company. We're looking for passionate professionals to help us capture amazing properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-spectral text-primary mb-6">Why Choose RePhotos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a photography company—we're a team of creative professionals passionate about
              showcasing beautiful properties and building lasting relationships.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-spectral">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-spectral text-primary mb-6">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore exciting career opportunities with RePhotos. We're always looking for talented individuals to join
              our growing team.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="cursor-pointer" onClick={() => toggleJobExpansion(job.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <job.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-spectral mb-2">{job.title}</CardTitle>
                          <CardDescription className="text-lg mb-4">{job.description}</CardDescription>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2" />
                              {job.type}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {expandedJob === job.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 border-t">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-primary">Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((responsibility, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg mb-4 text-primary">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((requirement, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-8 pt-6 border-t">
                          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                            <Link href="mailto:careers@rephotos.ca?subject=Application for {job.title}">
                              Apply for this Position
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-spectral text-primary mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our hiring process is designed to be transparent and efficient. Here's what you can expect when you apply
              to join our team.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block" />

            <div className="space-y-12">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col items-center md:items-stretch ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="w-full md:flex-1 md:w-1/2 flex justify-center md:block">
                    <Card
                      className={`${index % 2 === 0 ? "md:mr-8" : "md:ml-8"} hover:shadow-lg transition-shadow duration-300 w-full max-w-md md:max-w-none`}
                    >
                      <CardHeader>
                        <div className="flex flex-col items-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-2 md:mb-0">
                            {step.step}
                          </div>
                          <CardTitle className="text-xl font-spectral text-center md:text-left">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-center md:text-left">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10" />

                  <div className="md:flex-1 md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-spectral mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Don't see a position that fits? We're always interested in hearing from talented photographers,
              videographers, and marketing professionals. Send us your portfolio!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="mailto:careers@rephotos.ca">Send Your Portfolio</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
