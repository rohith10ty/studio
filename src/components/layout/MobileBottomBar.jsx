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
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-40">
      <nav className="flex items-center justify-around py-2.5 px-4 rounded-3xl bg-studio-dark-card/95 dark:bg-studio-dark-card/95 light:bg-studio-light-card/95 backdrop-blur-2xl border border-studio-dark-border/60 dark:border-studio-dark-border/60 light:border-studio-light-border/80 shadow-studio-dark-float dark:shadow-studio-dark-float light:shadow-studio-light-float">
        <button
          onClick={() => setActiveTab('feed')}
          className={`p-2 rounded-2xl transition-all ${
            activeTab === 'feed'
              ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60'
              : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
          }`}
          aria-label="Feed"
        >
          <Home className="w-5 h-5" />
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`p-2 rounded-2xl transition-all ${
            activeTab === 'explore'
              ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60'
              : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
          }`}
          aria-label="Explore"
        >
          <Compass className="w-5 h-5" />
        </button>

        {/* Create Post Action Button */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="w-11 h-11 -mt-4 rounded-full bg-gradient-to-tr from-studio-dark-border via-studio-dark-text to-white dark:from-studio-dark-border dark:via-studio-dark-text dark:to-white light:from-studio-light-muted light:via-studio-dark-bg light:to-studio-light-text text-studio-dark-bg dark:text-studio-dark-bg light:text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label="Create Post"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`relative p-2 rounded-2xl transition-all ${
            activeTab === 'messages'
              ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60'
              : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
          }`}
          aria-label="Messages"
        >
          <MessageSquare className="w-5 h-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`p-2 rounded-2xl transition-all ${
            activeTab === 'profile'
              ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60'
              : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
          }`}
          aria-label="Profile"
        >
          <User className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
