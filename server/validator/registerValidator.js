const { z } = require("zod");

const registerSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is require" })
    .trim()
    .min(3, { message: "username min length 3 chracters" })
    .max(10, { message: "username min length 3 chracters" }),
  lastName: z
    .string({ required_error: "Last Name is require" })
    .trim()
    .min(3, { message: "username min length 3 chracters" })
    .max(10, { message: "username min length 3 chracters" }),
  email: z
    .string({ required_error: "Email is require" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email min length 3 chracters" })
    .max(25, { message: "email max length 25 chracters" }),
  phone: z
    .string({ required_error: "phone is require" })
    .trim()
    .min(10, { message: "phone min length 10 chracters" })
    .max(20, { message: "phone max length 20 chracters" }),
  password: z
    .string({ required_error: "Password is require" })
    .min(6, { message: "password min length 6 chracters" })
    .max(25, { message: "password max length 25 chracters" }),
});

module.exports = registerSchema;
