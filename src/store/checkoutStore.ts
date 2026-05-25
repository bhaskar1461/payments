import { create } from 'zustand';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

interface CheckoutState {
  amount: number;
  currency: string;
  merchantName: string;
  orderId: string | null;
  customerEmail: string;
  customerPhone: string;
  selectedMethod: PaymentMethod | null;
  isProcessing: boolean;
  paymentStatus: PaymentStatus;
  transactionId: string | null;

  setAmount: (amount: number) => void;
  setCustomerInfo: (email: string, phone: string) => void;
  setSelectedMethod: (method: PaymentMethod) => void;
  setProcessing: (isProcessing: boolean) => void;
  setPaymentStatus: (status: PaymentStatus, txnId?: string) => void;
  setOrderId: (orderId: string) => void;
  reset: () => void;
}

const initialState = {
  amount: 2600,
  currency: 'INR',
  merchantName: 'SNIST - Sreenidhi Institute of Science & Technology',
  orderId: null,
  customerEmail: '',
  customerPhone: '',
  selectedMethod: null,
  isProcessing: false,
  paymentStatus: 'idle' as PaymentStatus,
  transactionId: null,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  setAmount: (amount) => set({ amount }),
  setCustomerInfo: (email, phone) => set({ customerEmail: email, customerPhone: phone }),
  setSelectedMethod: (method) => set({ selectedMethod: method }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setPaymentStatus: (status, txnId) =>
    set({ paymentStatus: status, ...(txnId ? { transactionId: txnId } : {}) }),
  setOrderId: (orderId) => set({ orderId }),
  reset: () => set(initialState),
}));
