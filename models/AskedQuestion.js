import mongoose from 'mongoose';

const askedQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('AskedQuestion', askedQuestionSchema);
