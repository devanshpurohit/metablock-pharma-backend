import ChatSession from '../models/ChatSession.js';

// Simple AI Auto-Responder helper
const getAIResponse = (message, userName) => {
  const msg = message.toLowerCase();
  
  if (msg.includes('shipping') || msg.includes('delivery') || msg.includes('arrive') || msg.includes('track')) {
    return `Hi ${userName}, our packages are shipped discreetly and securely in plain packaging. Domestic shipping takes 3-5 business days, and international shipping takes 7-12 business days. You will receive a tracking number via email as soon as your package ships.`;
  }
  
  if (msg.includes('payment') || msg.includes('credit card') || msg.includes('pay') || msg.includes('bitcoin') || msg.includes('btc') || msg.includes('usdt')) {
    return `Hello! We accept multiple payment methods including Credit Cards (Visa/Mastercard), Cryptocurrencies (Bitcoin, USDT, etc.), and Bank Transfers. Please note that payments made with Bitcoin or other cryptos receive an automatic 10% discount at checkout!`;
  }
  
  if (msg.includes('steroid') || msg.includes('roid') || msg.includes('cycle') || msg.includes('peptide') || msg.includes('dosage') || msg.includes('pct')) {
    return `For cycle guidance, safety details, and Post Cycle Therapy (PCT) instructions, please review our 'Steroids Guide' linked in the top/footer menus of our store. Please consult with a healthcare professional before starting any chemical cycles.`;
  }
  
  if (msg.includes('order') || msg.includes('status') || msg.includes('where is my')) {
    return `To check your order status, please log in and view the 'Orders' section in your account dashboard. Alternatively, if you share your Order ID here, our support team can verify the status for you when they are online!`;
  }

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('supp') || msg.includes('greetings')) {
    return `Hi ${userName}! Welcome to RoidsPharma Live Support. I'm your AI assistant. How can we help you today? (You can ask about shipping, payment methods, cycles, or order status!)`;
  }

  if (msg.includes('help') || msg.includes('support') || msg.includes('question')) {
    return `Of course! I'm here to help. What questions do you have about our products, orders, or policies?`;
  }

  // General fallback
  return `Thank you for your message, ${userName}! I have logged this with our support queue. A live representative will review your request and reply to you here shortly. Let us know if you need to add any details!`;
};

// @desc    Get user chat session history
// @route   GET /api/chat/session/:userId
// @access  Public
export const getUserChatHistory = async (req, res) => {
  const { userId } = req.params;

  let session = await ChatSession.findOne({ userId });

  if (session) {
    // If the user fetches history, we assume they have seen any new admin replies
    session.unreadByUser = 0;
    await session.save();
  }

  res.json(session);
};

// @desc    Send a message from storefront user (and get AI reply if applicable)
// @route   POST /api/chat/message
// @access  Public
export const sendChatMessage = async (req, res) => {
  const { userId, userName, userEmail, message } = req.body;

  if (!userId || !userName || !userEmail || !message) {
    res.status(400);
    throw new Error('UserId, userName, userEmail and message are required');
  }

  // Find or create session
  let session = await ChatSession.findOne({ userId });

  if (!session) {
    session = new ChatSession({
      userId,
      userName,
      userEmail,
      messages: []
    });
  }

  // Add user message
  session.messages.push({
    sender: 'user',
    message,
    timestamp: new Date()
  });

  // Admin has a new unread message
  session.unreadCount += 1;
  session.status = 'active';
  
  await session.save();

  // Generate automated AI response
  const aiReplyText = getAIResponse(message, userName);

  // Add AI message to session
  session.messages.push({
    sender: 'ai',
    message: aiReplyText,
    timestamp: new Date()
  });

  // Since AI replied, increment unreadByUser so the user gets notified
  session.unreadByUser += 1;

  await session.save();

  res.status(201).json(session);
};

// @desc    Get all active/closed support chat sessions (Admin only)
// @route   GET /api/chat/sessions
// @access  Private/Admin
export const listChatSessions = async (req, res) => {
  const sessions = await ChatSession.find({}).sort({ updatedAt: -1 });
  res.json(sessions);
};

// @desc    Get a single chat session by ID (Admin only)
// @route   GET /api/chat/sessions/:id
// @access  Private/Admin
export const getChatSessionById = async (req, res) => {
  const session = await ChatSession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error('Chat session not found');
  }

  // Admin is viewing this, clear the unreadCount
  session.unreadCount = 0;
  await session.save();

  res.json(session);
};

// @desc    Post a reply from admin (Admin only)
// @route   POST /api/chat/sessions/:id/reply
// @access  Private/Admin
export const adminReplyToChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    res.status(400);
    throw new Error('Message content is required');
  }

  const session = await ChatSession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error('Chat session not found');
  }

  // Add admin message
  session.messages.push({
    sender: 'admin',
    message,
    timestamp: new Date()
  });

  // User has new unread message
  session.unreadByUser += 1;
  // Admin read count stays 0 as they sent it
  session.unreadCount = 0;

  await session.save();

  res.json(session);
};
