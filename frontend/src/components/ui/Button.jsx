import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-white/10 text-white hover:bg-white/20 border border-white/10 shadow-sm",
    primary: "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 shadow-md border border-white/20",
    ghost: "hover:bg-white/10 text-gray-300 hover:text-white",
    outline: "border border-white/10 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white",
  }

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
