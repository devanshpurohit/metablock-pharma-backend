import Review from '../models/Review.js';
import Product from '../models/Product.js';

// POST /api/reviews  — submit a new review (pending by default)
export const submitReview = async (req, res) => {
  const { productId, rating, title, body, guestName, guestEmail } = req.body;

  if (!productId || !rating || !body) {
    res.status(400);
    throw new Error('productId, rating, and body are required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const reviewData = {
    productId,
    rating: Number(rating),
    title: title || '',
    body,
    status: 'pending',
    reviewImage: req.file ? `uploads/${req.file.filename}` : '',
  };

  if (req.user) {
    // Logged-in customer — use their real name/email
    reviewData.userId = req.user._id;
    reviewData.guestName = req.user.name || guestName || 'Customer';
    reviewData.guestEmail = req.user.email || guestEmail || '';
  } else {
    reviewData.guestName = (guestName || '').trim() || 'Anonymous';
    reviewData.guestEmail = guestEmail || '';
  }

  const review = await Review.create(reviewData);
  res.status(201).json({ message: 'Review submitted successfully. It will appear after approval.', review });
};

// GET /api/reviews/product/:productId  — approved reviews for a product
export const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ productId, status: 'approved' })
    .sort({ createdAt: -1 })
    .lean();

  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  res.json({ reviews, average: parseFloat(avg.toFixed(1)), total: reviews.length });
};

// GET /api/reviews/admin  — all reviews (admin)
export const getAllReviews = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};

  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .populate('productId', 'productName mainImage')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  res.json({ reviews, total, page: Number(page), pages: Math.ceil(total / limit) });
};

// PATCH /api/reviews/:id/status  — approve or reject (admin)
export const updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status. Use approved, rejected, or pending');
  }

  const review = await Review.findByIdAndUpdate(id, { status }, { new: true })
    .populate('productId', 'productName');

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.json({ message: `Review ${status}`, review });
};

// DELETE /api/reviews/:id  — delete (admin)
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }
  res.json({ message: 'Review deleted' });
};

// GET /api/reviews/approved — approved reviews with pagination, stats, filter
export const getApprovedReviews = async (req, res) => {
  const { limit = 10, page = 1, rating, search } = req.query;
  const filter = { status: 'approved' };
  if (rating) filter.rating = Number(rating);
  if (search) {
    filter.$or = [
      { guestName: { $regex: search, $options: 'i' } },
      { title: { $regex: search, $options: 'i' } },
      { body: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .populate('productId', 'productName mainImage')
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .lean();

  // Stats (always on full approved set, ignoring filters)
  const allApproved = await Review.find({ status: 'approved' }).lean();
  const avgRating = allApproved.length
    ? allApproved.reduce((s, r) => s + r.rating, 0) / allApproved.length
    : 0;
  const withImage = allApproved.filter((r) => r.reviewImage).length;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allApproved.filter((r) => r.rating === star).length,
  }));

  res.json({
    reviews,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    stats: {
      totalReviews: allApproved.length,
      averageRating: parseFloat(avgRating.toFixed(1)),
      withImage,
      distribution,
    },
  });
};

