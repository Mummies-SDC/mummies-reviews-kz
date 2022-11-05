import mongoose from 'mongoose';
const { Schema } = mongoose;

const productReviewSchema = new Schema({
  product: String,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: {
    type: ObjectId,
    ref: "reviewsPhotos"
  }
})

const ProductReview = mongoose.model('productReview', productReviewSchema);

const reviewsPhotosSchema = new Schema({
  url: String
})
const ReviewPhotos = mongoose.model('reviewPhotos', reviewsPhotosSchema);


const characteristicsSchema = new Schema({
  product: String,
  characteristics: String,
  value: Number
})

const Characteristics = mongoose.model('characteristics', characteristicsSchema);


module.exports = {ProductReview, ReviewPhotos, Characteristics}