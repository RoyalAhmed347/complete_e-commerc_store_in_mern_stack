const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  stock: {
    type: "number",
    required: true,
  },
  discountPercentage: {
    type: "number",
    required: true,
  },
  feature: {
    type: "boolean",
    required: true,
    default: false,
  },
  brand: {
    type: "string",
    required: true,
  },
  category: {
    type: "string",
    required: true,
  },
  colors: {
    required: true,
    type: "array",
    items: {
      type: "string",
    },
  },
  rating: {
    type: "number",
    // required: true,
  },

  shipping: {
    type: "number",
    required: true,
  },
  thumbnail: {
    type: "string",
    // required: true,
  },
  images: {
    required: true,
    type: "array",
    items: {
      type: "string",
    },
  },
});

const PRODUCT = mongoose.model("product", productSchema);

module.exports = PRODUCT;

// {
//     "id": "13cbc7ed-a61b-4883-9d42-82d7d8642b86",
//     "reviews": 4355,
//     "shipping": 14,
//     "quantity": 0,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident id molestiae voluptates alias dolorum accusantium, perspiciatis praesentium architecto, aperiam repudiandae nihil aspernatur nisi voluptatum non error totam deleniti tempore harum.",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 3.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "colors": ["#54E2E9", "#FFD700", "#000000"],
//     "images": [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg"
//     ]
//   },
