import AskedQuestion from '../models/AskedQuestion.js';
import { getPagination, paginatedResponse } from '../utils/pagination.js';
import { logActivity } from '../utils/activity.js';

export const listAskedQuestions = async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = req.query.search || '';
  const filter = search ? { question: new RegExp(search, 'i') } : {};
  const [items, total] = await Promise.all([
    AskedQuestion.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    AskedQuestion.countDocuments(filter)
  ]);
  res.json(paginatedResponse(items, page, limit, total));
};

export const createAskedQuestion = async (req, res) => {
  const question = await AskedQuestion.create({
    question: req.body.question,
    answer: req.body.answer,
    status: req.body.status ?? true
  });
  await logActivity(`Created asked question: "${question.question.substring(0, 30)}..."`, 'create');
  res.status(201).json(question);
};

export const updateAskedQuestion = async (req, res) => {
  const question = await AskedQuestion.findById(req.params.id);
  if (!question) {
    res.status(404);
    throw new Error('Asked question not found');
  }
  question.question = req.body.question ?? question.question;
  question.answer = req.body.answer ?? question.answer;
  question.status = req.body.status ?? question.status;
  await question.save();
  await logActivity(`Updated asked question: "${question.question.substring(0, 30)}..."`, 'update');
  res.json(question);
};

export const deleteAskedQuestion = async (req, res) => {
  const question = await AskedQuestion.findById(req.params.id);
  if (!question) {
    res.status(404);
    throw new Error('Asked question not found');
  }
  await question.deleteOne();
  await logActivity(`Deleted asked question: "${question.question.substring(0, 30)}..."`, 'delete');
  res.json({ message: 'Asked question deleted successfully' });
};
