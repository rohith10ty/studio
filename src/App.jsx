import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import MobileNavbar from './components/layout/MobileNavbar';
import MobileBottomBar from './components/layout/MobileBottomBar';
import RightSidebar from './components/layout/RightSidebar';
import FeedView from './components/feed/FeedView';
import ExploreView from './components/explore/ExploreView';
import NotificationsView from './components/notifications/NotificationsView';
import MessagesView from './components/messages/MessagesView';
import ProfileView from './components/profile/ProfileView';
import StoryViewerModal from './components/feed/StoryViewerModal';
import CreatePostModal from './components/feed/CreatePostModal';
import ShareModal from './components/feed/ShareModal';
import PostDetailModal from './components/feed/PostDetailModal';
import EditProfileModal from './components/profile/EditProfileModal';
import FollowersModal from './components/profile/FollowersModal';
import AuthModal from './components/auth/AuthModal';
import Toast from './components/ui/Toast';

export default function App() {
  const { activeTab } = useApp();

  // Initialize Lenis Smooth Scrolling for main window
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-studio-canvas text-studio-text flex flex-col font-outfit transition-colors duration-200">
      {/* Mobile Top Navbar */}
      <MobileNavbar />

      <div className="flex-1 w-full flex justify-between">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Center Main Stage */}
        <main className="flex-1 min-w-0 flex justify-center px-2.5 sm:px-6 py-4 sm:py-7">
          <div className={`w-full ${activeTab === 'messages' || activeTab === 'profile' ? 'max-w-3xl' : 'max-w-2xl'}`}>
            {activeTab === 'feed' && <FeedView />}
            {activeTab === 'explore' && <ExploreView />}
            {activeTab === 'notifications' && <NotificationsView />}
            {activeTab === 'messages' && <MessagesView />}
            {activeTab === 'profile' && <ProfileView />}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Floating Bottom Bar for Mobile Devices */}
      <MobileBottomBar />

      {/* Modals & Overlays */}
      <StoryViewerModal />
      <CreatePostModal />
      <ShareModal />
      <PostDetailModal />
      <EditProfileModal />
      <FollowersModal />
      <AuthModal />
      <Toast />
    </div>
  );
}
