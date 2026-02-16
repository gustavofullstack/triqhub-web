import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap className="h-10 w-10 text-orange-500" />
        </div>
        <div className="text-8xl font-black text-gray-200 mb-4">404</div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Página não encontrada
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 h-12 px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-colors"
        >
          <Home className="h-5 w-5" />
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  )
}
