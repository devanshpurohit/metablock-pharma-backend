import mongoose from 'mongoose';
import { cloudinaryPlugin } from '../utils/mongooseCloudinaryPlugin.js';

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, trim: true },
    logo: { type: String, default: '' },
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

brandSchema.plugin(cloudinaryPlugin);

export default mongoose.model('Brand', brandSchema);
