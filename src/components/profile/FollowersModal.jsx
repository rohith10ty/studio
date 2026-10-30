import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserCheck, UserPlus } from 'lucide-react';
import { suggestedUsers } from '../../data/mockData';

export default function FollowersModal() {
  const { followersModal, setFollowersModal, followingMap, toggleFollowUser } = useApp();

  if (!followersModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
          <span className="font-bold text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
            {followersModal.title}
          </span>
          <button
            onClick={() => setFollowersModal({ isOpen: false, title: 'Followers' })}
            className="p-1 rounded-lg text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
          {suggestedUsers.map(u => {
            const isFollowing = !!followingMap[u.id];
            return (
              <div key={u.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {u.name}
                    </span>
                    <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                      @{u.handle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(u.id, u.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    isFollowing
                      ? 'bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                      : 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-sm'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
