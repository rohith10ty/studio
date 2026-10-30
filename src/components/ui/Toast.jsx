import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Heart } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-studio-modal border-2 border-studio-border bg-studio-card text-studio-text transition-all duration-200 animate-slide-up">
      {toast.type === 'success' && (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
      )}
      {toast.type === 'heart' && (
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
      )}
      {toast.type === 'info' && (
        <Info className="w-4 h-4 text-sky-500 shrink-0 stroke-[2.5]" />
      )}
      <span className="text-xs font-bold">
        {toast.message}
      </span>
    </div>
  );
}
