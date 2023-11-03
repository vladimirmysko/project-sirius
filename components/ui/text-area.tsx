'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'rounded-lg border-0 bg-white px-3 py-2 text-base shadow ring-1 ring-neutral-950/10',
      'focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-blue-600',
      className,
      className,
    )}
    ref={ref}
    {...props}
  />
))
TextArea.displayName = 'TextArea'

const TextAreaField = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex flex-col items-stretch gap-2', className)}
    ref={ref}
    {...props}
  />
))
TextAreaField.displayName = 'TextAreaField'

export { TextArea, TextAreaField }
