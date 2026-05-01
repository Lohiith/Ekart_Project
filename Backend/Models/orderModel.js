import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cartItems: Array,
    Amount: Number,
    address: Object,
    userId: String,
    orderStatus: { type: String, default: "Processing" },
    createdAt: { type: Date, default: Date.now },
})

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;