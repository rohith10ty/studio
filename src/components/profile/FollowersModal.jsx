import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { suggestedUsers } from '../../data/mockData';

export default function FollowersModal() {
  const { followersModal, setFollowersModal, followingMap, toggleFollowUser } = useApp();

  if (!followersModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="w-full max-w-xs rounded-2xl bg-studio-card border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between pb-2 border-b-2 border-black">
          <span className="font-black text-xs text-studio-text uppercase tracking-wider">
            {followersModal.title}
          </span>
          <button
            onClick={() => setFollowersModal({ isOpen: false, title: 'Followers' })}
            className="p-1 rounded-lg text-studio-text hover:bg-studio-sidebar border border-black"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <div data-lenis-prevent className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {suggestedUsers.map(u => {
            const isFollowing = !!followingMap[u.id];
            return (
              <div key={u.id} className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-black"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-black text-studio-text truncate">
                      {u.name}
                    </span>
                    <span className="text-[10px] text-studio-subtext font-bold truncate">
                      @{u.handle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(u.id, u.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors shrink-0 ${
                    isFollowing
                      ? 'bg-studio-card text-studio-text'
                      : 'bg-studio-btn-dark text-studio-btn-darkText'
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
