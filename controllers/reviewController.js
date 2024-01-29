const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
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

exports.deleteReview = factory.deleteOne(Review);
