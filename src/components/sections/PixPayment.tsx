import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, MessageCircle, QrCode, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { createPixCharge, pollPaymentStatus, type PaymentStatusResponse } from '@/lib/api'

// PIX Key from UdiPods - should be configured in environment
const PIX_KEY = import.meta.env.VITE_PIX_KEY || 'udiapods@gmail.com'
const PIX_VALUE = 100.00
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999'

interface PixPaymentProps {
  customerData: {
    name: string;
    email: string;
    phone: string;
    storeName: string;
  }
}

type PaymentState = 'idle' | 'loading' | 'pending' | 'completed' | 'error'

export default function PixPayment({ customerData }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [correlationId, setCorrelationId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    generatePixCharge()
  }, [])

  useEffect(() => {
    if (paymentState === 'pending' && correlationId) {
      const { stop } = pollPaymentStatus(correlationId, (status: PaymentStatusResponse) => {
        if (status.status === 'completed') {
          setPaymentState('completed')
        } else if (status.status === 'expired' || status.status === 'failed') {
          setPaymentState('error')
          setError('Pagamento expirado ou falhou. Tente novamente.')
        }
      })

      return () => stop()
    }
  }, [paymentState, correlationId])

  const generatePixCharge = async () => {
    setPaymentState('loading')
    setError(null)

    try {
      // Try to create a charge via API
      const response = await createPixCharge({
        customer: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
        },
        storeName: customerData.storeName,
      })

      setQrCodeImage(response.qrCodeImage)
      setQrCode(response.qrCode || PIX_KEY)
      setCorrelationId(response.correlationId)
      setPaymentState('pending')
    } catch (err) {
      // Fallback to static PIX key if API fails
      console.log('API not available, using static PIX key')
      setQrCode(PIX_KEY)
      setQrCodeImage(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PIX_KEY)}`)
      setPaymentState('pending')
    }
  }

  const handleCopyPixKey = async () => {
    const textToCopy = qrCode || PIX_KEY
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
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
    const message = encodeURIComponent(`Olá! Acabei de fazer o pagamento de R$100 para abrir minha loja na TriqHub.\n\nLoja: ${customerData.storeName}\nNome: ${customerData.name}\nEmail: ${customerData.email}\n\nSegue o comprovante:`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  if (paymentState === 'loading') {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <Loader2 className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Gerando QR Code PIX...</p>
      </div>
    )
  }

  if (paymentState === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h2>
        <p className="text-gray-600 mb-6">
          Sua loja está sendo criada. Você receberá os dados de acesso no email <strong>{customerData.email}</strong>
        </p>
        <a
          href="https://admin.triqhub.com"
          className="inline-flex items-center justify-center h-12 px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-colors"
        >
          Acessar Painel
        </a>
      </motion.div>
    )
  }

  if (paymentState === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
      >
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro no Pagamento</h2>
        <p className="text-gray-600 mb-6">{error || 'Ocorreu um erro ao processar o pagamento.'}</p>
        <button
          onClick={generatePixCharge}
          className="inline-flex items-center justify-center h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-colors"
        >
          Tentar Novamente
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <QrCode className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">Pagamento PIX</p>
              <p className="text-orange-100 text-sm">Taxa única de adesão</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white text-2xl font-black">
              R$ {PIX_VALUE.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Area */}
      <div className="p-6 flex flex-col items-center">
        {/* QR Code */}
        <div className="bg-gray-50 p-4 rounded-2xl mb-4">
          {qrCodeImage ? (
            <img
              src={qrCodeImage}
              alt="QR Code PIX"
              className="w-48 h-48"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* PIX Key */}
        <div className="w-full bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-500 text-xs mb-2 text-center">Chave PIX (Email)</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-gray-900 font-mono text-center flex-1 break-all text-sm">
              {qrCode || PIX_KEY}
            </p>
            <button
              onClick={handleCopyPixKey}
              className="flex-shrink-0 p-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
              title="Copiar chave PIX"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5 text-orange-600" />
              )}
            </button>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyPixKey}
          className={`w-full h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            copied
              ? 'bg-green-100 text-green-700 border-2 border-green-300'
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
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="text-gray-900 font-semibold">Como pagar:</span>
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

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
          <p className="text-orange-700 text-sm text-center font-medium">
            Após o pagamento, envie o comprovante para o WhatsApp para liberarmos sua loja.
          </p>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppContact}
          className="w-full h-12 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          Enviar Comprovante no WhatsApp
        </button>
      </div>

      {/* Security note */}
      <div className="px-6 pb-6">
        <p className="text-gray-400 text-xs text-center">
          Pagamento processado de forma segura. Seus dados estão protegidos.
        </p>
      </div>
    </motion.div>
  )
}
