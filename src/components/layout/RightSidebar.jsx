import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, TrendingUp, Sparkles, UserPlus, UserCheck, Flame } from 'lucide-react';
import { trendingTopics, suggestedUsers } from '../../data/mockData';

export default function RightSidebar() {
  const {
    searchQuery,
    setSearchQuery,
    setActiveTab,
    followingMap,
    toggleFollowUser,
    setExploreCategory
  } = useApp();

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 h-screen sticky top-0 px-5 py-6 border-l border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 bg-studio-dark-bg/95 dark:bg-studio-dark-bg/95 light:bg-studio-light-bg/95 backdrop-blur-xl overflow-y-auto">
      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Studio creators & tags..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-studio-dark-card/70 dark:bg-studio-dark-card/70 light:bg-studio-light-card/80 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none focus:border-studio-dark-border dark:focus:border-studio-dark-text light:focus:border-studio-light-text transition-all"
        />
      </div>

      {/* Suggested Creators / Who to Follow */}
      <div className="p-4 rounded-3xl bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Featured Creators
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text transition-colors"
          >
            Explore all
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {suggestedUsers.map(user => {
            const isFollowing = !!followingMap[user.id];
            return (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-studio-dark-border/50 dark:ring-studio-dark-border/50 light:ring-studio-light-border"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(user.id, user.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 shrink-0 ${
                    isFollowing
                      ? 'bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-rose-400'
                      : 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white hover:opacity-90 shadow-sm'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="p-4 rounded-3xl bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
            Trending on Studio
          </h3>
        </div>

        <div className="flex flex-col gap-2.5">
          {trendingTopics.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab('explore');
                setSearchQuery(item.tag);
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 cursor-pointer transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                  {item.tag}
                </span>
              </div>
              <span className="text-[11px] font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                {item.postsCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Manifesto / Footer */}
      <div className="px-2 pt-2 text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext leading-relaxed flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span>Terms</span>
          <span>•</span>
          <span>Privacy</span>
          <span>•</span>
          <span>Design System</span>
          <span>•</span>
          <span>Studio 2026</span>
        </div>
        <span>Award-winning aesthetic engineered for visual thinkers.</span>
      </div>
    </aside>
  );
}
