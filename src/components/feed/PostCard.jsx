import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Trash2,
  Copy
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
    setTimeout(() => setIsLikeAnimating(false), 400);
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
    <article className="w-full rounded-2xl bg-studio-card border border-studio-border/50 p-4 sm:p-5 transition-all shadow-studio-subtle flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-9 h-9 rounded-full object-cover ring-1 ring-studio-border/40"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-sm text-studio-text">
                {post.author.name}
              </span>
              {post.author.badge && (
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded border border-studio-border/50 text-studio-muted">
                  {post.author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-studio-muted">
              <span>@{post.author.handle}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-bg/50 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-studio-card border border-studio-border shadow-studio-modal p-1 z-20 animate-fade-in">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
                  showToast('Post link copied!', 'info');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-studio-text hover:bg-studio-bg transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-studio-muted" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={() => {
                  toggleSavePost(post.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-studio-text hover:bg-studio-bg transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-studio-muted" />
                <span>{post.isSaved ? 'Unsave' : 'Save'}</span>
              </button>
              {isOwner && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-studio-text leading-relaxed whitespace-pre-line font-normal">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs text-studio-muted hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          onClick={() => setPostDetailModal(post)}
          className={`grid gap-1.5 rounded-xl overflow-hidden cursor-pointer ${
            post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {post.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden ${
                post.images.length === 1 ? 'max-h-[460px]' : 'h-56'
              }`}
            >
              <img
                src={img}
                alt={`Media ${idx + 1}`}
                className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-studio-border/30">
        <div className="flex items-center gap-5">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-medium transition-all ${
              post.isLiked
                ? 'text-rose-500'
                : 'text-studio-muted hover:text-studio-text'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                post.isLiked ? 'fill-rose-500' : ''
              } ${isLikeAnimating ? 'animate-heart-burst' : ''}`}
            />
            <span>{post.likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-xs font-medium text-studio-muted hover:text-studio-text transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments?.length || 0}</span>
          </button>

          <button
            onClick={() => setShareModalData(post)}
            className="flex items-center gap-1.5 text-xs font-medium text-studio-muted hover:text-studio-text transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{post.sharesCount}</span>
          </button>
        </div>

        <button
          onClick={() => toggleSavePost(post.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            post.isSaved
              ? 'text-studio-text'
              : 'text-studio-muted hover:text-studio-text'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Expandable Comments */}
      {showComments && (
        <div className="flex flex-col gap-3 pt-2 border-t border-studio-border/30 animate-fade-in">
          {post.comments && post.comments.length > 0 && (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {post.comments.map(c => (
                <div
                  key={c.id}
                  className="flex items-start gap-2 p-2 rounded-xl bg-studio-bg/40 border border-studio-border/30"
                >
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-xs text-studio-text">
                        {c.author.name}
                      </span>
                      <span className="text-[10px] text-studio-muted">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-studio-text/90 mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:border-studio-border"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-1.5 rounded-xl bg-studio-btn-bg text-studio-btn-text disabled:opacity-40 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
