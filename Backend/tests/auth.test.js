const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../src/app');
const env = require('../src/config/env');

function makeToken(payload) {
  return jwt.sign(payload, env.SESSION_SECRET, { expiresIn: '8h' });
}

test('student login returns a valid student token', async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'student@trsu.demo',
      password: 'demo123'
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.user.role, 'STUDENT');
  assert.ok(response.body.data.token);
});

test('admin login returns admin access details', async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'admin@trsu.demo',
      password: 'admin123'
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.user.role, 'ADMIN');
  assert.ok(response.body.data.token);
});

test('missing credentials are rejected', async () => {
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'student@trsu.demo' });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.code, 'VALIDATION_ERROR');
});

test('student registration request is created and marked pending approval', async () => {
  const token = makeToken({
    id: 'stu-1001',
    email: 'student@trsu.demo',
    fullName: 'Ada Okafor',
    role: 'STUDENT',
    department: 'Computer Science',
    permissions: ['student:profile:read', 'course:read', 'registration:create', 'payment:read']
  });

  const response = await request(app)
    .post('/api/v1/students/register')
    .set('Authorization', `Bearer ${token}`)
    .send({
      semester: '2026/2027 Harmattan',
      courses: ['CSC 201', 'CSC 203']
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.status, 'PENDING_HOD_APPROVAL');
  assert.deepEqual(response.body.data.courses, ['CSC 201', 'CSC 203']);
});

test('student results endpoint returns the academic transcript', async () => {
  const token = makeToken({
    id: 'stu-1001',
    email: 'student@trsu.demo',
    fullName: 'Ada Okafor',
    role: 'STUDENT',
    department: 'Computer Science',
    permissions: ['student:profile:read', 'course:read', 'registration:create', 'payment:read']
  });

  const response = await request(app)
    .get('/api/v1/students/results')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(Array.isArray(response.body.data.results));
  assert.equal(response.body.data.results[0].courseCode, 'CSC 201');
});

test('HOD approval route marks a registration as approved', async () => {
  const token = makeToken({
    id: 'staff-2001',
    email: 'staff@trsu.demo',
    fullName: 'Mrs. Ada Bello',
    role: 'STAFF',
    department: 'Computer Science',
    permissions: ['staff:profile:read', 'student:profile:read', 'result:write', 'registration:approve']
  });

  const response = await request(app)
    .post('/api/v1/staff/approvals/registration-001/approve')
    .set('Authorization', `Bearer ${token}`)
    .send({
      approvedBy: 'Mrs. Ada Bello',
      comment: 'Courses align with the student programme plan.'
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.status, 'APPROVED');
  assert.equal(response.body.data.approvedBy, 'Mrs. Ada Bello');
});

test('admin finance endpoint returns fee summary and collection status', async () => {
  const token = makeToken({
    id: 'admin-3001',
    email: 'admin@trsu.demo',
    fullName: 'Dr. Sam Eze',
    role: 'ADMIN',
    department: 'Registry',
    permissions: ['admin:profile:read', 'user:create', 'audit:read', 'student:profile:read', 'result:approve', 'finance:read']
  });

  const response = await request(app)
    .get('/api/v1/admin/finance')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.summary.totalCollected, 'NGN 24,340,000');
  assert.ok(Array.isArray(response.body.data.payments));
});
