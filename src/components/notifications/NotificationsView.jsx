import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  CheckCheck,
  Check,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function NotificationsView() {
  const {
    notifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    setActiveTab,
    followingMap,
    toggleFollowUser,
  } = useApp();

  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'likes' | 'comments'

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'likes') return notif.type === 'like';
    if (filter === 'comments') return notif.type === 'comment';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-indigo-400" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case 'mention':
        return <AtSign className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-studio-dark-text" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
            Activity & Notifications
          </h1>
          <p className="text-xs sm:text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            Stay synced with your collective interactions
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-studio-dark-card/80 dark:bg-studio-dark-card/80 light:bg-studio-light-card/80 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors w-fit"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'unread', label: 'Unread' },
          { id: 'likes', label: 'Appreciations' },
          { id: 'comments', label: 'Discussions' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-md'
                : 'bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 rounded-3xl border transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${
                item.isRead
                  ? 'bg-studio-dark-card/40 dark:bg-studio-dark-card/40 light:bg-studio-light-card/50 border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40'
                  : 'bg-studio-dark-card/90 dark:bg-studio-dark-card/90 light:bg-studio-light-card/90 border-studio-dark-border/80 dark:border-studio-dark-border/80 light:border-studio-light-border shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5 overflow-hidden">
                <div className="relative shrink-0">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-studio-dark-border/40"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border/40 shadow-sm">
                    {getIcon(item.type)}
                  </div>
                </div>

                <div className="flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                      {item.user.name}
                    </span>
                    <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                      {item.actionText}
                    </span>
                  </div>

                  {item.target && (
                    <p className="text-xs text-studio-dark-text/80 dark:text-studio-dark-text/80 light:text-studio-light-text italic truncate max-w-md">
                      {item.target}
                    </p>
                  )}

                  <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Action buttons on notification */}
              <div className="flex items-center gap-2 shrink-0">
                {item.type === 'follow' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowUser(item.user.handle, item.user.name);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white text-xs font-semibold shadow-sm"
                  >
                    Follow back
                  </button>
                )}
                {!item.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
}
