const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    totalPrice: Number,
    quantity: Number,
    rating: Number,
    image: String,
    userId: String,
    paid: { type: Boolean, default: false }  
  },
  { timestamps: true }
);

const Food = mongoose.model("food", foodSchema);
module.exports = Food;