// utils/errorHandlers.js
function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
