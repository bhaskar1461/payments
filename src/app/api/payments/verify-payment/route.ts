import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/lib/mongodb';
import { Payment, Transaction } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId, status, method } = await req.json();

    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    const transactionId = 'txn_' + uuidv4().replace(/-/g, '').substring(0, 14);

    payment.status = status === 'success' ? 'successful' : 'failed';
    payment.method = method;
    await payment.save();

    const transaction = await Transaction.create({
      paymentId: payment._id,
      transactionId,
      status: status === 'success' ? 'success' : 'failed',
      amount: payment.amount,
      gatewayResponse: { method, verifiedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      transactionId: transaction.transactionId,
      status: payment.status,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
