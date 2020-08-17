require('dotenv').config();
//Middleware to handle 404 Not Found status codes
const notFound = (req, res, next) => {
  const error = new Error(
    `404 Not Found - '${req.originalUrl}' does not exist.`
  );
  res.status(404);
  next(error);
};

//Middleware to handle generic errors

const errorHandler = (error, req, res, next) => {
  //If the status code is 200 but we wound up here, then some other route had an error. So, we
  //designate it as 500. Otherwise, keep the status code.
  const statusCode = req.statusCode === 200 ? 500 : req.statusCode;

  res.status(statusCode);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === 'production'
        ? 'Cannot display stack in production environment'
        : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
