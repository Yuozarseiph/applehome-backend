// routes/productRoutes.js
import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      deletedProduct, // Optional: remove if you don't want to return deleted data
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
});

export default router;
