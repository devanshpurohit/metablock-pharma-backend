import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    messages: [
      {
        sender: { type: String, enum: ['user', 'admin', 'ai'], required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active'
    },
    unreadCount: { type: Number, default: 0 }, // Admin unread count (messages sent by user)
    unreadByUser: { type: Number, default: 0 } // User unread count (messages sent by admin)
  },
  { timestamps: true }
);

export default mongoose.model('ChatSession', chatSessionSchema);
