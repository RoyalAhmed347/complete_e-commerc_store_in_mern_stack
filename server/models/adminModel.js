const { default: mongoose, Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new Schema({
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
  avtarURL: {
    type: String,
    require: true,
    // default: "user.png",
  },
  phone: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (this.password.isModified) {
    next();
  }

  const salt = await (await bcrypt.genSalt(12)).toString();

  const hashPass = await bcrypt.hash(this.password, salt);

  this.password = hashPass;
  next();
});

adminSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const ADMIN = mongoose.model("admin", adminSchema);

module.exports = ADMIN;
