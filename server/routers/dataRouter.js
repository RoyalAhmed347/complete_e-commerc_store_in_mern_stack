const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  addNewProduct,
  getSingelProduct,
  getAllProducts,
  getAllUsers,
} = require("../controllers/dataController");
const authMiddelware = require("../middlewares/authVerifyMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/images/products";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  },
});

const upload = multer({ storage: storage });

router.get("/getProduct/:id", getSingelProduct);
router.post(
  "/add_product",
  authMiddelware,
  upload.array("images"),
  addNewProduct
);
router.get("/allproducts", getAllProducts);
router.get("/allusers", getAllUsers);

module.exports = router;
