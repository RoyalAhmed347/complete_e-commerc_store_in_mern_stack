const { z } = require("zod");

const contactSchema = z.object({
  userName: z
    .string({ required_error: "Username is require" })
    .trim()
    .min(3, { message: "username min length is 3 chracters" })
    .max(20, { message: "username max length is 20 chracters" }),
  email: z
    .string({ required_error: "email is require" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email min length 3 chracters" })
    .max(25, { message: "email max length 25 chracters" }),
  message: z
    .string({ required_error: "message is require" })
    .trim()
    .min(10, { message: "message min length is 10 chracters" })
    .max(1000, { message: "message max length is 1000 chracters" }),
});

module.exports = contactSchema;
