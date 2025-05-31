"use client"

import { BookButton } from "../ui/book-button"

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-white text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
          Get started to turn your listing into their dream home.
        </h2>
        <div className="mt-6">
          <BookButton href="/book-now" size="lg">
            Get Started
          </BookButton>
        </div>
      </div>
    </section>
  )
}
