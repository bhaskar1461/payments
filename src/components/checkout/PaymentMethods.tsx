'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Building2, Wallet, User, Phone } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';
import axios from 'axios';

type Method = 'upi' | 'card' | 'netbanking' | 'wallet';

const methods: { id: Method; label: string; icon: React.ElementType }[] = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'Netbanking', icon: Building2 },
  { id: 'wallet', label: 'Wallets', icon: Wallet },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#f4f8f5',
  border: '1px solid rgba(26, 107, 53, 0.2)',
  borderRadius: '0.75rem',
  padding: '0.7rem 1rem',
  fontSize: '0.875rem',
  color: '#0d2e18',
  outline: 'none',
  fontFamily: 'inherit',
};

export default function PaymentMethods() {
  const { amount, currency, setPaymentStatus, setSelectedMethod, setOrderId, setCustomerInfo } = useCheckoutStore();
  const [activeTab, setActiveTab] = useState<Method>('upi');
  const [email, setEmail] = useState('student@snist.ac.in');
  const [phone, setPhone] = useState('9876543210');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setCustomerInfo(email, phone);
    setSelectedMethod(activeTab);
    try {
      const res = await axios.post('/api/payments/create-order', {
        amount, currency, customerEmail: email, customerPhone: phone,
      });
      if (res.data.success) {
        setOrderId(res.data.orderId);
        setPaymentStatus('processing');
      }
    } catch (error) {
      console.error('Failed to create order', error);
      alert('Payment service is temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Student Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.72rem', color: '#4a6b54', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem'
          }}>
            <User size={11} color="#1a6b35" /> Student Email
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.72rem', color: '#4a6b54', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem'
          }}>
            <Phone size={11} color="#1a6b35" /> Mobile Number
          </label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(26,107,53,0.15), rgba(232,96,10,0.1), transparent)' }} />

      {/* Method Tabs */}
      <div>
        <p style={{ fontSize: '0.72rem', color: '#4a6b54', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          Select Payment Method
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {methods.map(m => {
            const Icon = m.icon;
            const isActive = activeTab === m.id;
            return (
              <button key={m.id} onClick={() => setActiveTab(m.id)}
                className={isActive ? 'tab-btn tab-btn-active' : 'tab-btn tab-btn-inactive'}
              >
                <Icon size={14} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{
        minHeight: '90px',
        background: '#f4f8f5',
        borderRadius: '0.875rem',
        padding: '1rem',
        border: '1px solid rgba(26, 107, 53, 0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            {activeTab === 'upi' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.78rem', color: '#4a6b54', marginBottom: '0.4rem' }}>Enter your UPI ID</p>
                <input type="text" placeholder="username@okaxis / @ybl" style={{ ...inputStyle, textAlign: 'center' }} />
              </div>
            )}
            {activeTab === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input type="text" placeholder="Card Number" style={inputStyle} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input type="text" placeholder="MM / YY" style={inputStyle} />
                  <input type="text" placeholder="CVV" style={inputStyle} />
                </div>
              </div>
            )}
            {activeTab === 'netbanking' && (
              <p style={{ fontSize: '0.83rem', color: '#4a6b54' }}>Your bank page will open securely during processing.</p>
            )}
            {activeTab === 'wallet' && (
              <p style={{ fontSize: '0.83rem', color: '#4a6b54' }}>Connect your Paytm / PhonePe wallet during checkout.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={loading}
        className="btn-gradient"
        style={{
          width: '100%', padding: '1rem',
          borderRadius: '0.875rem',
          fontSize: '1rem', letterSpacing: '0.01em',
        }}
      >
        {loading ? '⏳ Processing...' : `Pay Exam Fee ₹${amount.toLocaleString('en-IN')}`}
      </button>

      {/* Accepted payments note */}
      <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#8aab93' }}>
        All major UPI, Cards &amp; Netbanking accepted &nbsp;·&nbsp; Payments are 256-bit SSL secured
      </p>
    </div>
  );
}
