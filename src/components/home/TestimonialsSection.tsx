"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "RePhotos exceeded every expectation! From booking to final delivery, everything was seamless. The photos transformed my listings completely and I've never had such incredible response from buyers. The drone shots especially showcase properties beautifully. Can't imagine working with anyone else!",
    author: "Michael Chen",
    company: "Toronto Agent",
    avatar: "",
  },
  {
    quote:
      "As someone who's worked with multiple photography services, RePhotos stands out for their reliability and stunning results. Their team understands real estate marketing perfectly. The quick turnaround means I can get listings live fast, and the quality speaks for itself. Absolutely fantastic!",
    author: "Sarah Williams",
    company: "Toronto Agent",
    avatar: "",
  },
  {
    quote:
      "RePhotos has been a game changer for my business! The combination of professional photography, virtual tours, and drone footage gives my clients' homes the premium presentation they deserve. Plus, their customer service is top notch, always responsive and accommodating with scheduling.",
    author: "David Rodriguez",
    company: "Mississauga Agent",
    avatar: "",
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
                      <div>
                        <p className="font-medium text-primary">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
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
