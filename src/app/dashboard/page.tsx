'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Activity, ArrowUpRight, LayoutDashboard } from 'lucide-react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(145deg, rgba(30,30,30,0.75), rgba(10,10,10,0.95))',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  borderRadius: '1rem',
  padding: '1.5rem',
};

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/payments/dashboard-stats')
      .then(res => { if (res.data.success) setStats(res.data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { name: 'Mon', revenue: 4200 },
    { name: 'Tue', revenue: 3800 },
    { name: 'Wed', revenue: 5100 },
    { name: 'Thu', revenue: 4700 },
    { name: 'Fri', revenue: 6200 },
    { name: 'Sat', revenue: 5800 },
    { name: 'Sun', revenue: 7100 },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
        Loading dashboard...
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${stats?.revenue?.toLocaleString('en-IN') || '0'}`,
      icon: Wallet,
      color: '#00f0ff',
      bg: 'rgba(0,240,255,0.12)',
      change: '+12%',
    },
    {
      label: 'Total Payments',
      value: String(stats?.totalPayments || 0),
      icon: Activity,
      color: '#c084fc',
      bg: 'rgba(192,132,252,0.12)',
      change: '+5%',
    },
    {
      label: 'Success Rate',
      value: '99.9%',
      icon: TrendingUp,
      color: '#34d399',
      bg: 'rgba(52,211,153,0.12)',
      change: '↑ stable',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: '2.5rem', height: '2.5rem',
            background: 'linear-gradient(135deg, #8a2be2, #00f0ff)',
            borderRadius: '0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(138,43,226,0.4)'
          }}>
            <LayoutDashboard size={16} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Merchant Dashboard</h1>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>Overview of your payment volume and activity</p>
          </div>
        </div>
        <a href="/checkout/demo" style={{
          padding: '0.6rem 1.2rem', borderRadius: '0.75rem',
          fontSize: '0.85rem', color: '#c4b5fd',
          background: 'rgba(138,43,226,0.1)',
          border: '1px solid rgba(138,43,226,0.25)',
          textDecoration: 'none', fontWeight: 500,
          transition: 'background 0.2s',
        }}>
          ← Checkout Demo
        </a>
      </motion.div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={cardStyle}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem',
                  background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={18} color={card.color} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {card.change} <ArrowUpRight size={12} />
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.4rem' }}>{card.label}</p>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{card.value}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Transactions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ ...cardStyle, height: '380px' }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#00f0ff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="url(#lineGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#00f0ff', strokeWidth: 0 }} activeDot={{ r: 7, fill: '#00f0ff' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ ...cardStyle, overflow: 'hidden' }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem' }}>Recent Transactions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', maxHeight: '290px' }}>
            {stats?.recentPayments?.length > 0 ? stats.recentPayments.map((p: any) => (
              <div key={p._id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '0.625rem',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '0.8rem', color: '#e5e7eb', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                    {p.customerEmail}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '2px' }}>
                    {new Date(p.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>₹{p.amount.toLocaleString('en-IN')}</p>
                  <span className={
                    p.status === 'successful' ? 'badge-success' :
                    p.status === 'failed' ? 'badge-failed' : 'badge-pending'
                  }>
                    {p.status}
                  </span>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280', fontSize: '0.85rem' }}>
                <p>No transactions yet.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Complete a payment on the checkout demo to see data here.</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Test Mode Footer */}
      <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.72rem', color: '#374151' }}>
        🔒 Proosy Pay · Test / Demo Mode — No real payments are processed · v1.0.0
      </p>
    </div>
  );
}
