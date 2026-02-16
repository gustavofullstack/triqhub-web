import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold mb-4 sm:mb-6"
        >
          <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
          Comece Hoje
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 sm:mb-6"
        >
          Pronto para criar sua loja?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg text-gray-400 mb-6 sm:mb-8 px-2"
        >
          Junte-se a centenas de lojistas que já estão vendendo online com a TriqHub.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/vendedor"
            className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors"
          >
            Criar Minha Loja
            <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
