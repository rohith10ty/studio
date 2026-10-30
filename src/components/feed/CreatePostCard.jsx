import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Sparkles, Hash, Send, X, Globe, Lock } from 'lucide-react';

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
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-studio-card border border-studio-border/50 shadow-studio-subtle transition-all">
      <div className="flex gap-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-studio-border"
        />

        <div className="flex-1 flex flex-col gap-3">
          <textarea
            value={content}
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Share a concept, ${currentUser.name.split(' ')[0]}...`}
            rows={isExpanded ? 3 : 2}
            className="w-full bg-transparent resize-none text-sm text-studio-text placeholder-studio-muted focus:outline-none leading-relaxed transition-all"
          />

          {mediaPreview && (
            <div className="relative rounded-xl overflow-hidden border border-studio-border max-h-60 group">
              <img
                src={mediaPreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setMediaPreview(null)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isExpanded && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-studio-border/30">
              <span className="text-[11px] text-studio-muted flex items-center gap-1">
                <Hash className="w-3 h-3" /> Tags:
              </span>
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`text-xs px-2 py-0.5 rounded-md font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-studio-btn-bg text-studio-btn-text'
                      : 'bg-studio-bg/60 text-studio-muted hover:text-studio-text'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-bg/50 transition-colors flex items-center gap-1 text-xs"
              >
                <Image className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Image</span>
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
                className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-bg/50 transition-colors flex items-center gap-1 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Artwork</span>
              </button>

              <button
                type="button"
                onClick={() => setPrivacy(privacy === 'Public' ? 'Private' : 'Public')}
                className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-bg/50 transition-colors flex items-center gap-1 text-xs"
              >
                {privacy === 'Public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{privacy}</span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                content.trim() || mediaPreview
                  ? 'bg-studio-btn-bg text-studio-btn-text hover:opacity-90'
                  : 'bg-studio-border/30 text-studio-muted/50 cursor-not-allowed'
              }`}
            >
              <span>Publish</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
