import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

export const BookButton = React.forwardRef<HTMLButtonElement, BookButtonProps>(
  ({ className, href, variant = "default", size = "default", children, ...props }, ref) => {
    const buttonClasses = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      {
        "bg-[#3182ce] text-white hover:bg-[#2c5282] shadow-md hover:shadow-lg": variant === "default",
        "border-2 border-[#3182ce] text-[#3182ce] hover:bg-[#3182ce] hover:text-white": variant === "outline",
        "text-[#3182ce] hover:bg-blue-50": variant === "ghost",
        "h-10 px-6 py-2": size === "default",
        "h-9 px-4 py-1 text-sm": size === "sm",
        "h-12 px-8 py-3 text-lg": size === "lg",
      },
      className,
    )

    if (href) {
      return (
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    )
  },
)

BookButton.displayName = "BookButton"
