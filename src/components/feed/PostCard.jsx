import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle,
  Send,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function PostCard({ post }) {
  const {
    currentUser,
    likePost,
    addComment,
    toggleSavePost,
    deletePost,
    setShareModalData,
    setPostDetailModal,
    showToast,
    isAuthenticated,
    openAuthModal,
  } = useApp();

  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLike = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsLikeAnimating(true);
    likePost(post.id);
    setTimeout(() => setIsLikeAnimating(false), 500);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
    setShowComments(true);
  };

  const isOwner = currentUser.id === post.author.id;

  return (
    <article className="w-full rounded-3xl bg-studio-dark-card/60 dark:bg-studio-dark-card/60 light:bg-studio-light-card/70 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 p-5 sm:p-6 transition-all duration-300 hover:border-studio-dark-border/70 dark:hover:border-studio-dark-border/70 light:hover:border-studio-light-border shadow-studio-subtle flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-studio-dark-border/40 dark:ring-studio-dark-border/40 light:ring-studio-light-border"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm sm:text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle className="w-4 h-4 text-sky-400 fill-sky-400/20" />
              )}
              {post.author.badge && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border">
                  {post.author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
              <span>@{post.author.handle}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Options Menu Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-2xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-1.5 z-20 animate-fade-in">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
                  showToast('Post link copied to clipboard!', 'info');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Post Link</span>
              </button>
              <button
                onClick={() => {
                  toggleSavePost(post.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{post.isSaved ? 'Remove from Saved' : 'Save Post'}</span>
              </button>
              {isOwner && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Text */}
      <p className="text-sm sm:text-[15px] text-studio-dark-text/95 dark:text-studio-dark-text/95 light:text-studio-light-text leading-relaxed whitespace-pre-line font-normal">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Image Gallery */}
      {post.images && post.images.length > 0 && (
        <div
          onClick={() => setPostDetailModal(post)}
          className={`grid gap-2 rounded-2xl overflow-hidden cursor-pointer group ${
            post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {post.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden ${
                post.images.length === 1 ? 'max-h-[500px]' : 'h-64'
              }`}
            >
              <img
                src={img}
                alt={`Media ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      )}

      {/* Interactive Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all group ${
              post.isLiked
                ? 'text-rose-500'
                : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-rose-400'
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-transform ${
                post.isLiked ? 'fill-rose-500 scale-110' : 'group-hover:scale-115'
              } ${isLikeAnimating ? 'animate-heart-burst' : ''}`}
            />
            <span>{post.likesCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text transition-colors group"
          >
            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>{post.comments?.length || 0}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShareModalData(post)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text transition-colors group"
          >
            <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>{post.sharesCount}</span>
          </button>
        </div>

        {/* Bookmark / Save Button */}
        <button
          onClick={() => toggleSavePost(post.id)}
          className={`p-2 rounded-xl transition-all ${
            post.isSaved
              ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60'
              : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="flex flex-col gap-3.5 pt-3 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40 animate-fade-in">
          {/* Comments List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
              {post.comments.map(c => (
                <div
                  key={c.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-studio-dark-bg/50 dark:bg-studio-dark-bg/50 light:bg-studio-light-bg/50 border border-studio-dark-border/20 dark:border-studio-dark-border/20 light:border-studio-light-border/30"
                >
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                        {c.author.name}
                      </span>
                      <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-studio-dark-text/90 dark:text-studio-dark-text/90 light:text-studio-light-text mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext italic">
              No comments yet. Start the conversation!
            </p>
          )}

          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your thought..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none focus:border-studio-dark-border dark:focus:border-studio-dark-text light:focus:border-studio-light-text"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2.5 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
