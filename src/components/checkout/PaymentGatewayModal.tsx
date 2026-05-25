'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Building2 } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';

export default function PaymentGatewayModal() {
  const { merchantName, setPaymentStatus } = useCheckoutStore();
  const [step, setStep] = useState<'otp' | 'processing' | 'result'>('otp');
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    setStep('processing');
    // Simulate brief processing delay
    await new Promise(r => setTimeout(r, 2000));
    setStep('result');
  };

  const handleClose = () => {
    setPaymentStatus('idle');
    setStep('otp');
    setOtp('');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      {/* Light backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(13, 46, 24, 0.45)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          position: 'relative',
          width: '100%', maxWidth: '440px',
          background: '#ffffff',
          border: '1px solid rgba(26, 107, 53, 0.15)',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(13, 46, 24, 0.2)',
        }}
      >
        {/* Green top stripe */}
        <div style={{ height: '4px', background: 'linear-gradient(to right, #1a6b35, #2a8a46, #e8600a)' }} />

        {/* Header */}
        <div style={{
          background: '#f4f8f5',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(26, 107, 53, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} color="#1a6b35" />
            <span style={{ fontWeight: 700, color: '#0d2e18', fontSize: '0.95rem' }}>SNIST Payment Gateway</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <AnimatePresence mode="wait">

            {/* OTP Step */}
            {step === 'otp' && (
              <motion.div key="otp"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0d2e18', marginBottom: '0.5rem' }}>
                    Authenticate Payment
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: '#4a6b54', lineHeight: 1.6 }}>
                    Enter the OTP sent to your registered mobile number to authenticate the fee payment for{' '}
                    <strong style={{ color: '#1a6b35' }}>{merchantName}</strong>
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  className="otp-input"
                  style={{ color: '#0d2e18' }}
                  autoFocus
                />

                {/* Single button only */}
                <button
                  onClick={handleVerify}
                  disabled={otp.length < 4}
                  className="btn-gradient"
                  style={{
                    width: '100%', padding: '1rem',
                    borderRadius: '0.875rem', fontSize: '1rem',
                  }}
                >
                  Verify & Pay
                </button>

                <p style={{ fontSize: '0.72rem', color: '#8aab93' }}>
                  Didn't receive OTP? &nbsp;
                  <span style={{ color: '#e8600a', cursor: 'pointer', fontWeight: 600 }}>Resend</span>
                </p>
              </motion.div>
            )}

            {/* Processing Step */}
            {step === 'processing' && (
              <motion.div key="processing"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '2.5rem 0', gap: '1.5rem', textAlign: 'center'
                }}
              >
                {/* SNIST-colored dual-ring spinner */}
                <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                  <div className="spin" style={{
                    position: 'absolute', inset: 0,
                    border: '3px solid rgba(26, 107, 53, 0.15)',
                    borderTop: '3px solid #1a6b35',
                    borderRight: '3px solid rgba(26, 107, 53, 0.4)',
                    borderRadius: '50%',
                  }} />
                  <div className="spin" style={{
                    position: 'absolute', inset: '10px',
                    border: '2px solid transparent',
                    borderTop: '2px solid #e8600a',
                    borderRadius: '50%',
                    animationDirection: 'reverse',
                    animationDuration: '0.65s',
                  }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d2e18', marginBottom: '0.4rem' }}>
                    Processing Payment
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#4a6b54' }}>
                    Please do not refresh or close this window.
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {['Connecting to gateway', 'Verifying OTP', 'Confirming transaction'].map(s => (
                    <span key={s} style={{
                      fontSize: '0.65rem', color: '#4a6b54',
                      background: '#f4f8f5', padding: '3px 10px',
                      borderRadius: '9999px', border: '1px solid rgba(26,107,53,0.15)'
                    }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Result Step — Admin Notice */}
            {step === 'result' && (
              <motion.div key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.3 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1.25rem', textAlign: 'center'
                }}
              >
                {/* Warning icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                  style={{
                    width: '80px', height: '80px',
                    borderRadius: '50%',
                    background: '#fff7ed',
                    border: '3px solid #fed7aa',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(232, 96, 10, 0.2)'
                  }}
                >
                  <AlertTriangle size={38} color="#e8600a" />
                </motion.div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0d2e18', marginBottom: '0.5rem' }}>
                    Payment Could Not Be Processed
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#4a6b54', lineHeight: 1.7 }}>
                    We were unable to complete your transaction at this time. Please do not attempt again.
                  </p>
                </div>

                {/* Admin instruction box */}
                <div style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #e8f5ee, #f4f8f5)',
                  border: '1px solid rgba(26, 107, 53, 0.25)',
                  borderRadius: '0.875rem',
                  padding: '1.1rem 1.25rem',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '0.5rem', flexShrink: 0,
                    background: '#1a6b35',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Building2 size={18} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0d2e18', marginBottom: '0.25rem' }}>
                      Visit the Admin Office
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#4a6b54', lineHeight: 1.6 }}>
                      Please visit the <strong style={{ color: '#1a6b35' }}>SNIST Administrative Office</strong> to complete your Campus Placement Drive fee payment. Carry your Student ID and this reference.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  style={{
                    width: '100%', padding: '0.875rem',
                    borderRadius: '0.875rem', fontWeight: 600,
                    fontSize: '0.95rem', color: '#4a6b54',
                    background: '#f4f8f5',
                    border: '1px solid rgba(26, 107, 53, 0.2)',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#e8f5ee')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#f4f8f5')}
                >
                  ← Back to Payment Page
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
