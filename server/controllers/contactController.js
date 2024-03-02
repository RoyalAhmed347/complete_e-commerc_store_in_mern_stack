const CONTACT = require("../models/contactModel");

const createContact = async (req, res) => {
  try {
    const { userName, email, message } = req.body;

    const created = await CONTACT.create({
      userName,
      email,
      message,
    });
    res.json({
      message: "Message has successful send",
    });
  } catch (error) {
    res.status(500).json({
      message: "something is wrong from server",
    });
  }
};

module.exports = { createContact };
