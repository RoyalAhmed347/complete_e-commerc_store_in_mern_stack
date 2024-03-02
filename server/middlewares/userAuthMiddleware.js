const ADMIN = require("../models/adminModel");
const USER = require("../models/userModel");
const { verifyToken } = require("../utils/authToken");

const useAuthMiddelware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided" });
  }
  try {
    const JWTToken = token.replace("Bearer ", "").trim();

    const payload = await verifyToken(JWTToken);

    const user = await USER.findOne({ _id: payload._id }).select({
      password: 0,
    });

    req.user = user;
    req.token = JWTToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = useAuthMiddelware;
