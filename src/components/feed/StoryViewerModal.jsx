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
      // Find next story
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
      // Find previous story
      const currentIndex = stories.findIndex(s => s.id === activeStory.id);
      if (currentIndex > 0) {
        setActiveStory(stories[currentIndex - 1]);
      }
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    showToast(`Reply sent to ${activeStory.userName}: "${replyText}"`, 'success');
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
      {/* Close Button top right */}
      <button
        onClick={() => setActiveStory(null)}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      <button
        onClick={handlePrevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Story Container Card */}
      <div className="relative w-full max-w-md h-[90vh] max-h-[800px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between bg-zinc-950 border border-white/10 select-none">
        {/* Background Image */}
        <img
          src={currentMedia.url}
          alt={currentMedia.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* Top Header & Progress Bars */}
        <div className="relative z-10 p-4 flex flex-col gap-3">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 w-full">
            {activeStory.media.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
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

          {/* Author info & controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeStory.avatar}
                alt={activeStory.userName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/50"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-white drop-shadow">
                  {activeStory.userName}
                </span>
                <span className="text-xs text-white/70">
                  {currentMedia.time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Click to Next/Prev touch zones */}
        <div className="absolute inset-y-20 left-0 w-1/3 z-10" onClick={handlePrevSlide} />
        <div className="absolute inset-y-20 right-0 w-2/3 z-10" onClick={handleNextSlide} />

        {/* Bottom Caption & Interactive Reply Bar */}
        <div className="relative z-20 p-4 flex flex-col gap-3">
          {currentMedia.caption && (
            <p className="text-sm font-medium text-white/95 drop-shadow bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
              {currentMedia.caption}
            </p>
          )}

          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeStory.userName.split(' ')[0]}...`}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-white text-zinc-900 hover:bg-white/90 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLiked(!isLiked);
                if (!isLiked) showToast('Sent heart to story!', 'heart');
              }}
              className={`p-2.5 rounded-full transition-all shrink-0 ${
                isLiked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
