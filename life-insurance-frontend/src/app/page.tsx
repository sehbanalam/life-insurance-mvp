'use client';
import React, { useState } from 'react';

type FormData = {
  age: number;
  income: number;
  dependents: number;
  risk_tolerance: 'Low' | 'Medium' | 'High';
};

type Result = {
  recommendation: string;
  explanation: string;
};

export default function Home() {
  const [form, setForm] = useState<FormData>({
    age: 30,
    income: 50000,
    dependents: 1,
    risk_tolerance: 'Medium'
  });

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Page loader effect
  React.useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9eef6] via-white to-[#d0e2f3]">
        <div className="flex flex-col items-center">
          <div className="dot-loader mb-4" aria-label="Loading" />
          <span className="text-[#0a66c2] font-bold text-lg font-sans tracking-wide animate-fade-in">Loading...</span>
        </div>
        <style>{`
          .dot-loader {
            display: flex;
            gap: 8px;
            height: 16px;
          }
          .dot-loader::before,
          .dot-loader::after,
          .dot-loader span {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #0a66c2;
            opacity: 0.7;
            animation: dot-bounce 1.2s infinite ease-in-out both;
          }
          .dot-loader::before {
            animation-delay: -0.24s;
          }
          .dot-loader span {
            animation-delay: -0.12s;
          }
          .dot-loader::after {
            animation-delay: 0;
          }
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: scale(0.7);}
            40% { transform: scale(1);}
          }
          .animate-fade-in {
            animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}</style>
        {/* Dot loader needs a span for the middle dot */}
        <span style={{ display: 'none' }} />
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'age' || name === 'income' || name === 'dependents' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch('https://life-insurance-backend.onrender.com/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e9eef6] via-white to-[#d0e2f3] px-2 sm:px-4 py-6 sm:py-8 transition-colors duration-700 font-sans">
      <div className="w-full max-w-lg sm:max-w-md bg-white/90 p-4 sm:p-8 rounded-2xl shadow-xl border border-[#d0e2f3] backdrop-blur-md animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-[#0a66c2] tracking-tight flex items-center gap-2 font-sans">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#666666] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Life Insurance Recommendation
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 font-sans"
        >
          <div className="flex flex-col gap-1">
            <label className="block text-[#434649] font-semibold flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Age
            </label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-[#d0e2f3] rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:outline-none transition text-base bg-[#f3f6f8] font-sans"
              required
              min={0}
              max={120}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-[#434649] font-semibold flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z" />
              </svg>
              Income
            </label>
            <input
              name="income"
              type="number"
              value={form.income}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-[#d0e2f3] rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:outline-none transition text-base bg-[#f3f6f8] font-sans"
              required
              min={0}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-[#434649] font-semibold flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0113 0" />
              </svg>
              Number of Dependents
            </label>
            <input
              name="dependents"
              type="number"
              value={form.dependents}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-[#d0e2f3] rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:outline-none transition text-base bg-[#f3f6f8] font-sans"
              required
              min={0}
              max={20}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-[#434649] font-semibold flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
              Risk Tolerance
            </label>
            <select
              name="risk_tolerance"
              value={form.risk_tolerance}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-[#d0e2f3] rounded-lg focus:ring-2 focus:ring-[#0a66c2] focus:outline-none transition text-base bg-[#f3f6f8] font-sans"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#0a66c2] hover:bg-[#004182] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl w-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] font-sans ${
              loading ? 'opacity-60 cursor-not-allowed animate-pulse' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2 font-sans">
                <svg className="w-5 h-5 animate-spin text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Get Recommendation'
            )}
          </button>
        </form>

        {result && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 border border-[#b3b6b9] rounded-2xl bg-[#e9eef6]/80 shadow-lg animate-fade-in-up transition-all duration-700 font-sans">
            <h2 className="font-bold text-lg sm:text-xl text-[#0a66c2] flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#666666] animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Recommendation
            </h2>
            <p className="text-[#434649] font-semibold mt-2 text-base sm:text-lg flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {result.recommendation}
            </p>
            <p className="text-[#666666] mt-3 flex items-center gap-2 font-sans">
              <svg className="w-5 h-5 text-[#b3b6b9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
              </svg>
              {result.explanation}
            </p>
          </div>
        )}
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
      {/* LinkedIn font (system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, etc.) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;600;700&display=swap"
      />
      <style>{`
        .font-sans {
          font-family: 'Segoe UI', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </main>
  );
}
