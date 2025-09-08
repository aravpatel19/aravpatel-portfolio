# AI Portfolio Architecture Overview

## Project Summary
This is an AI-powered interactive portfolio built with Next.js 15, React 19, and OpenAI's GPT-4o-mini. The portfolio features an animated memoji avatar that responds to user queries through a conversational AI interface, making it an innovative alternative to traditional static portfolios.

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: OpenAI GPT-4o-mini, Vercel AI SDK
- **UI Components**: Radix UI, shadcn/ui
- **Deployment**: Vercel
- **Package Manager**: pnpm

## Core Architecture

### 1. Application Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Landing page with hero section
│   ├── chat/              # Chat interface route
│   │   └── page.tsx       # Chat page wrapper
│   └── api/               # API routes
│       ├── chat/          # AI chat endpoint
│       │   ├── route.ts   # Main chat API handler
│       │   ├── prompt.ts  # AI system prompt
│       │   └── tools/      # AI function calling tools
│       └── github-stars/  # GitHub integration
├── components/            # React components
│   ├── chat/              # Chat interface components
│   ├── projects/          # Project showcase components
│   ├── ui/                # Reusable UI components
│   └── magicui/           # Custom UI effects
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

### 2. Key Features

#### AI-Powered Chat Interface
- **Real-time streaming** responses using Vercel AI SDK
- **Function calling** for structured data retrieval
- **Animated memoji avatar** that responds to conversation
- **Tool-based responses** for specific information types

#### Interactive Project Showcase
- **Carousel-based** project display
- **Rich media** support (images, videos)
- **Categorized projects** with detailed descriptions
- **External links** and GitHub integration

#### Modern UI/UX
- **Responsive design** with mobile-first approach
- **Smooth animations** using Framer Motion
- **Dark/light theme** support
- **Fluid cursor** effects and micro-interactions

## Data Flow Architecture

### 1. User Interaction Flow
```
User Input → Chat Interface → API Route → OpenAI → Function Tools → Response → UI Update
```

### 2. AI Response Pipeline
1. **User Query**: Submitted through chat interface
2. **API Processing**: `/api/chat/route.ts` handles the request
3. **System Prompt**: `prompt.ts` provides context and personality
4. **Function Calling**: Tools in `/api/chat/tools/` provide structured data
5. **Streaming Response**: Real-time response streaming to UI
6. **UI Update**: Chat interface updates with response and animations

### 3. Component Communication
- **Props-based** data flow for static components
- **Context-based** state management for theme
- **Custom hooks** for chat functionality
- **Event-driven** interactions for animations

## Security & Performance

### Security Measures
- **Environment variables** for API keys
- **Input validation** using Zod schemas
- **CORS protection** for API routes
- **Rate limiting** considerations

### Performance Optimizations
- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Preloading** of critical assets
- **Streaming responses** for better perceived performance

## Deployment Architecture
- **Vercel deployment** with automatic CI/CD
- **Environment variables** management
- **Static asset optimization**
- **Edge function** support for API routes

## Scalability Considerations
- **Modular component** architecture
- **Reusable UI components** with shadcn/ui
- **Configurable AI prompts** and tools
- **Easy content updates** through data files
