import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Heart } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-black bg-studio-card text-studio-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 animate-slide-up">
      {toast.type === 'success' && (
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
      )}
      {toast.type === 'heart' && (
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
      )}
      {toast.type === 'info' && (
        <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 stroke-[2.5]" />
      )}
      <span className="text-xs font-black">
        {toast.message}
      </span>
    </div>
  );
}
