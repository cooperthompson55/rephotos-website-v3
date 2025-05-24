"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "I just LOVE RePhotos — the quality of what you do, the ease of use of you user-friendly website, the amazing level of customer service you all provide — All OUTSTANDING! Thank you SO MUCH for helping me to better serve my clients with the extraordinary support you provide for me. So happy to be your very satisfied customer!",
    author: "Karen Starr",
    company: "Grubb Co",
    avatar: "https://ext.same-assets.com/148878086/2418568282.jpeg",
  },
  {
    quote:
      "RePhotos Photography is SIMPLY. THE. BEST! I would never go anywhere else — the convenience, quality, quick turnaround and flexible packages are just what I need to produce top quality marketing for my clients.",
    author: "Tracy Pisenti",
    company: "Compass",
    avatar: "https://ext.same-assets.com/148878086/4192820443.jpeg",
  },
  {
    quote:
      "Great personalized service from RePhotos. Our photographer, Denis was flexible with weather conditions, rescheduling for the following day. His work is thoughtful and skilled. He took still photos, video and drone with great results. Altogether a great experience. Professional service and photos etc returned on time. Highly recommend.",
    author: "Jane Poppelreiter",
    company: "Compass",
    avatar: "https://ext.same-assets.com/148878086/1302349157.jpeg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">What our partners are saying</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2 pl-4">
                  <Card className="p-1 h-full bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center">
                        <div className="text-secondary">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-lg">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <CardFooter className="pt-2 border-t">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-primary">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
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
  )
}
