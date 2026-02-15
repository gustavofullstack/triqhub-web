import { motion } from 'framer-motion'
import { 
  Store, 
  ShoppingCart, 
  BarChart3, 
  Truck, 
  CreditCard, 
  Smartphone,
  MessageSquare,
  Settings
} from 'lucide-react'

const features = [
  {
    icon: Store,
    title: 'Loja Personalizada',
    description: 'Crie sua loja com sua marca, cores e logo. Personalize cada detalhe.',
  },
  {
    icon: ShoppingCart,
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos com variações, categorias e controle de estoque.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios Detalhados',
    description: 'Acompanhe vendas, pedidos e métricas em tempo real.',
  },
  {
    icon: Truck,
    title: 'Gestão de Entregas',
    description: 'Configure áreas de entrega, taxas e acompanhe seus pedidos.',
  },
  {
    icon: CreditCard,
    title: 'Pagamentos Integrados',
    description: 'Receba via PIX, cartão de crédito e débito de forma simples.',
  },
  {
    icon: Smartphone,
    title: '100% Responsivo',
    description: 'Sua loja funciona perfeitamente em qualquer dispositivo.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integrado',
    description: 'Receba pedidos e notifique clientes via WhatsApp.',
  },
  {
    icon: Settings,
    title: 'Fácil de Configurar',
    description: 'Configure sua loja em minutos, sem precisar de conhecimento técnico.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-4"
          >
            Recursos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Tudo que você precisa para vender online
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Uma plataforma completa com todos os recursos para gerenciar sua loja e aumentar suas vendas.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                <feature.icon className="h-6 w-6 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
