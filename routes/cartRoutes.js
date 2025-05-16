import express from "express";
import { addToCart, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.post("/remove", removeFromCart);
router.post("/clear", clearCart); // مسیر جدید برای خالی کردن سبد خرید

export default router;
