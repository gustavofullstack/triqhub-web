import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Recursos', href: '#recursos' },
    { name: 'Preços', href: '/precos' },
    { name: 'Contato', href: '/contato' },
  ]

  const isHome = location.pathname === '/'
  const isSellerPage = location.pathname === '/vendedor' || location.pathname === '/seja-parceiro'

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isHome || isSellerPage
        ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
        : "bg-white border-b border-gray-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="TriqHub"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <span className="text-xl font-black text-gray-900">TriqHub</span>
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            item.href.startsWith('#') ? (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  location.pathname === item.href
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-orange-600"
                )}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://admin.triqhub.com"
            className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Entrar
          </a>
          <Link
            to="/vendedor"
            className="h-10 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-colors"
          >
            Criar Loja
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-600"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-600"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <a
                  href="https://admin.triqhub.com"
                  className="block px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  Entrar
                </a>
                <Link
                  to="/vendedor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-orange-500 text-white rounded-xl text-sm font-bold text-center"
                >
                  Criar Loja
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
