export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.isCustom) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }

  // Generic fallback
  res.status(500).json({
    success: false,
    error: "Something went wrong. Please try again later.",
  });
}
