import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Image, Sparkles, Hash, Globe, Lock, Send } from 'lucide-react';

export default function CreatePostModal() {
  const { isCreatePostOpen, setIsCreatePostOpen, currentUser, createPost, isAuthenticated, openAuthModal } = useApp();
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [tag, setTag] = useState('');
  const [privacy, setPrivacy] = useState('Public');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="w-full max-w-lg rounded-2xl bg-studio-card border border-studio-border shadow-studio-modal p-5 sm:p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-studio-border/40">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-xs text-studio-text">
              {currentUser.name}
            </span>
          </div>

          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-lg text-studio-muted hover:text-studio-text"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you working on?"
          rows={4}
          className="w-full bg-transparent resize-none text-sm text-studio-text placeholder-studio-muted focus:outline-none leading-relaxed"
          autoFocus
        />

        {mediaPreview && (
          <div className="relative rounded-xl overflow-hidden max-h-52 border border-studio-border">
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

        {!mediaPreview && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-studio-muted">
              Select visual:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {sampleVisuals.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setMediaPreview(src)}
                  className="h-14 rounded-lg overflow-hidden cursor-pointer border border-studio-border/50 hover:opacity-80 transition-opacity"
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/40">
          <Hash className="w-3.5 h-3.5 text-studio-muted" />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (e.g. Minimal, WebGL)"
            className="w-full bg-transparent text-xs text-studio-text placeholder-studio-muted focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg text-studio-muted hover:text-studio-text hover:bg-studio-bg/50 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Image className="w-4 h-4 text-emerald-500" />
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
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-studio-muted hover:text-studio-text"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                content.trim() || mediaPreview
                  ? 'bg-studio-btn-bg text-studio-btn-text hover:opacity-90'
                  : 'bg-studio-border/30 text-studio-muted/40 cursor-not-allowed'
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
