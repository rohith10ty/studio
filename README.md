# Studio — Modern Social Collective

**Studio** is an award-winning, ultra-modern social networking platform crafted for visual architects, designers, creative technologists, and editorial thinkers. Built with **React**, **Vite**, and **Tailwind CSS**, featuring **Outfit typography**, **Lenis smooth scrolling**, and hidden scrollbars for a clean editorial atmosphere.

---

## 🎨 Color Palettes

### 🌙 Dark Mode Palette
Curated from [Color Hunt #dbd8e3-5c5470-352f44-2a2438](https://colorhunt.co/palette/dbd8e35c5470352f442a2438)
- **Deep Background**: `#2A2438`
- **Surface / Card**: `#352F44`
- **Borders & Muted Elements**: `#5C5470`
- **Text & Accent Highlights**: `#DBD8E3`

### ☀️ Light Mode Palette
Curated from [Color Hunt #ebe2cc-ded6c1-cfc6b1-b7b09e](https://colorhunt.co/palette/ebe2ccded6c1cfc6b1b7b09e)
- **Primary Background**: `#EBE2CC`
- **Surface / Card**: `#DED6C1`
- **Borders & Accents**: `#CFC6B1`
- **Muted Accents & Dividers**: `#B7B09E`
- **High-Contrast Editorial Typography**: `#2A2438`

---

## ✨ Features & Modules

### 1. 🔐 Authentication & Session
- Registration and Login tabs with responsive glassmorphic modal
- Form validation (Email regex, password character length, required fields)
- **Remember Me** toggle
- 1-Click **Demo Account** auto-fill for instant walkthrough

### 2. 📰 Home / Feed
- **Stories Bar**: Creator rings, active status gradients, and "+ Add Story" file reader
- **Story Viewer Modal**: Fullscreen Instagram/Behance-style story experience with automated 5s progress bar, pause/resume, interactive reply bar, and heart reactions
- **Post Creator**: Rich text input, file upload preview, preset gallery, tags selector, privacy settings (`Public` / `Followers` / `Private`)
- **Feed Stream**:
  - Heart likes with animated bounce & real-time counter
  - Expandable nested comment drawer with instant commenting
  - Lightbox modal on image click
  - Share modal with 1-click clipboard link copying
  - Save/Bookmark to personal collection

### 3. 🧭 Explore Page
- Real-time search across creators, posts, and tags
- Category filters: `All`, `Architecture`, `3D Art`, `Photography`, `Typography`, `Design`
- Spotlight creators card with 1-click follow/unfollow
- Dynamic masonry visual showcase grid with interactive hover overlays

### 4. 🔔 Notifications Center
- Real-time notifications for Likes, Comments, Mentions, and Follows
- Category filters: `All Activity`, `Unread`, `Appreciations`, `Discussions`
- 1-click **Mark all as read**
- Instant "Follow back" button

### 5. 💬 Studio Direct Messages
- Split-pane chat interface (responsive collapsible on mobile screens)
- Active online status badges
- Full conversation history with timestamped speech bubbles and read receipts
- Interactive message input with Enter-to-send
- **Simulated Real-time Auto-Reply**: Sends a realistic response back after 1.4s

### 6. 👤 User Profile
- Panoramic cover banner & avatar with verified badge
- Full editable stats: Posts, Followers, Following, Appreciations
- Bio, Tokyo/SF location, and portfolio link
- Clickable Followers & Following modals with follow toggling
- Filterable tabs: `My Creations`, `Saved Archive`, `Liked Works`
- **Edit Profile Modal**: Change name, bio, avatar, banner, location, and portfolio URL

### 7. 📱 Responsive Architecture & UX
- Fully responsive across `320px+`, `768px+`, `1024px+`, and `1440px+`
- Desktop: Left navigation sidebar + Center feed + Right trending sidebar
- Mobile: Top navbar with notification badge + Floating bottom dock
- **Outfit** font family across the entire application
- **Lenis** smooth scroll with custom easing
- **Hidden scrollbars** globally across all browsers without breaking scroll behavior

---

## 🛠️ Tech Stack

- **React 18/19**
- **Vite**
- **Tailwind CSS 3.4**
- **Lenis** (`@studio-freight/lenis` / `lenis`)
- **Lucide React** (icons)

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm `v9+` or `v11+`

### Installation
```bash
# Clone the repository
git clone <your-repo-link>
cd "social media app"

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**.

### Deploy to Netlify
1. Push your repository to GitHub.
2. Sign in to [Netlify](https://www.netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy Site**.
