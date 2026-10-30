import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, UserCheck, UserPlus, Flame } from 'lucide-react';
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
      className="hidden xl:flex flex-col gap-5 w-72 lg:w-80 h-screen sticky top-0 px-5 py-6 border-l-2 border-studio-border bg-studio-sidebar select-none overflow-y-auto shadow-sm"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-studio-text absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Studio..."
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-studio-card border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none focus:border-studio-borderStrong transition-colors shadow-sm"
        />
      </div>

      {/* Suggested Creators Partition Card */}
      <div className="p-4 rounded-2xl bg-studio-card border-2 border-studio-border shadow-studio-card flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b-2 border-studio-border/60">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-extrabold tracking-wider text-studio-text uppercase">
              Curators to Follow
            </span>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-[11px] font-bold text-studio-text hover:underline transition-colors"
          >
            All
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {suggestedUsers.map(user => {
            const isFollowing = !!followingMap[user.id];
            return (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-xl bg-studio-sidebar/50 border border-studio-border/60 hover:bg-studio-sidebar transition-colors"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-studio-border"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-studio-text truncate">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-studio-subtext font-medium truncate">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(user.id, user.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isFollowing
                      ? 'bg-studio-chip border border-studio-border text-studio-text'
                      : 'bg-studio-btn-dark text-studio-btn-darkText hover:opacity-90 shadow-sm'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Topics Partition Card */}
      <div className="p-4 rounded-2xl bg-studio-card border-2 border-studio-border shadow-studio-card flex flex-col gap-3">
        <div className="flex items-center gap-1.5 pb-2 border-b-2 border-studio-border/60">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="text-xs font-extrabold tracking-wider text-studio-text uppercase">
            Trending Topics
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {trendingTopics.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab('explore');
                setSearchQuery(item.tag);
              }}
              className="flex items-center justify-between py-2 px-2.5 rounded-xl bg-studio-sidebar/40 hover:bg-studio-sidebar border border-studio-border/40 cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-studio-text">
                  {item.tag}
                </span>
                <span className="text-[10px] text-studio-subtext font-medium">
                  {item.category}
                </span>
              </div>
              <span className="text-[11px] font-bold text-studio-text">
                {item.postsCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 text-[11px] text-studio-text/80 leading-relaxed flex flex-col gap-1 px-1 border-t-2 border-studio-border">
        <div className="flex items-center gap-2 font-semibold">
          <span>Studio 2026</span>
          <span>•</span>
          <span>Collective</span>
          <span>•</span>
          <span>Privacy</span>
        </div>
        <span>Designed for visionary creators.</span>
      </div>
    </aside>
  );
}
