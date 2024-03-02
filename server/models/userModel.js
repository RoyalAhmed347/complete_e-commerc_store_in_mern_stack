const { default: mongoose, Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  phone: {
    type: String,
    unique: true,
    require: true,
  },
  avtarURL: {
    type: String,
    require: true,
    // default: "user.png",
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified) {
      next();
    }
    const salt = (await bcrypt.genSalt(12)).toString();
    const hasedPassword = await bcrypt.hash(user.password, salt);

    user.password = hasedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const USER = model("user", userSchema);

module.exports = USER;
