const { z } = require("zod");

const updateUserValidator = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "username min length 3 chracters" })
    .max(10, { message: "username min length 3 chracters" }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "username min length 3 chracters" })
    .max(10, { message: "username min length 3 chracters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email min length 3 chracters" })
    .max(25, { message: "email max length 25 chracters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "phone min length 10 chracters" })
    .max(20, { message: "phone max length 20 chracters" }),
});

module.exports = updateUserValidator;
