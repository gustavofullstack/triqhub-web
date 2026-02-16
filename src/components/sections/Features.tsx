import { motion } from 'framer-motion'
import { 
  Store, 
  Package, 
  QrCode, 
  Truck, 
  BarChart3, 
  Headphones,
  Smartphone,
  MessageSquare
} from 'lucide-react'

const features = [
  {
    icon: Store,
    title: 'Loja Personalizada',
    description: 'Crie sua loja com sua marca, cores e logo. Personalize cada detalhe.',
  },
  {
    icon: Package,
    title: 'Gestão de Produtos',
    description: 'Cadastre produtos com variações, categorias e controle de estoque automático.',
  },
  {
    icon: QrCode,
    title: 'Pagamentos via PIX',
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
]

export default function Features() {
  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black text-orange-600 uppercase tracking-widest"
          >
            Recursos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mt-2"
          >
            Tudo que você precisa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Uma plataforma completa com todos os recursos para gerenciar sua loja e aumentar suas vendas.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
