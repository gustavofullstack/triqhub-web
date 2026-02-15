import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, MessageCircle, QrCode } from 'lucide-react'

// PIX Key from UdiPods - should be configured in environment
const PIX_KEY = 'udiapods@gmail.com'
const PIX_VALUE = 100.00
const WHATSAPP_NUMBER = '5511999999999' // Should be configured

export default function PixPayment() {
  const [copied, setCopied] = useState(false)

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = PIX_KEY
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Olá! Acabei de fazer o pagamento de R$100 para abrir minha loja na TriqHub. Segue o comprovante:`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Pagamento PIX</p>
                <p className="text-orange-100 text-sm">Taxa única de adesão</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-bold">
                R$ {PIX_VALUE.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Area */}
        <div className="p-6 flex flex-col items-center">
          {/* QR Code Placeholder - Static QR for the PIX key */}
          <div className="bg-white p-4 rounded-xl mb-4">
            {/* Using a placeholder QR code image - in production, generate dynamically */}
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PIX_KEY)}`}
              alt="QR Code PIX"
              className="w-48 h-48"
            />
          </div>

          {/* PIX Key */}
          <div className="w-full bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-gray-400 text-sm mb-2 text-center">Chave PIX (Email)</p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-white font-mono text-center flex-1 break-all">
                {PIX_KEY}
              </p>
              <button
                onClick={handleCopyPixKey}
                className="flex-shrink-0 p-2 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors"
                title="Copiar chave PIX"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-orange-500" />
                )}
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyPixKey}
            className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Chave Copiada!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copiar Chave PIX
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="px-6 pb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white font-medium">Como pagar:</span>
              <br />
              1. Abra o app do seu banco
              <br />
              2. Escolha pagar via PIX
              <br />
              3. Cole a chave PIX ou escaneie o QR Code
              <br />
              4. Confirme o pagamento de R$100,00
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-4">
            <p className="text-orange-400 text-sm text-center">
              Após o pagamento, envie o comprovante para o WhatsApp para liberarmos sua loja.
            </p>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppContact}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar Comprovante no WhatsApp
          </button>
        </div>

        {/* Security note */}
        <div className="px-6 pb-6">
          <p className="text-gray-500 text-xs text-center">
            Pagamento processado de forma segura. Seus dados estão protegidos.
          </p>
        </div>
      </div>
    </motion.div>
  )
}