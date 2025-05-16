import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // اطمینان از اینکه نوع قیمت عددی است
    required: true,
    default: 0, // مقدار پیش‌فرض برای جلوگیری از NaN
  },
  image: {
    type: String,
    default: "/placeholder.jpg",
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
