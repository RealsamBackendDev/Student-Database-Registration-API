const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../src/app');
const env = require('../src/config/env');

function makeToken(payload) {
  return jwt.sign(payload, env.SESSION_SECRET, { expiresIn: '8h' });
}

test('student admission application is accepted', async () => {
  const response = await request(app)
    .post('/api/v1/admissions/apply')
    .send({
      firstName: 'Blessing',
      lastName: 'Adebayo',
      email: 'blessing.adebayo@example.com',
      programme: 'Computer Science',
      campus: 'Main Campus'
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.status, 'PENDING_REVIEW');
  assert.equal(response.body.data.programme, 'Computer Science');
});

test('student notifications endpoint returns a list of alerts', async () => {
  const token = makeToken({
    id: 'stu-1001',
    email: 'student@trsu.demo',
    fullName: 'Ada Okafor',
    role: 'STUDENT',
    department: 'Computer Science',
    permissions: ['student:profile:read', 'course:read', 'registration:create', 'payment:read', 'notification:read']
  });

  const response = await request(app)
    .get('/api/v1/students/notifications')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(Array.isArray(response.body.data.notifications));
  assert.equal(response.body.data.notifications[0].type, 'ADMISSION');
});

test('student documents endpoint returns uploaded academic records', async () => {
  const token = makeToken({
    id: 'stu-1001',
    email: 'student@trsu.demo',
    fullName: 'Ada Okafor',
    role: 'STUDENT',
    department: 'Computer Science',
    permissions: ['student:profile:read', 'course:read', 'registration:create', 'payment:read', 'document:read']
  });

  const response = await request(app)
    .get('/api/v1/students/documents')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(Array.isArray(response.body.data.documents));
  assert.equal(response.body.data.documents[0].name, 'Academic Transcript');
});
