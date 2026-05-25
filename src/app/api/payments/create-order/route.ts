import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/lib/mongodb';
import { Merchant, Payment } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { amount, currency, customerEmail, customerPhone, receipt } = await req.json();

    // Find or auto-create the SNIST merchant record
    let merchant = await Merchant.findOne();
    if (!merchant) {
      merchant = await Merchant.create({
        name: 'SNIST - Sreenidhi Institute of Science & Technology',
        email: 'admin@sreenidhi.edu.in',
        apiKey: 'sk_' + uuidv4(),
      });
    }

    const orderId = 'order_' + uuidv4().replace(/-/g, '').substring(0, 14);

    const payment = await Payment.create({
      merchantId: merchant._id,
      orderId,
      amount,
      currency: currency || 'INR',
      customerEmail,
      customerPhone,
      receipt,
    });

    return NextResponse.json(
      { success: true, orderId: payment.orderId, amount: payment.amount, currency: payment.currency },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
