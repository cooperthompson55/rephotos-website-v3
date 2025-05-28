import Image from "next/image"
import Link from "next/link"
import { CTASection } from "@/components/home/CTASection"
import { Button } from "@/components/ui/button"
import { BookButton } from "@/components/ui/book-button"
import { Camera, Heart, Users, Award, Target, Lightbulb } from "lucide-react"

export default function OurStoryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-18 md:pt-20">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 z-0"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/waves-pattern.svg')] bg-no-repeat bg-cover opacity-10 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"></div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
              <h6 className="text-sm uppercase tracking-wider text-white font-medium">Our Story</h6>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-white">The journey behind RePhotos</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              From a small team with a big vision to Southern Ontario's premier real estate photography service — this
              is our story.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Where It All Began</h6>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Founded on a simple belief</h2>
              <p className="text-gray-600 mb-4">
                RePhotos was born in 2010 when founders Michael and Sarah Reynolds, a real estate agent and professional
                photographer, recognized a critical gap in the market: high-quality, reliable real estate photography
                that truly captured a property's essence.
              </p>
              <p className="text-gray-600 mb-4">
                After Sarah helped Michael sell a challenging property by taking exceptional photos that highlighted its
                best features, they realized the profound impact professional imagery could have on real estate sales.
                What began as a small operation in their Toronto home office has grown into Southern Ontario's most
                trusted real estate visual marketing service.
              </p>
              <p className="text-gray-600 mb-8">
                "We believed that every property deserves to be showcased at its absolute best," says Michael. "Great
                photography isn't just about pretty pictures—it's about storytelling that connects buyers emotionally to
                a space."
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link href="/about-us/team">Meet Our Team</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000"
                  alt="RePhotos founders"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-sm">Michael and Sarah Reynolds, Founders of RePhotos, 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Journey</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">The path to excellence</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our growth over the years has been driven by a commitment to quality, innovation, and exceptional service.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Timeline items */}
            <div className="space-y-24 relative">
              {/* 2010 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-12">
                    <h3 className="text-3xl font-serif mb-4">2010</h3>
                    <h4 className="text-xl font-medium mb-2">The Beginning</h4>
                    <p className="text-gray-600">
                      RePhotos is founded in Toronto by Michael and Sarah Reynolds, operating from their home office
                      with just one camera and a vision for excellence.
                    </p>
                  </div>
                  <div className="md:pl-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f5?q=80&w=2000"
                        alt="RePhotos founding"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2013 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-12">
                    <h3 className="text-3xl font-serif mb-4">2013</h3>
                    <h4 className="text-xl font-medium mb-2">Expansion</h4>
                    <p className="text-gray-600">
                      After rapid growth, we move into our first official studio space in downtown Toronto and expand
                      our team to 10 photographers covering the Greater Toronto Area.
                    </p>
                  </div>
                  <div className="md:order-1 md:pr-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000"
                        alt="RePhotos office"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2016 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-12">
                    <h3 className="text-3xl font-serif mb-4">2016</h3>
                    <h4 className="text-xl font-medium mb-2">Innovation</h4>
                    <p className="text-gray-600">
                      We introduce drone photography and 3D virtual tours to our service offerings, becoming one of the
                      first companies in Ontario to offer comprehensive visual marketing packages.
                    </p>
                  </div>
                  <div className="md:pl-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2000"
                        alt="Drone photography"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2020 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-12">
                    <h3 className="text-3xl font-serif mb-4">2020</h3>
                    <h4 className="text-xl font-medium mb-2">Digital Transformation</h4>
                    <p className="text-gray-600">
                      During the pandemic, we develop our proprietary online booking and delivery platform, streamlining
                      the process for agents and expanding our virtual staging capabilities.
                    </p>
                  </div>
                  <div className="md:order-1 md:pr-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2000"
                        alt="Digital platform"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2023 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:text-right md:pr-12">
                    <h3 className="text-3xl font-serif mb-4">2023</h3>
                    <h4 className="text-xl font-medium mb-2">Market Leadership</h4>
                    <p className="text-gray-600">
                      RePhotos becomes Southern Ontario's largest real estate photography company, with offices in
                      Toronto, Mississauga, and Hamilton, serving over 5,000 real estate professionals.
                    </p>
                  </div>
                  <div className="md:pl-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
                        alt="RePhotos expansion"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Today */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary border-4 border-white z-10"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2 md:text-left md:pl-12">
                    <h3 className="text-3xl font-serif mb-4">Today</h3>
                    <h4 className="text-xl font-medium mb-2">Looking Forward</h4>
                    <p className="text-gray-600">
                      With a team of 50+ visual artists and support staff, we continue to innovate and expand, committed
                      to helping real estate professionals showcase every property at its absolute best.
                    </p>
                  </div>
                  <div className="md:order-1 md:pr-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000"
                        alt="RePhotos today"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Purpose</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Mission and values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At the heart of everything we do is a commitment to excellence, innovation, and exceptional service.
            </p>
          </div>

          <div className="mb-20">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-md max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-serif mb-6 text-center">Our Mission</h3>
              <p className="text-xl text-gray-700 italic text-center">
                "To elevate every home—and selling price—through exceptional visual storytelling that connects buyers
                emotionally to properties and helps real estate professionals succeed."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Passion</h3>
              <p className="text-gray-600">
                We're passionate about real estate photography and the impact it has on selling homes. This passion
                drives us to continuously improve and deliver exceptional results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to excellence in every aspect of our work, from the quality of our photography to the
                responsiveness of our customer service.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Partnership</h3>
              <p className="text-gray-600">
                We view ourselves as partners in our clients' success, working collaboratively to help them achieve
                their goals and grow their businesses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty, transparency, and integrity in all our interactions, building trust with our
                clients and within our team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and techniques to stay at the forefront of real estate visual marketing,
                constantly evolving to meet changing market needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-secondary mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Reliability</h3>
              <p className="text-gray-600">
                We understand the importance of deadlines in real estate and pride ourselves on our consistent, reliable
                service that agents can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Leadership</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Meet the team behind RePhotos</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings together decades of experience in real estate, photography, and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000"
                  alt="Michael Reynolds"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Michael Reynolds</h3>
              <p className="text-gray-500 mb-3">Co-Founder & CEO</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Former real estate agent with 15+ years of experience, Michael brings deep industry knowledge and a
                passion for marketing.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000"
                  alt="Sarah Reynolds"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Sarah Reynolds</h3>
              <p className="text-gray-500 mb-3">Co-Founder & Creative Director</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Award-winning photographer with a background in architectural photography, Sarah oversees all creative
                aspects of our services.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000"
                  alt="David Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">David Chen</h3>
              <p className="text-gray-500 mb-3">Chief Technology Officer</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Tech innovator who joined in 2015, David has led the development of our proprietary booking and delivery
                platform.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000"
                  alt="Jennifer Park"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Jennifer Park</h3>
              <p className="text-gray-500 mb-3">Chief Operating Officer</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                With a background in operations management, Jennifer ensures our day-to-day processes run smoothly and
                efficiently.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000"
                  alt="Robert Patel"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Robert Patel</h3>
              <p className="text-gray-500 mb-3">Director of Photography</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Master photographer who trains and mentors our team of visual artists, ensuring consistent quality
                across all projects.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000"
                  alt="Emma Rodriguez"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Emma Rodriguez</h3>
              <p className="text-gray-500 mb-3">Client Success Director</p>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Former real estate marketing director, Emma leads our client success team, ensuring exceptional service
                for every client.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/about-us/team">Meet Our Full Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Giving Back</h6>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Our community commitment</h2>
              <p className="text-gray-600 mb-4">
                At RePhotos, we believe in giving back to the communities we serve. Through our RePhotos Cares
                initiative, we donate 1% of our annual revenue to housing-related charities across Southern Ontario.
              </p>
              <p className="text-gray-600 mb-4">
                We also provide pro bono photography services to affordable housing initiatives and volunteer our time
                and expertise to help showcase properties for charitable organizations.
              </p>
              <p className="text-gray-600 mb-8">
                Additionally, we run an annual scholarship program for aspiring photographers from underrepresented
                communities, providing mentorship, equipment, and educational opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <BookButton href="/contact" className="bg-secondary hover:bg-secondary/90 text-white">
                  Learn About RePhotos Cares
                </BookButton>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1593113598332-cd59a93f9724?q=80&w=2000"
                      alt="Community involvement"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2000"
                      alt="Volunteer work"
                      width={300}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="h-32 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000"
                      alt="Scholarship program"
                      width={300}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2000"
                      alt="Community building"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-[#F8F5F0] p-8 md:p-12 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000"
                    alt="Michael Reynolds"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-xl text-gray-700 italic mb-6">
                  "When we started RePhotos, we had no idea how far it would go. We just knew we wanted to help real
                  estate professionals showcase properties in the best possible light. Seeing how our work has helped
                  thousands of agents succeed and homeowners get the best value for their properties has been the most
                  rewarding journey of our lives."
                </p>
                <div>
                  <p className="font-medium">Michael Reynolds</p>
                  <p className="text-sm text-gray-500">Co-Founder & CEO, RePhotos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
