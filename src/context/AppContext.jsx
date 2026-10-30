import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCurrentUser,
  initialPosts,
  initialStories,
  initialNotifications,
  initialConversations,
  suggestedUsers,
  exploreItems
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state ('dark' or 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('studio_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('studio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('studio_user_v2');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' | 'register'
  });

  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const login = (email, password, rememberMe = true) => {
    setIsAuthenticated(true);
    closeAuthModal();
    showToast(`Welcome back, ${currentUser.name}!`, 'success');
  };

  const register = (userData) => {
    const newUser = {
      ...currentUser,
      name: userData.name || 'Creative Member',
      handle: (userData.name || 'creator').toLowerCase().replace(/\s+/g, ''),
      email: userData.email,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    closeAuthModal();
    showToast('Welcome to Studio! Your account is ready.', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out of Studio.', 'info');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('studio_user_v2', JSON.stringify(updated));
      return updated;
    });
    showToast('Profile updated successfully!', 'success');
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'explore' | 'notifications' | 'messages' | 'profile' | 'saved'

  // Posts State
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('studio_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('studio_posts', JSON.stringify(posts));
  }, [posts]);

  const createPost = (newPostData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: 'MEMBER',
        isVerified: currentUser.isVerified,
      },
      timestamp: 'Just now',
      content: newPostData.content,
      tags: newPostData.tags || ['Studio'],
      images: newPostData.images || [],
      likesCount: 0,
      isLiked: false,
      isSaved: false,
      sharesCount: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setCurrentUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        postsCount: (prev.stats.postsCount || 0) + 1,
      }
    }));
    showToast('Post published to Studio feed!', 'success');
  };

  const likePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const nextIsLiked = !post.isLiked;
          const delta = nextIsLiked ? 1 : -1;
          return {
            ...post,
            isLiked: nextIsLiked,
            likesCount: Math.max(0, post.likesCount + delta),
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      text: commentText.trim(),
      timestamp: 'Just now',
      likes: 0,
    };
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
    showToast('Comment posted', 'success');
  };

  const toggleSavePost = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const nextSaved = !post.isSaved;
          showToast(nextSaved ? 'Saved to collection' : 'Removed from collection', 'info');
          return { ...post, isSaved: nextSaved };
        }
        return post;
      })
    );
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post deleted', 'info');
  };

  // Stories State
  const [stories, setStories] = useState(initialStories);
  const [activeStory, setActiveStory] = useState(null);

  const addStory = (storyImage, caption) => {
    const newStoryItem = {
      url: storyImage,
      caption: caption || 'New moment on Studio',
      time: 'Just now'
    };
    setStories(prevStories => {
      const userStoryIdx = prevStories.findIndex(s => s.isUser);
      if (userStoryIdx !== -1) {
        const updated = [...prevStories];
        updated[userStoryIdx] = {
          ...updated[userStoryIdx],
          media: [newStoryItem, ...updated[userStoryIdx].media]
        };
        return updated;
      }
      return prevStories;
    });
    showToast('Story added to your spotlight!', 'success');
  };

  // Notifications State
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read', 'info');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Messages & Conversations State
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  const sendMessage = (chatId, text, media = null) => {
    if (!text.trim() && !media) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      media,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(prev =>
      prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      })
    );

    // Simulated intelligent response after 1.4s
    const targetChat = conversations.find(c => c.id === chatId);
    if (targetChat) {
      setTimeout(() => {
        const automatedReplies = [
          'That looks sensational! Excited to collaborate further.',
          'Brilliant perspective. Let us incorporate that in the next release.',
          'Love the atmosphere in this! Checking out your link right now.',
          'Agreed! The minimalist hierarchy really makes the details shine.'
        ];
        const randomReply = automatedReplies[Math.floor(Math.random() * automatedReplies.length)];
        const simulatedReply = {
          id: `msg-reply-${Date.now()}`,
          senderId: targetChat.user.id,
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setConversations(inner =>
          inner.map(c => {
            if (c.id === chatId) {
              return {
                ...c,
                messages: [...c.messages, simulatedReply],
              };
            }
            return c;
          })
        );
      }, 1400);
    }
  };

  // Followed creators
  const [followingMap, setFollowingMap] = useState({
    'user-1': true,
    'sug-3': true,
  });

  const toggleFollowUser = (userId, userName = 'Creator') => {
    setFollowingMap(prev => {
      const isCurrentlyFollowing = !!prev[userId];
      const nextState = !isCurrentlyFollowing;
      showToast(nextState ? `You are now following ${userName}` : `Unfollowed ${userName}`, 'info');
      return { ...prev, [userId]: nextState };
    });
  };

  // Modals state
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [shareModalData, setShareModalData] = useState(null); // { isOpen, post }
  const [postDetailModal, setPostDetailModal] = useState(null); // post object or null
  const [followersModal, setFollowersModal] = useState({ isOpen: false, title: 'Followers' });

  // Toast System
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  // Explore & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [exploreCategory, setExploreCategory] = useState('All');

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAuthenticated,
        currentUser,
        authModal,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        activeTab,
        setActiveTab,
        posts,
        createPost,
        likePost,
        addComment,
        toggleSavePost,
        deletePost,
        stories,
        activeStory,
        setActiveStory,
        addStory,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        conversations,
        activeChatId,
        setActiveChatId,
        sendMessage,
        unreadMessagesCount,
        followingMap,
        toggleFollowUser,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,
        shareModalData,
        setShareModalData,
        postDetailModal,
        setPostDetailModal,
        followersModal,
        setFollowersModal,
        searchQuery,
        setSearchQuery,
        exploreCategory,
        setExploreCategory,
        suggestedUsers,
        exploreItems,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
