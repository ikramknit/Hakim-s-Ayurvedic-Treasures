
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === 'admin' && password === 'pass') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-stone-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="bg-ayurveda-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-ayurveda-gold">
            <i className="fas fa-lock text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold brand-font text-ayurveda-green">Hakim Login</h1>
          <p className="text-stone-500 mt-2">Manage your Ayurvedic treasures</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Admin ID</label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-stone-300"></i>
              <input 
                required
                type="text" 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none transition"
                placeholder="Enter ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Password</label>
            <div className="relative">
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-stone-300"></i>
              <input 
                required
                type="password" 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none transition"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-ayurveda-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-800 transition shadow-xl mt-4"
          >
            Access Dashboard
          </button>
        </form>

        <p className="text-center text-stone-400 text-xs mt-8">
          Authorized personnel only. Sessions are monitored.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
