import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  User,
  Bookmark,
  PlusSquare,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  CheckCircle,
  MoreVertical,
  LogIn
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    unreadMessagesCount,
    currentUser,
    isAuthenticated,
    openAuthModal,
    logout,
    setIsCreatePostOpen,
    theme,
    toggleTheme,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 h-screen sticky top-0 px-4 py-6 border-r border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 bg-studio-dark-bg/95 dark:bg-studio-dark-bg/95 light:bg-studio-light-bg/95 backdrop-blur-xl z-30 select-none">
      {/* Top Branding & Nav */}
      <div className="flex flex-col gap-8">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-3 px-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-studio-dark-border via-studio-dark-accent to-studio-dark-text dark:from-studio-dark-border dark:via-studio-dark-card dark:to-studio-dark-text light:from-studio-light-muted light:via-studio-light-border light:to-studio-light-text flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <span className="font-extrabold text-xl text-white dark:text-studio-dark-text light:text-studio-light-bg tracking-tighter">
              S
            </span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-studio-dark-bg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tight text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text flex items-center gap-1.5 font-outfit">
              Studio
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border">
                v2
              </span>
            </span>
            <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext font-normal tracking-wide">
              Creative Collective
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium text-base transition-all duration-200 group ${
                  isActive
                    ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text shadow-sm border border-studio-dark-border/50 dark:border-studio-dark-border/50 light:border-studio-light-border'
                    : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text hover:bg-studio-dark-card/40 dark:hover:bg-studio-dark-card/40 light:hover:bg-studio-light-card/60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text'
                        : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                    }`}
                  />
                  <span className="tracking-wide">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-studio-dark-text dark:bg-studio-dark-text light:bg-studio-light-text absolute right-3" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Create Post Action Button */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-2xl font-semibold text-sm tracking-wide text-white dark:text-studio-dark-bg light:text-white bg-gradient-to-r from-studio-dark-border via-studio-dark-card to-studio-dark-border dark:from-studio-dark-text dark:via-white dark:to-studio-dark-text light:from-studio-light-text light:via-studio-dark-bg light:to-studio-light-text shadow-studio-glow hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusSquare className="w-5 h-5" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Bottom Controls: Theme Toggle & User Info */}
      <div className="flex flex-col gap-3 pt-4 border-t border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-card/50 dark:hover:bg-studio-dark-card/50 light:hover:bg-studio-light-card/60 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
            <span>{theme === 'dark' ? 'Light Atmosphere' : 'Dark Atmosphere'}</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border">
            {theme}
          </span>
        </button>

        {/* User Card */}
        {isAuthenticated ? (
          <div className="relative">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-between p-2.5 rounded-2xl cursor-pointer hover:bg-studio-dark-card/60 dark:hover:bg-studio-dark-card/60 light:hover:bg-studio-light-card/80 transition-all border border-transparent hover:border-studio-dark-border/40 dark:hover:border-studio-dark-border/40 light:hover:border-studio-light-border/60"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-studio-dark-border/50 dark:ring-studio-dark-border/50 light:ring-studio-light-border shrink-0"
                />
                <div className="flex flex-col truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {currentUser.name}
                    </span>
                    {currentUser.isVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 fill-sky-400/20" />
                    )}
                  </div>
                  <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                    @{currentUser.handle}
                  </span>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext shrink-0" />
            </div>

            {/* User Quick Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-2 p-2 rounded-2xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float animate-fade-in z-50">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors"
                >
                  <User className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border text-sm font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-card dark:hover:bg-studio-dark-card light:hover:bg-studio-light-card transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Sign Up</span>
          </button>
        )}
      </div>
    </aside>
  );
}
