import mongoose, { Schema, model, ObjectId } from 'mongoose';

interface review {
  name: string;
  rating: number;
  comment: string;
  user: {};
}

const reviewSchema = new Schema<review>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

interface dataProduct {
  name: String;
  image: String;
  description: String;
  reviews: any;
  rating: Number;
  numReviews: Number;
  price: Number;
  countInStock: Number;
  size: [];
  color: [];
}

const productSchema = new Schema<dataProduct>(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true },
    size: { type: [String], required: true },
    color: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
);

const Product = model<dataProduct>('Product', productSchema);

export default Product;
