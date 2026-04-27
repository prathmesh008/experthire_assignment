# 1 Day As Her - Project Documentation
## International Women's Day 2026 Interactive Experience

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [File-by-File Documentation](#file-by-file-documentation)
5. [Data Flow Architecture](#data-flow-architecture)
6. [Key Features](#key-features)
7. [How to Run](#how-to-run)

---

## 🎯 Project Overview

**"1 Day As Her"** is an interactive empathy experience designed for International Women's Day 2026. Users step into the shoes of four different women from around the world, making choices that affect their story outcomes.

### The Four Stories:

| Story | Character | Theme | Location | Year |
|-------|-----------|-------|----------|------|
| Fatima's Dream | Fatima | Right to Education | Afghanistan | 2024 |
| Rose's March | Rose | Right to Vote | USA | 1919 |
| Priya's Stand | Priya | Workplace Equality | Bangalore, India | 2024 |
| Maria's Journey | Maria | Single Mother Resilience | Mexico | 2024 |

### Ending Types:
- **✨ Empowered** - The protagonist achieves their goal
- **💎 Resilient** - The protagonist perseveres despite challenges
- **🌑 Silenced** - The protagonist's voice is suppressed

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router |
| **TypeScript** | 5.x | Type safety & better DX |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | 12.x | Premium animations |
| **React** | 19.x | UI library |

---

## 📁 Folder Structure

```
lottie-story/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── choice/        
│   │   │       └── route.ts   # Choice tracking endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page (story selection)
│   │
│   ├── components/            # React Components
│   │   ├── CinematicEnding.tsx    # Movie-style ending screen
│   │   ├── PremiumChoices.tsx     # Choice buttons UI
│   │   ├── PremiumEngine.tsx      # Main story orchestrator
│   │   ├── PremiumOverlay.tsx     # Text overlay system
│   │   ├── PremiumTransition.tsx  # Scene transitions
│   │   └── PremiumTypewriter.tsx  # Typewriter text effect
│   │
│   ├── data/                  # Story Data
│   │   ├── stories/
│   │   │   └── index.ts       # Story previews for landing page
│   │   └── storyData.ts       # Complete story content
│   │
│   ├── lib/                   # Utilities
│   │   └── database.ts        # Mock database for analytics
│   │
│   └── types/                 # TypeScript Types
│       └── story.ts           # Story data interfaces
│
├── public/                    # Static assets
├── package.json              # Dependencies & scripts
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```

---

## 📄 File-by-File Documentation

### 🔷 `/src/app/` - Next.js App Router

#### `layout.tsx`
**Purpose:** Root layout wrapper for the entire application

**Contains:**
- HTML structure with dark theme
- Geist font family import (Sans & Mono)
- Metadata configuration (title, description)
- Global CSS import

**Key Code:**
```tsx
export const metadata: Metadata = {
  title: "1 Day As Her - Women's Day 2026",
  description: "An interactive empathy experience",
};
```

---

#### `page.tsx`
**Purpose:** Landing page with story selection cards

**Contains:**
- Hero section with animated title
- Four story preview cards
- Floating particle effects (background decoration)
- Story selection logic
- PremiumEngine integration

**Key Features:**
- `useState` for selected story tracking
- Conditional rendering: Landing page vs Story engine
- Responsive grid layout (1-2 columns)
- Glassmorphism card design

**Key State:**
```tsx
const [selectedStory, setSelectedStory] = useState<string | null>(null);
```

---

#### `globals.css`
**Purpose:** Global styles and custom animations

**Contains:**
- Tailwind CSS imports
- Custom `@keyframes float` animation
- Utility classes for floating particles
- Dark theme base styles

---

#### `api/choice/route.ts`
**Purpose:** API endpoint for tracking user choices (analytics)

**HTTP Methods:**
- `POST` - Record a choice made by user
- `GET` - Retrieve choice statistics

**Request Body (POST):**
```json
{
  "storyId": "fatima",
  "sceneId": "scene_1",
  "choiceId": "choice_1"
}
```

---

### 🔷 `/src/components/` - React Components

#### `PremiumEngine.tsx`
**Purpose:** Main story orchestrator - controls the entire story flow

**Contains:**
- Story state management
- Scene navigation logic
- Choice handling
- Transition management
- Background gradient effects

**Key State:**
```tsx
const [currentNode, setCurrentNode] = useState<StoryNode>(story.startNode);
const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
const [isTypingComplete, setIsTypingComplete] = useState(false);
const [showTransition, setShowTransition] = useState(false);
```

**Key Functions:**
- `handleChoiceSelect()` - Processes user choice, triggers transition
- `handleTransitionComplete()` - Navigates to next scene

**Props:**
```tsx
interface PremiumEngineProps {
  story: Story;
  onExit: () => void;
}
```

---

#### `PremiumOverlay.tsx`
**Purpose:** Displays story text, choices, and endings with animations

**Contains:**
- Story title header
- Gradient backdrop
- Typewriter text component
- Choice buttons (via PremiumChoices)
- Ending display with statistics
- "Play Again" button

**Key Features:**
- Vertical centering for immersive reading
- AnimatePresence for smooth transitions
- Conditional rendering based on `isTypingComplete`
- Ending type badges (empowered/resilient/silenced)

**Props:**
```tsx
interface PremiumOverlayProps {
  node: StoryNode;
  visible: boolean;
  onChoiceSelect: (choice: Choice) => void;
  selectedChoiceId?: string | null;
  isTypingComplete: boolean;
  onTypingComplete: () => void;
  storyTitle?: string;
}
```

---

#### `PremiumTypewriter.tsx`
**Purpose:** Animated typewriter effect for story narration

**Contains:**
- Character-by-character text reveal
- Speaker name display (if dialogue)
- Configurable typing speed
- Completion callback

**Key Logic:**
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setDisplayedText(text.slice(0, currentIndex));
    currentIndex++;
    if (currentIndex > text.length) {
      clearInterval(interval);
      onComplete();
    }
  }, 30); // 30ms per character
}, [text]);
```

---

#### `PremiumChoices.tsx`
**Purpose:** Renders choice buttons for user interaction

**Contains:**
- Animated button group
- Hover effects with glow
- Selection state styling
- Disabled state handling

**Features:**
- Staggered animation on appearance
- Purple/pink gradient accents
- Glassmorphism design

**Props:**
```tsx
interface PremiumChoicesProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  selectedId?: string | null;
  disabled?: boolean;
}
```

---

#### `PremiumTransition.tsx`
**Purpose:** Full-screen transition between scenes

**Contains:**
- Fade-in/fade-out overlay
- Optional transition text
- Callback on completion

**Animation Sequence:**
1. Fade in (0.5s)
2. Hold (0.8s)
3. Trigger completion callback
4. Fade out (0.5s)

---

#### `CinematicEnding.tsx`
**Purpose:** Movie-style ending with real-world statistics

**Contains:**
- Large animated statistic number
- Description and source citation
- Ending type badge
- "Experience Another Story" button
- Film grain effect overlay

**Features:**
- Spring animations for impact
- Gradient text effects
- Contextual statistics per story

---

### 🔷 `/src/data/` - Story Data

#### `storyData.ts`
**Purpose:** Contains all story content (4 complete stories)

**Structure per Story:**
```tsx
const storyName: Story = {
  id: string,
  title: string,
  theme: string,
  startNode: StoryNode,
  nodes: Map<string, StoryNode>
}
```

**Stories Included:**
1. `fatimaStory` - Afghan girl seeking education
2. `roseStory` - 1919 suffragette fighting for voting rights
3. `priyaStory` - Software engineer facing workplace inequality
4. `mariaStory` - Single mother in Mexico

**Each Story Contains:**
- 4-8 scenes (StoryNodes)
- 2-3 choices per decision point
- 2-3 different endings
- Real-world statistics for endings

**Export:**
```tsx
export const allStories = new Map<string, Story>([
  ['fatima', fatimaStory],
  ['rose', roseStory],
  ['priya', priyaStory],
  ['maria', mariaStory],
]);
```

---

#### `stories/index.ts`
**Purpose:** Story preview data for landing page cards

**Contains:**
```tsx
interface StoryPreview {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  color: string;      // Gradient color theme
  location: string;
  year: string;
}
```

**Exports:**
- `storyPreviews` - Array of 4 story previews

---

### 🔷 `/src/types/` - TypeScript Interfaces

#### `story.ts`
**Purpose:** Type definitions for the entire story system

**Interfaces:**

```tsx
// Individual story node (scene)
interface StoryNode {
  id: string;
  text: string;
  speaker?: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingType?: 'empowered' | 'resilient' | 'silenced';
  statistic?: Statistic;
}

// User choice option
interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  consequence?: string;
}

// Real-world statistic for endings
interface Statistic {
  value: string;      // e.g., "129 Million"
  description: string;
  source: string;
}

// Complete story structure
interface Story {
  id: string;
  title: string;
  theme: string;
  startNode: StoryNode;
  nodes: Map<string, StoryNode>;
}
```

---

### 🔷 `/src/lib/` - Utilities

#### `database.ts`
**Purpose:** Mock database for choice analytics

**Contains:**
- In-memory storage for choices
- `recordChoice()` function
- `getChoiceStats()` function

**Note:** In production, this would connect to a real database (MongoDB, PostgreSQL, etc.)

---

### 🔷 Configuration Files

#### `package.json`
**Key Scripts:**
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

**Key Dependencies:**
- `next`: ^16.1.6
- `react`: ^19.0.0
- `framer-motion`: ^12.12.1
- `tailwindcss`: ^4

---

#### `tsconfig.json`
**Purpose:** TypeScript compiler configuration

**Key Settings:**
- `target`: ES2017
- `strict`: true
- Path alias: `@/*` → `./src/*`

---

#### `next.config.ts`
**Purpose:** Next.js configuration

**Current:** Default configuration (empty object)

---

## 🔄 Data Flow Architecture

```
┌─────────────────┐
│   page.tsx      │  User selects a story
│  (Landing Page) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PremiumEngine   │  Loads story from storyData.ts
│  (Orchestrator) │  Manages state & transitions
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PremiumOverlay  │  Displays current scene
│                 │  Shows text via Typewriter
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PremiumChoices  │  User makes a choice
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│PremiumTransition│  Scene transition animation
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next Scene     │  Loop back to PremiumOverlay
│  or Ending      │  or show CinematicEnding
└─────────────────┘
```

---

## ✨ Key Features

### 1. **Branching Narrative**
- Multiple story paths based on choices
- 3 ending types per story
- Choices have meaningful consequences

### 2. **Premium Animations**
- Framer Motion for smooth transitions
- Typewriter effect for immersive reading
- Spring physics for natural feel

### 3. **Responsive Design**
- Mobile-first approach
- Adapts from phone to desktop
- Touch-friendly interactions

### 4. **Real-World Impact**
- Each ending shows real statistics
- Sources cited (UNESCO, WHO, UN, etc.)
- Educational component

### 5. **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- High contrast text

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Development URL:** http://localhost:3000

---

## 📊 Interview Talking Points

1. **Why Next.js App Router?**
   - Server components for better performance
   - Built-in API routes
   - File-based routing

2. **Why TypeScript?**
   - Type safety for complex story data
   - Better IDE support & autocomplete
   - Easier refactoring

3. **Why Framer Motion?**
   - Declarative animations
   - AnimatePresence for exit animations
   - Spring physics for natural feel

4. **State Management Approach**
   - React useState for local state
   - Lifting state to PremiumEngine
   - No need for Redux (simple flow)

5. **Design Decisions**
   - Glassmorphism for modern look
   - Purple/pink gradient for Women's Day theme
   - Centered text for immersive reading

---

## 📝 Future Improvements

- [ ] Add sound effects & music
- [ ] Save progress to localStorage
- [ ] Add more stories
- [ ] Implement user accounts
- [ ] Real database for analytics
- [ ] Multilingual support

---

**Created for:** ExpertHire Assignment  
**Theme:** International Women's Day 2026  
**Developer:** Prathmesh Upadhyay  
**GitHub:** https://github.com/prathmesh008/experthire_assignment

---

*"Every woman's story deserves to be heard."*
