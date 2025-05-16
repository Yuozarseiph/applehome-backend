// server/controllers/cartController.js

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        product: product._id,
        quantity: 1,
      });
    }

    await user.save();

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not add product to cart." });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    ); // اصلاح شرط فیلتر
    await user.save();

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not remove product." });
  }
};

export const getCart = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const userId = decoded.id;

    const user = await User.findById(userId).populate(
      "cart.product", // اطمینان از پر کردن اطلاعات محصول
      "name price image" // فیلدهای مورد نیاز
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error. Could not load cart." });
  }
};

export const clearCart = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = []; // خالی کردن سبد خرید
    await user.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error. Could not clear cart." });
  }
};
