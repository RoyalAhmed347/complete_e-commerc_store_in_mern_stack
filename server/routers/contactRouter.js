const express = require("express");
const contactSchema = require("../validator/contactValidator");
const { createContact } = require("../controllers/contactController");
const zodValidator = require("../middlewares/validateZodMiddlewares");
const router = express.Router();

router.post("/", zodValidator(contactSchema), createContact);

module.exports = router;
