import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 lg:p-16"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para começar a vender?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-xl mx-auto">
              Crie sua loja online em minutos e comece a vender hoje mesmo. 
              Teste grátis por 14 dias, sem necessidade de cartão de crédito.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                 href="https://admin.triqhub.com/register"
                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-all hover:shadow-lg"
               >
                Criar Loja Grátis
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="https://admin.triqhub.com"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
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
