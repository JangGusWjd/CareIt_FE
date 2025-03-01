'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { metadata } from '@/constants/metadata'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang='en'>
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex w-full justify-center antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <div className='min-h-screen w-full max-w-md'>{children}</div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
