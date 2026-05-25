import mongoose from 'mongoose';

// ── Merchant ──────────────────────────────────────────
const merchantSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  apiKey:     { type: String, required: true },
  webhookUrl: { type: String },
}, { timestamps: true });

export const Merchant =
  mongoose.models.Merchant || mongoose.model('Merchant', merchantSchema);

// ── Payment ───────────────────────────────────────────
const paymentSchema = new mongoose.Schema({
  merchantId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
  orderId:       { type: String, required: true, unique: true },
  amount:        { type: Number, required: true },
  currency:      { type: String, default: 'INR' },
  status:        { type: String, enum: ['created', 'processing', 'successful', 'failed'], default: 'created' },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  method:        { type: String },
  receipt:       { type: String },
}, { timestamps: true });

export const Payment =
  mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

// ── Transaction ───────────────────────────────────────
const transactionSchema = new mongoose.Schema({
  paymentId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  transactionId:   { type: String, required: true, unique: true },
  status:          { type: String, enum: ['success', 'failed'], required: true },
  amount:          { type: Number, required: true },
  gatewayResponse: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
