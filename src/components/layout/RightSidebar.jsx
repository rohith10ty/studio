import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, UserCheck, UserPlus } from 'lucide-react';
import { trendingTopics, suggestedUsers } from '../../data/mockData';

export default function RightSidebar() {
  const {
    searchQuery,
    setSearchQuery,
    setActiveTab,
    followingMap,
    toggleFollowUser,
  } = useApp();

  return (
    <aside
      data-lenis-prevent
      className="hidden xl:flex flex-col gap-6 w-72 lg:w-80 h-screen sticky top-0 px-5 py-7 border-l border-studio-border/50 bg-studio-bg overflow-y-auto"
    >
      {/* Minimal Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-studio-muted absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Studio..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-studio-card/50 border border-studio-border/50 text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:border-studio-border transition-colors"
        />
      </div>

      {/* Suggested Creators */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold tracking-wider text-studio-muted uppercase">
            Suggested
          </span>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-[11px] text-studio-muted hover:text-studio-text transition-colors"
          >
            All
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {suggestedUsers.map(user => {
            const isFollowing = !!followingMap[user.id];
            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-studio-card/30 transition-colors group"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-studio-border/40"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-medium text-studio-text truncate">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-studio-muted truncate">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(user.id, user.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    isFollowing
                      ? 'text-studio-muted hover:text-rose-400'
                      : 'bg-studio-btn-bg text-studio-btn-text hover:opacity-90'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Minimal List */}
      <div className="flex flex-col gap-3 pt-2 border-t border-studio-border/40">
        <div className="px-1">
          <span className="text-xs font-semibold tracking-wider text-studio-muted uppercase">
            Trending
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {trendingTopics.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab('explore');
                setSearchQuery(item.tag);
              }}
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-studio-card/30 cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-studio-text">
                  {item.tag}
                </span>
                <span className="text-[10px] text-studio-muted">
                  {item.category}
                </span>
              </div>
              <span className="text-[10px] text-studio-muted">
                {item.postsCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="mt-auto pt-6 text-[11px] text-studio-muted/70 flex flex-col gap-1 px-1">
        <span>Studio © 2026</span>
        <span>Minimal editorial collective</span>
      </div>
    </aside>
  );
}
