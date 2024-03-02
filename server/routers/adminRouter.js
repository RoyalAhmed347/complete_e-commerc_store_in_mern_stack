const express = require("express");
const multer = require("multer");
const {
  adminRegister,
  adminLogin,
  getAdmin,
  updateAdminImg,
  updateAdmin,
} = require("../controllers/adminController");
const zodValidator = require("../middlewares/validateZodMiddlewares");
const registerSchema = require("../validator/registerValidator");
const logSchema = require("../validator/loginValidator");
const authMiddelware = require("../middlewares/authVerifyMiddleware");
const updateUserValidator = require("../validator/updateUserValidator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images/admin/profile`);
  },
  filename: (req, file, cb) => {
    cb(null, req.admin._id + ".png");
  },
});

const upload = multer({ storage: storage });

router.post("/register", zodValidator(registerSchema), adminRegister);
router.post("/login", zodValidator(logSchema), adminLogin);
router
  .route("/admin")
  .get(authMiddelware, getAdmin)
  .patch(authMiddelware, zodValidator(updateUserValidator), updateAdmin);

router.patch(
  "/admin/profileImg",
  authMiddelware,
  upload.single("file"),
  updateAdminImg
);

module.exports = router;
