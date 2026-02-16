import { Link } from 'react-router-dom'
import { Zap, Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-white" fill="white" />
              </div>
              <span className="text-xl font-black text-gray-900">TriqHub</span>
            </Link>
            <p className="text-gray-600 mb-6">
              A plataforma completa de e-commerce para lojistas que querem vender mais.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-xl flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-xl flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-xl flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Produto</h3>
            <ul className="space-y-3">
              <li>
                <a href="#recursos" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <Link to="/precos" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Integrações
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Atualizações
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <Link to="/contato" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contato@triqhub.com" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Mail className="h-4 w-4" />
                  contato@triqhub.com
                </a>
              </li>
              <li>
                <a href="tel:+5511999999999" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Phone className="h-4 w-4" />
                  (11) 99999-9999
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TriqHub. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Feito com ❤️ para lojistas do Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
