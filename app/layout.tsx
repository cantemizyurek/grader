import type { Metadata } from 'next'
import './globals.css'
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Mark Grading',
  description: 'Student grading system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  )
}
