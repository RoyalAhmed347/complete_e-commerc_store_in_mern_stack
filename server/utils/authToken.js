const JWT = require("jsonwebtoken");

const createAdminToken = async (_id) => {
  const token = await JWT.sign({ _id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  return token;
};
const createToken = async (_id) => {
  const token = await JWT.sign({ _id }, process.env.JWT_TOKEN);
  return token;
};
const verifyToken = async (token) => {
  try {
    const _id = await JWT.verify(token, process.env.JWT_TOKEN);
    return _id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createAdminToken, createToken, verifyToken };
