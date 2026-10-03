const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/dashboard', authenticate, authorize('student:profile:read'), controller.getDashboard);
router.get('/profile', authenticate, authorize('student:profile:read'), controller.getProfile);
router.get('/courses', authenticate, authorize('course:read'), controller.getCourses);
router.post('/register', authenticate, authorize('registration:create'), controller.registerCourse);
router.get('/results', authenticate, authorize('student:profile:read'), controller.getResults);
router.get('/notifications', authenticate, authorize('notification:read'), controller.getNotifications);
router.get('/documents', authenticate, authorize('document:read'), controller.getDocuments);

module.exports = router;
