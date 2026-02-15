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
  {
    name: 'Enterprise',
    price: null,
    description: 'Solução personalizada',
    features: [
      'Lojas ilimitadas',
      'Tudo do Pro +',
      'Servidor dedicado',
      'SLA garantido',
      'Consultor dedicado',
      'Integrações customizadas',
    ],
    cta: 'Falar com Vendas',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'Posso testar antes de pagar?',
    answer: 'Sim! Você pode usar o plano gratuito por tempo ilimitado ou testar os recursos premium por 14 dias sem precisar de cartão de crédito.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos PIX, cartão de crédito e boleto bancário. Todos os pagamentos são processados de forma segura.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer: 'Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas imediatamente.',
  },
  {
    question: 'Tenho que pagar taxa sobre vendas?',
    answer: 'Não! No TriqHub você paga apenas a mensalidade do plano. Não cobramos taxas sobre suas vendas.',
  },
]

export default function Pricing() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Planos e Preços
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme crescer.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-6",
                plan.highlighted
                  ? "bg-orange-500 text-white shadow-xl shadow-orange-500/25 lg:scale-105 z-10"
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

              <div className="mb-4">
                <h3 className={cn(
                  "text-xl font-bold mb-1",
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
                {plan.price === null ? (
                  <span className={cn(
                    "text-2xl font-bold",
                    plan.highlighted ? "text-white" : "text-gray-900"
                  )}>
                    Personalizado
                  </span>
                ) : (
                  <>
                    <span className={cn(
                      "text-3xl font-bold",
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
                  </>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={cn(
                       "h-4 w-4 flex-shrink-0 mt-0.5",
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
                   "block w-full py-2.5 px-4 rounded-lg font-semibold text-center text-sm transition-colors",
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
