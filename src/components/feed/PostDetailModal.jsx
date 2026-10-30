import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, Bookmark, Share2, Send } from 'lucide-react';

export default function PostDetailModal() {
  const {
    postDetailModal,
    setPostDetailModal,
    likePost,
    addComment,
    toggleSavePost,
    setShareModalData,
    isAuthenticated,
    openAuthModal,
    followingMap,
    toggleFollowUser,
  } = useApp();

  const [commentText, setCommentText] = useState('');

  if (!postDetailModal) return null;

  const isLiked = postDetailModal.isLiked;
  const isSaved = postDetailModal.isSaved;
  const isFollowing = !!followingMap[postDetailModal.author?.id];

  const handleComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!commentText.trim()) return;
    addComment(postDetailModal.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-studio-card border border-studio-border shadow-studio-modal flex flex-col md:flex-row overflow-hidden"
      >
        <button
          onClick={() => setPostDetailModal(null)}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media */}
        <div className="w-full md:w-3/5 bg-black/30 flex items-center justify-center max-h-[50vh] md:max-h-full overflow-hidden">
          {postDetailModal.images && postDetailModal.images.length > 0 ? (
            <img
              src={postDetailModal.images[0]}
              alt="Visual asset"
              className="w-full h-full object-contain max-h-[70vh]"
            />
          ) : (
            <div className="p-8 text-center text-xs text-studio-muted">
              Thought piece
            </div>
          )}
        </div>

        {/* Details */}
        <div
          data-lenis-prevent
          className="w-full md:w-2/5 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto"
        >
          <div className="flex flex-col gap-3 pb-3 border-b border-studio-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={postDetailModal.author?.avatar}
                  alt={postDetailModal.author?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-studio-text">
                    {postDetailModal.author?.name}
                  </span>
                  <span className="text-[11px] text-studio-muted">
                    @{postDetailModal.author?.handle}
                  </span>
                </div>
              </div>

              {postDetailModal.author?.id && (
                <button
                  onClick={() => toggleFollowUser(postDetailModal.author.id, postDetailModal.author.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    isFollowing
                      ? 'text-studio-muted'
                      : 'bg-studio-btn-bg text-studio-btn-text'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            <p className="text-xs text-studio-text leading-relaxed">
              {postDetailModal.content}
            </p>
          </div>

          {/* Comments Feed */}
          <div data-lenis-prevent className="flex-1 my-3 flex flex-col gap-2 overflow-y-auto max-h-48 pr-1">
            {postDetailModal.comments && postDetailModal.comments.length > 0 ? (
              postDetailModal.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2">
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[11px] text-studio-text">
                        {c.author.name}
                      </span>
                      <span className="text-[10px] text-studio-muted">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-studio-text/80 mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-studio-muted italic">
                No comments yet.
              </p>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2.5 pt-2.5 border-t border-studio-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => likePost(postDetailModal.id)}
                  className={`flex items-center gap-1 text-xs font-medium ${
                    isLiked ? 'text-rose-500' : 'text-studio-muted hover:text-studio-text'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{postDetailModal.likesCount}</span>
                </button>
                <button
                  onClick={() => setShareModalData(postDetailModal)}
                  className="flex items-center gap-1 text-xs font-medium text-studio-muted hover:text-studio-text"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{postDetailModal.sharesCount}</span>
                </button>
              </div>

              <button
                onClick={() => toggleSavePost(postDetailModal.id)}
                className={`p-1 rounded ${
                  isSaved ? 'text-studio-text' : 'text-studio-muted hover:text-studio-text'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <form onSubmit={handleComment} className="flex items-center gap-1.5">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text placeholder-studio-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-1.5 rounded-xl bg-studio-btn-bg text-studio-btn-text disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
