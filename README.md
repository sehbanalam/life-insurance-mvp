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

## ☁️ Deployment to AWS (Optional)

This project is ready for deployment on AWS. Here's how to deploy both the frontend and backend.

### 🛠 Backend: Deploy to AWS Elastic Beanstalk (Docker)

1. **Install EB CLI**  
   Follow: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html

2. **Initialize Elastic Beanstalk**
   ```bash
   cd life-insurance-backend
   eb init -p docker life-insurance-backend --region <your-region>
   ```

3. **Create Environment & Deploy**
   ```bash
   eb create life-insurance-backend-env
   eb deploy
   ```

4. **Set Environment Variables in EB Console**
   - `DATABASE_URL`
   - `PORT=5000`

---

### 🌐 Frontend: Deploy to AWS Amplify or S3 + CloudFront

#### Option A: AWS Amplify (Recommended)

1. **Connect GitHub repo to Amplify Console**
2. Set build settings (auto-detected for Next.js)
3. Set root directory to `life-insurance-frontend/`
4. Deploy

#### Option B: S3 + CloudFront (Manual)

1. Build the app:
   ```bash
   cd life-insurance-frontend
   npm run build
   ```

2. Export static site (optional):
   ```bash
   npm run export
   ```

3. Upload `out/` or `.next/` to an S3 bucket
4. Set up CloudFront for CDN + SSL

---

## 📄 License

MIT
---
