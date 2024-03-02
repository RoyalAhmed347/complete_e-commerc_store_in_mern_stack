const ADMIN = require("../models/adminModel");
const { verifyToken } = require("../utils/authToken");

const authMiddelware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided" });
  }
  try {
    const JWTToken = token.replace("Bearer ", "").trim();

    const payload = await verifyToken(JWTToken);

    const admin = await ADMIN.findOne({ _id: payload._id }).select({
      password: 0,
    });

    req.admin = admin;
    req.token = JWTToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddelware;
