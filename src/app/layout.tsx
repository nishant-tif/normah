import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ReduxProvider } from '@/store/ReduxProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Normah - Responsible AI Governance Infrastructure',
  description: 'Normah is like the governance brain for your AI systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
