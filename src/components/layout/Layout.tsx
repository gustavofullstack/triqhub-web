import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  dark?: boolean
}

export default function Layout({ children, dark = false }: LayoutProps) {
  return (
    <div className={`min-h-screen w-full flex flex-col items-center selection:bg-orange-100 selection:text-orange-900 ${dark ? 'bg-gray-50' : 'bg-white'}`}>
      <Header />
      <main className="w-full flex-1 flex flex-col items-center pt-20 animate-entrance">
        {children}
      </main>
      <Footer />
    </div>
  )
}
