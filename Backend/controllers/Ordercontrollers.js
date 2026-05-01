import orderModel from "../Models/orderModel.js";

export const CreateOrder = async(req, res, next) => {
    const cartItems = req.body;
    const Amount = Number(cartItems.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2);
    const status = req.body
    console.log('Total Amount:', Amount);
    const order = await orderModel.create({cartItems, Amount, status});
    res.json({
        Success: true,
        order
    });
};