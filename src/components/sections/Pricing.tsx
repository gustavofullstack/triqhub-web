import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Básico',
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
    link: 'https://admin.triqhub.com/register',
  },
  {
    name: 'Pro',
    price: 100,
    description: 'Para negócios em crescimento',
    priceNote: 'taxa única',
    features: [
      '1 loja',
      'Produtos ilimitados',
      'Gestão completa de pedidos',
      'Relatórios de vendas',
      'Integração WhatsApp',
      'Suporte prioritário',
      'Pagamentos via PIX',
    ],
    cta: 'Começar Agora',
    highlighted: true,
    badge: 'Mais Popular',
    link: '/vendedor',
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Solução personalizada',
    features: [
      'Lojas ilimitadas',
      'Tudo do Pro +',
      'API completa',
      'Múltiplos usuários',
      'Servidor dedicado',
      'Suporte 24/7',
    ],
    cta: 'Falar com Vendas',
    highlighted: false,
    link: '/contato',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black text-orange-600 uppercase tracking-widest"
          >
            Preços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mt-2"
          >
            Planos que cabem no seu bolso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mt-4"
          >
            Comece grátis e escale conforme seu negócio cresce. Sem surpresas.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-3xl p-6 sm:p-8",
                plan.highlighted
                  ? "bg-gray-900 text-white shadow-2xl scale-105 z-10"
                  : "bg-white border border-gray-200"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    <Sparkles size={12} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn(
                  "text-xl font-bold mb-1",
                  plan.highlighted ? "text-white" : "text-gray-900"
                )}>
                  {plan.name}
                </h3>
                <p className={cn(
                  "text-sm",
                  plan.highlighted ? "text-gray-400" : "text-gray-500"
                )}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                {plan.price === null ? (
                  <span className={cn(
                    "text-3xl font-black",
                    plan.highlighted ? "text-white" : "text-gray-900"
                  )}>
                    Personalizado
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className={cn(
                      "text-4xl font-black",
                      plan.highlighted ? "text-white" : "text-gray-900"
                    )}>
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                    </span>
                    {plan.priceNote && (
                      <span className={cn(
                        "text-sm font-medium",
                        plan.highlighted ? "text-gray-400" : "text-gray-500"
                      )}>
                        {plan.priceNote}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={cn(
                      "h-5 w-5 flex-shrink-0 mt-0.5",
                      plan.highlighted ? "text-orange-400" : "text-orange-500"
                    )} />
                    <span className={cn(
                      "text-sm",
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
                    "block w-full h-12 rounded-xl font-bold text-sm text-center leading-[48px] transition-colors",
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
                    "block w-full h-12 rounded-xl font-bold text-sm text-center leading-[48px] transition-colors",
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

        {/* Trust Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          Tem dúvidas?{' '}
          <Link to="/contato" className="text-orange-600 hover:text-orange-700 font-semibold">
            Fale conosco
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
