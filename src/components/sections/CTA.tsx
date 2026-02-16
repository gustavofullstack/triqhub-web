import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-3xl p-8 lg:p-16"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
            >
              <Zap size={14} />
              Comece Hoje
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              Pronto para começar a vender?
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Crie sua loja online em minutos e comece a vender hoje mesmo. 
              Taxa única de R$100, sem mensalidades.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/vendedor"
                className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                Criar Minha Loja
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://admin.triqhub.com"
                className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-sm transition-colors"
              >
                Já tenho conta
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
