import { useState } from 'react';

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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Life Insurance Recommendation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Age</label>
            <input name="age" type="number" value={form.age} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block">Income</label>
            <input name="income" type="number" value={form.income} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block">Number of Dependents</label>
            <input name="dependents" type="number" value={form.dependents} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="block">Risk Tolerance</label>
            <select name="risk_tolerance" value={form.risk_tolerance} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            {loading ? 'Submitting...' : 'Get Recommendation'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded bg-green-50">
            <h2 className="font-semibold text-lg">Recommendation</h2>
            <p className="text-blue-800 font-medium mt-1">{result.recommendation}</p>
            <p className="text-gray-700 mt-2">{result.explanation}</p>
          </div>
        )}
      </div>
    </main>
  );
}
