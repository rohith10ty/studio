import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

export default function MobileBottomBar() {
  const {
    activeTab,
    setActiveTab,
    unreadMessagesCount,
    setIsCreatePostOpen,
    isAuthenticated,
    openAuthModal,
  } = useApp();

  return (
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-40 select-none">
      <nav className="flex items-center justify-around py-2 px-3 rounded-2xl bg-studio-card/95 backdrop-blur-xl border border-studio-border/60 shadow-studio-modal">
        <button
          onClick={() => setActiveTab('feed')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'feed'
              ? 'text-studio-text bg-studio-bg/60'
              : 'text-studio-muted'
          }`}
          aria-label="Feed"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'explore'
              ? 'text-studio-text bg-studio-bg/60'
              : 'text-studio-muted'
          }`}
          aria-label="Explore"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="w-9 h-9 rounded-xl bg-studio-btn-bg text-studio-btn-text flex items-center justify-center active:scale-95 transition-transform"
          aria-label="New Post"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`relative p-2 rounded-xl transition-colors ${
            activeTab === 'messages'
              ? 'text-studio-text bg-studio-bg/60'
              : 'text-studio-muted'
          }`}
          aria-label="Messages"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'text-studio-text bg-studio-bg/60'
              : 'text-studio-muted'
          }`}
          aria-label="Profile"
        >
          <User className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
