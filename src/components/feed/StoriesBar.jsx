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
        addStory(event.target.result, 'Fresh moment shared');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full pb-2 select-none">
      <div className="flex items-center gap-4 overflow-x-auto py-2 px-1 scrollbar-none">
        {/* Add Story Button / Current User */}
        <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
          <div
            onClick={() => {
              if (!isAuthenticated) {
                openAuthModal('login');
              } else {
                fileInputRef.current?.click();
              }
            }}
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 border-2 border-dashed border-studio-dark-border/80 dark:border-studio-dark-border/80 light:border-studio-light-border group-hover:border-studio-dark-text dark:group-hover:border-studio-dark-text light:group-hover:border-studio-light-text transition-all duration-300"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-studio-dark-border dark:bg-studio-dark-text dark:text-studio-dark-bg light:bg-studio-light-text light:text-white text-white flex items-center justify-center shadow-md">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <span className="text-xs font-medium text-studio-dark-text dark:text-studio-dark-text light:text-studio-light-text truncate max-w-[70px]">
            Your Story
          </span>
        </div>

        {/* Stories List */}
        {stories.filter(s => !s.isUser).map(story => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] transition-all duration-300 group-hover:scale-105 ${
                story.hasUnseen
                  ? 'bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500 shadow-sm'
                  : 'bg-studio-dark-border/40 dark:bg-studio-dark-border/40 light:bg-studio-light-border'
              }`}
            >
              <div className="w-full h-full rounded-full p-0.5 bg-studio-dark-bg dark:bg-studio-dark-bg light:bg-studio-light-bg">
                <img
                  src={story.avatar}
                  alt={story.userName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs font-medium text-studio-dark-muted dark:text-studio-dark-muted light:text-studio-light-subtext group-hover:text-studio-dark-text dark:group-hover:text-studio-dark-text light:group-hover:text-studio-light-text transition-colors truncate max-w-[72px]">
              {story.userName.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
