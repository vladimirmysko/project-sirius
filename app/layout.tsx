import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'

const inter = localFont({
  src: [
    {
      path: '../fonts/InterDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sirius by Vega Ventures',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body
        className={cn(
          inter.variable,
          'font-inter antialiased selection:bg-teal-300 selection:text-neutral-950',
        )}
      >
        {children}
      </body>
    </html>
  )
}
