import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD', uppercase: true, trim: true },
    paymentMethod: { type: String, default: 'Bitcoin', trim: true },
    transactionId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' },
    orderId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
