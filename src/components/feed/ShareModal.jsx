import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, Send, Link, MessageCircle } from 'lucide-react';

export default function ShareModal() {
  const { shareModalData, setShareModalData, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!shareModalData) return null;

  const postUrl = `${window.location.origin}/#post-${shareModalData.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    showToast('Post link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOptions = [
    { name: 'X / Twitter', icon: Share2, action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareModalData.content.slice(0, 100))}&url=${encodeURIComponent(postUrl)}`, '_blank') },
    { name: 'Direct Message', icon: MessageCircle, action: () => { showToast('Sent to direct message!', 'success'); setShareModalData(null); } },
    { name: 'Copy Link', icon: Link, action: handleCopyLink },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
          <span className="font-semibold text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
            Share this Studio Piece
          </span>
          <button
            onClick={() => setShareModalData(null)}
            className="p-1 rounded-lg text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Snippet */}
        <div className="p-3.5 rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 flex items-center gap-3">
          <img
            src={shareModalData.author.avatar}
            alt={shareModalData.author.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
              {shareModalData.author.name}
            </span>
            <p className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
              {shareModalData.content}
            </p>
          </div>
        </div>

        {/* Quick Share Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {shareOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <button
                key={i}
                onClick={opt.action}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-studio-dark-bg/40 dark:bg-studio-dark-bg/40 light:bg-studio-light-bg/50 hover:bg-studio-dark-bg/80 dark:hover:bg-studio-dark-bg/80 light:hover:bg-studio-light-bg/80 border border-studio-dark-border/20 dark:border-studio-dark-border/20 light:border-studio-light-border/40 transition-colors"
              >
                <div className="p-2 rounded-xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                  {opt.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border">
          <input
            type="text"
            readOnly
            value={postUrl}
            className="flex-1 bg-transparent text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext select-all focus:outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
