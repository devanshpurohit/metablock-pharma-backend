import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { logActivity } from '../utils/activity.js';
import { sendEmail } from '../utils/sendEmail.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid admin credentials');
  }

  if (!user.status) {
    res.status(403);
    throw new Error('Admin account is inactive');
  }

  await logActivity(`${user.name} logged in`, 'auth');

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role, image: user.image }
  });
};

export const registerCustomer = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error('Email is already registered');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: 'customer',
    status: true
  });

  await logActivity(`Customer registered: ${user.email}`, 'create');

  res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    }
  });
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'customer' }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (!user.status) {
    res.status(403);
    throw new Error('Account is inactive. Please contact support.');
  }

  await logActivity(`Customer logged in: ${user.email}`, 'auth');

  res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    }
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  const user = await User.findOne({ email, role: 'customer' });
  if (!user) {
    res.status(404);
    throw new Error('No account found with this email address');
  }

  // Generate 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Set expiration (15 minutes)
  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // Send Email
  const message = `You requested a password reset. Your OTP verification code is: ${otp}. This code is valid for 15 minutes.`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px; max-width: 600px;">
      <h2 style="color: #734B1A;">Roidspharma Password Reset</h2>
      <p>Hello ${user.name},</p>
      <p>You requested to reset your password. Use the following 6-digit One-Time Password (OTP) to complete the reset process:</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #734B1A; border: 1px dashed #734B1A;">
        ${otp}
      </div>
      <p style="margin-top: 20px;">This OTP code is valid for <strong>15 minutes</strong>. If you did not request this, you can safely ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 11px; color: #777;">This is an automated message, please do not reply to this email.</p>
    </div>
  `;

  const mailRes = await sendEmail({
    to: user.email,
    subject: 'Roidspharma - Password Reset OTP Code',
    text: message,
    html
  });

  res.json({
    message: 'OTP sent to email successfully',
    ...(mailRes?.loggedToConsole && process.env.NODE_ENV !== 'production' ? { devOtp: otp } : {})
  });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400);
    throw new Error('Email and OTP are required');
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
    resetPasswordOTP: otp,
    resetPasswordOTPExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid OTP or OTP has expired');
  }

  res.json({ message: 'OTP verified successfully' });
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    res.status(400);
    throw new Error('Email, OTP and new password are required');
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters long');
  }

  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordOTPExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid OTP or OTP has expired');
  }

  // Set new password
  user.password = newPassword;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;
  await user.save();

  await logActivity(`Password reset successful for: ${user.email}`, 'auth');

  res.json({ message: 'Password reset successfully' });
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
