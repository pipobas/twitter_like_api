function errorHandler(err, req, res, next){
  console.error("Error:", err.message, res.status);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
  console.log("Error handled successfully");
};

module.exports = errorHandler;