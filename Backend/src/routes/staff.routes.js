const express = require('express');
const router = express.Router();

const controller = require('../controllers/staff.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/dashboard', authenticate, authorize('staff:profile:read', 'student:profile:read', 'result:write'), controller.getDashboard);
router.get('/profile', authenticate, authorize('staff:profile:read'), controller.getProfile);
router.get('/students', authenticate, authorize('student:profile:read'), controller.getStudents);
router.post('/approvals/:approvalId/approve', authenticate, authorize('registration:approve'), controller.approveRegistration);

module.exports = router;
