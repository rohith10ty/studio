import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Bell, Menu, X, PlusSquare, Compass, Home, MessageSquare, User, LogOut } from 'lucide-react';

export default function MobileNavbar() {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    theme,
    toggleTheme,
    currentUser,
    isAuthenticated,
    openAuthModal,
    logout,
    setIsCreatePostOpen,
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 w-full px-4 py-3.5 flex items-center justify-between border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 bg-studio-dark-bg/90 dark:bg-studio-dark-bg/90 light:bg-studio-light-bg/90 backdrop-blur-xl">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-studio-dark-border to-studio-dark-text dark:from-studio-dark-border dark:to-studio-dark-text light:from-studio-light-muted light:to-studio-light-text flex items-center justify-center shadow-md">
            <span className="font-bold text-base text-white dark:text-studio-dark-bg light:text-studio-light-bg">
              S
            </span>
          </div>
          <span className="font-bold text-xl tracking-tight text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
            Studio
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-card dark:hover:bg-studio-dark-card light:hover:bg-studio-light-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-card dark:hover:bg-studio-dark-card light:hover:bg-studio-light-card transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Drawer Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-xl text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-card dark:hover:bg-studio-dark-card light:hover:bg-studio-light-card transition-colors"
            aria-label="Menu"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card p-6 flex flex-col justify-between shadow-2xl border-l border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border">
                <span className="font-bold text-lg text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                  Studio Menu
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-lg text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Snapshot */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-studio-dark-bg/50 dark:bg-studio-dark-bg/50 light:bg-studio-light-bg/50">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                      @{currentUser.handle}
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setIsDrawerOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-studio-dark-border text-white text-sm font-semibold"
                >
                  Sign In
                </button>
              )}

              {/* Links */}
              <div className="flex flex-col gap-2">
                {[
                  { id: 'feed', label: 'Feed', icon: Home },
                  { id: 'explore', label: 'Explore', icon: Compass },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'messages', label: 'Messages', icon: MessageSquare },
                  { id: 'profile', label: 'Profile', icon: User },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 text-sm font-medium transition-colors"
                    >
                      <Icon className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom logout */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsDrawerOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
