import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Recursos', href: '#features' },
    { name: 'Preços', href: '/precos' },
    { name: 'Seja Parceiro', href: '/vendedor' },
    { name: 'Contato', href: '/contato' },
  ]

  const isHome = location.pathname === '/'

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-colors",
      isHome ? "bg-white/80 backdrop-blur-md" : "bg-white border-b border-gray-200"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TriqHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://admin.triqhub.com"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Entrar
            </a>
            <a
              href="https://admin.triqhub.com/register"
              className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Criar Loja Grátis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
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
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a
                  href="https://admin.triqhub.com"
                  className="block px-4 py-2 text-gray-600 font-medium"
                >
                  Entrar
                </a>
                <a
                  href="https://admin.triqhub.com/register"
                  className="block px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold text-center"
                >
                  Criar Loja Grátis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
