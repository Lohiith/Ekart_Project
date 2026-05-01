import mongoose from 'mongoose';
import Productmodel from '../Models/Productmodel.js';

export const getProducts = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        
        let query = {};
        if (keyword) {
            query = { name: { $regex: keyword, $options: 'i' } }; // case-insensitive search
        }
        
        const products = await Productmodel.find(query);
        res.json({
            Success: true,
            products
        });
    } catch (err) {
        next(err);
    }
};

export const getSingleProduct = async (req, res, next) => {
    try {
        console.log(req.params.id, 'ID of the product');
        const product = await Productmodel.findById(req.params.id);

        res.json({
            Success: true,
            product
        });
    } catch (err) {
        next(err);
    }
};