import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Eye, EyeOff, Sparkles, Check } from 'lucide-react';

export default function AuthModal() {
  const { authModal, closeAuthModal, login, register } = useApp();
  const [mode, setMode] = useState(authModal.mode || 'login'); // 'login' | 'register'

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
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register' && !name.trim()) {
      errs.name = 'Full name is required';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-6 sm:p-8 flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-studio-dark-border to-studio-dark-text dark:from-studio-dark-border dark:to-studio-dark-text light:from-studio-light-muted light:to-studio-light-text flex items-center justify-center text-white dark:text-studio-dark-bg light:text-studio-light-bg font-bold text-sm">
              S
            </div>
            <span className="font-bold text-lg text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
              Studio Pass
            </span>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 p-1 border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrors({});
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'login'
                ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text shadow-sm'
                : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text'
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
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'register'
                ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text shadow-sm'
                : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
                />
              </div>
              {errors.name && <span className="text-[11px] text-rose-400">{errors.name}</span>}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@studio.design"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
              />
            </div>
            {errors.email && <span className="text-[11px] text-rose-400">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <span className="text-[11px] text-rose-400">{errors.password}</span>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-studio-dark-border accent-studio-dark-border"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:underline text-[11px]"
            >
              Need help?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white font-semibold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all mt-2"
          >
            {mode === 'login' ? 'Sign In to Studio' : 'Create Studio Account'}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text flex items-center justify-center gap-2 hover:bg-studio-dark-bg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto-fill Demo Account (1-Click)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
