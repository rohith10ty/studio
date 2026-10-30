import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  CheckCheck
} from 'lucide-react';

export default function NotificationsView() {
  const {
    notifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    toggleFollowUser,
  } = useApp();

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'likes') return notif.type === 'like';
    if (filter === 'comments') return notif.type === 'comment';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-3.5 h-3.5 text-indigo-400" />;
      case 'follow':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-400" />;
      case 'mention':
        return <AtSign className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 select-none animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-studio-text font-outfit">
          Notifications
        </h1>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-studio-border bg-studio-card text-xs font-semibold text-studio-text hover:bg-studio-surface transition-colors shadow-sm"
        >
          <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'likes', label: 'Likes' },
          { id: 'comments', label: 'Comments' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filter === tab.id
                ? 'bg-studio-card text-studio-text border border-studio-border shadow-sm'
                : 'text-studio-muted hover:text-studio-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2.5">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer shadow-sm ${
                item.isRead
                  ? 'bg-studio-card/60 border-studio-border/50'
                  : 'bg-studio-card border-studio-border ring-1 ring-studio-border/30'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-studio-border"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-studio-card border border-studio-border shadow-sm">
                    {getIcon(item.type)}
                  </div>
                </div>

                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-xs text-studio-text">
                      {item.user.name}
                    </span>
                    <span className="text-xs text-studio-muted">
                      {item.actionText}
                    </span>
                  </div>
                  <span className="text-[10px] text-studio-muted">
                    {item.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.type === 'follow' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowUser(item.user.handle, item.user.name);
                    }}
                    className="px-3 py-1 rounded-xl bg-studio-btn-bg text-studio-btn-text text-xs font-semibold shadow-sm hover:opacity-90"
                  >
                    Follow
                  </button>
                )}
                {!item.isRead && (
                  <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-xs text-studio-muted">
            No notifications.
          </div>
        )}
      </div>
    </div>
  );
}
