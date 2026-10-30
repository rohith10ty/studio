import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Camera, Check, Upload } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-studio-dark-card dark:bg-studio-dark-card light:bg-studio-light-card border border-studio-dark-border dark:border-studio-dark-border light:border-studio-light-border shadow-studio-dark-float p-6 flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border/60">
          <h2 className="font-bold text-base text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text font-outfit">
            Edit Studio Profile
          </h2>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1 rounded-lg text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/60 dark:hover:bg-studio-dark-bg/60 light:hover:bg-studio-light-bg/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Cover & Avatar previews */}
          <div className="relative">
            <div className="relative h-28 rounded-2xl overflow-hidden bg-black/40 border border-studio-dark-border/40">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
              >
                <Camera className="w-4 h-4" /> Change Cover
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverFile}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="relative -mt-10 ml-4 inline-block">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-studio-dark-card dark:ring-studio-dark-card light:ring-studio-light-card shadow-lg bg-black">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-4 h-4" />
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

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Display Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
            />
          </div>

          {/* Bio Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
                Studio Bio
              </label>
              <span className="text-[11px] text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext">
                {bio.length}/200
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={200}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other creators about your craft and aesthetic philosophy..."
              className="px-3.5 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none resize-none"
            />
          </div>

          {/* Location Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Tokyo & San Francisco"
              className="px-3.5 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
            />
          </div>

          {/* Website Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text">
              Portfolio Link
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourportfolio.studio"
              className="px-3.5 py-2.5 rounded-xl bg-studio-dark-bg/60 dark:bg-studio-dark-bg/60 light:bg-studio-light-bg/60 border border-studio-dark-border/40 dark:border-studio-dark-border/40 light:border-studio-light-border text-xs sm:text-sm text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text focus:outline-none"
            />
          </div>

          {/* Footer Submit Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-studio-dark-border/30 dark:border-studio-dark-border/30 light:border-studio-light-border/40">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext hover:bg-studio-dark-bg/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white text-xs font-semibold shadow-md hover:scale-105 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
