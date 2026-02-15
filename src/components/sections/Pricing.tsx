import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Grátis',
    price: 0,
    description: 'Perfeito para começar',
    features: [
      '1 loja',
      'Até 50 produtos',
      'Gestão de pedidos básica',
      'Painel administrativo',
      'Suporte por email',
    ],
    cta: 'Começar Grátis',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: 79,
    description: 'Para negócios em crescimento',
    features: [
      '1 loja',
      'Produtos ilimitados',
      'Gestão completa de pedidos',
      'Relatórios de vendas',
      'Integração WhatsApp',
      'Suporte prioritário',
    ],
    cta: 'Começar Agora',
    highlighted: true,
    badge: 'Mais Popular',
  },
  {
    name: 'Pro',
    price: 199,
    description: 'Para negócios estabelecidos',
    features: [
      'Até 3 lojas',
      'Produtos ilimitados',
      'API completa',
      'Múltiplos usuários',
      'Relatórios avançados',
      'Suporte 24/7',
      'Personalização avançada',
    ],
    cta: 'Falar com Vendas',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-4"
          >
            Preços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Planos que cabem no seu bolso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Comece grátis e escale conforme seu negócio cresce. Sem surpresas.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-6 lg:p-8",
                plan.highlighted
                  ? "bg-orange-500 text-white shadow-xl shadow-orange-500/25 scale-105 z-10"
                  : "bg-white border border-gray-200"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  plan.highlighted ? "text-white" : "text-gray-900"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                   "text-sm",
                   plan.highlighted ? "text-orange-100" : "text-gray-500"
                 )}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={cn(
                  "text-4xl font-bold",
                  plan.highlighted ? "text-white" : "text-gray-900"
                )}>
                  {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className={cn(
                     "text-sm",
                     plan.highlighted ? "text-orange-100" : "text-gray-500"
                   )}>
                     /mês
                   </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={cn(
                       "h-5 w-5 flex-shrink-0 mt-0.5",
                       plan.highlighted ? "text-orange-100" : "text-orange-500"
                     )} />
                    <span className={cn(
                      "text-sm",
                      plan.highlighted ? "text-white" : "text-gray-600"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                 href="https://admin.triqhub.com/register"
                 className={cn(
                   "block w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors",
                   plan.highlighted
                     ? "bg-white text-orange-500 hover:bg-orange-50"
                     : "bg-orange-500 text-white hover:bg-orange-600"
                 )}
               >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center text-gray-500 mt-12"
         >
           Tem dúvidas?{' '}
           <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
             Veja nossas perguntas frequentes
           </a>
         </motion.p>
      </div>
    </section>
  )
}
