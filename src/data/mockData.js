// Studio Mock Data
export const initialCurrentUser = {
  id: 'user-0',
  name: 'Aria Vance',
  handle: 'ariavance',
  role: 'Creative Director & Visual Architect',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
  bio: 'Exploring spatial aesthetics, generative design & hyper-minimalist typography. Building the next wave of creative tools at Studio.',
  location: 'Tokyo & San Francisco',
  website: 'https://ariavance.studio',
  joinedDate: 'Joined March 2024',
  isVerified: true,
  stats: {
    postsCount: 42,
    followersCount: 14800,
    followingCount: 420,
    likesCount: 98400,
  },
  savedPostIds: ['post-2', 'post-4'],
  likedPostIds: ['post-1', 'post-3', 'post-5'],
};

export const initialStories = [
  {
    id: 'story-0',
    userId: 'user-0',
    userName: 'Your Story',
    userHandle: 'ariavance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    isUser: true,
    hasUnseen: false,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1080&auto=format&fit=crop&q=80',
        caption: 'Late night render session ✦',
        time: 'Just now'
      }
    ]
  },
  {
    id: 'story-1',
    userId: 'user-1',
    userName: 'Elena Rostova',
    userHandle: 'elenarostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    isUser: false,
    hasUnseen: true,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&auto=format&fit=crop&q=80',
        caption: 'Nordic morning light in our new studio space.',
        time: '2h ago'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1080&auto=format&fit=crop&q=80',
        caption: 'Raw concrete & walnut textures.',
        time: '1h ago'
      }
    ]
  },
  {
    id: 'story-2',
    userId: 'user-2',
    userName: 'Kaito Tanaka',
    userHandle: 'kaitocreative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    isUser: false,
    hasUnseen: true,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1080&auto=format&fit=crop&q=80',
        caption: 'Shibuya monochrome captured on 35mm film.',
        time: '4h ago'
      }
    ]
  },
  {
    id: 'story-3',
    userId: 'user-3',
    userName: 'Sora Williams',
    userHandle: 'sorawilliams',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
    isUser: false,
    hasUnseen: true,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80',
        caption: 'Generative fluid dynamics prototype 04.',
        time: '5h ago'
      }
    ]
  },
  {
    id: 'story-4',
    userId: 'user-4',
    userName: 'Marcus Chen',
    userHandle: 'marcus_chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    isUser: false,
    hasUnseen: false,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80',
        caption: 'Testing tactile mechanical keyboards.',
        time: '7h ago'
      }
    ]
  },
  {
    id: 'story-5',
    userId: 'user-5',
    userName: 'Amara Patel',
    userHandle: 'amarapatel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    isUser: false,
    hasUnseen: false,
    media: [
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1080&auto=format&fit=crop&q=80',
        caption: 'Clay modeling for the autumn exhibition.',
        time: '8h ago'
      }
    ]
  }
];

export const initialPosts = [
  {
    id: 'post-1',
    author: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      badge: 'PRO ARCHITECT',
      isVerified: true
    },
    timestamp: '18 minutes ago',
    content: 'Finished documenting the brutalist sanctuary project in Kyoto. Balancing tactile volcanic stone with diffused washi paper lighting creates an atmosphere where time simply stops. What do you prioritize most in living spaces?',
    tags: ['Architecture', 'Minimalism', 'KyotoDesign', 'Interior'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80'
    ],
    likesCount: 1420,
    isLiked: true,
    isSaved: false,
    sharesCount: 88,
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Kaito Tanaka',
          handle: 'kaitocreative',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
        },
        text: 'The proportion of negative space in that corridor is simply breathtaking, Elena.',
        timestamp: '12m ago',
        likes: 14
      },
      {
        id: 'c-2',
        author: {
          name: 'Aria Vance',
          handle: 'ariavance',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
        },
        text: 'The textural contrast between the monolithic stone and warm timber is absolute perfection.',
        timestamp: '5m ago',
        likes: 9
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      id: 'user-3',
      name: 'Sora Williams',
      handle: 'sorawilliams',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      badge: 'CREATIVE CODER',
      isVerified: true
    },
    timestamp: '2 hours ago',
    content: 'Experimenting with procedural glass caustics & organic iridescent light refraction using WebGL shaders. The real-time physics engine rendered at 120 FPS on Apple Silicon. Code repo drop coming this Friday!',
    tags: ['WebGL', 'CreativeCoding', '3DArt', 'Generative'],
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80'
    ],
    likesCount: 3890,
    isLiked: false,
    isSaved: true,
    sharesCount: 312,
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Marcus Chen',
          handle: 'marcus_chen',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
        },
        text: 'Those refractive ripples look mindbendingly tactile. Can not wait for the GLSL breakdown!',
        timestamp: '1h ago',
        likes: 27
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      id: 'user-2',
      name: 'Kaito Tanaka',
      handle: 'kaitocreative',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      badge: 'FILM CURATOR',
      isVerified: false
    },
    timestamp: '4 hours ago',
    content: 'Rainfall reflections across the backstreets of Ginza. Captured on Leica M6 with Kodak Tri-X 400. In an era of digital perfection, film grain feels like an honest heartbeat.',
    tags: ['StreetPhotography', 'Monochrome', 'Tokyo', 'Leica'],
    images: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80'
    ],
    likesCount: 842,
    isLiked: true,
    isSaved: false,
    sharesCount: 45,
    comments: [
      {
        id: 'c-4',
        author: {
          name: 'Amara Patel',
          handle: 'amarapatel',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80'
        },
        text: 'The dynamic range and high-contrast blacks are unbelievable. True master of street lighting.',
        timestamp: '3h ago',
        likes: 5
      }
    ]
  },
  {
    id: 'post-4',
    author: {
      id: 'user-0',
      name: 'Aria Vance',
      handle: 'ariavance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      badge: 'CREATIVE DIRECTOR',
      isVerified: true
    },
    timestamp: '1 day ago',
    content: 'Studio design manifesto v2.0: Strip away every line of decorative noise until what remains is pure intent, tactile typography, and instant responsiveness. Welcome to our collective.',
    tags: ['DesignSystem', 'Studio', 'Minimalism', 'Typography'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80'
    ],
    likesCount: 5120,
    isLiked: false,
    isSaved: true,
    sharesCount: 490,
    comments: [
      {
        id: 'c-5',
        author: {
          name: 'Elena Rostova',
          handle: 'elenarostova',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80'
        },
        text: 'This is the clarity digital spaces desperately needed. Honored to create alongside you.',
        timestamp: '22h ago',
        likes: 31
      }
    ]
  }
];

export const trendingTopics = [
  { id: 'tr-1', tag: '#BrutalistWeb', category: 'Design Trend', postsCount: '28.4k' },
  { id: 'tr-2', tag: '#GenerativeSpatial', category: 'Creative Tech', postsCount: '19.1k' },
  { id: 'tr-3', tag: '#StudioDrop', category: 'Collective', postsCount: '54.2k' },
  { id: 'tr-4', tag: '#KyotoArchitecture', category: 'Spaces', postsCount: '12.8k' },
  { id: 'tr-5', tag: '#AnalogGrain', category: 'Photography', postsCount: '8.5k' },
];

export const suggestedUsers = [
  {
    id: 'sug-1',
    name: 'Julian Vance',
    handle: 'julianvance',
    role: 'Editorial Typographer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    isFollowing: false,
  },
  {
    id: 'sug-2',
    name: 'Mia Lindqvist',
    handle: 'mialindqvist',
    role: 'Scandinavian Interiorist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    isFollowing: false,
  },
  {
    id: 'sug-3',
    name: 'Kenzo Takahashi',
    handle: 'kenzomotion',
    role: 'Cinema4D & Motion Lead',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    isFollowing: true,
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'like',
    user: {
      name: 'Elena Rostova',
      handle: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    },
    actionText: 'liked your post',
    target: '"Studio design manifesto v2.0: Strip away every line..."',
    time: '4m ago',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'comment',
    user: {
      name: 'Marcus Chen',
      handle: 'marcus_chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    },
    actionText: 'commented: "Those refractive ripples look mindbendingly tactile."',
    target: 'Procedural glass caustics',
    time: '28m ago',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'follow',
    user: {
      name: 'Julian Vance',
      handle: 'julianvance',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    },
    actionText: 'started following you',
    target: null,
    time: '2h ago',
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'mention',
    user: {
      name: 'Sora Williams',
      handle: 'sorawilliams',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
    },
    actionText: 'mentioned you in a story: "Co-authoring the new shader pipeline with @ariavance"',
    target: null,
    time: '5h ago',
    isRead: true,
  }
];

export const initialConversations = [
  {
    id: 'chat-1',
    user: {
      id: 'user-1',
      name: 'Elena Rostova',
      handle: 'elenarostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      isOnline: true,
      lastSeen: 'Active now'
    },
    unreadCount: 2,
    messages: [
      {
        id: 'm-1',
        senderId: 'user-1',
        text: 'Hi Aria! I reviewed the architectural layouts you uploaded to Studio yesterday.',
        time: '10:14 AM'
      },
      {
        id: 'm-2',
        senderId: 'user-0',
        text: 'Elena! Thanks so much. What did you think about the light well positioning?',
        time: '10:16 AM'
      },
      {
        id: 'm-3',
        senderId: 'user-1',
        text: 'It channels the autumn morning sun straight onto the central timber table. Truly genius.',
        time: '10:18 AM'
      },
      {
        id: 'm-4',
        senderId: 'user-1',
        text: 'Are we still on for the Tokyo design showcase sync this afternoon?',
        time: '10:20 AM'
      }
    ]
  },
  {
    id: 'chat-2',
    user: {
      id: 'user-3',
      name: 'Sora Williams',
      handle: 'sorawilliams',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      isOnline: true,
      lastSeen: 'Active now'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'm-20',
        senderId: 'user-3',
        text: 'The WebGL shaders are rendering at 120fps with zero frame drops now!',
        time: 'Yesterday'
      },
      {
        id: 'm-21',
        senderId: 'user-0',
        text: 'Incredible work Sora. Let us feature it on the Studio explore spotlight tomorrow.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'chat-3',
    user: {
      id: 'user-2',
      name: 'Kaito Tanaka',
      handle: 'kaitocreative',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      isOnline: false,
      lastSeen: '35m ago'
    },
    unreadCount: 0,
    messages: [
      {
        id: 'm-30',
        senderId: 'user-2',
        text: 'Sent the high-res scans over. Let me know which prints you want for the gallery!',
        time: '2 days ago'
      }
    ]
  }
];

export const exploreItems = [
  {
    id: 'exp-1',
    title: 'Monolithic Pavilion',
    category: 'Architecture',
    likes: '4.8k',
    comments: '184',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80',
    aspect: 'tall',
  },
  {
    id: 'exp-2',
    title: 'Kinetic Chromatics',
    category: '3D Art',
    likes: '7.2k',
    comments: '412',
    author: 'Sora Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80',
    aspect: 'wide',
  },
  {
    id: 'exp-3',
    title: 'Shinjuku Midnight Mist',
    category: 'Photography',
    likes: '3.1k',
    comments: '97',
    author: 'Kaito Tanaka',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80',
    aspect: 'square',
  },
  {
    id: 'exp-4',
    title: 'Tactile Editorial Grid',
    category: 'Typography',
    likes: '2.5k',
    comments: '88',
    author: 'Julian Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=80',
    aspect: 'tall',
  },
  {
    id: 'exp-5',
    title: 'Fluid Glass Prisms',
    category: '3D Art',
    likes: '9.4k',
    comments: '530',
    author: 'Aria Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=900&auto=format&fit=crop&q=80',
    aspect: 'wide',
  },
  {
    id: 'exp-6',
    title: 'Sculptural Ceramic Vessels',
    category: 'Design',
    likes: '1.9k',
    comments: '64',
    author: 'Amara Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80',
    aspect: 'square',
  },
  {
    id: 'exp-7',
    title: 'Concrete Cantilever Residence',
    category: 'Architecture',
    likes: '5.6k',
    comments: '215',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop&q=80',
    aspect: 'wide',
  },
  {
    id: 'exp-8',
    title: 'Ethereal Gradient Waves',
    category: '3D Art',
    likes: '6.1k',
    comments: '310',
    author: 'Sora Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80',
    aspect: 'square',
  }
];
