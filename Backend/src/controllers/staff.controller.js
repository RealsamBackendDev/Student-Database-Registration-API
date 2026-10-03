const { successResponse, errorResponse } = require('../utils/response');

function getDashboard(req, res) {
  return successResponse(res, 'Staff dashboard summary', {
    metrics: {
      coursesAssigned: 6,
      resultSubmissions: 24,
      studentsAdvised: 152,
      approvalQueue: 12
    },
    alerts: [
      'CSC 201 continuous assessment results require review',
      '3 student requests need callback before Friday',
      'Faculty seminar attendance list is ready for approval'
    ]
  });
}

function getProfile(req, res) {
  return successResponse(res, 'Staff profile', {
    staff: {
      id: 'staff-2001',
      fullName: 'Mrs. Ada Bello',
      email: 'staff@trsu.demo',
      department: 'Computer Science',
      designation: 'Lecturer II',
      status: 'ACTIVE'
    }
  });
}

function getStudents(req, res) {
  return successResponse(res, 'Assigned students', {
    students: [
      { id: 'stu-1001', name: 'Ada Okafor', matricNumber: 'TRSU/22/CS/1001', level: '200 Level' },
      { id: 'stu-1003', name: 'Tosin Ibe', matricNumber: 'TRSU/22/CS/1003', level: '200 Level' },
      { id: 'stu-1008', name: 'Mariam Yusuf', matricNumber: 'TRSU/22/CS/1008', level: '200 Level' }
    ]
  });
}

function approveRegistration(req, res) {
  const { approvalId } = req.params || {};
  const { approvedBy, comment } = req.body || {};

  if (!approvalId || !approvedBy) {
    return errorResponse(res, 400, 'Approval requires a valid registration and approver.', 'VALIDATION_ERROR', [
      'Registration id and approver name are required.'
    ]);
  }

  return successResponse(res, 'Registration approved successfully', {
    registrationId: approvalId,
    status: 'APPROVED',
    approvedBy,
    comment: comment || 'Approved by department reviewer.',
    approvedAt: new Date().toISOString()
  });
}

module.exports = {
  getDashboard,
  getProfile,
  getStudents,
  approveRegistration
};
