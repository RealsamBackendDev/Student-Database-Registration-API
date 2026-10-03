const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/dashboard', authenticate, authorize('user:create', 'audit:read'), controller.getDashboard);
router.get('/users', authenticate, authorize('user:create', 'audit:read'), controller.getUsers);
router.get('/finance', authenticate, authorize('finance:read', 'audit:read'), controller.getFinance);

module.exports = router;
