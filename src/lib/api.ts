import axios from 'axios';

const API_URL = import.meta.env.VITE_UDIAPODS_API_URL || 'https://api.udiapods.com/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

export interface PixChargeData {
  customer: CustomerData;
  storeName: string;
}

export interface PixChargeResponse {
  correlationId: string;
  qrCodeImage: string;
  qrCode: string;
  value: number;
  status: string;
  expiresAt: string;
}

export interface PaymentStatusResponse {
  status: 'pending' | 'completed' | 'expired' | 'failed';
  correlationId: string;
  paidAt?: string;
}

// Criar cobrança PIX para taxa de cadastro
export const createPixCharge = async (data: PixChargeData): Promise<PixChargeResponse> => {
  const response = await api.post('/seller/pix-charge', {
    value: 10000, // R$100 em centavos
    customer: data.customer,
    metadata: {
      type: 'seller_signup',
      storeName: data.storeName,
    },
  });
  return response.data;
};

// Verificar status do pagamento
export const checkPaymentStatus = async (correlationId: string): Promise<PaymentStatusResponse> => {
  const response = await api.get(`/webhook/payment-status/${correlationId}`);
  return response.data;
};

// Polling para verificar pagamento
export const pollPaymentStatus = (
  correlationId: string,
  onStatusChange: (status: PaymentStatusResponse) => void,
  intervalMs = 5000,
  maxAttempts = 60
): { stop: () => void } => {
  let attempts = 0;
  let intervalId: number | null = null;

  const check = async () => {
    if (attempts >= maxAttempts) {
      if (intervalId) clearInterval(intervalId);
      return;
    }

    attempts++;
    
    try {
      const status = await checkPaymentStatus(correlationId);
      onStatusChange(status);
      
      if (status.status === 'completed' || status.status === 'expired' || status.status === 'failed') {
        if (intervalId) clearInterval(intervalId);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  intervalId = window.setInterval(check, intervalMs);
  check(); // Check immediately

  return {
    stop: () => {
      if (intervalId) clearInterval(intervalId);
    },
  };
};
