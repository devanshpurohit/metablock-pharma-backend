import Order from '../models/Order.js';
import { logActivity } from '../utils/activity.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  const {
    items,
    billingAddress,
    shippingAddress,
    shippingAddressSameAsBilling,
    deliveryMethod,
    paymentMethod,
    paymentFeePercent,
    discountPercent,
    subTotal,
    total
  } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No items in order');
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    billingAddress,
    shippingAddress: shippingAddressSameAsBilling ? billingAddress : shippingAddress,
    shippingAddressSameAsBilling,
    deliveryMethod,
    paymentMethod,
    paymentFeePercent,
    discountPercent,
    subTotal,
    total
  });

  await logActivity(`Order created: ${order._id} by ${req.user.email}`, 'create');

  // Format the email message based on payment method
  let paymentInstructions = '';
  if (paymentMethod.toLowerCase().includes('zelle')) {
    paymentInstructions = 'Please send the payment via Zelle to: <strong>zelle@roidspharma.com</strong>. Include your Order ID in the payment description.';
  } else if (paymentMethod.toLowerCase().includes('bitcoin') || paymentMethod.toLowerCase().includes('btc')) {
    paymentInstructions = 'Please send Bitcoin (equivalent to the total USD) to this wallet address: <strong>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</strong>. Once sent, email us the transaction hash.';
  } else if (paymentMethod.toLowerCase().includes('western')) {
    paymentInstructions = 'We will email you the Western Union receiver name and details shortly to complete the payment.';
  } else {
    paymentInstructions = 'We will send you details for RIA payment via email shortly.';
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px;">
      <h2 style="color: #c92c2c; border-bottom: 2px solid #c92c2c; padding-bottom: 10px;">Order Confirmation</h2>
      <p>Hello ${req.user.name || 'Valued Customer'},</p>
      <p>Thank you for shopping at Roidspharma! We have successfully received your order.</p>
      
      <div style="background-color: #fcfcfc; padding: 15px; border: 1px solid #eee; margin: 15px 0;">
        <h4 style="margin: 0 0 10px 0; color: #555;">Order Details</h4>
        <p style="margin: 3px 0; font-size: 14px;"><strong>Order ID:</strong> #${order._id}</p>
        <p style="margin: 3px 0; font-size: 14px;"><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p style="margin: 3px 0; font-size: 14px;"><strong>Shipping Method:</strong> ${deliveryMethod.name}</p>
        <p style="margin: 3px 0; font-size: 14px;"><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
      </div>

      <div style="background-color: #fff9f9; padding: 15px; border: 1px solid #ffcccc; border-radius: 4px; margin: 15px 0;">
        <h4 style="margin: 0 0 10px 0; color: #c92c2c;">Payment Instructions</h4>
        <p style="margin: 0; font-size: 14px; line-height: 1.5;">${paymentInstructions}</p>
      </div>

      <p style="font-size: 14px; margin-top: 20px;">We will process your order as soon as we verify the payment. Thank you for your business!</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 11px; color: #777; text-align: center;">Roidspharma - Secure Payment & Fast Shipping</p>
    </div>
  `;

  // Send order confirmation email async
  sendEmail({
    to: req.user.email,
    subject: `Roidspharma - Order Confirmation #${order._id}`,
    text: `Thank you for your order #${order._id}. Please pay $${total.toFixed(2)} using ${paymentMethod}.`,
    html: emailHtml
  }).catch(err => console.error('[ORDER CONTROL] Email send failed:', err));

  res.status(201).json({
    message: 'Order created successfully',
    order
  });
};

export const getOrders = async (req, res) => {
  // Return all orders (sorted newest first), populate user details
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    res.status(400);
    throw new Error('Status is required');
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  await order.save();

  await logActivity(`Order status updated to ${status} for order: ${order._id}`, 'update');

  res.json({ message: 'Order status updated successfully', order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
