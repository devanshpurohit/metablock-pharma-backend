import Message from '../models/Message.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getPagination, paginatedResponse } from '../utils/pagination.js';
import { logActivity } from '../utils/activity.js';

export const createMessage = async (req, res) => {
  const { name, email, title, message } = req.body;

  if (!name || !email || !title || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  let attachment = '';
  if (req.file) {
    attachment = `/uploads/${req.file.filename}`;
  }

  const newMessage = await Message.create({
    name,
    email,
    title,
    message,
    attachment
  });

  res.status(201).json(newMessage);
};

export const listMessages = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const status = req.query.status;
  
  const filter = {};
  if (status) {
    filter.status = status;
  }

  const [items, total] = await Promise.all([
    Message.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Message.countDocuments(filter)
  ]);

  res.json(paginatedResponse(items, page, limit, total));
};

export const getMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Auto set status to 'read' if it's 'unread'
  if (message.status === 'unread') {
    message.status = 'read';
    await message.save();
  }

  res.json(message);
};

export const replyMessage = async (req, res) => {
  const { replyText } = req.body;

  if (!replyText) {
    res.status(400);
    throw new Error('Reply text is required');
  }

  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  message.replies.push({
    sender: 'admin',
    content: replyText,
    createdAt: new Date()
  });

  message.status = 'replied';
  await message.save();

  await logActivity(`Replied to message from ${message.name} (${message.email})`, 'update');

  // Send email response to user
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
      <h2 style="color: #734B1A; border-bottom: 2px solid #734B1A; padding-bottom: 8px;">Response from Roidspharma Support</h2>
      <p>Hello <strong>${message.name}</strong>,</p>
      <p>Thank you for reaching out to us. Here is the response to your message titled: <em>"${message.title}"</em></p>
      <div style="background-color: #fcf8f2; border-left: 4px solid #8D5E21; padding: 15px; margin: 20px 0; font-style: italic; border-radius: 4px;">
        ${replyText.replace(/\n/g, '<br/>')}
      </div>
      <p>Best regards,<br/><strong>Roidspharma Support Team</strong></p>
      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
      <p style="font-size: 11px; color: #888;">This is a reply notification for your contact form submission on our website.</p>
    </div>
  `;

  await sendEmail({
    to: message.email,
    subject: `RE: ${message.title} - Roidspharma Support`,
    html: emailHtml,
    text: `Hello ${message.name},\n\nThank you for reaching out. Here is our response to your message "${message.title}":\n\n${replyText}\n\nBest regards,\nRoidspharma Support Team`
  });

  res.json(message);
};
