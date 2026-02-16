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
    <section id="recursos" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-black text-orange-600 uppercase tracking-[0.2em]"
          >
            Recursos Premium
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mt-4 tracking-tight"
          >
            Tudo que você precisa para <span className="text-orange-500">escalar</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto text-balance"
          >
            Uma infraestrutura completa, robusta e intuitiva para você focar apenas no que importa: suas vendas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-white hover:bg-orange-50/30 rounded-3xl border border-gray-100 hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
