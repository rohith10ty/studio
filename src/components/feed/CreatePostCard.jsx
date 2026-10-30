import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Video, Sparkles, Hash, Send, X, Globe, Lock, Smile } from 'lucide-react';

export default function CreatePostCard() {
  const { currentUser, createPost, isAuthenticated, openAuthModal } = useApp();
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef(null);

  const suggestedTags = ['Minimalism', 'Architecture', '3DArt', 'Design', 'Typography'];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!content.trim() && !mediaPreview) return;

    createPost({
      content: content.trim(),
      images: mediaPreview ? [mediaPreview] : [],
      tags: selectedTag ? [selectedTag] : ['Studio'],
    });

    setContent('');
    setMediaPreview(null);
    setSelectedTag('');
    setIsExpanded(false);
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-3xl bg-studio-dark-card/70 dark:bg-studio-dark-card/70 light:bg-studio-light-card/80 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60 shadow-studio-subtle transition-all">
      <div className="flex gap-3.5">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 ring-2 ring-studio-dark-border/40 dark:ring-studio-dark-border/40 light:ring-studio-light-border"
        />

        <div className="flex-1 flex flex-col gap-3">
          <textarea
            value={content}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What are you crafting today, ${currentUser.name.split(' ')[0]}?`}
            rows={isExpanded ? 3 : 2}
            className="w-full bg-transparent resize-none text-sm sm:text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none leading-relaxed transition-all"
          />

          {/* Media Preview Box */}
          {mediaPreview && (
            <div className="relative rounded-2xl overflow-hidden border border-studio-dark-border/50 dark:border-studio-dark-border/50 light:border-studio-light-border max-h-64 group">
              <img
                src={mediaPreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setMediaPreview(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Expanded controls */}
          {isExpanded && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
              <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" /> Tags:
              </span>
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white'
                      : 'bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Bottom Bar Buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Image className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => {
                  setMediaPreview('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
                  setIsExpanded(true);
                }}
                className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Add Artwork</span>
              </button>

              <button
                type="button"
                onClick={() => setPrivacy(privacy === 'Public' ? 'Followers' : 'Public')}
                className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:text-studio-dark-text dark:hover:text-studio-dark-text light:hover:text-studio-light-text hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors flex items-center gap-1 text-xs font-medium"
              >
                {privacy === 'Public' ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{privacy}</span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                content.trim() || mediaPreview
                  ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-md hover:scale-105 active:scale-95'
                  : 'bg-studio-dark-border/30 dark:bg-studio-dark-border/30 light:bg-studio-light-border text-studio-dark-muted/50 dark:text-studio-dark-muted/50 light:text-studio-light-subtext/50 cursor-not-allowed'
              }`}
            >
              <span>Publish</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
