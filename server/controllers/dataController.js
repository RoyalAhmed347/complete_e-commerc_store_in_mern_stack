const PRODUCT = require("../models/productModel");
const USER = require("../models/userModel");

const addNewProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      colors,
      discountPercentage,
      brand,
      category,
      rating,
      shipping,
    } = req.body;

    const userImages = req.files;
    const images = userImages.map((i) => {
      return `/images/products/${i.filename}`;
    });

    const thumbnail = images[0];
    images.shift();
    const result = await PRODUCT.create({
      title,
      description,
      price,
      stock,
      discountPercentage,
      brand,
      category,
      colors,
      rating,
      images,
      shipping,
      thumbnail,
    });

    res.json({
      message: "product is created",
      result,
    });
  } catch (error) {
    res.status(400).send({
      message: error,
    });
  }
};

const getSingelProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const Product = await PRODUCT.find({ _id });

    res.json({
      Product,
    });
  } catch (error) {
    res.status(400).json({
      message: "not found",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allproducts = await PRODUCT.find({});

    res.json({
      allproducts,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await USER.find({}).select({ password: 0 });
    if (!allUsers) {
      res.status(200).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        allUsers,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSingelProduct,
  addNewProduct,
  getAllProducts,
  getAllUsers,
};
