const { successResponse, errorResponse } = require('../utils/response');

function apply(req, res) {
  const { firstName, lastName, email, programme, campus } = req.body || {};

  if (!firstName || !lastName || !email || !programme || !campus) {
    return errorResponse(res, 400, 'Admission application is missing required details.', 'VALIDATION_ERROR', [
      'All fields are required.'
    ]);
  }

  return successResponse(res, 'Admission application submitted successfully', {
    applicationId: 'app-2048',
    firstName,
    lastName,
    email,
    programme,
    campus,
    status: 'PENDING_REVIEW',
    submittedAt: new Date().toISOString()
  });
}

module.exports = {
  apply
};
