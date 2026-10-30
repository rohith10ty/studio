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
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-16">
      {/* Header Profile Card */}
      <div className="rounded-2xl overflow-hidden bg-studio-card border border-studio-border/50 shadow-studio-subtle">
        {/* Cover */}
        <div className="relative w-full h-36 sm:h-52 bg-studio-bg overflow-hidden">
          <img
            src={currentUser.coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="px-5 pb-5 flex flex-col gap-4">
          <div className="flex items-end justify-between -mt-12 sm:-mt-14">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-studio-bg shadow-md">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-xl object-cover ring-1 ring-studio-border"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-btn-bg text-studio-btn-text text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="p-1.5 rounded-xl border border-studio-border text-studio-text hover:bg-studio-bg transition-colors"
                title="Share profile"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-lg sm:text-xl font-semibold text-studio-text font-outfit">
              {currentUser.name}
            </h1>
            <span className="text-xs text-studio-muted font-mono">
              @{currentUser.handle}
            </span>

            <p className="text-xs sm:text-sm text-studio-text mt-1 leading-relaxed max-w-xl">
              {currentUser.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 text-[11px] text-studio-muted pt-1">
              {currentUser.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline text-studio-text"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>{currentUser.website.replace('https://', '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-3 border-t border-studio-border/30 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-studio-text">
                {currentUser.stats?.postsCount || userPosts.length}
              </span>
              <span className="text-studio-muted">posts</span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Followers' })}
              className="flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <span className="font-semibold text-studio-text">
                {currentUser.stats?.followersCount ? (currentUser.stats.followersCount / 1000).toFixed(1) + 'k' : '14.8k'}
              </span>
              <span className="text-studio-muted">followers</span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Following' })}
              className="flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <span className="font-semibold text-studio-text">
                {currentUser.stats?.followingCount || 420}
              </span>
              <span className="text-studio-muted">following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-studio-border/40 pb-2">
        {[
          { id: 'posts', label: 'Posts', icon: Grid, count: userPosts.length },
          { id: 'saved', label: 'Saved', icon: Bookmark, count: savedPosts.length },
          { id: 'liked', label: 'Liked', icon: Heart, count: likedPosts.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeProfileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-studio-card text-studio-text border border-studio-border/60'
                  : 'text-studio-muted hover:text-studio-text'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="text-[10px] text-studio-muted">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayPosts.map(post => {
            const previewImg =
              post.images && post.images.length > 0
                ? post.images[0]
                : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={post.id}
                onClick={() => setPostDetailModal(post)}
                className="group relative rounded-xl overflow-hidden cursor-pointer h-56 bg-studio-card border border-studio-border/40 hover:opacity-95 transition-opacity"
              >
                <img
                  src={previewImg}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white" /> {post.likesCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Grid className="w-3.5 h-3.5" /> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-xs text-studio-muted">
          No entries found.
        </div>
      )}
    </div>
  );
}
