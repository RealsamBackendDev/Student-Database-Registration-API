const { successResponse, errorResponse } = require('../utils/response');

const STUDENTS = [
  {
    id: 'stu-1001',
    fullName: 'Ada Okafor',
    matricNumber: 'TRSU/22/CS/1001',
    email: 'student@trsu.demo',
    programme: 'Computer Science',
    department: 'Computer Science',
    level: '200 Level',
    status: 'ACTIVE'
  },
  {
    id: 'stu-1002',
    fullName: 'Chinedu Adebayo',
    matricNumber: 'TRSU/22/BUS/1002',
    email: 'chinedu.adebayo@trsu.demo',
    programme: 'Business Administration',
    department: 'Business Administration',
    level: '300 Level',
    status: 'ACTIVE'
  }
];

const RESULT_SHEET = [
  {
    courseCode: 'CSC 201',
    courseTitle: 'Data Structures',
    caScore: 22,
    examScore: 68,
    total: 90,
    grade: 'A',
    semester: '2025/2026 Harmattan'
  },
  {
    courseCode: 'CSC 203',
    courseTitle: 'Operating Systems',
    caScore: 19,
    examScore: 60,
    total: 79,
    grade: 'B',
    semester: '2025/2026 Harmattan'
  },
  {
    courseCode: 'GST 201',
    courseTitle: 'Entrepreneurship',
    caScore: 18,
    examScore: 70,
    total: 88,
    grade: 'A',
    semester: '2025/2026 Harmattan'
  }
];

function getDashboard(req, res) {
  return successResponse(res, 'Student dashboard', {
    summary: {
      bill: 'NGN 175,000',
      outstanding: 'NGN 52,500',
      nextAction: 'Complete course registration approval'
    },
    recentActivities: [
      'Registration submitted for 2nd semester',
      'Payment receipt uploaded',
      'Result slip published for EEE 201'
    ]
  });
}

function getProfile(req, res) {
  return successResponse(res, 'Student profile', {
    student: STUDENTS[0]
  });
}

function getCourses(req, res) {
  return successResponse(res, 'Course catalog', {
    courses: [
      { code: 'CSC 201', title: 'Data Structures', creditUnits: 3, type: 'Core' },
      { code: 'CSC 203', title: 'Operating Systems', creditUnits: 3, type: 'Core' },
      { code: 'GST 201', title: 'Entrepreneurship', creditUnits: 2, type: 'General Studies' }
    ]
  });
}

function registerCourse(req, res) {
  const { semester, courses } = req.body || {};

  if (!semester || !Array.isArray(courses) || courses.length === 0) {
    return errorResponse(res, 400, 'Course registration is missing required information.', 'VALIDATION_ERROR', [
      'Semester and courses are required.'
    ]);
  }

  return successResponse(res, 'Course registration submitted successfully', {
    studentId: req.user?.id || 'stu-1001',
    semester,
    courses,
    status: 'PENDING_HOD_APPROVAL',
    submittedAt: new Date().toISOString()
  });
}

function getResults(req, res) {
  return successResponse(res, 'Student academic transcript', {
    studentId: req.user?.id || 'stu-1001',
    totalUnits: 8,
    gpa: 3.84,
    results: RESULT_SHEET
  });
}

function getNotifications(req, res) {
  return successResponse(res, 'Student notifications', {
    notifications: [
      { id: 'notif-1', type: 'ADMISSION', title: 'Admission review in progress', message: 'Your application has been received and is under review.', read: false },
      { id: 'notif-2', type: 'FINANCE', title: 'Outstanding tuition balance', message: 'Your tuition fee balance is NGN 52,500.', read: false },
      { id: 'notif-3', type: 'RESULT', title: 'Result released', message: 'Your 2025/2026 Harmattan result slip is now available.', read: true }
    ]
  });
}

function getDocuments(req, res) {
  return successResponse(res, 'Student documents', {
    documents: [
      { id: 'doc-1', name: 'Academic Transcript', type: 'PDF', uploadedAt: '2026-09-05', status: 'VERIFIED' },
      { id: 'doc-2', name: 'Birth Certificate', type: 'PDF', uploadedAt: '2026-09-06', status: 'VERIFIED' },
      { id: 'doc-3', name: 'Passport Photograph', type: 'IMAGE', uploadedAt: '2026-09-06', status: 'PENDING' }
    ]
  });
}

module.exports = {
  getDashboard,
  getProfile,
  getCourses,
  registerCourse,
  getResults,
  getNotifications,
  getDocuments
};
