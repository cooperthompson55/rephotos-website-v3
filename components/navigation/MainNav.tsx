"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BookButton } from "@/components/ui/book-button"
import { Menu, ChevronDown } from "lucide-react"
import Image from "next/image"

// Define dropdown menu items
const serviceDropdownItems = [
  { name: "Photography", href: "/services/photography" },
  { name: "Videography", href: "/services/videography" },
  { name: "Aerial Photos & Video", href: "/services/aerial" },
  { name: "3D Virtual Tours", href: "/services/virtual-tours" },
  { name: "Floor Plans", href: "/services/floor-plans" },
  { name: "Property Websites", href: "/services/websites" },
  { name: "Virtual Staging", href: "/services/virtual-staging" },
]

const aboutDropdownItems = [
  { name: "Our Story", href: "/about-us/our-story" },
  { name: "Careers", href: "/about-us/careers" },
]

const navItems = [
  {
    name: "Why Us",
    href: "/why-us",
    hasDropdown: false,
  },
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: serviceDropdownItems,
  },
  {
    name: "Pricing",
    href: "/pricing",
    hasDropdown: false,
  },
  {
    name: "About",
    href: "/about-us",
    hasDropdown: true,
    dropdownItems: aboutDropdownItems,
  },
  {
    name: "Blog",
    href: "/blog",
    hasDropdown: false,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    hasDropdown: false,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full h-28 flex items-center transition-all duration-300 ${
        scrolled ? "bg-white text-primary shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-44 h-14 relative">
              {scrolled ? (
                <Image
                  src="/images/rephotos-logo-dark.png"
                  alt="RePhotos"
                  width={260}
                  height={80}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              ) : (
                <Image
                  src="/images/re-logo.png"
                  alt="RePhotos"
                  width={260}
                  height={80}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              )}
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            if (item.hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`text-lg transition-colors hover:underline flex items-center ${
                      isActive ? "underline font-medium" : ""
                    } ${scrolled ? "text-primary" : "text-white"}`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 z-50 min-w-[200px] ${activeDropdown === item.name ? "block" : "hidden"}`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md py-2 shadow-md">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-primary hover:underline w-full text-sm"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg transition-colors hover:underline flex items-center ${
                  isActive ? "underline font-medium" : ""
                } ${scrolled ? "text-primary" : "text-white"}`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Book Now button on the far right */}
        <div className="hidden md:block">
          <BookButton href="/book-now" size="default">
            Book Now
          </BookButton>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="block lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`flex items-center justify-center ${scrolled ? "bg-gray-100" : "bg-black/30"} hover:bg-black/50 md:hidden lg:hidden p-0 w-12 h-12`}
            >
              <Menu className={`h-6 w-6 mx-auto my-auto ${scrolled ? "text-primary" : "text-white"}`} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                return (
                  <div key={item.name} className="flex flex-col">
                    {item.hasDropdown ? (
                      <>
                        <button
                          className={`text-lg font-medium flex items-center justify-between hover:underline ${
                            isActive ? "underline" : ""
                          } text-primary`}
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {activeDropdown === item.name && (
                          <div className="ml-4 mt-2 flex flex-col space-y-2">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="text-primary hover:underline"
                                onClick={() => setIsOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-lg font-medium flex items-center hover:underline ${
                          isActive ? "underline" : ""
                        } text-primary`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                )
              })}

              {/* Book Now button in mobile menu */}
              <div className="pt-4 mt-4 border-t">
                <BookButton href="/book-now" className="w-full" onClick={() => setIsOpen(false)}>
                  Book Now
                </BookButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
