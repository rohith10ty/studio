import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Heart, MessageCircle } from 'lucide-react';
import { exploreItems } from '../../data/mockData';

export default function ExploreView() {
  const {
    searchQuery,
    setSearchQuery,
    exploreCategory,
    setExploreCategory,
    setPostDetailModal,
  } = useApp();

  const categories = ['All', 'Architecture', '3D Art', 'Photography', 'Typography', 'Design'];

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
    <div className="w-full flex flex-col gap-5 select-none animate-fade-in pb-16">
      {/* Search Header */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-studio-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators, works, tags..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-studio-card border border-studio-border/50 text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:border-studio-border transition-colors"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setExploreCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                exploreCategory === cat
                  ? 'bg-studio-btn-bg text-studio-btn-text'
                  : 'bg-studio-card text-studio-muted hover:text-studio-text border border-studio-border/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  content: `${item.title} — ${item.category}`,
                  images: [item.image],
                  likesCount: parseInt(item.likes) * 1000 || 4800,
                  commentsCount: parseInt(item.comments) || 120,
                  sharesCount: 94,
                  isLiked: false,
                  isSaved: false,
                  comments: [],
                })
              }
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-studio-card border border-studio-border/40 transition-all hover:opacity-95"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-medium bg-black/50 text-white">
                  {item.category}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <span className="text-xs font-medium text-white">
                    {item.title}
                  </span>
                  <div className="flex items-center justify-between text-white/80 text-[11px] mt-1">
                    <span>{item.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-white" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" /> {item.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-xs text-studio-muted">
          No results found.
        </div>
      )}
    </div>
  );
}
