import { CTASection } from "@/components/home/CTASection"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "John Hayes",
    title: "Founder / CEO",
    image: "https://ext.same-assets.com/148878086/425042107.jpeg",
    link: "/?team=john_hayes",
  },
  {
    name: "Jeff Klein",
    title: "VP of Design & UX / Managing Director",
    image: "https://ext.same-assets.com/148878086/2441473118.jpeg",
    link: "/?team=jeff_klein",
  },
  {
    name: "Amy Hayes",
    title: "Vice President",
    image: "https://ext.same-assets.com/148878086/355865964.jpeg",
    link: "/?team=amy_hayes",
  },
  {
    name: "Ashley Hinerman",
    title: "Client Experience Director",
    image: "https://ext.same-assets.com/148878086/1563506063.jpeg",
    link: "/?team=ashley_hinerman",
  },
  {
    name: "Adam Brioza",
    title: "Creative Services Manager",
    image: "https://ext.same-assets.com/148878086/3073271867.jpeg",
    link: "/?team=adam_brioza",
  },
  {
    name: "Claire Hachenberger",
    title: "Account Manager",
    image: "https://ext.same-assets.com/148878086/1888738526.jpeg",
    link: "/?team=claire_hachenberger",
  },
]

const values = [
  {
    title: "COMMUNITY",
    description:
      "We are building a strong community and support system for creative individuals and our real estate partners.",
    icon: "https://ext.same-assets.com/148878086/3081514243.png",
  },
  {
    title: "COLLABORATION",
    description:
      "We are committed to collaboration with our peers and our partners because we know that we are better together.",
    icon: "https://ext.same-assets.com/148878086/2211440208.png",
  },
  {
    title: "CARE",
    description:
      "We are genuine and thoughtful in our approach to every conversation, every decision, and every relationship.",
    icon: "https://ext.same-assets.com/148878086/2909910668.png",
  },
  {
    title: "PROGRESS",
    description:
      "We strive to improve as artists, colleagues, and human beings. Bay Area real estate moves fast, but we move faster.",
    icon: "https://ext.same-assets.com/148878086/2366969415.png",
  },
]

const testimonials = [
  {
    quote:
      "I just LOVE Open Homes — the quality of what you do, the ease of use of you user-friendly website, the amazing level of customer service you all provide — All OUTSTANDING! Thank you SO MUCH for helping me to better serve my clients with the extraordinary support you provide for me. So happy to be your very satisfied customer!",
    author: "Karen Starr",
    company: "Grubb Co",
    avatar: "https://ext.same-assets.com/148878086/2418568282.jpeg",
  },
  {
    quote:
      "Open Homes Photography is SIMPLY. THE. BEST! I would never go anywhere else — the convenience, quality, quick turnaround and flexible packages are just what I need to produce top quality marketing for my clients.",
    author: "Tracy Pisenti",
    company: "Compass",
    avatar: "https://ext.same-assets.com/148878086/4192820443.jpeg",
  },
  {
    quote:
      "Great personalized service from open homes. Our photographer, Denis was flexible with weather conditions, rescheduling for the following day. His work is thoughtful and skilled. He took still photos, video and drone with great results. Altogether a great experience. Professional service and photos etc returned on time. Highly recommend.",
    author: "Jane Poppelreiter",
    company: "Compass",
    avatar: "https://ext.same-assets.com/148878086/1302349157.jpeg",
  },
]

export default function AboutUsPage() {
  return (
    <div>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-light mb-6">Unlock your listing's potential</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Our Mission</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Highlighting the heart of every home</h2>
            <p className="text-gray-600">
              Our award-winning Visual Artists deliver beautiful content designed to elevate every home—and selling
              price. Whether you're looking for real estate photography, videography, aerials, websites, Matterport 3D
              virtual tours, floor plans, or brochures, you can trust RePhotos to quickly provide premium marketing
              services that tell the unique story of your listing or project.
            </p>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://ext.same-assets.com/148878086/3938940115.jpeg"
              alt="Open Homes Photography"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h6 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">How It Works</h6>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
              Elevating listings with RePhotos is a snap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="https://ext.same-assets.com/148878086/2444529349.png" alt="Step 1" width={56} height={56} />
              </div>
              <h4 className="text-lg font-medium mb-2">Step 1</h4>
              <p className="text-gray-600 text-sm">Set up your account in RePhotos Atrium and add Collaborators</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="https://ext.same-assets.com/148878086/1472744727.png" alt="Step 2" width={56} height={56} />
              </div>
              <h4 className="text-lg font-medium mb-2">Step 2</h4>
              <p className="text-gray-600 text-sm">Submit an order in minutes and help us customize your shoot</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="https://ext.same-assets.com/148878086/4054706207.png" alt="Step 3" width={56} height={56} />
              </div>
              <h4 className="text-lg font-medium mb-2">Step 3</h4>
              <p className="text-gray-600 text-sm">Relax as your Visual Artist completes your services</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src="https://ext.same-assets.com/148878086/4106215454.png" alt="Step 4" width={56} height={56} />
              </div>
              <h4 className="text-lg font-medium mb-2">Step 4</h4>
              <p className="text-gray-600 text-sm">Receive your edited content by 9 a.m. the next day</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/128511358.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/3125659672.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/1510460591.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/3513071886.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/3163603778.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
            <div className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <Image
                src="https://ext.same-assets.com/148878086/4112012668.png"
                alt="Partner"
                width={120}
                height={40}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-4">What our partners are saying</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-6 shadow-sm bg-white">
                <div className="flex items-center mb-4">
                  <div className="text-secondary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center border-t pt-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-4">Our values in action</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <Image src={value.icon || "/placeholder.svg"} alt={value.title} width={48} height={48} />
                </div>
                <h4 className="text-lg font-medium mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-serif mb-4">Our leadership team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Put a face to the name. From CEO to CSR, our goal is to capture the essence of every home, the imagination
              of every buyer, and the trust of every real estate partner. We can't wait to get to know you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Link key={index} href={member.link} className="group">
                <div className="relative h-80 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-medium mb-1">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.title}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/team">Meet the full team</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
