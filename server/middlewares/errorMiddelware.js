const errorMiddelware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";
  const errorDetails = err.errorDetails || "Please fill the correct information";

  res.status(status).json({
    message,
    errorDetails,
  });
};

module.exports = errorMiddelware;
