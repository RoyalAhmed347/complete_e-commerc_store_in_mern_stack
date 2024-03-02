const USER = require("../models/userModel");
const { createToken } = require("../utils/authToken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const isEmailExist = await USER.findOne({ email });
    const isPhoneExist = await USER.findOne({ phone });
    if (isEmailExist) {
      res.status(400).json({
        message: "Email is already register",
      });
      return;
    }
    if (isPhoneExist) {
      res.status(400).json({
        message: "Phone Number is already register",
      });
      return;
    } else {
      const createUser = await USER.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        avtarURL: `/images/profile/user.png`,
      });

      const token = await createToken(createUser._id);

      res.json({
        message: "User is created",
        user: { ...createUser._doc, password: undefined },
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something is wrong from server",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await USER.findOne({ email });
    if (!isUser) {
      res.status(401).json({
        message: "user not found",
      });
    } else {
      const isMatch = await isUser.verifyPassword(password);

      if (isMatch) {
        const token = await createToken(isUser._id);
        res.status(201).json({
          message: "user is login",
          user: { ...isUser._doc, password: undefined },
          token,
        });
      } else {
        res.status(401).json({
          message: "Something is wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingelUser = (req, res) => {
  res.json({
    user: req.user,
  });
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const updatedUser = await USER.findOneAndUpdate(
      { email: req.user.email },
      { firstName, lastName, email, phone, password },
      { new: true }
    ).select({ password: 0 });

    console.log(updatedUser);

    res.json({
      updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserImg = async (req, res) => {
  try {
    if (!req.file) {
      res.status(401).json({
        message: "pleas select an image",
      });
    }

    const URL = `/images/profile/${req.file.filename}`;
    const updatedImg = await USER.findOneAndUpdate(
      { email: req.user.email },
      { avtarURL: URL },
      {
        new: true,
      }
    );

    res.json({
      message: "profile is updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error from server",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSingelUser,
  updateUser,
  updateUserImg,
};
