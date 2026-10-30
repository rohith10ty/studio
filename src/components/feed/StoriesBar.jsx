import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus } from 'lucide-react';

export default function StoriesBar() {
  const { stories, setActiveStory, currentUser, addStory, isAuthenticated, openAuthModal } = useApp();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addStory(event.target.result, 'New moment shared');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full pb-1 select-none">
      <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
        {/* Add Story Button */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
          <div
            onClick={() => {
              if (!isAuthenticated) {
                openAuthModal('login');
              } else {
                fileInputRef.current?.click();
              }
            }}
            className="relative w-14 h-14 rounded-full p-0.5 border border-dashed border-studio-border group-hover:border-studio-text transition-all"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-studio-btn-bg text-studio-btn-text flex items-center justify-center">
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <span className="text-[11px] font-medium text-studio-text truncate max-w-[60px]">
            Your story
          </span>
        </div>

        {/* Stories */}
        {stories.filter(s => !s.isUser).map(story => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div
              className={`w-14 h-14 rounded-full p-[2px] transition-transform group-hover:scale-105 ${
                story.hasUnseen
                  ? 'border-2 border-studio-text'
                  : 'border border-studio-border/60'
              }`}
            >
              <div className="w-full h-full rounded-full p-0.5 bg-studio-bg">
                <img
                  src={story.avatar}
                  alt={story.userName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-[11px] font-medium text-studio-muted group-hover:text-studio-text transition-colors truncate max-w-[64px]">
              {story.userName.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
