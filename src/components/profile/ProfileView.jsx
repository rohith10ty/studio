import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Edit3,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Grid,
  Bookmark,
  Heart,
  Share2,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function ProfileView() {
  const {
    currentUser,
    posts,
    setIsEditProfileOpen,
    setFollowersModal,
    setPostDetailModal,
    showToast,
    setIsCreatePostOpen,
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState('posts');

  const userPosts = posts.filter(p => p.author.id === currentUser.id);
  const savedPosts = posts.filter(p => p.isSaved);
  const likedPosts = posts.filter(p => p.isLiked);

  const displayPosts =
    activeProfileTab === 'posts'
      ? userPosts
      : activeProfileTab === 'saved'
      ? savedPosts
      : likedPosts;

  const handleShareProfile = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#@${currentUser.handle}`);
    showToast('Profile link copied!', 'info');
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-20">
      {/* Master Profile Container */}
      <div className="rounded-2xl overflow-hidden bg-studio-card border border-studio-border shadow-studio-card">
        {/* Cover Photo */}
        <div className="relative w-full h-44 sm:h-56 bg-studio-surface overflow-hidden">
          <img
            src={currentUser.coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Profile Content Body */}
        <div className="px-5 sm:px-6 pb-6 flex flex-col gap-5">
          {/* Avatar & Action Buttons Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
            {/* Avatar with clean high-contrast ring */}
            <div className="relative inline-block w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-studio-card ring-2 ring-studio-border shadow-lg shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-xl object-cover"
              />
              {currentUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-studio-card border border-studio-border shadow-sm">
                  <CheckCircle className="w-4 h-4 text-sky-500 fill-sky-500/20" />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studio-btn-bg text-studio-btn-text text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="p-2 rounded-xl border border-studio-border bg-studio-card text-studio-text hover:bg-studio-surface transition-colors shadow-sm"
                title="Share profile"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-studio-text font-outfit">
                {currentUser.name}
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-studio-surface border border-studio-border text-studio-muted">
                PRO CREATOR
              </span>
            </div>

            <span className="text-xs text-studio-muted font-mono">
              @{currentUser.handle}
            </span>

            <p className="text-xs sm:text-sm text-studio-text mt-1 leading-relaxed max-w-xl">
              {currentUser.bio}
            </p>

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-studio-muted pt-1">
              {currentUser.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-studio-text hover:underline"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{currentUser.website.replace('https://', '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Distinct Stats Mini-Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-studio-border/60">
            <div className="p-3 rounded-xl bg-studio-surface/50 border border-studio-border flex flex-col items-center justify-center">
              <span className="text-base font-bold text-studio-text font-outfit">
                {currentUser.stats?.postsCount || userPosts.length}
              </span>
              <span className="text-[11px] text-studio-muted font-medium">
                Posts
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Followers' })}
              className="p-3 rounded-xl bg-studio-surface/50 border border-studio-border flex flex-col items-center justify-center cursor-pointer hover:bg-studio-surface transition-colors"
            >
              <span className="text-base font-bold text-studio-text font-outfit">
                {currentUser.stats?.followersCount ? (currentUser.stats.followersCount / 1000).toFixed(1) + 'k' : '14.8k'}
              </span>
              <span className="text-[11px] text-studio-muted font-medium">
                Followers
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Following' })}
              className="p-3 rounded-xl bg-studio-surface/50 border border-studio-border flex flex-col items-center justify-center cursor-pointer hover:bg-studio-surface transition-colors"
            >
              <span className="text-base font-bold text-studio-text font-outfit">
                {currentUser.stats?.followingCount || 420}
              </span>
              <span className="text-[11px] text-studio-muted font-medium">
                Following
              </span>
            </div>

            <div className="p-3 rounded-xl bg-studio-surface/50 border border-studio-border flex flex-col items-center justify-center">
              <span className="text-base font-bold text-studio-text font-outfit">
                {currentUser.stats?.likesCount ? (currentUser.stats.likesCount / 1000).toFixed(1) + 'k' : '98.4k'}
              </span>
              <span className="text-[11px] text-studio-muted font-medium">
                Appreciations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-studio-border pb-3">
        {[
          { id: 'posts', label: 'My Works', icon: Grid, count: userPosts.length },
          { id: 'saved', label: 'Saved Archive', icon: Bookmark, count: savedPosts.length },
          { id: 'liked', label: 'Liked Works', icon: Heart, count: likedPosts.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeProfileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-studio-card text-studio-text border border-studio-border shadow-sm'
                  : 'text-studio-muted hover:text-studio-text hover:bg-studio-card/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-studio-surface border border-studio-border/50 text-studio-muted">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Creations */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayPosts.map(post => {
            const previewImg =
              post.images && post.images.length > 0
                ? post.images[0]
                : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={post.id}
                onClick={() => setPostDetailModal(post)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-60 bg-studio-card border border-studio-border shadow-studio-card transition-transform duration-200 hover:-translate-y-0.5"
              >
                <img
                  src={previewImg}
                  alt="Post preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
                  <div className="flex justify-end">
                    {post.isSaved && (
                      <span className="p-1 rounded-full bg-white/20">
                        <Bookmark className="w-3.5 h-3.5 fill-white" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white" /> {post.likesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Grid className="w-3.5 h-3.5" /> {post.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-xs text-studio-muted flex flex-col items-center gap-2">
          <span>No works found in this section.</span>
          {activeProfileTab === 'posts' && (
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-btn-bg text-studio-btn-text text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
