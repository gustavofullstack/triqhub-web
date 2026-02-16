import { motion } from 'framer-motion'
import { Store, Package, QrCode, Truck, BarChart3, Headphones, Smartphone, MessageSquare } from 'lucide-react'

const features = [
  { icon: Store, title: 'Loja Personalizada', description: 'Crie sua loja com sua marca e cores.' },
  { icon: Package, title: 'Gestão de Produtos', description: 'Cadastre produtos com variações.' },
  { icon: QrCode, title: 'Pagamentos PIX', description: 'Receba pagamentos instantâneos.' },
  { icon: Truck, title: 'Entrega ou Retirada', description: 'Configure áreas de entrega.' },
  { icon: BarChart3, title: 'Dashboard de Vendas', description: 'Métricas em tempo real.' },
  { icon: Headphones, title: 'Suporte Dedicado', description: 'Ajuda via WhatsApp.' },
  { icon: Smartphone, title: '100% Responsivo', description: 'Funciona em qualquer dispositivo.' },
  { icon: MessageSquare, title: 'WhatsApp Integrado', description: 'Receba pedidos via WhatsApp.' },
]

export default function Features() {
  return (
    <section id="recursos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-black text-orange-600 uppercase tracking-widest">
            Recursos
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mt-2">
            Tudo que você precisa
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-4 max-w-2xl mx-auto">
            Uma plataforma completa para gerenciar sua loja e aumentar suas vendas.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-3 sm:p-6 bg-gray-50 hover:bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 text-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <feature.icon size={18} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-base lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-[10px] sm:text-sm text-gray-600 hidden sm:block">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
