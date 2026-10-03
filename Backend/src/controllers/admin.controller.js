const { successResponse } = require('../utils/response');

function getDashboard(req, res) {
  return successResponse(res, 'Admin dashboard summary', {
    metrics: {
      students: 4820,
      pendingRegistrations: 134,
      unpaidFees: 262,
      activeAdmissions: 75
    },
    alerts: [
      '12 registrations awaiting HOD review',
      '5 payment anomalies require verification',
      '2 new faculty applications are pending approval'
    ]
  });
}

function getUsers(req, res) {
  return successResponse(res, 'Users list', {
    users: [
      { id: 'u-1', name: 'Ada Okafor', role: 'Student' },
      { id: 'u-2', name: 'Mrs. Bello', role: 'Lecturer' },
      { id: 'u-3', name: 'Dr. Eze', role: 'HOD' }
    ]
  });
}

function getFinance(req, res) {
  return successResponse(res, 'Finance and payments summary', {
    summary: {
      totalCollected: 'NGN 24,340,000',
      outstandingFees: 'NGN 4,120,000',
      collectionRate: '85.5%'
    },
    payments: [
      { id: 'pay-001', student: 'Ada Okafor', amount: 'NGN 320,000', status: 'PAID', date: '2026-09-10' },
      { id: 'pay-002', student: 'Chinedu Adebayo', amount: 'NGN 280,000', status: 'PENDING', date: '2026-09-15' },
      { id: 'pay-003', student: 'Mariam Yusuf', amount: 'NGN 410,000', status: 'PAID', date: '2026-09-18' }
    ]
  });
}

module.exports = {
  getDashboard,
  getUsers,
  getFinance
};
