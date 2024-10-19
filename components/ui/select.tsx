'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    className={cn(
      'cursor-pointer rounded-lg border-0 bg-white px-3 py-2 text-base shadow ring-1 ring-neutral-950/10',
      'focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-blue-600',
      'disabled:cursor-not-allowed disabled:bg-neutral-100',
      className,
    )}
    ref={ref}
    {...props}
  />
))
Select.displayName = 'Select'

const SelectField = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex flex-col items-stretch gap-2', className)}
    ref={ref}
    {...props}
  />
))
SelectField.displayName = 'SelectField'

export { Select, SelectField }
