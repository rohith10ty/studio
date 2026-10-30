import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  User,
  Plus,
  Sun,
  Moon,
  LogOut,
  MoreHorizontal,
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
    <aside
      data-lenis-prevent
      className="hidden md:flex flex-col justify-between w-60 lg:w-64 h-screen sticky top-0 px-4 py-7 border-r border-studio-border/50 bg-studio-bg select-none z-30 overflow-y-auto"
    >
      {/* Top Branding & Navigation */}
      <div className="flex flex-col gap-8">
        {/* Minimal Studio Logo */}
        <div
          onClick={() => setActiveTab('feed')}
          className="px-3 cursor-pointer group flex items-center justify-between"
        >
          <span className="font-semibold text-2xl tracking-tight text-studio-text hover:opacity-80 transition-opacity font-outfit">
            Studio
          </span>
        </div>

        {/* Minimal Nav Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-studio-card text-studio-text border border-studio-border/60'
                    : 'text-studio-muted hover:text-studio-text hover:bg-studio-card/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Create Post Minimal Button */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-medium text-xs tracking-wide bg-studio-btn-bg text-studio-btn-text hover:opacity-90 active:scale-[0.99] transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2]" />
          <span>New Post</span>
        </button>
      </div>

      {/* Bottom Controls: Theme Switcher & User Profile */}
      <div className="flex flex-col gap-3 pt-4 border-t border-studio-border/40">
        {/* Minimal Theme Switcher */}
        <button
          onClick={toggleTheme}
          type="button"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-studio-muted hover:text-studio-text hover:bg-studio-card/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-studio-border/40 text-studio-muted">
            {theme}
          </span>
        </button>

        {/* User Snapshot */}
        {isAuthenticated ? (
          <div className="relative">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-studio-card/50 transition-all border border-transparent hover:border-studio-border/40"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-studio-border"
                />
                <div className="flex flex-col truncate">
                  <span className="font-medium text-xs text-studio-text truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[11px] text-studio-muted truncate">
                    @{currentUser.handle}
                  </span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-studio-muted shrink-0" />
            </div>

            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 w-full mb-1 p-1 rounded-xl bg-studio-card border border-studio-border shadow-studio-modal z-50 animate-fade-in">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-studio-text hover:bg-studio-bg transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-studio-muted" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-studio-border text-xs font-medium text-studio-text hover:bg-studio-card transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}
