import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#6A5ACD] text-white shadow-lg shadow-[#6A5ACD]/30 hover:bg-[#4E44A9] hover:shadow-xl hover:shadow-[#6A5ACD]/40 active:scale-95",
        secondary:
          "bg-[#9B87FF] text-white hover:bg-[#6A5ACD] shadow-md hover:shadow-lg active:scale-95",
        outline:
          "border-2 border-[#6A5ACD] bg-transparent text-[#6A5ACD] hover:bg-[#6A5ACD]/10 active:scale-95",
        ghost: "hover:bg-[#C7BFFF]/20 text-[#6A5ACD] active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
