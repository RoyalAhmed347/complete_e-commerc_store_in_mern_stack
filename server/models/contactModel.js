const { default: mongoose, model } = require("mongoose");

const contactSchema = new mongoose.Schema({
  userName: {
    type: String,
    require,
  },
  email: {
    type: String,
    require,
  },
  message: {
    type: String,
    require,
  },
});

const CONTACT = new model("contact", contactSchema);

module.exports = CONTACT;
