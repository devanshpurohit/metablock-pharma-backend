import Newsletter from '../models/Newsletter.js';
import { getPagination, paginatedResponse } from '../utils/pagination.js';
import { logActivity } from '../utils/activity.js';

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  // Check if already subscribed
  const exists = await Newsletter.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error('Email is already subscribed to newsletter');
  }

  const subscription = await Newsletter.create({
    email: email.toLowerCase()
  });

  res.status(201).json({
    success: true,
    message: 'Subscribed successfully',
    data: subscription
  });
};

export const listNewsletter = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = req.query.search || '';
  const filter = search ? { email: new RegExp(search, 'i') } : {};

  const [items, total] = await Promise.all([
    Newsletter.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Newsletter.countDocuments(filter)
  ]);

  res.json(paginatedResponse(items, page, limit, total));
};

export const unsubscribeNewsletter = async (req, res) => {
  const subscriber = await Newsletter.findById(req.params.id);
  if (!subscriber) {
    res.status(404);
    throw new Error('Subscriber not found');
  }

  await subscriber.deleteOne();
  await logActivity(`Unsubscribed email ${subscriber.email}`, 'delete');
  res.json({ success: true, message: 'Unsubscribed successfully' });
};
