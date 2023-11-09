import type { Metadata } from 'next'
import { Inter, Josefin_Sans } from 'next/font/google'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const inter = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
