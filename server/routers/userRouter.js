const express = require("express");
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getSingelUser,
  updateUser,
  updateUserImg,
} = require("../controllers/userController");
const registerSchema = require("../validator/registerValidator");
const zodValidator = require("../middlewares/validateZodMiddlewares");
const logSchema = require("../validator/loginValidator");
const authMiddelware = require("../middlewares/authVerifyMiddleware");
const useAuthMiddelware = require("../middlewares/userAuthMiddleware");
const updateUserValidator = require("../validator/updateUserValidator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images/profile`);
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id + ".png");
  },
});

const upload = multer({ storage: storage });

router.post("/register", zodValidator(registerSchema), registerUser);
router.post("/login", zodValidator(logSchema), loginUser);
router.get("/user", useAuthMiddelware, getSingelUser);
router.patch(
  "/user",
  zodValidator(updateUserValidator),
  useAuthMiddelware,
  updateUser
);
router.patch(
  "/user/profileImg",
  useAuthMiddelware,
  upload.single("file"),
  updateUserImg
);

module.exports = router;
