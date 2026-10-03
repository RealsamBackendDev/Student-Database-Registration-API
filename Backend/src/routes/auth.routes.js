const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.post('/login', controller.login);
router.get(
  '/me',
  authenticate,
  authorize('student:profile:read', 'staff:profile:read', 'admin:profile:read'),
  controller.me
);

module.exports = router;
