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
    <div className="w-full p-3 sm:p-5 rounded-2xl bg-studio-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden">
      <div className="flex gap-2.5 sm:gap-3.5 w-full min-w-0">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 ring-2 ring-black"
        />

        <div className="flex-1 min-w-0 flex flex-col gap-2.5 sm:gap-3">
          {/* Inner Textarea Well */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-studio-sidebar border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full min-w-0">
            <textarea
              value={content}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What are you crafting today, ${currentUser.name.split(' ')[0]}?`}
              rows={isExpanded ? 3 : 2}
              className="w-full bg-transparent resize-none text-xs sm:text-sm font-bold text-studio-text placeholder-studio-text/60 focus:outline-none leading-relaxed transition-all min-w-0"
            />

            {mediaPreview && (
              <div className="relative mt-2 rounded-xl overflow-hidden border-2 border-black max-h-52 sm:max-h-60 group">
                <img
                  src={mediaPreview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setMediaPreview(null)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[10px] sm:text-[11px] font-black text-studio-text flex items-center gap-1">
                <Hash className="w-3 h-3 stroke-[3]" /> Tags:
              </span>
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-md font-black border-2 border-black transition-colors ${
                    selectedTag === tag
                      ? 'bg-studio-btn-dark text-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-studio-card text-studio-text hover:bg-studio-sidebar'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 pt-0.5 w-full min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 sm:p-1.5 px-2 sm:px-2.5 rounded-lg text-studio-text hover:bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-black"
              >
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-300 stroke-[2.5]" />
                <span className="hidden xs:inline">Photo</span>
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
                className="p-1 sm:p-1.5 px-2 sm:px-2.5 rounded-lg text-studio-text hover:bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-black"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 stroke-black stroke-[1.5]" />
                <span className="hidden xs:inline">Artwork</span>
              </button>

              <button
                type="button"
                onClick={() => setPrivacy(privacy === 'Public' ? 'Private' : 'Public')}
                className="p-1 sm:p-1.5 px-2 sm:px-2.5 rounded-lg text-studio-text hover:bg-studio-sidebar border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-black"
              >
                {privacy === 'Public' ? <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" /> : <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />}
                <span>{privacy}</span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black tracking-wide border-2 border-black transition-all shrink-0 ${
                content.trim() || mediaPreview
                  ? 'bg-studio-btn-dark text-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1'
                  : 'bg-studio-sidebar text-studio-text/40 cursor-not-allowed opacity-60'
              }`}
            >
              <span>Publish</span>
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}