// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // اضافه کردن روت محصولات

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes); // اضافه کردن روت محصولات

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
