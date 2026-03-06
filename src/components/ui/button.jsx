import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-white text-black hover:bg-white/90": !variant || variant === "default",
          "bg-red-500 text-white hover:bg-red-500/90": variant === "destructive",
          "border border-white/20 bg-transparent hover:bg-white/10 text-white": variant === "outline",
          "hover:bg-white/10 text-white": variant === "ghost",
          "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm": variant === "glass",
        },
        {
          "h-10 px-4 py-2": !size || size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
