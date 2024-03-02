const ADMIN = require("../models/adminModel");
const { createToken, createAdminToken } = require("../utils/authToken");

const adminRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const isEmailExist = await ADMIN.findOne({ email });
    const isPhoneExist = await ADMIN.findOne({ phone });

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
      const createUser = await ADMIN.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        avtarURL: `/images/admin/profile/user.png`,
      });

      const token = await createAdminToken(createUser._id);

      res.json({
        message: "new admin is created",
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

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await ADMIN.findOne({ email });
    if (!isUser) {
      res.status(401).json({
        message: "admin not found",
      });
    } else {
      const isMatch = await isUser.verifyPassword(password);

      if (isMatch) {
        const token = await createAdminToken(isUser._id);
        res.status(201).json({
          message: "admin is login",
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
    res.status(400).json({
      message: "Something is wrong from server",
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    res.status(201).json({ admin });
  } catch (error) {
    res.status(400).json({
      message: "Something is wrong from server",
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const updatedAdmin = await ADMIN.findOneAndUpdate(
      { email: req.admin.email },
      { firstName, lastName, email, phone, password },
      { new: true }
    ).select({ password: 0 });

    console.log(updatedAdmin);

    res.json({
      updatedAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAdminImg = async (req, res) => {
  try {
    if (!req.file) {
      res.status(401).json({
        message: "pleas select an image",
      });
    }

    const URL = `/images/admin/profile/${req.file.filename}`;
    const updatedImg = await ADMIN.findOneAndUpdate(
      { email: req.admin.email },
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
  adminRegister,
  adminLogin,
  getAdmin,
  updateAdmin,
  updateAdminImg,
};
