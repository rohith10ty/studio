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
      {/* Master Profile Container with Black Border */}
      <div className="rounded-2xl overflow-hidden bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Cover Photo */}
        <div className="relative w-full h-44 sm:h-56 bg-studio-sidebar border-b-2 border-black overflow-hidden">
          <img
            src={currentUser.coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Content Body */}
        <div className="px-5 sm:px-6 pb-6 flex flex-col gap-5">
          {/* Avatar & Action Buttons Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
            <div className="relative inline-block w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-studio-card ring-4 ring-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-xl object-cover"
              />
              {currentUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-studio-card border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle className="w-4 h-4 text-sky-500 fill-sky-500/20 stroke-black stroke-[1.5]" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studio-btn-dark text-white dark:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black hover:opacity-90 transition-opacity"
              >
                <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="p-2 rounded-xl border-2 border-black bg-studio-sidebar text-studio-text hover:bg-studio-card transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                title="Share profile"
              >
                <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-studio-text font-outfit">
                {currentUser.name}
              </h1>
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-studio-text">
                PRO CREATOR
              </span>
            </div>

            <span className="text-xs text-studio-text font-mono font-black">
              @{currentUser.handle}
            </span>

            <p className="text-xs sm:text-sm text-studio-text font-bold mt-1 leading-relaxed max-w-xl">
              {currentUser.bio}
            </p>

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-studio-text font-black pt-1">
              {currentUser.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 stroke-[2.5]" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-studio-text font-black hover:underline"
                >
                  <LinkIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{currentUser.website.replace('https://', '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Distinct Stats Mini-Cards with Black Borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t-2 border-black">
            <div className="p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
              <span className="text-base font-black text-studio-text font-outfit">
                {currentUser.stats?.postsCount || userPosts.length}
              </span>
              <span className="text-[11px] text-studio-text font-black">
                Posts
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Followers' })}
              className="p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center cursor-pointer hover:bg-studio-card transition-colors"
            >
              <span className="text-base font-black text-studio-text font-outfit">
                {currentUser.stats?.followersCount ? (currentUser.stats.followersCount / 1000).toFixed(1) + 'k' : '14.8k'}
              </span>
              <span className="text-[11px] text-studio-text font-black">
                Followers
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Following' })}
              className="p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center cursor-pointer hover:bg-studio-card transition-colors"
            >
              <span className="text-base font-black text-studio-text font-outfit">
                {currentUser.stats?.followingCount || 420}
              </span>
              <span className="text-[11px] text-studio-text font-black">
                Following
              </span>
            </div>

            <div className="p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
              <span className="text-base font-black text-studio-text font-outfit">
                {currentUser.stats?.likesCount ? (currentUser.stats.likesCount / 1000).toFixed(1) + 'k' : '98.4k'}
              </span>
              <span className="text-[11px] text-studio-text font-black">
                Appreciations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b-2 border-black pb-3">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                isActive
                  ? 'bg-studio-btn-dark text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-studio-card text-studio-text hover:bg-studio-sidebar shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded border border-black bg-studio-sidebar text-studio-text font-black">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Creations with Black Border */}
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
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-60 bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <img
                  src={previewImg}
                  alt="Post preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
                  <div className="flex justify-end">
                    {post.isSaved && (
                      <span className="p-1 rounded-full bg-white/20 border border-black">
                        <Bookmark className="w-3.5 h-3.5 fill-white stroke-black" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs line-clamp-2 font-bold">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-black">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-white stroke-black" /> {post.likesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Grid className="w-3.5 h-3.5 stroke-black" /> {post.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-16 text-center text-xs text-studio-text font-black flex flex-col items-center gap-2">
          <span>No works found in this section.</span>
          {activeProfileTab === 'posts' && (
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-btn-dark text-white dark:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Create Post</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
