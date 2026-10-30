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
  Copy,
  CheckCircle
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
    setTimeout(() => setIsLikeAnimating(false), 350);
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
    <article className="w-full rounded-2xl bg-studio-card border-2 border-black p-5 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-black"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-black text-sm text-studio-text">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle className="w-4 h-4 text-sky-500 fill-sky-500/20 stroke-black stroke-[1.5]" />
              )}
              {post.author.badge && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-studio-text">
                  {post.author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-studio-text/80 font-bold">
              <span>@{post.author.handle}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg text-studio-text hover:bg-studio-sidebar border-2 border-transparent hover:border-black transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 stroke-[2.5]" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1.5 z-20 animate-fade-in">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/#post-${post.id}`);
                  showToast('Post link copied!', 'info');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-black rounded-lg text-studio-text hover:bg-studio-sidebar transition-colors"
              >
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={() => {
                  toggleSavePost(post.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-black rounded-lg text-studio-text hover:bg-studio-sidebar transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{post.isSaved ? 'Unsave' : 'Save'}</span>
              </button>
              {isOwner && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-black rounded-lg text-rose-600 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content Text */}
      <p className="text-sm font-bold text-studio-text leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Tags Chips with Black Border */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-black px-2.5 py-0.5 rounded-md bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-studio-text hover:opacity-80 cursor-pointer transition-opacity"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images with Black Border */}
      {post.images && post.images.length > 0 && (
        <div
          onClick={() => setPostDetailModal(post)}
          className={`grid gap-2 rounded-xl overflow-hidden cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {post.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden ${
                post.images.length === 1 ? 'max-h-[500px]' : 'h-60'
              }`}
            >
              <img
                src={img}
                alt={`Post ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t-2 border-black">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black transition-all ${
              post.isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-studio-sidebar text-studio-text hover:opacity-85'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                post.isLiked ? 'fill-white stroke-black stroke-[1.5]' : 'stroke-black stroke-[2.5]'
              } ${isLikeAnimating ? 'animate-heart-burst' : ''}`}
            />
            <span>{post.likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-studio-sidebar text-studio-text hover:opacity-85 text-xs font-black transition-opacity"
          >
            <MessageCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{post.comments?.length || 0}</span>
          </button>

          <button
            onClick={() => setShareModalData(post)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-studio-sidebar text-studio-text hover:opacity-85 text-xs font-black transition-opacity"
          >
            <Share2 className="w-4 h-4 stroke-[2.5]" />
            <span>{post.sharesCount}</span>
          </button>
        </div>

        <button
          onClick={() => toggleSavePost(post.id)}
          className={`p-1.5 px-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors ${
            post.isSaved
              ? 'bg-studio-btn-dark text-white dark:text-black'
              : 'bg-studio-sidebar text-studio-text hover:opacity-85'
          }`}
        >
          <Bookmark className={`w-4 h-4 stroke-[2.5] ${post.isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments Drawer */}
      {showComments && (
        <div className="flex flex-col gap-3 pt-3 border-t-2 border-black animate-fade-in">
          {post.comments && post.comments.length > 0 && (
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
              {post.comments.map(c => (
                <div
                  key={c.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-2 ring-black"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-studio-text">
                        {c.author.name}
                      </span>
                      <span className="text-[10px] text-studio-text/80 font-bold">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-studio-text mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your thought..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-bold text-studio-text placeholder-studio-text/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-xl bg-studio-btn-dark text-white dark:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 transition-opacity"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
