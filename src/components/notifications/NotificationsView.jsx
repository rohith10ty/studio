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
        return <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 stroke-black stroke-[1.5]" />;
      case 'comment':
        return <MessageCircle className="w-3.5 h-3.5 text-indigo-400 stroke-[2.5]" />;
      case 'follow':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />;
      case 'mention':
        return <AtSign className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-studio-text font-outfit">
          Notifications
        </h1>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-black bg-studio-card text-xs font-black text-studio-text hover:bg-studio-sidebar transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <CheckCheck className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'likes', label: 'Likes' },
          { id: 'comments', label: 'Comments' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-colors ${
              filter === tab.id
                ? 'bg-studio-btn-dark text-studio-btn-darkText shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-studio-card text-studio-text hover:bg-studio-sidebar shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List with Black Border */}
      <div className="flex flex-col gap-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-4 rounded-2xl border-2 border-black transition-all flex items-center justify-between gap-3 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                item.isRead
                  ? 'bg-studio-card'
                  : 'bg-studio-card ring-2 ring-black'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-black"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-studio-sidebar border-2 border-black shadow-sm">
                    {getIcon(item.type)}
                  </div>
                </div>

                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-black text-xs text-studio-text">
                      {item.user.name}
                    </span>
                    <span className="text-xs text-studio-text font-bold">
                      {item.actionText}
                    </span>
                  </div>
                  <span className="text-[10px] text-studio-text/80 font-bold">
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
                    className="px-3 py-1 rounded-xl bg-studio-btn-dark text-studio-btn-darkText text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:opacity-90"
                  >
                    Follow
                  </button>
                )}
                {!item.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-black shrink-0" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-xs text-studio-text font-black">
            No notifications.
          </div>
        )}
      </div>
    </div>
  );
}
