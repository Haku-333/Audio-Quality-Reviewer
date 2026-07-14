import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-white/10 text-white hover:bg-white/20",
  studio: "bg-amber-500/15 text-amber-500 border-amber-500/20",
  pro: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",
  standard: "bg-orange-500/15 text-orange-500 border-orange-500/20",
  fail: "bg-red-500/15 text-red-500 border-red-500/20",
  outline: "text-gray-300 border-gray-600/50",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
