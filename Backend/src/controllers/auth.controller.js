const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/response');
const env = require('../config/env');

const DEMO_USERS = {
  'student@trsu.demo': {
    id: 'stu-1001',
    fullName: 'Ada Okafor',
    email: 'student@trsu.demo',
    role: 'STUDENT',
    department: 'Computer Science',
    permissions: ['student:profile:read', 'course:read', 'registration:create', 'payment:read']
  },
  'staff@trsu.demo': {
    id: 'staff-2001',
    fullName: 'Mrs. Ada Bello',
    email: 'staff@trsu.demo',
    role: 'STAFF',
    department: 'Computer Science',
    permissions: ['staff:profile:read', 'student:profile:read', 'result:write', 'course:read']
  },
  'admin@trsu.demo': {
    id: 'admin-3001',
    fullName: 'Dr. Sam Eze',
    email: 'admin@trsu.demo',
    role: 'ADMIN',
    department: 'Registry',
    permissions: ['admin:profile:read', 'user:create', 'audit:read', 'student:profile:read', 'result:approve']
  }
};

const DEMO_PASSWORDS = {
  'student@trsu.demo': 'demo123',
  'staff@trsu.demo': 'staff123',
  'admin@trsu.demo': 'admin123'
};

function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return errorResponse(res, 400, 'Unable to authenticate with the provided details.', 'VALIDATION_ERROR', [
      'Email and password are required.'
    ]);
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const selectedUser = DEMO_USERS[normalizedEmail];

  if (!selectedUser || DEMO_PASSWORDS[normalizedEmail] !== String(password)) {
    return errorResponse(res, 401, 'Unable to authenticate with the provided details.', 'INVALID_CREDENTIALS', [
      'The supplied email or password is incorrect.'
    ]);
  }

  const token = jwt.sign({
    id: selectedUser.id,
    email: selectedUser.email,
    fullName: selectedUser.fullName,
    role: selectedUser.role,
    department: selectedUser.department,
    permissions: selectedUser.permissions
  }, env.SESSION_SECRET, { expiresIn: '8h' });

  return successResponse(res, 'Login successful', {
    token,
    user: {
      id: selectedUser.id,
      fullName: selectedUser.fullName,
      email: selectedUser.email,
      role: selectedUser.role,
      department: selectedUser.department
    }
  });
}

function me(req, res) {
  return successResponse(res, 'Authenticated user profile', {
    user: {
      id: req.user.id,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role,
      department: req.user.department,
      permissions: req.user.permissions
    }
  });
}

module.exports = {
  login,
  me
};
