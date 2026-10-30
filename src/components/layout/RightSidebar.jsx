import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Flame } from 'lucide-react';
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
      className="hidden xl:flex flex-col gap-5 w-72 lg:w-80 h-screen sticky top-0 px-5 py-6 border-l-2 border-black bg-studio-sidebar select-none overflow-y-auto shrink-0"
    >
      {/* Search Bar with Black Border */}
      <div className="relative">
        <Search className="w-4 h-4 text-studio-text absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Studio..."
          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-studio-card border-2 border-black text-xs font-bold text-studio-text placeholder-studio-text/60 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
        />
      </div>

      {/* Suggested Creators Partition Card */}
      <div className="p-4 rounded-2xl bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b-2 border-black">
          <span className="text-xs font-black tracking-wider text-studio-text uppercase">
            Creators to Follow
          </span>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-[11px] font-black text-studio-text hover:underline transition-colors"
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
                className="flex items-center justify-between p-2 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 transition-transform"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-black"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-black text-studio-text truncate">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-studio-text/80 font-bold truncate">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(user.id, user.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0 ${
                    isFollowing
                      ? 'bg-studio-card text-studio-text hover:opacity-80'
                      : 'bg-studio-btn-dark text-studio-btn-darkText hover:opacity-90'
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
      <div className="p-4 rounded-2xl bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
        <div className="flex items-center gap-1.5 pb-2 border-b-2 border-black">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 stroke-black stroke-[1.5]" />
          <span className="text-xs font-black tracking-wider text-studio-text uppercase">
            Trending Topics
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {trendingTopics.map(item => (
            <div
              key={item.id}
              onClick={() => setSearchQuery(item.topic)}
              className="flex items-center justify-between p-2 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-xs font-black text-studio-text">
                  {item.topic}
                </span>
                <span className="text-[10px] text-studio-text/70 font-bold">
                  {item.category}
                </span>
              </div>
              <span className="text-[11px] font-black text-studio-text">
                {item.postsCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}