import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { suggestedUsers } from '../../data/mockData';

export default function FollowersModal() {
  const { followersModal, setFollowersModal, followingMap, toggleFollowUser } = useApp();

  if (!followersModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="w-full max-w-xs rounded-2xl bg-studio-card border border-studio-border shadow-studio-modal p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between pb-2 border-b border-studio-border/40">
          <span className="font-semibold text-xs text-studio-text uppercase tracking-wider">
            {followersModal.title}
          </span>
          <button
            onClick={() => setFollowersModal({ isOpen: false, title: 'Followers' })}
            className="p-1 rounded-lg text-studio-muted hover:text-studio-text"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div data-lenis-prevent className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {suggestedUsers.map(u => {
            const isFollowing = !!followingMap[u.id];
            return (
              <div key={u.id} className="flex items-center justify-between gap-2 p-1">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-medium text-studio-text truncate">
                      {u.name}
                    </span>
                    <span className="text-[10px] text-studio-muted truncate">
                      @{u.handle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(u.id, u.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                    isFollowing
                      ? 'text-studio-muted'
                      : 'bg-studio-btn-bg text-studio-btn-text'
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
