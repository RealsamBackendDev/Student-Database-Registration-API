function successResponse(res, message, data = {}, meta = {}) {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta
  });
}

function errorResponse(res, statusCode, message, code = 'ERROR', details = [], requestId = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    details,
    requestId
  });
}

module.exports = {
  successResponse,
  errorResponse
};
