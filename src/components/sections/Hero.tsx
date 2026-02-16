import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShoppingCart, TrendingUp, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
          >
            <Sparkles size={14} />
            Plataforma #1 para Lojistas
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6"
          >
            Sua Loja Online em
            <span className="text-orange-500"> Minutos</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-8"
          >
            Crie sua loja virtual profissional, gerencie produtos e vendas, e receba pagamentos via PIX. Tudo em um só lugar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/vendedor"
              className="h-14 px-8 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight size={18} />
            </Link>
            <a
              href="#recursos"
              className="h-14 px-8 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center"
            >
              Ver Recursos
            </a>
          </motion.div>
        </div>

        {/* Hero Image/Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-4 max-w-5xl mx-auto">
            {/* Browser mockup */}
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="bg-white rounded-xl overflow-hidden">
                {/* Dashboard Preview */}
                <div className="aspect-video p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: ShoppingCart, label: 'Pedidos', value: '127', color: 'text-blue-600' },
                      { icon: TrendingUp, label: 'Vendas', value: 'R$ 12.450', color: 'text-green-600' },
                      { icon: Users, label: 'Clientes', value: '89', color: 'text-orange-600' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-xl">
                        <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                        <p className="text-xs text-gray-500">{stat.label}</p>
                        <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="h-24 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Recent orders */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 mb-3">Pedidos Recentes</p>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 bg-white p-2 rounded-lg">
                          <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-24" />
                          </div>
                          <div className="h-3 bg-orange-200 rounded w-12" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Vendas hoje</p>
                <p className="font-bold text-gray-900">R$ 2.340</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 hidden lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Novo pedido</p>
                <p className="font-bold text-gray-900">#TRQ-1234</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
