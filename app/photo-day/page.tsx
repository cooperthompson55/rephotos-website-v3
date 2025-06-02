import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Home, Camera, Calendar, Clock, Printer, Download, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Photo Day Preparation | RePhotos",
  description: "How to prepare your home for real estate photography - A comprehensive guide for homeowners",
}

export default function PhotoDayPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header-texture.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70" />
        </div>
        <div className="container relative z-10 pt-36 pb-16 md:pt-44 md:pb-24 flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full px-5 py-2 tracking-wide">PHOTO DAY PREP</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 text-white text-center max-w-4xl leading-tight">
            Preparing Your Home for Photo Day
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-4 text-center">
            A comprehensive guide to help you get your property ready for professional real estate photography
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Printer className="mr-2 h-5 w-5" />
              Print Checklist
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Download className="mr-2 h-5 w-5" />
              Download Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Preparation Timeline</h2>
                <p className="text-gray-600">Start preparing 2-3 days before your scheduled photo shoot</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Why Preparation Matters</h3>
                  <p className="text-gray-700">
                    Professional photos can help your property sell faster and for a higher price. Taking the time to
                    prepare your home ensures we capture it in the best possible light. This guide will help you get
                    ready for your upcoming photo session with RePhotos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="interior" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="interior" className="text-lg py-3">
                <Home className="mr-2 h-5 w-5" />
                Interior
              </TabsTrigger>
              <TabsTrigger value="exterior" className="text-lg py-3">
                <Camera className="mr-2 h-5 w-5" />
                Exterior
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interior" className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-primary">Interior Preparation Checklist</h2>

                <div className="space-y-6">
                  {/* Checklist Item 1 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Declutter Every Room</h3>
                      <p className="text-gray-700 mb-3">
                        Remove excess items from all surfaces — countertops, tables, shelves, and floors. Less is more
                        in photos.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Remove mail</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Clear countertops
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Organize bookshelves
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 2 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Open All Blinds & Curtains</h3>
                      <p className="text-gray-700 mb-3">
                        Let in as much natural light as possible. Make sure windows are clean.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Clean windows</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Open blinds</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Pull back curtains
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 3 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Hide Personal Items</h3>
                      <p className="text-gray-700 mb-3">
                        Put away toiletries, laundry, shoes, pet items, and family photos.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Bathroom items</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Personal photos
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Pet supplies</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 4 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">4</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Make Beds & Fluff Pillows</h3>
                      <p className="text-gray-700 mb-3">Straighten bedding and tidy furniture for a polished look.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Smooth bedding</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Arrange pillows
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Straighten furniture
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 5 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">5</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Clean Floors & Mirrors</h3>
                      <p className="text-gray-700 mb-3">
                        Vacuum, mop, and wipe down any smudged glass or reflective surfaces.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Vacuum carpets</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Mop floors</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Clean mirrors</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Pro Tips for Interior Photos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Turn on all lights, including lamps and under-cabinet lighting</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Replace any burnt-out light bulbs for consistent lighting</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Remove magnets and papers from refrigerator</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Hide trash cans, laundry baskets, and pet bowls</p>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="exterior" className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-primary">Exterior Preparation Checklist</h2>

                <div className="space-y-6">
                  {/* Checklist Item 1 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">1</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Remove Cars & Bins</h3>
                      <p className="text-gray-700 mb-3">Clear the driveway and hide garbage or recycling containers.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Move vehicles</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Hide garbage bins
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Clear driveway</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 2 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">2</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Tidy Outdoor Spaces</h3>
                      <p className="text-gray-700 mb-3">
                        Sweep walkways, arrange patio furniture, and store hoses or toys.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Sweep walkways</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Arrange furniture
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                          Store equipment
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Checklist Item 3 */}
                  <div className="flex gap-4 items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold text-primary text-lg">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Mow Lawn & Trim Edges</h3>
                      <p className="text-gray-700 mb-3">Give your yard a quick touch-up for great curb appeal.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Mow lawn</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Trim edges</span>
                        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Remove weeds</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Pro Tips for Exterior Photos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Turn on exterior lights if the shoot is scheduled for dusk</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Remove seasonal decorations unless they're current and subtle</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Clean entryway and front door area</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>Consider adding a few potted plants for color (if in season)</p>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Before & After Examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Living Room</CardTitle>
                  <CardDescription>See the difference preparation makes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Before</p>
                      <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600&query=cluttered living room with personal items"
                          alt="Before: Cluttered living room"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">After</p>
                      <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600&query=clean organized living room with natural light"
                          alt="After: Clean, organized living room"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Kitchen</CardTitle>
                  <CardDescription>See the difference preparation makes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Before</p>
                      <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600&query=messy kitchen with items on counters"
                          alt="Before: Messy kitchen"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">After</p>
                      <div className="relative h-48 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=400&width=600&query=clean kitchen with clear counters and good lighting"
                          alt="After: Clean kitchen with clear counters"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Day of Shoot */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">On Photo Day</h2>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Final Preparations</h3>
                  <p className="text-gray-600">Last-minute tasks before the photographer arrives</p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">Turn on all interior and exterior lights</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">Open all blinds and curtains</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">Turn off ceiling fans and TVs</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">Secure pets in a safe area away from the shoot</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <p className="text-gray-700">Plan to be away or stay in an area not being photographed</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Your Photo Shoot?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            If you have any questions about preparing your home, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact-us">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/book-now">Book a Shoot</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
