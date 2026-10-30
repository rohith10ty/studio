import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play } from 'lucide-react';

export default function StoryViewerModal() {
  const { activeStory, setActiveStory, stories, showToast } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsLiked(false);
  }, [activeStory]);

  useEffect(() => {
    if (!activeStory || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNextSlide();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory, currentSlideIndex, isPaused]);

  if (!activeStory) return null;

  const currentMedia = activeStory.media[currentSlideIndex] || activeStory.media[0];

  const handleNextSlide = () => {
    if (currentSlideIndex < activeStory.media.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex(s => s.id === activeStory.id);
      if (currentIndex !== -1 && currentIndex < stories.length - 1) {
        setActiveStory(stories[currentIndex + 1]);
      } else {
        setActiveStory(null);
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex(s => s.id === activeStory.id);
      if (currentIndex > 0) {
        setActiveStory(stories[currentIndex - 1]);
      }
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Reply sent: "${replyText}"`, 'success');
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <button
        onClick={() => setActiveStory(null)}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={handlePrevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-sm h-[85vh] max-h-[720px] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between bg-zinc-950 border border-white/10 select-none">
        <img
          src={currentMedia.url}
          alt={currentMedia.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 w-full">
            {activeStory.media.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width:
                      idx === currentSlideIndex
                        ? `${progress}%`
                        : idx < currentSlideIndex
                        ? '100%'
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={activeStory.avatar}
                alt={activeStory.userName}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-white/60"
              />
              <div className="flex flex-col">
                <span className="font-medium text-xs text-white">
                  {activeStory.userName}
                </span>
                <span className="text-[10px] text-white/70">
                  {currentMedia.time}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="absolute inset-y-16 left-0 w-1/3 z-10" onClick={handlePrevSlide} />
        <div className="absolute inset-y-16 right-0 w-2/3 z-10" onClick={handleNextSlide} />

        {/* Bottom */}
        <div className="relative z-20 p-4 flex flex-col gap-2">
          {currentMedia.caption && (
            <p className="text-xs text-white/95 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
              {currentMedia.caption}
            </p>
          )}

          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-white text-zinc-900 transition-opacity hover:opacity-90 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLiked(!isLiked);
                if (!isLiked) showToast('Heart sent!', 'heart');
              }}
              className={`p-2 rounded-xl transition-all shrink-0 ${
                isLiked ? 'bg-rose-500 text-white' : 'bg-white/15 text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
