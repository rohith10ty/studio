import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, MessageCircle, Bookmark, Share2, Send, CheckCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setPostDetailModal(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Section */}
        <div className="w-full md:w-3/5 bg-black/40 flex items-center justify-center max-h-[50vh] md:max-h-full overflow-hidden">
          {postDetailModal.images && postDetailModal.images.length > 0 ? (
            <img
              src={postDetailModal.images[0]}
              alt="Visual asset"
              className="w-full h-full object-contain max-h-[75vh]"
            />
          ) : (
            <div className="p-8 text-center text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
              Thought piece
            </div>
          )}
        </div>

        {/* Details & Comments Section */}
        <div className="w-full md:w-2/5 flex flex-col justify-between p-5 md:p-6 overflow-y-auto">
          {/* Author Header */}
          <div className="flex flex-col gap-4 pb-4 border-b border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={postDetailModal.author?.avatar}
                  alt={postDetailModal.author?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text flex items-center gap-1">
                    {postDetailModal.author?.name}
                    {postDetailModal.author?.isVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                    )}
                  </span>
                  <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                    @{postDetailModal.author?.handle}
                  </span>
                </div>
              </div>

              {postDetailModal.author?.id && (
                <button
                  onClick={() => toggleFollowUser(postDetailModal.author.id, postDetailModal.author.name)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                    isFollowing
                      ? 'bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                      : 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            <p className="text-sm text-studio-dark-text/90 dark:text-studio-dark-text/90 light:text-studio-light-text leading-relaxed">
              {postDetailModal.content}
            </p>
          </div>

          {/* Comments Feed */}
          <div className="flex-1 my-4 flex flex-col gap-3 overflow-y-auto max-h-64 pr-1">
            {postDetailModal.comments && postDetailModal.comments.length > 0 ? (
              postDetailModal.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <img
                    src={c.author.avatar}
                    alt={c.author.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                        {c.author.name}
                      </span>
                      <span className="text-[10px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-studio-dark-text/80 dark:text-studio-dark-text/80 light:text-studio-light-text mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext italic">
                Be the first to share your thoughts.
              </p>
            )}
          </div>

          {/* Bottom Actions & Input */}
          <div className="flex flex-col gap-3 pt-3 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likePost(postDetailModal.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    isLiked ? 'text-rose-500' : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{postDetailModal.likesCount}</span>
                </button>
                <button
                  onClick={() => setShareModalData(postDetailModal)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text"
                >
                  <Share2 className="w-5 h-5" />
                  <span>{postDetailModal.sharesCount}</span>
                </button>
              </div>

              <button
                onClick={() => toggleSavePost(postDetailModal.id)}
                className={`p-1.5 rounded-lg ${
                  isSaved ? 'text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text' : 'text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <form onSubmit={handleComment} className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white disabled:opacity-40"
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
