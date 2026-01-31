import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleMapsProvider } from '@/components/providers/google-maps-provider'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Flare - Trip Planning with Calorie Tracking',
  description: 'Plan your trips and track calories burned across different transport options',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <GoogleMapsProvider>
          {children}
        </GoogleMapsProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
