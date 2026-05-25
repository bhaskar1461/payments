import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SNIST Fee Payment | Campus Placement Drive 2025–26',
  description: 'Secure fee payment portal for Sreenidhi Institute of Science & Technology — Campus Placement Drive.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#f4f8f5', color: '#0d2e18', minHeight: '100vh' }}>
        {/* Subtle brand-tinted radial bg */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: -1,
          background: `
            radial-gradient(ellipse at 10% 10%, rgba(26, 107, 53, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 90%, rgba(232, 96, 10, 0.06) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />
        {children}
      </body>
    </html>
  );
}
