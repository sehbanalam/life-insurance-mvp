# 🛡️ Life Insurance Recommendation MVP

A full-stack prototype that collects user data and recommends a life insurance plan using rule-based logic.

## ✨ Tech Stack

- **Frontend:** Next.js 13 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (hosted on Render)
- **Deployment:** 
  - Frontend: Vercel  
    🔗 [https://life-insurance-mvp.vercel.app](https://life-insurance-mvp.vercel.app)
  - Backend: Render  
    🔗 [https://life-insurance-backend.onrender.com](https://life-insurance-backend.onrender.com)

---

## 📸 Features

- Single-page form:
  - Age
  - Income
  - Number of Dependents
  - Risk Tolerance (Low / Medium / High)
- Personalized life insurance recommendation
- Stores submissions to PostgreSQL
- Clean, responsive UI
- Modular, domain-driven folder structure (DDD)
- Deployed and cloud-ready (Docker + AWS-compatible)

---

## 📦 Project Structure (Monorepo)

```
life-insurance-mvp/
├── life-insurance-frontend/   # Next.js + Tailwind
├── life-insurance-backend/    # Express + TypeScript
```

---

## 🚀 Running Locally

### Backend

```bash
cd life-insurance-backend
cp .env.example .env # Add your PostgreSQL URL
npm install
npm run dev
```

Test it:
```bash
curl http://localhost:5000/health
```

### Frontend

```bash
cd life-insurance-frontend
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Reference

### `POST /recommendation`

**Request:**
```json
{
  "age": 32,
  "income": 80000,
  "dependents": 2,
  "risk_tolerance": "High"
}
```

**Response:**
```json
{
  "recommendation": "Term Life – $500,000 for 20 years",
  "explanation": "Young age and high risk suggests term coverage for flexibility and affordability."
}
```

---

## 🛠 Deployment Instructions

### Backend (Render)

- Pushed to GitHub
- Dockerfile in backend folder
- Connected to Render with:
  - `PORT=5000`
  - `DATABASE_URL=...` (PostgreSQL connection string)

### Frontend (Vercel)

- Monorepo root on GitHub
- Vercel root set to: `life-insurance-frontend`

---

## ✅ Stretch Goals (Not Implemented)

- ✅ Secure headers via CORS
- ☐ Auth (email/password or OTP)
- ☐ Logging & monitoring (e.g., CloudWatch or Winston)
- ☐ Rate limiting (express-rate-limit)
- ☐ Mobile version (React Native)

---

## 📄 License

MIT

---

## 👨‍💻 Author

Built by Sebu as part of a technical challenge.
