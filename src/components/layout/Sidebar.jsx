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
  ChevronDown,
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
      className="hidden md:flex flex-col justify-between w-60 lg:w-64 h-screen sticky top-0 px-4 py-6 border-r border-studio-border bg-studio-surface select-none z-30 overflow-y-auto"
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand & Theme Switcher Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <span
            onClick={() => setActiveTab('feed')}
            className="font-bold text-2xl tracking-tight text-studio-text cursor-pointer hover:opacity-80 transition-opacity font-outfit"
          >
            Studio
          </span>

          {/* Theme Switcher in Top Bar */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-xl border border-studio-border/70 bg-studio-card text-studio-text hover:border-studio-border transition-all shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-studio-card text-studio-text border border-studio-border shadow-sm'
                    : 'text-studio-muted hover:text-studio-text hover:bg-studio-card/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* New Post Button */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wide bg-studio-btn-bg text-studio-btn-text hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Post</span>
        </button>
      </div>

      {/* Bottom User Profile Section - No Overlap */}
      <div className="pt-4 border-t border-studio-border">
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-between p-2 rounded-xl bg-studio-card border border-studio-border/70 hover:border-studio-border cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-studio-border"
                />
                <div className="flex flex-col truncate">
                  <span className="font-semibold text-xs text-studio-text truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[11px] text-studio-muted truncate">
                    @{currentUser.handle}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-studio-muted transition-transform duration-200 shrink-0 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* In-flow Collapsible Menu (Never overlaps) */}
            {isUserMenuOpen && (
              <div className="flex flex-col gap-1 p-1.5 rounded-xl bg-studio-card border border-studio-border animate-fade-in shadow-sm">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-studio-text hover:bg-studio-surface transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-studio-muted" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-studio-btn-bg text-studio-btn-text text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}
