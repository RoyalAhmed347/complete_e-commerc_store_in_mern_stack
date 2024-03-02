const { z } = require("zod");

const logSchema = z.object({
  email: z
    .string({ required_error: "Email is require" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email min length 3 chracters" })
    .max(25, { message: "email max length 25 chracters" }),

  password: z
    .string({ required_error: "Password is require" })
    .min(6, { message: "password min length 6 chracters" })
    .max(25, { message: "password max length 25 chracters" }),
});

module.exports = logSchema;
