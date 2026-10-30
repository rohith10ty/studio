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
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Search Header with Black Border */}
      <div className="flex flex-col gap-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-studio-text absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creators, works, tags..."
            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-studio-card border-2 border-black text-xs font-bold text-studio-text placeholder-studio-text/60 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setExploreCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border-2 border-black whitespace-nowrap transition-colors ${
                exploreCategory === cat
                  ? 'bg-studio-btn-dark text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-studio-card text-studio-text hover:bg-studio-sidebar shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid with Black Borders */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-black bg-black text-white border border-white">
                  {item.category}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3.5 flex flex-col justify-end">
                  <span className="text-xs font-black text-white">
                    {item.title}
                  </span>
                  <div className="flex items-center justify-between text-white text-[11px] mt-1 font-bold">
                    <span>{item.author}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white stroke-black" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 stroke-black" /> {item.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-xs text-studio-text font-black">
          No works found.
        </div>
      )}
    </div>
  );
}
