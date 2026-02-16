import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  dark?: boolean
}

export default function Layout({ children, dark = false }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden ${dark ? 'bg-gray-50' : 'bg-white'}`}>
      <Header />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
