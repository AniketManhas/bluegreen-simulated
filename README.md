# Simulated Blue/Green CI/CD Pipeline (React + Node.js)

## 🎯 Objective
To demonstrate a full-stack CI/CD pipeline with Blue/Green deployment strategy using GitHub Actions (simulated AWS flow).

## ⚙️ Stack
- Frontend: React
- Backend: Node.js (Express)
- CI/CD: GitHub Actions (simulated deploy steps)
- Scripts: Bash automation for build/test/deploy

## 🧠 How to run locally

### Backend
```bash
cd backend
npm install
npm start
# Open http://localhost:5000/health
```

### Frontend
```bash
cd frontend
npm install
npm start
# Open http://localhost:3000
```

## 🚀 CI/CD (GitHub Actions)
Push code to `main` branch and check GitHub Actions tab for:
- CI: Build & Test
- CD: Simulated Blue/Green Deployment

## ✅ What is simulated?
This repo simulates deployment steps (packaging, deploy to green, smoke tests, CNAME swap) using scripts so you can demonstrate the full flow without an AWS account.
