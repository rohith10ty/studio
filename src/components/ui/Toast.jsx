import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Heart, X } from 'lucide-react';

export default function Toast() {
  const { toast, showToast } = useApp();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-studio-dark-float backdrop-blur-xl border transition-all duration-300 animate-slide-up bg-studio-dark-card/95 text-studio-dark-text border-studio-dark-border dark:bg-studio-dark-card/95 dark:text-studio-dark-text dark:border-studio-dark-border light:bg-studio-light-card/95 light:text-studio-light-text light:border-studio-light-border">
      {toast.type === 'success' && (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      )}
      {toast.type === 'heart' && (
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0" />
      )}
      {toast.type === 'info' && (
        <Info className="w-5 h-5 text-indigo-400 shrink-0" />
      )}
      <span className="text-sm font-medium tracking-wide">
        {toast.message}
      </span>
    </div>
  );
}
