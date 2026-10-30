import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

export default function AuthModal() {
  const { authModal, closeAuthModal, login, register } = useApp();
  const [mode, setMode] = useState(authModal.mode || 'login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  if (!authModal.isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!email) {
      errs.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Invalid email';
    }

    if (!password) {
      errs.password = 'Password required';
    } else if (password.length < 6) {
      errs.password = 'Min 6 characters';
    }

    if (mode === 'register' && !name.trim()) {
      errs.name = 'Name required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'login') {
      login(email, password, rememberMe);
    } else {
      register({ name, email, password });
    }
  };

  const handleDemoLogin = () => {
    login('aria@studio.design', 'studiopass', true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-2xl bg-studio-card border-2 border-studio-border shadow-studio-modal p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-studio-border">
          <span className="font-extrabold text-xl text-studio-text font-outfit">
            Studio
          </span>

          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-studio-text hover:bg-studio-sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-studio-sidebar p-1 border-2 border-studio-border">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrors({});
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-studio-card text-studio-text shadow-sm border border-studio-border'
                : 'text-studio-subtext hover:text-studio-text'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrors({});
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'register'
                ? 'bg-studio-card text-studio-text shadow-sm border border-studio-border'
                : 'text-studio-subtext hover:text-studio-text'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-studio-text">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-studio-subtext absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-studio-sidebar border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none"
                />
              </div>
              {errors.name && <span className="text-[10px] font-bold text-rose-500">{errors.name}</span>}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-studio-text">
              Email
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-studio-subtext absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-studio-sidebar border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none"
              />
            </div>
            {errors.email && <span className="text-[10px] font-bold text-rose-500">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-studio-text">
              Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-studio-subtext absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 pr-8 py-2 rounded-xl bg-studio-sidebar border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-studio-text"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            {errors.password && <span className="text-[10px] font-bold text-rose-500">{errors.password}</span>}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-studio-text font-bold text-xs">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-studio-text"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-studio-btn-dark text-studio-btn-darkText text-xs font-bold hover:opacity-90 transition-opacity mt-1 shadow-md"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="pt-2 border-t-2 border-studio-border">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 rounded-xl bg-studio-sidebar border-2 border-studio-border text-xs font-bold text-studio-text hover:bg-studio-card transition-colors shadow-sm"
          >
            1-Click Demo Login
          </button>
        </div>
      </div>
    </div>
  );
}
