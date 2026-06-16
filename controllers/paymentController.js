import Payment from '../models/Payment.js';
import { getPagination, paginatedResponse } from '../utils/pagination.js';
import { logActivity } from '../utils/activity.js';

export const createPayment = async (req, res) => {
  const { userName, userEmail, amount, currency, paymentMethod, transactionId, orderId } = req.body;

  const exists = await Payment.findOne({ transactionId });
  if (exists) {
    res.status(400);
    throw new Error('Transaction ID already registered');
  }

  const payment = await Payment.create({
    userName,
    userEmail,
    amount,
    currency: currency || 'USD',
    paymentMethod,
    transactionId,
    orderId,
    status: 'Pending'
  });

  await logActivity(`New payment of ${payment.amount} ${payment.currency} submitted by ${payment.userEmail} for order ${payment.orderId || 'none'}`, 'payment');

  res.status(201).json(payment);
};

export const listPayments = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = req.query.search || '';

  const filter = search
    ? {
        $or: [
          { userName: new RegExp(search, 'i') },
          { userEmail: new RegExp(search, 'i') },
          { transactionId: new RegExp(search, 'i') },
          { status: new RegExp(search, 'i') }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    Payment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Payment.countDocuments(filter)
  ]);

  res.json(paginatedResponse(items, page, limit, total));
};

export const updatePaymentStatus = async (req, res) => {
  const { status } = req.body;
  if (!['Pending', 'Success', 'Failed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid payment status');
  }

  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error('Payment record not found');
  }

  payment.status = status;
  await payment.save();

  await logActivity(`Payment status updated to ${status} for transaction ${payment.transactionId}`, 'payment');

  // Auto-update linked order status to 'processing' when payment is confirmed
  if (status === 'Success' && payment.orderId) {
    try {
      const Order = (await import('../models/Order.js')).default;
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.status = 'processing';
        await order.save();
        await logActivity(`Order ${order._id} status auto-updated to processing due to confirmed payment`, 'update');
      }
    } catch (err) {
      console.error('Failed to auto-update order status:', err);
    }
  }

  res.json(payment);
};
