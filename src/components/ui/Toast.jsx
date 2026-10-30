import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Heart } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-studio-modal border bg-studio-card text-studio-text border-studio-border transition-all duration-200 animate-slide-up">
      {toast.type === 'success' && (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
      )}
      {toast.type === 'heart' && (
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
      )}
      {toast.type === 'info' && (
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
      )}
      <span className="text-xs font-medium">
        {toast.message}
      </span>
    </div>
  );
}
