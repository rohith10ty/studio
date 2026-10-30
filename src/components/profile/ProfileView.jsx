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
  ExternalLink,
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

  const [activeProfileTab, setActiveProfileTab] = useState('posts'); // 'posts' | 'saved' | 'liked'

  // User posts
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
    showToast('Studio profile link copied to clipboard!', 'success');
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none animate-fade-in pb-20">
      {/* Profile Header Card */}
      <div className="rounded-3xl overflow-hidden bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/70 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 shadow-studio-subtle">
        {/* Cover Banner */}
        <div className="relative w-full h-44 sm:h-64 bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card overflow-hidden">
          <img
            src={currentUser.coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="relative px-5 sm:px-8 pb-6 flex flex-col gap-5">
          {/* Avatar & Action Buttons Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            <div className="relative inline-block w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-1 bg-studio-dark-bg dark:bg-studio-dark-bg light:bg-studio-light-bg shadow-2xl shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-2xl object-cover ring-2 ring-studio-dark-border/50"
              />
              {currentUser.isVerified && (
                <div className="absolute bottom-1 right-1 p-1 rounded-full bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border shadow-sm">
                  <CheckCircle className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleShareProfile}
                className="p-2.5 rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg dark:hover:bg-studio-dark-bg light:hover:bg-studio-light-bg transition-colors"
                title="Share profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Names & Bio */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
                {currentUser.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-studio-dark-bg/70 dark:bg-studio-dark-bg/70 light:bg-studio-light-bg/70 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext border border-studio-dark-border/30">
                PRO CREATOR
              </span>
            </div>
            <span className="text-xs sm:text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext font-mono">
              @{currentUser.handle}
            </span>

            <p className="text-sm text-studio-dark-text/90 dark:text-studio-dark-text/90 light:text-studio-light-text max-w-2xl leading-relaxed mt-1">
              {currentUser.bio}
            </p>

            {/* Meta tags (Location, link, date) */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext pt-2">
              {currentUser.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser.website && (
                <a
                  href={currentUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sky-400 hover:underline"
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

          {/* Stats Bar */}
          <div className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
                {currentUser.stats?.postsCount || userPosts.length}
              </span>
              <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                Published
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Followers' })}
              className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
                {currentUser.stats?.followersCount ? (currentUser.stats.followersCount / 1000).toFixed(1) + 'k' : '14.8k'}
              </span>
              <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                Followers
              </span>
            </div>

            <div
              onClick={() => setFollowersModal({ isOpen: true, title: 'Following' })}
              className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
                {currentUser.stats?.followingCount || 420}
              </span>
              <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                Following
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
                {currentUser.stats?.likesCount ? (currentUser.stats.likesCount / 1000).toFixed(1) + 'k' : '98.4k'}
              </span>
              <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                Appreciations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 pb-3">
        {[
          { id: 'posts', label: 'My Creations', icon: Grid, count: userPosts.length },
          { id: 'saved', label: 'Saved Archive', icon: Bookmark, count: savedPosts.length },
          { id: 'liked', label: 'Liked Works', icon: Heart, count: likedPosts.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeProfileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-sm'
                  : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 opacity-75">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Posts */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayPosts.map(post => {
            const previewImg =
              post.images && post.images.length > 0
                ? post.images[0]
                : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={post.id}
                onClick={() => setPostDetailModal(post)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer h-64 sm:h-72 bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 transition-transform duration-300 hover:-translate-y-1"
              >
                <img
                  src={previewImg}
                  alt="Post preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay with likes and comments */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    {post.isSaved && (
                      <span className="p-1.5 rounded-full bg-white/20 text-white">
                        <Bookmark className="w-4 h-4 fill-white" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-white/95 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-white text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-white" /> {post.likesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Grid className="w-4 h-4" /> {post.comments?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-16 text-center flex flex-col items-center gap-3">
          <p className="text-sm text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
            No entries found in {activeProfileTab}.
          </p>
          {activeProfileTab === 'posts' && (
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Publish First Post</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
