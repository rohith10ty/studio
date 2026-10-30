import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StoriesBar from './StoriesBar';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';

export default function FeedView() {
  const { posts, searchQuery } = useApp();
  const [feedFilter, setFeedFilter] = useState('curated'); // 'curated' | 'latest' | 'following'

  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesContent = post.content.toLowerCase().includes(q);
    const matchesAuthor = post.author.name.toLowerCase().includes(q) || post.author.handle.toLowerCase().includes(q);
    const matchesTag = post.tags && post.tags.some(t => t.toLowerCase().includes(q));
    return matchesContent || matchesAuthor || matchesTag;
  });

  return (
    <div className="w-full flex flex-col gap-5 select-none animate-fade-in pb-16">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Create Post Input Card */}
      <CreatePostCard />

      {/* Minimal Feed Filter Tabs */}
      <div className="flex items-center gap-1.5 pt-1">
        {[
          { id: 'curated', label: 'Curated' },
          { id: 'latest', label: 'Latest' },
          { id: 'following', label: 'Following' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFeedFilter(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              feedFilter === tab.id
                ? 'bg-studio-card text-studio-text border border-studio-border/60'
                : 'text-studio-muted hover:text-studio-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="w-full py-16 text-center text-xs text-studio-muted">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}
