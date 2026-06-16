export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Mongoose/MongoDB duplicate key errors (E11000)
  if (err.code === 11000 || err.code === 11001) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    message = `A record with this ${field} ("${value}") already exists.`;
  }
  // Handle Multer upload errors
  else if (err.name === 'MulterError' || err.code?.startsWith('LIMIT_')) {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size is too large. Maximum size allowed is 5MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = `Unexpected file field upload. Only upload the requested fields.`;
    } else {
      message = `File upload error: ${err.message}`;
    }
  }

  console.error('Error handled by middleware:', err);
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};



