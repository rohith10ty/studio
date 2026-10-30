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
      <nav className="flex items-center justify-around py-2.5 px-3 rounded-2xl bg-studio-sidebar/95 backdrop-blur-xl border-2 border-studio-border shadow-studio-modal">
        <button
          onClick={() => setActiveTab('feed')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'feed'
              ? 'text-studio-text bg-studio-card border border-studio-border'
              : 'text-studio-subtext'
          }`}
          aria-label="Feed"
        >
          <Home className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'explore'
              ? 'text-studio-text bg-studio-card border border-studio-border'
              : 'text-studio-subtext'
          }`}
          aria-label="Explore"
        >
          <Compass className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="w-10 h-10 rounded-xl bg-studio-btn-dark text-studio-btn-darkText flex items-center justify-center active:scale-95 transition-transform shadow-md"
          aria-label="New Post"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`relative p-2 rounded-xl transition-colors ${
            activeTab === 'messages'
              ? 'text-studio-text bg-studio-card border border-studio-border'
              : 'text-studio-subtext'
          }`}
          aria-label="Messages"
        >
          <MessageSquare className="w-5 h-5 stroke-[2.5]" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'text-studio-text bg-studio-card border border-studio-border'
              : 'text-studio-subtext'
          }`}
          aria-label="Profile"
        >
          <User className="w-5 h-5 stroke-[2.5]" />
        </button>
      </nav>
    </div>
  );
}
