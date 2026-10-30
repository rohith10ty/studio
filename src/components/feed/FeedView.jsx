import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StoriesBar from './StoriesBar';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
import { Sparkles, Compass, Flame, Filter } from 'lucide-react';

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
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-20">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Create Post Input Card */}
      <CreatePostCard />

      {/* Feed Filters */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {[
            { id: 'curated', label: 'Curated' },
            { id: 'latest', label: 'Latest Works' },
            { id: 'following', label: 'Network' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFeedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                feedFilter === tab.id
                  ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-sm'
                  : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-time feed</span>
        </span>
      </div>

      {/* Posts Stream */}
      <div className="flex flex-col gap-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="w-full py-16 text-center text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            No posts found matching your search. Try a different tag!
          </div>
        )}
      </div>
    </div>
  );
}
