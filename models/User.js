// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // اعتبارسنجی ایمیل
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // اطمینان از ارتباط با مدل Product
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
