import { motion } from 'framer-motion'
import { 
  Store, 
  Package, 
  QrCode, 
  Truck, 
  BarChart3, 
  Headphones,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useState } from 'react'
import PixPayment from '@/components/sections/PixPayment'

const benefits = [
  {
    icon: Store,
    title: 'Loja Online Personalizada',
    description: 'Crie sua loja com sua marca, cores e logo. Personalize cada detalhe.',
  },
  {
    icon: Package,
    title: 'Gestão de Produtos Simplificada',
    description: 'Cadastre produtos com variações, categorias e controle de estoque automático.',
  },
  {
    icon: QrCode,
    title: 'Pagamentos via PIX Integrado',
    description: 'Receba pagamentos instantâneos via PIX com confirmação automática.',
  },
  {
    icon: Truck,
    title: 'Entrega ou Retirada',
    description: 'Configure áreas de entrega ou permita retirada no local.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de Vendas',
    description: 'Acompanhe vendas, pedidos e métricas em tempo real.',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Ajuda via WhatsApp sempre que precisar.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Pague a taxa única',
    description: 'R$100,00 apenas uma vez via PIX. Sem mensalidades ou taxas escondidas.',
  },
  {
    number: '02',
    title: 'Configure sua loja',
    description: 'Em poucos minutos você cadastra seus produtos e personaliza sua loja.',
  },
  {
    number: '03',
    title: 'Comece a vender!',
    description: 'Sua loja fica online imediatamente. Compartilhe o link e venda.',
  },
]

const faqs = [
  {
    question: 'O que está incluído na taxa de R$100?',
    answer: 'A taxa única de R$100 dá acesso completo à plataforma TriqHub, incluindo: loja online personalizada, gestão de produtos, pagamentos via PIX, dashboard de vendas, relatórios e suporte via WhatsApp. Não há mensalidades ou taxas adicionais.',
  },
  {
    question: 'Quanto tempo leva para minha loja ficar pronta?',
    answer: 'Após a confirmação do pagamento, sua loja fica disponível imediatamente. O cadastro inicial de produtos e personalização leva em média 15-30 minutos.',
  },
  {
    question: 'Posso vender qualquer tipo de produto?',
    answer: 'A plataforma é ideal para lojas de varejo, especialmente vapeshops, lojas de conveniência, boutiques e comércios em geral. Produtos ilegais ou que violem os termos de uso não são permitidos.',
  },
  {
    question: 'Como funciona o recebimento dos pagamentos?',
    answer: 'Os pagamentos via PIX são creditados diretamente na sua conta. A plataforma apenas processa a transação, o dinheiro vai direto para você sem intermediários.',
  },
  {
    question: 'Preciso de conhecimento técnico?',
    answer: 'Não! A plataforma foi desenvolvida para ser simples e intuitiva. Se você consegue usar um smartphone, consegue gerenciar sua loja.',
  },
  {
    question: 'E se eu precisar de ajuda?',
    answer: 'Oferecemos suporte via WhatsApp para tirar dúvidas e ajudar com qualquer problema. Respondemos em até 24 horas, geralmente muito menos.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function SellerSignup() {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-orange-400">Vagas limitadas</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Comece a Vender Online com a{' '}
              <span className="text-orange-500">TriqHub</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Plataforma completa para sua loja, pagando apenas{' '}
              <span className="text-white font-semibold">R$100 única vez</span>. 
              Sem mensalidades, sem taxas escondidas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <a
                href="#pagamento"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25 text-lg"
              >
                Quero Começar Agora
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Taxa única
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Sem mensalidade
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Suporte incluso
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-4"
            >
              Benefícios
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Tudo que você precisa para vender online
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400"
            >
              Uma plataforma completa, simples e poderosa.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <benefit.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-4"
            >
              Como Funciona
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Em 3 passos simples
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                )}
                
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PIX Payment Section */}
      <section id="pagamento" className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-4"
            >
              Pagamento
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Pague via PIX e comece agora
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400"
            >
              Taxa única de <span className="text-orange-500 font-bold text-2xl">R$100,00</span>. Sem mensalidades.
            </motion.p>
          </div>

          <PixPayment />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full mb-4"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Perguntas Frequentes
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 lg:p-16"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Pronto para começar?
              </h2>
              <p className="text-lg text-orange-100 mb-8 max-w-xl mx-auto">
                Entre em contato pelo WhatsApp e tire suas dúvidas. 
                Estamos prontos para ajudar você a abrir sua loja online.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/5511999999999?text=Olá! Tenho interesse em abrir uma loja na TriqHub."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all hover:shadow-lg text-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar no WhatsApp
                </a>
                <a
                  href="#pagamento"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                >
                  Pagar Agora
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
