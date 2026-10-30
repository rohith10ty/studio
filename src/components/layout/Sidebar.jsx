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
      className="hidden md:flex flex-col justify-between w-60 lg:w-64 h-screen sticky top-0 px-4 py-6 border-r-2 border-black bg-studio-sidebar select-none z-30 overflow-y-auto"
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        {/* Brand & Theme Switcher Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <span
            onClick={() => setActiveTab('feed')}
            className="font-black text-2xl tracking-tight text-studio-text cursor-pointer hover:opacity-85 transition-opacity font-outfit"
          >
            Studio
          </span>

          {/* Theme Switcher Button with Black Border */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-xl border-2 border-black bg-studio-card text-studio-text hover:bg-studio-sidebar transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 text-black stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-black transition-all ${
                  isActive
                    ? 'bg-studio-card text-studio-text border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-studio-text/80 hover:text-studio-text hover:bg-studio-card/60 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-rose-500 text-white border border-black">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* New Post Button with Black Border */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal('login');
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-black text-xs tracking-wide bg-studio-btn-dark text-white dark:text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Post</span>
        </button>
      </div>

      {/* Bottom User Profile Section */}
      <div className="pt-4 border-t-2 border-black">
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-between p-2 rounded-xl bg-studio-card border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-black"
                />
                <div className="flex flex-col truncate">
                  <span className="font-black text-xs text-studio-text truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[11px] text-studio-text/80 font-bold truncate">
                    @{currentUser.handle}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-studio-text stroke-[2.5] transition-transform duration-200 shrink-0 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* In-flow Menu */}
            {isUserMenuOpen && (
              <div className="flex flex-col gap-1 p-1.5 rounded-xl bg-studio-card border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black rounded-lg text-studio-text hover:bg-studio-sidebar transition-colors"
                >
                  <User className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>View Profile</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black rounded-lg text-rose-600 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal('login')}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-studio-btn-dark text-white dark:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}
