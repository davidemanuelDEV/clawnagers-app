"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openItem: string | null
  toggle: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItem: null,
  toggle: () => {},
})

function Accordion({
  type = "single",
  collapsible = true,
  className,
  children,
  ...props
}: {
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItem((prev) => (prev === value && collapsible ? null : value))
    },
    [collapsible]
  )

  return (
    <AccordionContext.Provider value={{ openItem, toggle }}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  value,
  className,
  children,
  ...props
}: {
  value: string
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const { openItem } = React.useContext(AccordionContext)
  const isOpen = openItem === value

  return (
    <div
      className={cn(className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ value?: string }>, { value })
        }
        return child
      })}
    </div>
  )
}

function AccordionTrigger({
  className,
  children,
  value,
  ...props
}: {
  className?: string
  children: React.ReactNode
  value?: string
} & React.HTMLAttributes<HTMLButtonElement>) {
  const { openItem, toggle } = React.useContext(AccordionContext)
  const isOpen = openItem === value

  return (
    <button
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => value && toggle(value)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </button>
  )
}

function AccordionContent({
  className,
  children,
  value,
  ...props
}: {
  className?: string
  children: React.ReactNode
  value?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const { openItem } = React.useContext(AccordionContext)
  const isOpen = openItem === value

  if (!isOpen) return null

  return (
    <div
      className={cn("overflow-hidden text-sm pb-4 pt-0", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
