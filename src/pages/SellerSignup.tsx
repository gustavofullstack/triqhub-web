import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  QrCode, 
  CheckCircle, 
  Store, 
  Package, 
  BarChart3,
  Headphones
} from 'lucide-react'
import PixPayment from '@/components/sections/PixPayment'

const benefits = [
  {
    icon: Store,
    title: 'Loja Online Personalizada',
    description: 'Crie sua loja com sua marca, cores e logo.',
  },
  {
    icon: Package,
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos com variações e controle de estoque.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de Vendas',
    description: 'Acompanhe vendas e métricas em tempo real.',
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Ajuda via WhatsApp sempre que precisar.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Pague a taxa única',
    description: 'R$100 apenas uma vez via PIX',
  },
  {
    number: '2',
    title: 'Configure sua loja',
    description: 'Em poucos minutos você cadastra seus produtos',
  },
  {
    number: '3',
    title: 'Comece a vender!',
    description: 'Sua loja fica online imediatamente',
  },
]

export default function SellerSignup() {
  const [showPayment, setShowPayment] = useState(false)
  const [formData, setFormData] = useState({
    storeName: '',
    phone: '',
    email: '',
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.storeName && formData.phone && formData.email && formData.name) {
      setShowPayment(true)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
          >
            <Zap size={14} />
            Taxa Única
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
          >
            Comece a Vender Online
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Pague apenas <span className="text-orange-600 font-bold">R$100</span> e tenha sua loja completa
          </motion.p>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <benefit.icon size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {!showPayment ? (
          /* Formulário de Cadastro */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 mb-8"
          >
            <form onSubmit={handleSubmit}>
              {/* Dados da Loja */}
              <div className="space-y-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900">Dados da Loja</h2>
                
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-14 px-4 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 font-medium focus:bg-white focus:border-orange-400 outline-none transition-all"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Nome da sua loja"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full h-14 px-4 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 font-medium focus:bg-white focus:border-orange-400 outline-none transition-all"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Seu WhatsApp (com DDD)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-14 px-4 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 font-medium focus:bg-white focus:border-orange-400 outline-none transition-all"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 px-4 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 font-medium focus:bg-white focus:border-orange-400 outline-none transition-all"
                  required
                />
              </div>

              {/* Included Features */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">O que está incluído:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Loja online personalizada', 'Produtos ilimitados', 'Pagamentos via PIX', 'Suporte via WhatsApp', 'Dashboard de vendas', 'Sem mensalidades'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão Pagar */}
              <button
                type="submit"
                className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={20} />
                Pagar R$100 via PIX
              </button>
            </form>
          </motion.div>
        ) : (
          /* Payment Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowPayment(false)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1"
            >
              ← Voltar e editar dados
            </button>
            <PixPayment customerData={formData} />
          </motion.div>
        )}

        {/* Como Funciona */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Como Funciona</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="font-black text-lg">{step.number}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500"
        >
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Pagamento seguro
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Sem mensalidades
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Suporte incluso
          </span>
        </motion.div>
      </div>
    </section>
  )
}
