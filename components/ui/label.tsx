'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    className={cn('text-sm font-medium text-neutral-950', className)}
    ref={ref}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
