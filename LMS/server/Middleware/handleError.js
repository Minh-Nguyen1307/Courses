export const handleError = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging (only in development)
  
    const statusCode = err.statusCode || 500; // If statusCode is not defined, default to 500 (Internal Server Error)
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  