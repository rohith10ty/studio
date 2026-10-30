import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, Link, MessageCircle } from 'lucide-react';

export default function ShareModal() {
  const { shareModalData, setShareModalData, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!shareModalData) return null;

  const postUrl = `${window.location.origin}/#post-${shareModalData.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    showToast('Link copied!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'X / Twitter', icon: Share2, action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareModalData.content.slice(0, 100))}&url=${encodeURIComponent(postUrl)}`, '_blank') },
    { name: 'Message', icon: MessageCircle, action: () => { showToast('Sent in chat', 'info'); setShareModalData(null); } },
    { name: 'Copy Link', icon: Link, action: handleCopyLink },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-2xl bg-studio-card border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b-2 border-black">
          <span className="font-extrabold text-sm text-studio-text">
            Share Creation
          </span>
          <button
            onClick={() => setShareModalData(null)}
            className="p-1 rounded-lg text-studio-text hover:bg-studio-sidebar border border-black"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
          <img
            src={shareModalData.author.avatar}
            alt={shareModalData.author.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-black"
          />
          <div className="flex flex-col truncate">
            <span className="text-xs font-black text-studio-text truncate">
              {shareModalData.author.name}
            </span>
            <p className="text-[11px] text-studio-subtext font-bold truncate">
              {shareModalData.content}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {shareOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <button
                key={i}
                onClick={opt.action}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-studio-sidebar hover:bg-studio-card border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="p-1.5 rounded-lg text-studio-text">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-black text-studio-text">
                  {opt.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 p-1 pl-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <input
            type="text"
            readOnly
            value={postUrl}
            className="flex-1 bg-transparent text-xs text-studio-text font-bold select-all focus:outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-studio-btn-dark text-white dark:text-black border-2 border-black text-xs font-black transition-opacity hover:opacity-90 shadow-sm"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Done' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
