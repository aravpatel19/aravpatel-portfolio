# Component Architecture & Data Flow

## Overview
The portfolio uses a modular component architecture with clear separation of concerns. Components are organized by functionality and follow consistent patterns for props, state management, and styling.

## Component Hierarchy

### 1. Root Layout (`/app/layout.tsx`)
**Purpose**: Application shell with metadata and global providers
**Key Features**:
- **Metadata Configuration**: SEO and social media tags
- **Theme Provider**: Dark/light mode support
- **Font Loading**: Inter font for non-Apple devices
- **Analytics**: Vercel Analytics integration
- **Global Styles**: CSS imports and body classes

**Metadata Structure**:
```typescript
export const metadata: Metadata = {
  title: "Arav Patel Portfolio",
  description: "Interactive portfolio with AI-powered Memoji",
  keywords: ["Arav Patel", "Portfolio", "Developer", "AI", "Interactive"],
  authors: [{ name: "Arav Patel", url: "https://aravpatel.com" }],
  openGraph: { /* Social media preview */ },
  twitter: { /* Twitter card data */ },
  icons: { /* Favicon configuration */ }
};
```

### 2. Landing Page (`/app/page.tsx`)
**Purpose**: Hero section with AI chat entry point
**Key Features**:
- **Animated Hero**: Framer Motion animations
- **Quick Questions**: Pre-defined question buttons
- **Free-form Input**: Custom question input
- **Asset Preloading**: Chat assets loaded in background
- **Navigation**: Route to chat interface

**Component Structure**:
```typescript
Home Component
├── GitHub Button (top-right)
├── Internship Button (top-left)
├── Hero Section
│   ├── Welcome Modal
│   ├── Name & Title
│   └── Memoji Avatar
├── Input Section
│   ├── Free-form Input
│   └── Quick Question Grid
└── Fluid Cursor Effect
```

### 3. Chat Interface (`/app/chat/page.tsx`)
**Purpose**: Wrapper for chat functionality
**Features**:
- **Suspense Boundary**: Loading state management
- **Dynamic Import**: Chat component loading
- **Error Boundary**: Graceful error handling

## Core Components

### 1. Chat Components (`/components/chat/`)

#### Main Chat (`chat.tsx`)
**Purpose**: Primary chat interface with AI integration
**Key Features**:
- **useChat Hook**: AI SDK integration
- **Avatar Animation**: Memoji video/image
- **Message Streaming**: Real-time responses
- **Tool Integration**: Function call results
- **Responsive Design**: Mobile/desktop optimization

**State Management**:
```typescript
// Chat state
const [autoSubmitted, setAutoSubmitted] = useState(false);
const [loadingSubmit, setLoadingSubmit] = useState(false);
const [isTalking, setIsTalking] = useState(false);

// AI SDK state
const {
  messages, handleInputChange, handleSubmit,
  isLoading, stop, setMessages, setInput,
  reload, addToolResult, append
} = useChat({...});
```

#### Chat Landing (`chat-landing.tsx`)
**Purpose**: Initial chat state with suggested questions
**Features**:
- **Question Suggestions**: Pre-defined conversation starters
- **Welcome Message**: Friendly introduction
- **Visual Design**: Consistent with main landing

#### Chat Bottom Bar (`chat-bottombar.tsx`)
**Purpose**: Input interface and controls
**Features**:
- **Text Input**: Message composition
- **Submit Button**: Send message
- **Stop Button**: Cancel generation
- **Loading States**: Visual feedback

#### Chat Message Content (`chat-message-content.tsx`)
**Purpose**: Message rendering and formatting
**Features**:
- **Markdown Support**: Rich text formatting
- **Tool Results**: Function call display
- **Code Highlighting**: Syntax highlighting
- **Link Handling**: External link processing

### 2. Project Components (`/components/projects/`)

#### All Projects (`AllProjects.tsx`)
**Purpose**: Project showcase container
**Features**:
- **Carousel Layout**: Apple-style card carousel
- **Data Integration**: Project data from Data.tsx
- **Responsive Design**: Mobile/desktop layouts

#### Project Data (`Data.tsx`)
**Purpose**: Centralized project information
**Structure**:
```typescript
const PROJECT_CONTENT = [
  {
    title: string,
    description: string,
    techStack: string[],
    date: string,
    links: { name: string, url: string }[],
    images: { src: string, alt: string }[]
  }
];
```

**Project Categories**:
- Startup Projects (Synto, Rrate)
- Hackathon Winners (Defai, Fitgear)
- Business Intelligence (Datai)
- 42 Projects (3D Pong, Minishell)
- Automation (YouBot)
- Web Development (Old Portfolio)

#### Apple Cards Carousel (`apple-cards-carousel.tsx`)
**Purpose**: Interactive project carousel
**Features**:
- **Smooth Animations**: Framer Motion transitions
- **Card Interactions**: Hover and click effects
- **Content Display**: Rich project information
- **Navigation**: Previous/next controls

### 3. Information Components

#### Presentation (`presentation.tsx`)
**Purpose**: Personal introduction and background
**Features**:
- **Profile Image**: Professional photo display
- **Personal Info**: Name, age, location
- **Description**: Personal narrative
- **Tags**: Key identifiers and skills

**Data Structure**:
```typescript
const profile = {
  name: 'Arav Patel',
  age: '21 years old',
  location: 'Paris, France',
  description: 'Personal introduction...',
  src: '/profil-raph.png',
  fallbackSrc: 'fallback-image-url'
};
```

#### Skills (`skills.tsx`)
**Purpose**: Technical and soft skills display
**Features**:
- **Categorized Skills**: Frontend, Backend, Design, Soft Skills
- **Visual Design**: Color-coded categories
- **Animation**: Staggered skill badge animations
- **Responsive Layout**: Mobile-friendly grid

**Skill Categories**:
- Frontend Development (HTML, CSS, JS, React, etc.)
- Backend & Systems (Unix, C, Python, Git, etc.)
- Design & Creative Tools (Figma, DaVinci, Canva, etc.)
- Soft Skills (Communication, Problem-solving, etc.)
- AI & Fullstack Engineering (LLMs, RAG, Vector DBs, etc.)

#### Contact (`contact.tsx`)
**Purpose**: Contact information and social links
**Features**:
- **Email Integration**: Clickable email link
- **Social Links**: LinkedIn, YouTube, Instagram, etc.
- **Visual Design**: Consistent with overall theme
- **Interactive Elements**: Hover effects and transitions

**Contact Data**:
```typescript
const contactInfo = {
  name: 'Arav Patel',
  email: 'aravpatel2319@gmail.com',
  handle: '@aravpatel',
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/...' },
    { name: 'Youtube', url: 'https://youtube.com/...' },
    // ... more social links
  ]
};
```

#### Resume (`resume.tsx`)
**Purpose**: Resume download and preview
**Features**:
- **PDF Integration**: Downloadable resume
- **Preview Image**: Resume thumbnail
- **Professional Layout**: Clean, minimal design

#### Sports (`sport.tsx`)
**Purpose**: Athletic background and achievements
**Features**:
- **Competition History**: Mountain biking achievements
- **Visual Elements**: Competition photos
- **Personal Story**: Athletic journey narrative

#### Crazy (`crazy.tsx`)
**Purpose**: Fun facts and personal stories
**Features**:
- **Entertaining Content**: Interesting anecdotes
- **Casual Tone**: Light-hearted presentation
- **Visual Appeal**: Engaging layout

### 4. UI Components (`/components/ui/`)

#### Reusable Components
- **Button**: Consistent button styling with variants
- **Card**: Content containers with shadows
- **Badge**: Skill and tag display
- **Dialog**: Modal overlays
- **Tooltip**: Hover information
- **Avatar**: Profile image display
- **Separator**: Visual dividers
- **Scroll Area**: Custom scrollable containers

#### Chat-Specific UI
- **ChatBubble**: Message container styling
- **MessageLoading**: Loading state indicator
- **Button with Tooltip**: Enhanced button with tooltips
- **Input Landing**: Landing page input styling

### 5. Special Effects Components

#### Fluid Cursor (`FluidCursor.tsx`)
**Purpose**: Custom cursor animation
**Features**:
- **Smooth Tracking**: Follows mouse movement
- **Visual Effects**: Blur and glow effects
- **Performance Optimized**: Efficient rendering

#### Magic UI (`/components/magicui/`)
**Purpose**: Advanced visual effects
**Features**:
- **Animated Shiny Text**: Gradient text animations
- **Particle Effects**: Background animations
- **Custom Animations**: Unique visual elements

## Data Flow Patterns

### 1. Props-Based Communication
```typescript
// Parent to child data flow
<Component 
  data={projectData}
  onAction={handleAction}
  config={componentConfig}
/>
```

### 2. Context-Based State
```typescript
// Theme provider example
<ThemeProvider attribute="class" defaultTheme="light">
  <App />
</ThemeProvider>
```

### 3. Custom Hooks
```typescript
// Chat functionality
const { messages, input, handleSubmit } = useChat({
  onResponse: handleResponse,
  onFinish: handleFinish,
  onError: handleError
});
```

### 4. Event-Driven Interactions
```typescript
// User interactions
const handleClick = () => {
  // Trigger animations
  // Update state
  // Navigate to new route
};
```

## Styling Architecture

### 1. Tailwind CSS
- **Utility-First**: Direct utility classes
- **Custom Design System**: Consistent spacing, colors, typography
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme-aware styling

### 2. Framer Motion
- **Animation Variants**: Reusable animation states
- **Staggered Animations**: Sequential element animations
- **Gesture Support**: Interactive animations
- **Performance Optimized**: Efficient rendering

### 3. Component Variants
```typescript
// Button variants example
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8"
      }
    }
  }
);
```

## Performance Considerations

### 1. Code Splitting
- **Dynamic Imports**: Lazy load non-critical components
- **Route-Based Splitting**: Separate bundles per route
- **Component-Level Splitting**: Individual component loading

### 2. Memoization
- **React.memo**: Prevent unnecessary re-renders
- **useMemo**: Cache expensive calculations
- **useCallback**: Stable function references

### 3. Asset Optimization
- **Image Optimization**: Next.js Image component
- **Video Compression**: Optimized memoji animations
- **Font Loading**: Efficient font loading strategies

## Accessibility Features

### 1. Semantic HTML
- **Proper Headings**: H1-H6 hierarchy
- **Landmark Elements**: Main, nav, section, article
- **Form Labels**: Associated form controls

### 2. ARIA Support
- **Role Attributes**: Proper element roles
- **State Management**: ARIA state attributes
- **Live Regions**: Dynamic content announcements

### 3. Keyboard Navigation
- **Focus Management**: Logical tab order
- **Keyboard Shortcuts**: Accessible interactions
- **Skip Links**: Navigation shortcuts
