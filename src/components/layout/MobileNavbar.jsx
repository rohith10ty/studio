import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Bell, Menu, X, Home, Compass, MessageSquare, User, LogOut } from 'lucide-react';

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
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 w-full px-4 py-3 flex items-center justify-between border-b-2 border-studio-border bg-studio-sidebar/95 backdrop-blur-md">
        {/* Minimal Studio Wordmark */}
        <div
          onClick={() => setActiveTab('feed')}
          className="cursor-pointer"
        >
          <span className="font-extrabold text-xl tracking-tight text-studio-text font-outfit">
            Studio
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-studio-border bg-studio-card text-studio-text hover:border-studio-borderStrong transition-colors shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2 rounded-xl border border-studio-border bg-studio-card text-studio-text hover:border-studio-borderStrong transition-colors shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Menu Drawer */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-xl text-studio-text"
            aria-label="Menu"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-studio-sidebar p-6 flex flex-col justify-between shadow-studio-modal border-l-2 border-studio-border">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b-2 border-studio-border">
                <span className="font-extrabold text-base text-studio-text font-outfit">
                  Studio
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-lg text-studio-text"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-studio-card border-2 border-studio-border">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-studio-border"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-xs text-studio-text truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-[11px] text-studio-subtext font-medium truncate">
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
                  className="w-full py-2.5 rounded-xl bg-studio-btn-dark text-studio-btn-darkText text-xs font-bold shadow-md"
                >
                  Sign In
                </button>
              )}

              <div className="flex flex-col gap-1.5">
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
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-studio-card border border-studio-border text-studio-text text-xs font-bold transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsDrawerOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-bold"
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
