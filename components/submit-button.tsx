'use client'

import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ISubmitButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

export function SubmitButton({
  children,
  className,
  ...props
}: ISubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className={cn('', className)}
      {...props}
    >
      {pending ? 'Загрузка' : children}
    </Button>
  )
}
