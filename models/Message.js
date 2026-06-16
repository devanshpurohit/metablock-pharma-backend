import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    attachment: { type: String, default: '' },
    replies: [
      {
        sender: { type: String, enum: ['admin', 'user'], required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
