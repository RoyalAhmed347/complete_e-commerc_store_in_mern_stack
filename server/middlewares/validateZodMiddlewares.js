const zodValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      const status = 400;
      const message = "Please fill the correct information";
      const errorDetails = error.issues[0].message;
      err = {
        status,
        message,
        errorDetails,
      };
      next(err);
    }
  };
};

module.exports = zodValidator;
