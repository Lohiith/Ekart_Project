import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },

  ratings: { type: Number, default: 0 },   // keep naming consistent
  numofReviews: { type: Number, default: 0 },

  category: { type: String, required: true },
  seller: { type: String, required: true },
  stock: { type: Number, required: true },

  // 🔑 THIS replaces `images`
  imageIndex: {
    type: Number,
    required: true
  },

  createdat: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
