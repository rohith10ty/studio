import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Heart, MessageCircle, TrendingUp, Filter, UserCheck, UserPlus } from 'lucide-react';
import { exploreItems, suggestedUsers } from '../../data/mockData';

export default function ExploreView() {
  const {
    searchQuery,
    setSearchQuery,
    exploreCategory,
    setExploreCategory,
    setPostDetailModal,
    followingMap,
    toggleFollowUser,
    posts,
  } = useApp();

  const categories = ['All', 'Architecture', '3D Art', 'Photography', 'Typography', 'Design'];

  // Filter explore items based on category and search query
  const filteredItems = exploreItems.filter(item => {
    const matchesCategory =
      exploreCategory === 'All' ||
      item.category.toLowerCase() === exploreCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Search Header */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators, brutalist architecture, WebGL art, typography..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-studio-dark-card/80 dark:bg-studio-dark-card/80 light:bg-studio-light-card/80 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-sm sm:text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none focus:border-studio-dark-border dark:focus:border-studio-dark-text light:focus:border-studio-light-text transition-all shadow-sm"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setExploreCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                exploreCategory === cat
                  ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-md'
                  : 'bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Curators Row */}
      <div className="p-4 sm:p-5 rounded-3xl bg-studio-dark-card/50 dark:bg-studio-dark-card/50 light:bg-studio-light-card/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/50 flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Spotlight Creators
            </h2>
          </div>
          <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            Handpicked this week
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {suggestedUsers.map(u => {
            const isFollowing = !!followingMap[u.id];
            return (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-studio-dark-bg/50 dark:bg-studio-dark-bg/50 light:bg-studio-light-bg/50 border border-studio-dark-border/20 dark:border-studio-dark-border/20 light:border-studio-light-border/30"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-studio-dark-border/40"
                  />
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate">
                      {u.name}
                    </span>
                    <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext truncate">
                      {u.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(u.id, u.name)}
                  className={`p-2 rounded-xl text-xs font-medium transition-colors shrink-0 ${
                    isFollowing
                      ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                      : 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-sm'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Masonry / Showcase Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() =>
                setPostDetailModal({
                  id: item.id,
                  author: {
                    name: item.author,
                    handle: item.author.toLowerCase().replace(/\s+/g, ''),
                    avatar: item.authorAvatar,
                    isVerified: true,
                  },
                  content: `${item.title} — Curated under ${item.category} showcase on Studio.`,
                  images: [item.image],
                  likesCount: parseInt(item.likes) * 1000 || 4800,
                  commentsCount: parseInt(item.comments) || 120,
                  sharesCount: 94,
                  isLiked: false,
                  isSaved: false,
                  comments: [
                    {
                      id: 'c-exp',
                      author: {
                        name: 'Aria Vance',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                      },
                      text: 'Outstanding visual composition!',
                      timestamp: '1h ago',
                    },
                  ],
                })
              }
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 transition-all duration-300 hover:shadow-studio-dark-float hover:-translate-y-1"
            >
              <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Ambient Category Tag */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/10">
                  {item.category}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="text-base font-bold text-white tracking-wide">
                    {item.title}
                  </span>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.authorAvatar}
                        alt={item.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-medium text-white/90">
                        {item.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-white text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" /> {item.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 text-center flex flex-col items-center gap-3">
          <p className="text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            No results found for "{searchQuery}". Try exploring other visual categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setExploreCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
