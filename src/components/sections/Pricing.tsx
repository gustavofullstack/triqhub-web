import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Básico',
    price: 0,
    description: 'Para começar',
    features: ['1 loja', 'Até 50 produtos', 'Painel admin', 'Suporte email'],
    cta: 'Começar Grátis',
    highlighted: false,
    link: 'https://admin.triqhub.com/register',
  },
  {
    name: 'Pro',
    price: 100,
    description: 'Para crescer',
    priceNote: 'taxa única',
    features: ['1 loja', 'Produtos ilimitados', 'Relatórios', 'WhatsApp', 'PIX', 'Suporte VIP'],
    cta: 'Começar Agora',
    highlighted: true,
    badge: 'Popular',
    link: '/vendedor',
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Solução completa',
    features: ['Lojas ilimitadas', 'API completa', 'Servidor dedicado', 'Suporte 24/7'],
    cta: 'Falar com Vendas',
    highlighted: false,
    link: '/contato',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-black text-orange-600 uppercase tracking-widest">
            Preços
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-4">
            Comece grátis e escale conforme cresce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8",
                plan.highlighted
                  ? "bg-gray-900 text-white shadow-2xl scale-100 md:scale-105 z-10"
                  : "bg-white border border-gray-200"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                    <Sparkles size={10} className="sm:w-3 sm:h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <h3 className={cn(
                  "text-base sm:text-xl font-bold mb-0.5 sm:mb-1",
                  plan.highlighted ? "text-white" : "text-gray-900"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                  "text-xs sm:text-sm",
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                )}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                {plan.price === null ? (
                  <span className={cn(
                    "text-xl sm:text-3xl font-black",
                    plan.highlighted ? "text-white" : "text-gray-900"
                  )}>
                    Personalizado
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className={cn(
                      "text-2xl sm:text-4xl font-black",
                      plan.highlighted ? "text-white" : "text-gray-900"
                    )}>
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                    </span>
                    {plan.priceNote && (
                      <span className={cn(
                        "text-xs sm:text-sm font-medium",
                        plan.highlighted ? "text-gray-400" : "text-gray-500"
                      )}>
                        {plan.priceNote}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-1.5 sm:space-y-3 mb-4 sm:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5",
                      plan.highlighted ? "text-orange-400" : "text-orange-500"
                    )} />
                    <span className={cn(
                      "text-xs sm:text-sm",
                      plan.highlighted ? "text-gray-300" : "text-gray-600"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.link.startsWith('/') ? (
                <Link
                  to={plan.link}
                  className={cn(
                    "block w-full h-10 sm:h-12 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-center leading-[40px] sm:leading-[48px] transition-colors",
                    plan.highlighted
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-900 hover:bg-black text-white"
                  )}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.link}
                  className={cn(
                    "block w-full h-10 sm:h-12 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-center leading-[40px] sm:leading-[48px] transition-colors",
                    plan.highlighted
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-900 hover:bg-black text-white"
                  )}
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-12">
          Tem dúvidas?{' '}
          <Link to="/contato" className="text-orange-600 hover:text-orange-700 font-semibold">
            Fale conosco
          </Link>
        </p>
      </div>
    </section>
  )
}
