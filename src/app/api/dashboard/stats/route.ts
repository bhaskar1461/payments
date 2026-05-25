import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();

    const payments = await Payment.find().sort({ createdAt: -1 }).limit(50);
    const totalPayments = await Payment.countDocuments({ status: 'successful' });
    const successfulPayments = payments.filter(p => p.status === 'successful');
    const revenue = successfulPayments.reduce((acc, curr) => acc + curr.amount, 0);

    return NextResponse.json({
      success: true,
      data: { totalPayments, revenue, recentPayments: payments },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
