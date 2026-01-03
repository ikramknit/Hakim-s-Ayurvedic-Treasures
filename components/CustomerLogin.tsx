
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CustomerLoginProps {
  onLogin: () => void;
}

const CustomerLogin: React.FC<CustomerLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Sample Credentials
    if (email === 'user@example.com' && password === 'pass123') {
      onLogin();
    } else {
      setError('Invalid email or password. Use user@example.com / pass123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-stone-50">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="bg-ayurveda-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-ayurveda-gold">
            <i className="fas fa-user-circle text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold brand-font text-ayurveda-green">Welcome Back</h1>
          <p className="text-stone-500 mt-2">Sign in to track your healing journey</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 ml-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none transition"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-stone-700">Password</label>
              <button type="button" className="text-xs text-ayurveda-green font-bold hover:underline">Forgot?</button>
            </div>
            <input 
              required
              type="password" 
              className="w-full px-4 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-ayurveda-green outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-ayurveda-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-800 transition shadow-lg mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-stone-500 text-sm">
            Don't have an account? <button className="text-ayurveda-green font-bold hover:underline">Join the Tribe</button>
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-stone-100 text-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Sample Account</p>
          <p className="text-xs text-stone-500 mt-1">ID: user@example.com | Pass: pass123</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
