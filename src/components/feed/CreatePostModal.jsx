import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Image, Sparkles, Hash, Globe, Lock, Send, Check } from 'lucide-react';

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
      tags: tag ? [tag] : ['StudioDesign'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                Create New Studio Post
              </span>
              <button
                type="button"
                onClick={() => setPrivacy(privacy === 'Public' ? 'Private' : 'Public')}
                className="flex items-center gap-1 text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:underline text-left"
              >
                {privacy === 'Public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{privacy} Post</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1.5 rounded-full text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What concept or project are you showcasing?"
          rows={4}
          className="w-full bg-transparent resize-none text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none leading-relaxed"
          autoFocus
        />

        {/* Media Preview */}
        {mediaPreview && (
          <div className="relative rounded-2xl overflow-hidden max-h-56 border border-studio-dark-border/50 dark:border-studio-dark-border/50 light:border-studio-light-border">
            <img
              src={mediaPreview}
              alt="Media preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setMediaPreview(null)}
              className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Preset Visuals Selector */}
        {!mediaPreview && (
          <div className="flex flex-col gap-2">
            <span className="text-xs text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
              Quick Studio Presets:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {sampleVisuals.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setMediaPreview(src)}
                  className="h-16 rounded-xl overflow-hidden cursor-pointer border border-studio-dark-border/40 hover:opacity-80 transition-opacity"
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tag Input */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-studio-dark-bg/50 dark:bg-studio-dark-bg/50 light:bg-studio-light-bg/50 border border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
          <Hash className="w-4 h-4 text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext" />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Add a focus tag (e.g., Architecture, WebGL)"
            className="w-full bg-transparent text-xs text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text placeholder-studio-dark-muted dark:placeholder-studio-dark-muted light:placeholder-studio-light-subtext focus:outline-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Image className="w-4 h-4 text-emerald-400" />
              <span>Upload File</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/50 dark:hover:bg-studio-dark-bg/50 light:hover:bg-studio-light-bg/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                content.trim() || mediaPreview
                  ? 'bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white shadow-md hover:scale-105'
                  : 'bg-studio-dark-border/30 dark:bg-studio-dark-border/30 light:bg-studio-light-border text-studio-dark-muted/40 cursor-not-allowed'
              }`}
            >
              <span>Share to Collective</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
