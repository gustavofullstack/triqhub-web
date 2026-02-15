import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  ShoppingCart, 
  TrendingUp, 
  Users,
  CheckCircle
} from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-orange-700">Novo: Integração com WhatsApp</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Venda mais com sua{' '}
              <span className="gradient-text">loja online</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Crie sua loja online em minutos. Plataforma completa de e-commerce 
              para logistas que querem vender mais e gerenciar melhor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://admin.triqhub.com/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25"
              >
                Criar Loja Grátis
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <Play className="h-5 w-5" />
                Ver Demo
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Teste grátis por 14 dias
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancele quando quiser
              </span>
            </div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-4 lg:p-6">
              {/* Mock Dashboard */}
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="h-12 bg-gray-900 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-4 flex-1 h-6 bg-gray-800 rounded-md" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: ShoppingCart, label: 'Pedidos', value: '127' },
                        { icon: TrendingUp, label: 'Vendas', value: 'R$ 12.450' },
                        { icon: Users, label: 'Clientes', value: '89' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                           <stat.icon className="h-4 w-4 text-orange-500 mb-1" />
                           <p className="text-xs text-gray-500">{stat.label}</p>
                           <p className="font-bold text-sm">{stat.value}</p>
                         </div>
                      ))}
                    </div>

                    {/* Chart placeholder */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-24 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                           <div
                             key={i}
                             className="flex-1 bg-orange-500 rounded-t opacity-80"
                             style={{ height: `${h}%` }}
                           />
                         ))}
                      </div>
                    </div>

                    {/* Recent orders */}
                    <div className="bg-white p-3 rounded-lg shadow-sm space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full" />
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-24" />
                          </div>
                          <div className="h-3 bg-gray-200 rounded w-12" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendas hoje</p>
                  <p className="font-bold text-lg">R$ 2.340</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                   <ShoppingCart className="h-5 w-5 text-orange-500" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Novo pedido</p>
                   <p className="font-bold">#TRQ-1234</p>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
