# Lorcana Deck Builder

A modern, responsive deck builder for Disney Lorcana with advanced filtering, colorful deck management, and interactive features.

## ✨ Features

### 🎴 Card Display & Interaction

- **Responsive Grid Layout**: Cards automatically adjust to screen size with proper spacing
- **Hover Expansion**: Hover over card images to see detailed card information in a full-screen overlay
- **Multiple Rows**: View 3+ rows of cards on desktop, optimized for all screen sizes
- **Lazy Loading**: Images load efficiently with skeleton placeholders

### 🎨 Visual Design

- **SVG Ink Icons**: Beautiful hexagonal icons for each ink type (Amber, Amethyst, Emerald, Ruby, Sapphire, Steel)
- **Colorful Deck Panel**: Cards in deck display with backgrounds matching their ink colors
- **Multicolor Support**: Cards with multiple ink types show gradient backgrounds
- **Modern UI**: Clean, dark theme with smooth animations and hover effects

### 🔍 Advanced Filtering

- **Real-time Search**: Instant card filtering as you type
- **Ink Color Filters**: Click hexagonal icons to filter by ink type
- **Cost Range Filters**: Interactive circular buttons for cost filtering
- **Active Filter Chips**: Visual representation of applied filters with easy removal
- **Filter Drawer**: Additional filtering options in a slide-out panel

### 📊 Deck Statistics

- **Pie Charts**: Visual breakdown of deck composition
  - Ink color distribution
  - Inkable vs Uninkable cards
  - Card type distribution
- **Real-time Counters**: Live updates of inkable/uninkable card counts
- **Cost Curve**: Visual representation of mana curve

### 📱 Responsive Design

- **Mobile Optimized**: Touch-friendly interface on phones and tablets
- **Adaptive Layout**: Sidebar collapses on smaller screens
- **Dynamic Sizing**: Cards and UI elements scale appropriately

## 🚀 Performance Optimizations

- **Bundle Splitting**: Separate chunks for vendor, MUI, router, and utils
- **Memoized Components**: React.memo for performance-critical components
- **Optimized State Management**: Zustand with shallow comparisons
- **Background Caching**: Non-blocking IndexedDB operations
- **Parallel Data Loading**: Concurrent API requests for faster loading

## 🛠 Technical Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Build Tool**: Vite
- **Database**: IndexedDB (Dexie.js)
- **Search**: Elasticlunr (client-side)
- **Styling**: Tailwind CSS + MUI System

## 📁 Project Structure

```
src/
├── components/
│   ├── Deck/
│   │   ├── DeckRow.tsx          # Colorful card rows with ink backgrounds
│   │   └── DeckPieChart.tsx     # Statistical pie charts
│   ├── CardGrid.tsx             # Responsive card grid layout
│   ├── CardTile.tsx             # Individual card with hover expansion
│   ├── TopFilters.tsx           # Advanced filtering interface
│   └── DeckPreview.tsx          # Main deck management panel
├── icons/
│   └── inkIcons.tsx             # SVG icons for ink types
├── store/
│   ├── useStore.ts              # Main application state
│   ├── useSearch.ts             # Search and filtering logic
│   └── useDecks.ts              # Deck management with fixed inkable counting
├── data/
│   └── lorcana.ts               # Card data loading and caching
└── types.ts                     # TypeScript type definitions
```

## 🎯 Key Improvements Made

### Fixed Issues

1. **Card Cutoff**: Removed fixed height constraints, allowing proper scrolling
2. **Inkable Counter**: Fixed logic to properly count inkable vs uninkable cards
3. **Infinite Loops**: Resolved React re-rendering issues with proper useCallback usage
4. **404 Errors**: Updated API endpoints and added fallback data loading

### New Features

1. **Hover Expansion**: Full-screen card details on hover
2. **SVG Ink Icons**: Beautiful hexagonal icons replacing simple colored boxes
3. **Colorful Deck Panel**: Cards display with ink-colored backgrounds
4. **Pie Charts**: Visual deck statistics and composition analysis
5. **Multicolor Support**: Gradient backgrounds for multi-ink cards

### Performance Enhancements

1. **Responsive Grid**: CSS Grid with auto-fill for optimal card display
2. **Bundle Optimization**: Manual chunk splitting for better caching
3. **Lazy Loading**: Efficient image loading with skeleton placeholders
4. **Memoization**: React.memo and useMemo for performance-critical components

## 🎨 Design Philosophy

The application follows a modern, card-game aesthetic with:

- **Dark Theme**: Easy on the eyes for extended deck building sessions
- **Color Coding**: Intuitive ink color representation throughout the UI
- **Smooth Animations**: Subtle hover effects and transitions
- **Responsive Layout**: Works seamlessly across all device sizes
- **Visual Hierarchy**: Clear information architecture with proper spacing

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎮 Usage

1. **Browse Cards**: Use the responsive grid to view all available cards
2. **Filter**: Use the top filter bar to narrow down cards by ink type, cost, or search terms
3. **Add Cards**: Click on cards to add them to your deck
4. **Manage Deck**: Use the colorful deck panel to adjust card quantities
5. **View Statistics**: Check the pie charts for deck composition insights
6. **Hover for Details**: Hover over card images to see full card information

The application provides a smooth, intuitive deck building experience with beautiful visuals and powerful functionality.
