import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const bookButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BookButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bookButtonVariants> {
  href: string
  asChild?: boolean
}

const BookButton = React.forwardRef<HTMLButtonElement, BookButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    return (
      <Link href={href} passHref>
        <button className={cn(bookButtonVariants({ variant, size, className }))} ref={ref} {...props} />
      </Link>
    )
  },
)
BookButton.displayName = "BookButton"

export { BookButton, bookButtonVariants }
