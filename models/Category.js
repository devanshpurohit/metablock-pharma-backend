import mongoose from 'mongoose';
import { cloudinaryPlugin } from '../utils/mongooseCloudinaryPlugin.js';

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: Boolean, default: true },
    image: { type: String }
  },
  { timestamps: true }
);

categorySchema.plugin(cloudinaryPlugin);

export default mongoose.model('Category', categorySchema);
