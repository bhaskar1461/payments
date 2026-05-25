'use client';

import { useCheckoutStore } from '@/store/checkoutStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, GraduationCap } from 'lucide-react';

export default function CheckoutCard() {
  const { amount, currency } = useCheckoutStore();

  return (
    <motion.div
      className="glass"
      style={{ borderRadius: '1.25rem', overflow: 'hidden' }}
      whileHover={{ y: -2, boxShadow: '0 16px 48px rgba(26, 107, 53, 0.16)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Green top stripe */}
      <div style={{
        height: '5px',
        background: 'linear-gradient(to right, #1a6b35, #2a8a46, #e8600a)',
      }} />

      <div style={{ padding: '1.75rem' }}>
        {/* SNIST Logo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '0.75rem',
            padding: '0.6rem 1rem',
            border: '1px solid rgba(26, 107, 53, 0.15)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            marginBottom: '1rem',
          }}>
            <Image
              src="/snist-logo.jpg"
              alt="SNIST Logo"
              width={250}
              height={34}
              style={{ objectFit: 'contain', display: 'block' }}
              priority
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <h1 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d2e18' }}>
              Sreenidhi Institute of Science & Technology
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4a6b54', fontSize: '0.76rem' }}>
              <MapPin size={11} color="#e8600a" />
              <span>Yamnampet, Ghatkesar, Hyderabad – 501 301</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(26,107,53,0.2), rgba(232,96,10,0.15), transparent)', marginBottom: '1.5rem' }} />

        {/* Amount */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700,
            color: '#4a6b54', textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: '0.4rem'
          }}>
            Amount Due
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            <span style={{ fontSize: '1.4rem', color: '#1a6b35', fontWeight: 500 }}>
              {currency === 'INR' ? '₹' : '$'}
            </span>
            <span style={{
              fontSize: '3.25rem', fontWeight: 900,
              color: '#0d2e18', letterSpacing: '-0.04em', lineHeight: 1
            }}>
              {amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Line Items */}
        <div style={{
          background: '#f4f8f5',
          borderRadius: '0.875rem',
          padding: '1rem',
          border: '1px solid rgba(26, 107, 53, 0.1)',
          display: 'flex', flexDirection: 'column', gap: '0.6rem',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
            <span style={{ color: '#4a6b54' }}>Campus Placement Drive — Registration Fee</span>
            <span style={{ color: '#0d2e18', fontWeight: 600 }}>₹{amount.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(26,107,53,0.1)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
            <span style={{ color: '#4a6b54' }}>GST & Processing Fee</span>
            <span style={{ color: '#16a34a', fontWeight: 600 }}>Included</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(26,107,53,0.1)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: '#0d2e18', fontWeight: 700 }}>Total Payable</span>
            <span style={{ color: '#e8600a', fontWeight: 800 }}>₹{amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'linear-gradient(135deg, #e8f5ee, #fff3ec)',
          border: '1px solid rgba(26, 107, 53, 0.2)',
          borderRadius: '9999px', padding: '5px 14px',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
          textTransform: 'uppercase', color: '#1a6b35',
        }}>
          <GraduationCap size={12} color="#e8600a" />
          Campus Placement Drive · 2025–26
        </div>
      </div>
    </motion.div>
  );
}
