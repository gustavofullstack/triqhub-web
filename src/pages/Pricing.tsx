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

const faqs = [
  {
    question: 'Posso testar antes de pagar?',
    answer: 'Sim! Você pode usar o plano gratuito por tempo ilimitado ou testar os recursos premium por 14 dias sem precisar de cartão de crédito.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos PIX para o plano Pro. É rápido, seguro e você tem acesso imediato à plataforma.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Claro! Você pode fazer upgrade do seu plano a qualquer momento. As alterações são aplicadas imediatamente.',
  },
  {
    question: 'Tenho que pagar taxa sobre vendas?',
    answer: 'Não! No TriqHub você paga apenas a taxa única do plano Pro. Não cobramos taxas sobre suas vendas.',
  },
  {
    question: 'O que está incluído no plano Pro?',
    answer: 'O plano Pro inclui: loja online personalizada, produtos ilimitados, pagamentos via PIX, dashboard de vendas, relatórios, integração com WhatsApp e suporte prioritário.',
  },
]

export default function Pricing() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
          >
            <Sparkles size={14} />
            Preços
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-4"
          >
            Planos e Preços
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme crescer.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-gray-900 text-center mb-8"
          >
            Perguntas Frequentes
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
