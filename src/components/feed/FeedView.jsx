import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StoriesBar from './StoriesBar';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';

export default function FeedView() {
  const { posts, searchQuery } = useApp();
  const [feedFilter, setFeedFilter] = useState('curated');

  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesContent = post.content.toLowerCase().includes(q);
    const matchesAuthor = post.author.name.toLowerCase().includes(q) || post.author.handle.toLowerCase().includes(q);
    const matchesTag = post.tags && post.tags.some(t => t.toLowerCase().includes(q));
    return matchesContent || matchesAuthor || matchesTag;
  });

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Create Post Input Card */}
      <CreatePostCard />

      {/* Feed Filter Segmented Controls with Black Borders */}
      <div className="flex items-center gap-2 pt-1">
        {[
          { id: 'curated', label: 'Curated' },
          { id: 'latest', label: 'Latest Works' },
          { id: 'following', label: 'Network' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFeedFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
              feedFilter === tab.id
                ? 'bg-studio-btn-dark text-studio-btn-darkText shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-studio-card text-studio-text hover:bg-studio-chip shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="flex flex-col gap-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="w-full py-16 text-center text-xs text-studio-text font-black">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}
