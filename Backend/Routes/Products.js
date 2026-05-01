import express from "express";
import Product from "../Models/productModel.js";

const router = express.Router();

// GET ALL / SEARCH PRODUCTS
router.get("/products", async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i"
        }
      }
    : {};

  const products = await Product.find({ ...keyword });

  res.json({
    success: true,
    products
  });
});

// GET SINGLE PRODUCT
router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json({
    success: true,
    product
  });
});

export default router;