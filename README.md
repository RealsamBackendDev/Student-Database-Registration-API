# The Real Sam University

A portfolio-ready university management system built with a CommonJS Express backend, PostgreSQL + Prisma data model, and a React + Vite frontend.

## Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express.js, CommonJS, JWT auth, rate limiting, Helmet
- Database: PostgreSQL with Prisma ORM
- Security: CORS, role-aware middleware, secure headers, rate limiting

## Run locally

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev -- --host 0.0.0.0
```

## Default URLs

- Frontend: http://localhost:5173/
- Backend: http://localhost:5000/
- Health check: http://localhost:5000/health

## Notes

This project is designed as a demo and portfolio system. It uses fictional data only and can be extended into admissions, payment verification, course registration, result workflows, and staff/admin modules.
