import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Image, Sparkles, Hash, Send } from 'lucide-react';

export default function CreatePostModal() {
  const { isCreatePostOpen, setIsCreatePostOpen, currentUser, createPost, isAuthenticated, openAuthModal } = useApp();
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [tag, setTag] = useState('');
  const fileInputRef = useRef(null);

  if (!isCreatePostOpen) return null;

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
      tags: tag ? [tag] : ['Studio'],
    });

    setContent('');
    setMediaPreview(null);
    setTag('');
    setIsCreatePostOpen(false);
  };

  const sampleVisuals = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="w-full max-w-lg rounded-2xl bg-studio-card border-2 border-studio-border shadow-studio-modal p-5 sm:p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between pb-2 border-b-2 border-studio-border">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-studio-border"
            />
            <span className="font-bold text-xs text-studio-text">
              {currentUser.name}
            </span>
          </div>

          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-lg text-studio-text hover:bg-studio-sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-studio-sidebar border-2 border-studio-border">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are you working on?"
            rows={4}
            className="w-full bg-transparent resize-none text-sm font-medium text-studio-text placeholder-studio-subtext focus:outline-none leading-relaxed"
            autoFocus
          />

          {mediaPreview && (
            <div className="relative mt-2 rounded-xl overflow-hidden max-h-52 border-2 border-studio-border">
              <img
                src={mediaPreview}
                alt="Media preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setMediaPreview(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {!mediaPreview && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-studio-text">
              Select visual:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {sampleVisuals.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setMediaPreview(src)}
                  className="h-14 rounded-lg overflow-hidden cursor-pointer border-2 border-studio-border hover:opacity-80 transition-opacity"
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-studio-sidebar border-2 border-studio-border">
          <Hash className="w-3.5 h-3.5 text-studio-text stroke-[2.5]" />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (e.g. Minimal, WebGL)"
            className="w-full bg-transparent text-xs font-bold text-studio-text placeholder-studio-subtext focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 px-3 rounded-xl bg-studio-sidebar border-2 border-studio-border text-studio-text hover:bg-studio-card transition-colors flex items-center gap-1.5 text-xs font-bold shadow-sm"
          >
            <Image className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Upload Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-studio-text hover:bg-studio-sidebar"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                content.trim() || mediaPreview
                  ? 'bg-studio-btn-dark text-studio-btn-darkText hover:opacity-90 active:scale-95'
                  : 'bg-studio-border text-studio-text/40 cursor-not-allowed'
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
