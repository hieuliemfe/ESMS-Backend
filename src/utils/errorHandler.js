export class DefaultError extends Error {
  constructor(statusCode, message, errors) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export const handleError = (err, res) => {
  const {
    statusCode = 400,
    message = "You did something wrong, honey",
    errors,
  } = err;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};
