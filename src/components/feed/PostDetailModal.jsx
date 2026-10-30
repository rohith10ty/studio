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
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-studio-card border-2 border-studio-border shadow-studio-modal flex flex-col md:flex-row overflow-hidden"
      >
        <button
          onClick={() => setPostDetailModal(null)}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media */}
        <div className="w-full md:w-3/5 bg-black/40 flex items-center justify-center max-h-[50vh] md:max-h-full overflow-hidden">
          {postDetailModal.images && postDetailModal.images.length > 0 ? (
            <img
              src={postDetailModal.images[0]}
              alt="Visual asset"
              className="w-full h-full object-contain max-h-[70vh]"
            />
          ) : (
            <div className="p-8 text-center text-xs text-studio-subtext font-bold">
              Thought piece
            </div>
          )}
        </div>

        {/* Details */}
        <div
          data-lenis-prevent
          className="w-full md:w-2/5 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto bg-studio-sidebar"
        >
          <div className="flex flex-col gap-3 pb-3 border-b-2 border-studio-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={postDetailModal.author?.avatar}
                  alt={postDetailModal.author?.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-studio-border"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-studio-text">
                    {postDetailModal.author?.name}
                  </span>
                  <span className="text-[11px] text-studio-subtext font-bold">
                    @{postDetailModal.author?.handle}
                  </span>
                </div>
              </div>

              {postDetailModal.author?.id && (
                <button
                  onClick={() => toggleFollowUser(postDetailModal.author.id, postDetailModal.author.name)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    isFollowing
                      ? 'bg-studio-card border border-studio-border text-studio-text'
                      : 'bg-studio-btn-dark text-studio-btn-darkText'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            <p className="text-xs font-medium text-studio-text leading-relaxed">
              {postDetailModal.content}
            </p>
          </div>

          {/* Comments Feed */}
          <div data-lenis-prevent className="flex-1 my-3 flex flex-col gap-2 overflow-y-auto max-h-48 pr-1">
            {postDetailModal.comments && postDetailModal.comments.length > 0 ? (
              postDetailModal.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2 p-2 rounded-xl bg-studio-card border border-studio-border">
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-studio-border"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-studio-text">
                        {c.author.name}
                      </span>
                      <span className="text-[10px] text-studio-subtext font-medium">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-studio-text font-medium mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-studio-subtext font-bold italic">
                No comments yet.
              </p>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2.5 pt-2.5 border-t-2 border-studio-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => likePost(postDetailModal.id)}
                  className={`flex items-center gap-1 text-xs font-bold ${
                    isLiked ? 'text-rose-500' : 'text-studio-text'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-studio-text'}`} />
                  <span>{postDetailModal.likesCount}</span>
                </button>
                <button
                  onClick={() => setShareModalData(postDetailModal)}
                  className="flex items-center gap-1 text-xs font-bold text-studio-text hover:opacity-80"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{postDetailModal.sharesCount}</span>
                </button>
              </div>

              <button
                onClick={() => toggleSavePost(postDetailModal.id)}
                className={`p-1 rounded ${
                  isSaved ? 'text-studio-text' : 'text-studio-text/80 hover:text-studio-text'
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
                className="flex-1 px-3 py-1.5 rounded-xl bg-studio-card border-2 border-studio-border text-xs font-medium text-studio-text placeholder-studio-subtext focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-1.5 rounded-xl bg-studio-btn-dark text-studio-btn-darkText disabled:opacity-40"
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
