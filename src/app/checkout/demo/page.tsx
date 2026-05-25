'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import PaymentGatewayModal from '@/components/checkout/PaymentGatewayModal';
import { useCheckoutStore } from '@/store/checkoutStore';

export default function CheckoutDemo() {
  const { paymentStatus } = useCheckoutStore();

  return (
    <main style={{
      minHeight: '100vh',
      padding: '2.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>

      {/* SNIST top header bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
        background: '#ffffff',
        borderBottom: '3px solid #1a6b35',
        padding: '0.6rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 2px 12px rgba(26, 107, 53, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '8px', height: '36px',
            background: 'linear-gradient(to bottom, #1a6b35, #e8600a)',
            borderRadius: '4px',
          }} />
          <div>
            <p style={{ fontSize: '0.6rem', color: '#4a6b54', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sreenidhi Educational Group</p>
            <p style={{ fontSize: '0.85rem', color: '#0d2e18', fontWeight: 700 }}>SNIST Secure Payment Portal</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px #22c55e'
          }} />
          <span style={{ fontSize: '0.72rem', color: '#4a6b54', fontWeight: 600 }}>Secure Connection</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '940px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          position: 'relative', zIndex: 1,
          marginTop: '4rem',
        }}
      >
        {/* Left: Order Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <CheckoutCard />
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: '#8aab93', fontSize: '0.75rem',
          }}>
            <Lock size={12} color="#8aab93" />
            <span>256-bit SSL encrypted &nbsp;·&nbsp; All transactions are secured</span>
          </div>
        </div>

        {/* Right: Payment Panel */}
        <div className="glass-panel" style={{ borderRadius: '1.25rem', overflow: 'hidden' }}>
          {/* Green top stripe */}
          <div style={{
            height: '5px',
            background: 'linear-gradient(to right, #1a6b35, #2a8a46, #e8600a)',
          }} />

          <div style={{ padding: '1.75rem 2rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d2e18' }}>
                Exam Fee Payment
              </h2>
              <span style={{
                fontSize: '0.62rem', fontWeight: 700,
                color: '#1a6b35',
                background: '#e8f5ee',
                padding: '4px 12px', borderRadius: '9999px',
                border: '1px solid rgba(26, 107, 53, 0.25)',
                textTransform: 'uppercase', letterSpacing: '0.06em'
              }}>
                🔒 SSL Secured
              </span>
            </div>

            <PaymentMethods />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <p style={{
        marginTop: '2rem', fontSize: '0.7rem', color: '#8aab93', textAlign: 'center',
        position: 'relative', zIndex: 1
      }}>
        Powered by <strong style={{ color: '#1a6b35' }}>Proosy Pay</strong> &nbsp;·&nbsp;
        SNIST Campus Placement Drive 2025–26
      </p>

      {paymentStatus !== 'idle' && <PaymentGatewayModal />}
    </main>
  );
}
