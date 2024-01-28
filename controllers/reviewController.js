const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});
exports.createReview = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line prefer-const
  let { review, tour, rating, user } = req.body;
  if (!tour) tour = req.params.tourId;
  if (!user) user = req.user.id;
  const newReview = await Review.create({
    review,
    tour,
    rating,
    user,
  });
  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});
