'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(
        'flex flex-row items-baseline gap-2 self-center rounded-full bg-neutral-950 px-5 py-2 text-base font-medium text-white transition hover:bg-neutral-800',
        'focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export { Button }
