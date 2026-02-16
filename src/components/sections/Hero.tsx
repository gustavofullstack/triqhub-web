import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShoppingCart, TrendingUp, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-8"
          >
            <Sparkles size={14} className="animate-pulse" />
            Plataforma #1 para Lojistas
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8 text-balance"
          >
            Sua Loja Online em
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Minutos</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance"
          >
            Crie sua loja virtual profissional, gerencie produtos e vendas, e receba pagamentos via PIX com a menor taxa do mercado.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Link
              to="/vendedor"
              className="w-full sm:w-auto h-14 px-10 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-base tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight size={20} />
            </Link>
            <a
              href="#recursos"
              className="w-full sm:w-auto h-14 px-10 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 rounded-2xl font-bold text-base transition-all hover:bg-gray-50 flex items-center justify-center"
            >
              Ver Recursos
            </a>
          </motion.div>
        </div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 sm:mt-16 relative"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-3 sm:p-4 max-w-5xl mx-auto">
            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden">
                <div className="aspect-video p-3 sm:p-6">
                  {/* Stats - MINIMUM 12px TEXT */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {[
                      { icon: ShoppingCart, label: 'Pedidos', value: '127', color: 'text-blue-600' },
                      { icon: TrendingUp, label: 'Vendas', value: 'R$ 12.450', color: 'text-green-600' },
                      { icon: Users, label: 'Clientes', value: '89', color: 'text-orange-600' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 p-2 sm:p-4 rounded-lg sm:rounded-xl">
                        <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color} mb-1 sm:mb-2`} />
                        <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                        <p className="text-sm sm:text-lg font-bold text-gray-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart - hidden on mobile */}
                  <div className="bg-gray-50 p-2 sm:p-4 rounded-lg sm:rounded-xl mb-3 sm:mb-4 hidden sm:block">
                    <div className="h-16 sm:h-24 flex items-end gap-1 sm:gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Orders */}
                  <div className="bg-gray-50 p-2 sm:p-4 rounded-lg sm:rounded-xl">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3">Pedidos Recentes</p>
                    <div className="space-y-1.5 sm:space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-2 rounded-lg">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="h-2 sm:h-3 bg-gray-200 rounded w-16 sm:w-24" />
                          </div>
                          <div className="h-2 sm:h-3 bg-orange-200 rounded w-10 sm:w-12 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
