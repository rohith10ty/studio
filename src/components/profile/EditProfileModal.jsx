import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Camera, Check } from 'lucide-react';

export default function EditProfileModal() {
  const { isEditProfileOpen, setIsEditProfileOpen, currentUser, updateProfile } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [coverImage, setCoverImage] = useState(currentUser.coverImage || '');

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  if (!isEditProfileOpen) return null;

  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setAvatar(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCoverImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateProfile({
      name: name.trim(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
      avatar,
      coverImage,
    });

    setIsEditProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      <div
        data-lenis-prevent
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-studio-card border border-studio-border shadow-studio-modal p-5 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-studio-border/40">
          <h2 className="font-semibold text-sm text-studio-text font-outfit">
            Edit Profile
          </h2>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1 rounded-lg text-studio-muted hover:text-studio-text"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="relative">
            <div className="relative h-24 rounded-xl overflow-hidden bg-black/40 border border-studio-border/50">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs gap-1 opacity-80 hover:opacity-100"
              >
                <Camera className="w-3.5 h-3.5" /> Change Cover
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverFile}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="relative -mt-8 ml-3 inline-block">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-studio-card bg-black">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-80 hover:opacity-100"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarFile}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-studio-text">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-studio-text">
                Bio
              </label>
              <span className="text-[10px] text-studio-muted">
                {bio.length}/200
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={200}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text focus:outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-studio-text">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Tokyo & San Francisco"
              className="px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-studio-text">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
              className="px-3 py-1.5 rounded-xl bg-studio-bg/60 border border-studio-border/50 text-xs text-studio-text focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-studio-border/30">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-studio-muted hover:text-studio-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-studio-btn-bg text-studio-btn-text text-xs font-medium hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
